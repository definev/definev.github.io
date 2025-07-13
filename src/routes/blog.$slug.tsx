import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import FloatingNavbar from '~/components/FloatingNavbar'
import MarkdownContent from '~/components/MarkdownContent'
import { getPostBySlug as getPostBySlugUtil, type BlogPost } from '~/utils/blog'

// Server function to get a single blog post by slug
const getPostBySlugServer = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const post = await getPostBySlugUtil(slug)
    if (!post) {
      throw notFound()
    }
    return post
  })

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  loader: async ({ params }) => {
    const post = await getPostBySlugServer({ data: params.slug })
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.post.title} - Bùi Đại Dương (Zennn.mind)`,
      },
      {
        name: 'description',
        content: loaderData?.post.excerpt,
      },
      {
        name: 'keywords',
        content: loaderData?.post.tags.join(', '),
      },
    ],
  }),
})

function BlogPost() {
  const { post } = Route.useLoaderData()

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

          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              <div className="bg-paper border-2 border-border-brutal shadow-lg p-6 md:p-8 mb-6">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-ink uppercase tracking-tight mb-6">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-4 text-ink-light text-sm font-bold">
                    <div className="bg-accent border border-border-brutal px-3 py-1">
                      <time className="uppercase tracking-wider">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="bg-paper-dark border border-border-brutal px-3 py-1">
                      <span className="uppercase tracking-wider">{post.readTime} MIN READ</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-paper-dark border border-border-brutal text-ink text-xs font-bold uppercase tracking-wider hover:bg-accent transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-accent border-2 border-border-brutal shadow-md p-4 md:p-6 mb-8">
                <p className="text-ink font-bold text-lg md:text-xl leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </header>

            {/* Article Content */}
            <div className="bg-paper-dark border-2 border-border-brutal shadow-lg p-6 md:p-8 mb-12">
              <MarkdownContent content={post.content} />
            </div>

            {/* Article Footer */}
            <footer className="bg-paper border-2 border-border-brutal shadow-md p-6 md:p-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <Link
                  to="/blog"
                  className="btn-brutal-outline text-sm uppercase tracking-wider"
                >
                  {"<"} MORE POSTS
                </Link>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <span className="text-ink font-bold text-sm uppercase tracking-wider">
                    SHARE THIS POST:
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://zennn.dev/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent border border-border-brutal px-3 py-1 text-ink text-xs font-bold uppercase tracking-wider hover:bg-accent-dark transition-colors"
                    >
                      TWITTER
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://zennn.dev/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent border border-border-brutal px-3 py-1 text-ink text-xs font-bold uppercase tracking-wider hover:bg-accent-dark transition-colors"
                    >
                      LINKEDIN
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  )
} 