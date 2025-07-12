import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { useState } from 'react'

// Type definition for blog post
interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  slug: string
  tags: string[]
}

// Server function to get all blog posts
const getAllPosts = createServerFn({ method: 'GET' }).handler(async () => {
  // This is a placeholder - in the future, you would:
  // 1. Read from a content management system
  // 2. Parse markdown files from a directory
  // 3. Fetch from a database
  // 4. Use a headless CMS
  
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Welcome to My Blog',
      excerpt: 'This is the first post on my technical blog where I\'ll share insights about software development, programming, and technology.',
      date: '2024-01-15',
      slug: 'welcome-to-my-blog',
      tags: ['introduction', 'blog', 'welcome'],
    },
    {
      id: '2',
      title: 'Building Modern React Applications with TanStack',
      excerpt: 'Exploring the power of TanStack ecosystem for building robust, type-safe React applications with excellent developer experience.',
      date: '2024-01-10',
      slug: 'building-modern-react-applications-with-tanstack',
      tags: ['react', 'tanstack', 'typescript', 'web development'],
    },
  ]
  
  return mockPosts
})

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
  loader: async () => {
    const posts = await getAllPosts()
    return { posts }
  },
})

function BlogIndex() {
  const { posts } = Route.useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Blog Posts List */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <time className="text-slate-400 text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                
                <h2 className="text-xl font-bold text-white hover:text-blue-300 transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-300 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              {searchTerm ? 'No posts found matching your search.' : 'No blog posts available yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 