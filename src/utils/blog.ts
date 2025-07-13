import { buildUrl, isDevelopment } from './config'

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
    // Use relative path to avoid circular requests on Cloudflare Workers
    const blogDataUrl = '/blog-data.json'
    console.log(`Loading blog data from: ${blogDataUrl}`)
    
    const response = await fetch(blogDataUrl)
    if (!response.ok) {
      throw new Error(`Failed to load blog data from ${blogDataUrl}: ${response.status} ${response.statusText}`)
    }

    blogDataCache = await response.json()
    console.log(`Successfully loaded ${blogDataCache?.totalPosts} blog posts`)
    return blogDataCache as BlogData
  } catch (error) {
    console.error('Error loading blog data:', error)
    
    // In development, provide helpful debugging info
    if (isDevelopment()) {
      console.error('Make sure you have run "bun run build:blog" to generate the blog data file')
      console.error('Expected file location: public/blog-data.json')
    }
    
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