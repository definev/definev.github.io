import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { getAllPosts, type BlogPost } from '~/utils/blog'

// Server function to get all blog posts
const getAllPostsServer = createServerFn({ method: 'GET' }).handler(async () => {
  return await getAllPosts()
})

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
  loader: async () => {
    const posts = await getAllPostsServer()
    return { posts }
  },
  head: () => ({
    meta: [
      {
        title: 'Blog - Bùi Đại Dương (Zennn.mind)',
      },
      {
        name: 'description',
        content: 'Technical blog posts about software development, programming, and technology insights from a young developer.',
      },
      {
        name: 'keywords',
        content: 'blog, programming, software development, react, flutter, golang, technology',
      },
    ],
  }),
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
    <div className="min-h-screen paper-texture">
      <div className="section-padding pt-12 pb-28">
        <div className="container-max">
          {/* Back to Home Button */}
          <div className="mb-8 flex justify-between items-start gap-4 max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn-brutal-outline text-sm uppercase tracking-wider"
            >
              {"<"} BACK TO HOME
            </Link>

            <div className="inline-flex items-center gap-2 btn-brutal text-sm uppercase tracking-wider">
              [ZEN BLOG]
            </div>
          </div>

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-accent border-2 border-b-0 border-border-brutal shadow-md p-4 max-w-4xl mx-auto">
              <p className="text-ink text-sm font-bold">
                {">>>"} Sharing insights about software development, programming, and<br />everything in between I'm interested in.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="bg-paper border-2 border-border-brutal shadow-lg p-4">
              <label htmlFor="search" className="block text-ink font-bold text-sm uppercase tracking-wider mb-2">
                SEARCH POSTS:
              </label>
              <input
                id="search"
                type="text"
                placeholder="TYPE TO SEARCH..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-paper-dark text-ink placeholder-ink-light border-2 border-border-brutal font-bold text-sm uppercase tracking-wider focus:outline-none focus:bg-accent focus:border-border-brutal transition-colors"
              />
            </div>
          </div>

          {/* Blog Posts List */}
          <div className="max-w-4xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="flex flex-col gap-8">
                {filteredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="w-full bg-paper-dark border-2 border-border-brutal shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="p-6 md:p-8">
                      {/* Post Header */}
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-accent border border-border-brutal px-3 py-1">
                            <time className="text-ink text-xs font-bold uppercase tracking-wider">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </time>
                          </div>
                        </div>
                      </div>

                      {/* Post Title */}
                      <h2 className={`font-display font-bold text-ink uppercase tracking-tight mb-6 hover:text-accent transition-colors group-hover:text-accent ${index === 0 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
                        }`}>
                        <Link to='/blog/$slug' params={{ slug: post.slug }}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Post Excerpt */}
                      <p className={`text-ink leading-relaxed mb-6 font-medium ${index === 0 ? 'text-base' : 'text-sm'
                        }`}>
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-paper border border-border-brutal text-ink text-xs font-bold uppercase tracking-wider hover:bg-accent transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Button */}
                      <div className="flex justify-between items-center">
                        <Link
                          to='/blog/$slug' params={{ slug: post.slug }}
                          className="btn-brutal text-sm uppercase tracking-wider"
                        >
                          {">>"}READ MORE
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-paper border-2 border-border-brutal shadow-lg p-8 max-w-lg mx-auto">
                  <h3 className="text-xl font-display font-bold text-ink uppercase tracking-tight mb-4">
                    {searchTerm ? 'NO MATCHES FOUND' : 'NO POSTS YET'}
                  </h3>
                  <p className="text-ink font-bold text-sm">
                    {searchTerm
                      ? 'Try different keywords or browse all posts.'
                      : 'New blog posts are coming soon. Check back later!'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="btn-brutal mt-6 text-sm uppercase tracking-wider"
                    >
                      CLEAR SEARCH
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 