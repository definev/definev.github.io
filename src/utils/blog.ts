// Type definitions
export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  slug: string
  tags: string[]
  readTime: number
  published?: boolean
  author?: string
  image?: string
}

export interface BlogPostFrontmatter {
  title: string
  excerpt: string
  date: string
  tags: string[]
  published?: boolean
  author?: string
  image?: string
}

export interface BlogData {
  posts: BlogPost[]
  generatedAt: string
  totalPosts: number
}

// Cache for blog data
let blogDataCache: BlogData | null = null

/**
 * Load blog data from the pre-built JSON file
 */
async function loadBlogData(): Promise<BlogData> {
  if (blogDataCache) {
    return blogDataCache
  }

  try {
    // In development, try to load from file system
    if (process.env.NODE_ENV === 'development') {
      const fs = await import('fs')
      const path = await import('path')
      const matter = await import('gray-matter')
      const readingTime = await import('reading-time')

      const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')
      
      if (fs.existsSync(BLOG_CONTENT_DIR)) {
        const files = fs
          .readdirSync(BLOG_CONTENT_DIR)
          .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
          .filter((file) => file !== 'README.md')

        const posts: BlogPost[] = []
        
        for (const file of files) {
          try {
            const fullPath = path.join(BLOG_CONTENT_DIR, file)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter.default(fileContents)

            if (!data.title || !data.date) {
              continue
            }

            const slug = file.replace(/\.(md|mdx)$/, '')
            const { minutes } = readingTime.default(content)
            const excerpt = data.excerpt || generateExcerpt(content)

            posts.push({
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
            })
          } catch (error) {
            console.error(`Error processing ${file}:`, error)
          }
        }

        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        blogDataCache = {
          posts,
          generatedAt: new Date().toISOString(),
          totalPosts: posts.length,
        }

        return blogDataCache
      }
    }

    // In production or if development file reading fails, load from JSON
    const response = await fetch('/blog-data.json')
    if (!response.ok) {
      throw new Error('Failed to load blog data')
    }

    blogDataCache = await response.json()
    return blogDataCache!
  } catch (error) {
    console.error('Error loading blog data:', error)
    // Return empty blog data as fallback
    blogDataCache = {
      posts: [],
      generatedAt: new Date().toISOString(),
      totalPosts: 0,
    }
    return blogDataCache
  }
}

/**
 * Generate an excerpt from markdown content
 */
function generateExcerpt(content: string, maxLength: number = 200): string {
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
 * Get all published blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const blogData = await loadBlogData()
  return blogData.posts.filter(post => post.published !== false)
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const blogData = await loadBlogData()
  return blogData.posts.find(post => post.slug === slug && post.published !== false) || null
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tagSet = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  
  return Array.from(tagSet).sort()
}

/**
 * Search posts by title, excerpt, or content
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  const searchTerm = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

/**
 * Get related posts based on shared tags
 */
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug)
  
  // Calculate relevance score based on shared tags
  const postsWithScore = otherPosts.map(post => {
    const sharedTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    ).length
    return { post, score: sharedTags }
  })
  
  // Sort by score and return top results
  return postsWithScore
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
} 