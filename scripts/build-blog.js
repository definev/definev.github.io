import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

// Configuration
const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'blog-data.ts')

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
    }
  } catch (error) {
    console.error(`Error processing ${filename}:`, error)
    return null
  }
}

/**
 * Build blog data
 */
function buildBlogData() {
  console.log('🔨 Building blog data...')

  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    console.warn(`Blog content directory does not exist: ${BLOG_CONTENT_DIR}`)
    return
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
    if (post) {
      posts.push(post)
      console.log(`✅ Processed: ${post.title}`)
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
}

// Run the build
buildBlogData() 