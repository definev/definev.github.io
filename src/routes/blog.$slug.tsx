import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import FloatingNavbar from '~/components/FloatingNavbar'
import MarkdownContent from '~/components/MarkdownContent'

// Type definition for blog post with content
interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  slug: string
  tags: string[]
  readTime: number
}

// Server function to get a single blog post by slug
const getPostBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    // This is a placeholder - in the future, you would:
    // 1. Read from a content management system
    // 2. Parse markdown files from a directory
    // 3. Fetch from a database
    // 4. Use a headless CMS

    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Building Modern React Applications with TanStack',
        excerpt: 'Exploring the power of TanStack ecosystem for building robust, type-safe React applications with excellent developer experience.',
        content: `# Building Modern React Applications with TanStack

The TanStack ecosystem has revolutionized how we build React applications. In this post, I'll explore the key components and why they're game-changers for modern web development.

## What is TanStack?

TanStack is a collection of high-quality, type-safe libraries for building modern web applications. The ecosystem includes:

- **TanStack Router**: Type-safe routing for React applications
- **TanStack Query**: Data fetching and state management
- **TanStack Table**: Powerful data grid component
- **TanStack Start**: Full-stack React framework

## Feature Comparison

| Library | Type Safety | Bundle Size | Learning Curve |
|---------|-------------|-------------|---------------|
| TanStack Query | ⭐⭐⭐⭐⭐ | Small | Easy |
| TanStack Router | ⭐⭐⭐⭐⭐ | Medium | Moderate |
| TanStack Table | ⭐⭐⭐⭐⭐ | Large | Advanced |

## Why Choose TanStack?

### 1. Type Safety First

Everything in TanStack is designed with TypeScript in mind. You get:

- [x] Fully inferred types
- [x] Compile-time error checking
- [x] Excellent IDE support
- [x] Reduced runtime errors

### 2. Developer Experience

The DX is exceptional:

- [ ] ~Poor documentation~ (**Actually excellent!**)
- [x] Intuitive APIs
- [x] Rich debugging tools
- [x] Active community support

### 3. Performance

TanStack libraries are optimized for:

- Minimal bundle size
- Efficient rendering
- Smart caching strategies
- Optimistic updates

## Getting Started

Here's a simple example of using TanStack Query:

\`\`\`tsx
import { useQuery } from '@tanstack/react-query'

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>Hello, {data.name}!</div>
}
\`\`\`

> **Pro Tip**: Always use TypeScript with TanStack libraries for the best developer experience!

## Conclusion

TanStack provides a comprehensive solution for building modern React applications. The combination of type safety, developer experience, and performance makes it an excellent choice for any React project.

Give it a try in your next project - you won't be disappointed!`,
        date: '2025-07-13',
        slug: 'building-modern-react-applications-with-tanstack',
        tags: ['react', 'tanstack', 'typescript', 'web development'],
        readTime: 5,
      },
      {
        id: '2',
        title: 'Welcome to My Blog',
        excerpt: 'This is the first post on my technical blog where I\'ll share insights about software development, programming, and technology.',
        content: `# Welcome to My Blog

This is the first post on my technical blog where I'll share insights about software development, programming, and technology.

## About This Blog

I'm excited to start this journey of sharing knowledge and experiences from my work as a full-stack developer. Here you'll find:

- **Technical tutorials** on modern web development
- **Insights** from real-world projects
- **Best practices** for building scalable applications
- **Tools and frameworks** that I love working with

## What's Coming Next

I have several exciting topics planned:

1. Building modern React applications with TanStack
2. Mobile development with Flutter
3. Backend development with Golang
4. Cloud deployment strategies
5. And much more!

## Stay Connected

I encourage you to reach out if you have questions, suggestions, or just want to connect. You can find me on:

- **GitHub**: [github.com/definev](https://github.com/definev)
- **LinkedIn**: [linkedin.com/in/definev](https://linkedin.com/in/definev)
- **Twitter**: [@definev2](https://twitter.com/definev2)

Thank you for reading, and I look forward to sharing more content with you soon!`,
        date: '2025-07-13',
        slug: 'welcome-to-my-blog',
        tags: ['introduction', 'blog', 'welcome'],
        readTime: 3,
      },
    ]

    const post = mockPosts.find(p => p.slug === slug)
    if (!post) {
      throw notFound()
    }

    return post
  })

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  loader: async ({ params }) => {
    const post = await getPostBySlug({ data: params.slug })
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