import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

// Configuration
const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')
const SERIES_CONTENT_DIR = path.join(process.cwd(), 'content', 'series')
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'blog-data.ts')
const SERIES_OUTPUT_FILE = path.join(OUTPUT_DIR, 'series-data.ts')

/**
 * Generate an excerpt from markdown content
 */
function generateExcerpt(content, maxLength = 200) {
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  const truncated = plainText.substring(0, maxLength)
  const lastSentence = truncated.lastIndexOf('.')
  const lastSpace = truncated.lastIndexOf(' ')
  const cutoff = lastSentence > maxLength * 0.7 ? lastSentence + 1 : lastSpace

  return (cutoff > 0 ? plainText.substring(0, cutoff) : truncated) + '...'
}

/**
 * Process a single markdown file
 */
function processMarkdownFile(filename) {
  try {
    const fullPath = path.join(BLOG_CONTENT_DIR, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Validate required frontmatter fields
    if (!data.title || !data.date) {
      console.warn(`Skipping ${filename}: Missing required frontmatter (title or date)`)
      return null
    }

    // Skip unpublished posts in production
    if (process.env.VITE_NODE_ENV === 'production' && data.published === false) {
      console.log(`Skipping unpublished post: ${filename}`)
      return null
    }

    // Generate slug from filename
    const slug = filename.replace(/\.(md|mdx)$/, '')

    // Calculate reading time
    const { minutes } = readingTime(content)

    // Generate excerpt if not provided
    const excerpt = data.excerpt || generateExcerpt(content)

    return {
      id: slug,
      title: data.title,
      content,
      excerpt,
      date: data.date,
      slug,
      tags: data.tags || [],
      readTime: Math.ceil(minutes),
      published: data.published ?? true,
      author: data.author,
      image: data.image,
      series: data.series,
      seriesOrder: data.seriesOrder,
    }
  } catch (error) {
    console.error(`Error processing ${filename}:`, error)
    return null
  }
}

/**
 * Process a single series frontmatter file
 */
function processSeriesFile(filename) {
  try {
    const fullPath = path.join(SERIES_CONTENT_DIR, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Validate required fields
    if (!data.title) {
      console.warn(`Skipping series ${filename}: Missing required frontmatter (title)`) 
      return null
    }

    // Generate slug from filename
    const slug = filename.replace(/\.(md|mdx)$/, '')

    return {
      slug,
      title: data.title,
      description: data.description || '',
      tags: data.tags || [],
      published: data.published ?? true,
      image: data.image || undefined,
      order: typeof data.order === 'number' ? data.order : undefined,
      content,
    }
  } catch (error) {
    console.error(`Error processing series ${filename}:`, error)
    return null
  }
}

/**
 * Build blog + series data
 */
function buildBlogData(publishedOnly = false) {
  console.log('🔨 Building blog data...')

  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    console.warn(`Blog content directory does not exist: ${BLOG_CONTENT_DIR}`)
    return
  }

  // Preload series files to build slug/title maps
  const seriesEntries = []
  const slugToTitle = new Map()
  const titleToSlug = new Map()
  if (fs.existsSync(SERIES_CONTENT_DIR)) {
    const seriesFiles = fs
      .readdirSync(SERIES_CONTENT_DIR)
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .filter((file) => file !== 'README.md')

    console.log(`Found ${seriesFiles.length} series files`)
    for (const file of seriesFiles) {
      const seriesItem = processSeriesFile(file)
      if (seriesItem && (seriesItem.published || !publishedOnly)) {
        seriesEntries.push(seriesItem)
        slugToTitle.set(seriesItem.slug, seriesItem.title)
        titleToSlug.set(seriesItem.title, seriesItem.slug)
        console.log(`✅ Processed series: ${seriesItem.title}`)
      }
    }
  } else {
    console.log(`Series content directory does not exist: ${SERIES_CONTENT_DIR}`)
  }

  // Get all markdown files
  const files = fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .filter((file) => file !== 'README.md') // Skip README

  console.log(`Found ${files.length} markdown files`)

  // Process all files
  const posts = []
  for (const file of files) {
    const post = processMarkdownFile(file)
    if (post && (post.published || !publishedOnly)) {
      // Normalize series reference to use series slug backed by series files
      if (post.series) {
        const raw = String(post.series)
        if (slugToTitle.has(raw)) {
          // Provided as slug (filename)
          post.seriesSlug = raw
          post.series = slugToTitle.get(raw)
        } else if (titleToSlug.has(raw)) {
          // Provided as human title; map to slug
          post.seriesSlug = titleToSlug.get(raw)
          post.series = raw
        } else {
          // Unknown: derive slug from raw and allow enrichment later
          const derivedSlug = raw.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
          post.seriesSlug = derivedSlug
          // Also ensure a minimal series entry exists for enrichment
          if (!slugToTitle.has(derivedSlug)) {
            slugToTitle.set(derivedSlug, raw)
            titleToSlug.set(raw, derivedSlug)
            seriesEntries.push({
              slug: derivedSlug,
              title: raw,
              description: '',
              tags: [],
              published: true,
              image: undefined,
              order: undefined,
              content: '',
            })
          }
        }
      }
      posts.push(post)
      console.log(`✅ Processed: ${post.title}`)
    } else {
      console.log(`❌ Skipped: ${post.title}`)
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Generate TypeScript file with embedded blog data
  const blogData = {
    posts,
    generatedAt: new Date().toISOString(),
    totalPosts: posts.length,
  }

  // Create TypeScript file content
  const tsContent = `// Auto-generated blog data - do not edit manually
// Generated at: ${new Date().toISOString()}

import type { BlogData, BlogPost } from '~/utils/blog'

export const blogData: BlogData = ${JSON.stringify(blogData, null, 2)} as BlogData

export const blogPosts: BlogPost[] = blogData.posts

export default blogData
`

  fs.writeFileSync(OUTPUT_FILE, tsContent)
  console.log(`📝 Blog data written to ${OUTPUT_FILE}`)
  console.log(`📊 Generated ${posts.length} blog posts`)

  // Index series entries by title for enrichment
  const titleToSeries = new Map(seriesEntries.map((s) => [s.title, s]))

  // Derive stats from posts and add implicit series for any referenced by posts
  const seriesStatsMap = new Map()
  for (const post of posts) {
    if (!post.series) continue
    const title = post.series
    if (!seriesStatsMap.has(title)) {
      seriesStatsMap.set(title, { postCount: 0, latestDate: post.date })
    }
    const stats = seriesStatsMap.get(title)
    stats.postCount += 1
    if (new Date(post.date) > new Date(stats.latestDate)) {
      stats.latestDate = post.date
    }
    // If the series was not declared via frontmatter file, create a minimal one
    if (!titleToSeries.has(title)) {
      titleToSeries.set(title, {
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        description: '',
        tags: [],
        published: true,
        image: undefined,
        order: undefined,
        content: '',
      })
    }
  }

  // Build enriched series list
  const enrichedSeries = Array.from(titleToSeries.values()).map((s) => {
    const stats = seriesStatsMap.get(s.title) || { postCount: 0, latestDate: null }
    return {
      ...s,
      postCount: stats.postCount,
      latestDate: stats.latestDate,
    }
  })

  // Sort by optional order then by latestDate desc
  enrichedSeries.sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER
    const orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER
    if (orderA !== orderB) return orderA - orderB
    const dateA = a.latestDate ? new Date(a.latestDate).getTime() : 0
    const dateB = b.latestDate ? new Date(b.latestDate).getTime() : 0
    return dateB - dateA
  })

  const seriesData = {
    series: enrichedSeries,
    generatedAt: new Date().toISOString(),
    totalSeries: enrichedSeries.length,
  }

  const seriesTsContent = `// Auto-generated series data - do not edit manually
// Generated at: ${new Date().toISOString()}

import type { SeriesData, SeriesMeta } from '~/utils/blog'

export const seriesData: SeriesData = ${JSON.stringify(seriesData, null, 2)} as SeriesData

export const seriesList: SeriesMeta[] = seriesData.series

export default seriesData
`

  fs.writeFileSync(SERIES_OUTPUT_FILE, seriesTsContent)
  console.log(`📝 Series data written to ${SERIES_OUTPUT_FILE}`)
  console.log(`📚 Generated ${enrichedSeries.length} series entries`)
}

// Run the build
buildBlogData(false) 