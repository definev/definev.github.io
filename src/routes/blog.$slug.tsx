import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

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
        title: 'Welcome to My Blog',
        excerpt: 'This is the first post on my technical blog where I\'ll share insights about software development, programming, and technology.',
        content: `
# Welcome to My Blog

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

Thank you for reading, and I look forward to sharing more content with you soon!
        `,
        date: '2024-01-15',
        slug: 'welcome-to-my-blog',
        tags: ['introduction', 'blog', 'welcome'],
        readTime: 3,
      },
      {
        id: '2',
        title: 'Building Modern React Applications with TanStack',
        excerpt: 'Exploring the power of TanStack ecosystem for building robust, type-safe React applications with excellent developer experience.',
        content: `
# Building Modern React Applications with TanStack

The TanStack ecosystem has revolutionized how we build React applications. In this post, I'll explore the key components and why they're game-changers for modern web development.

## What is TanStack?

TanStack is a collection of high-quality, type-safe libraries for building modern web applications. The ecosystem includes:

- **TanStack Router**: Type-safe routing for React applications
- **TanStack Query**: Data fetching and state management
- **TanStack Table**: Powerful data grid component
- **TanStack Start**: Full-stack React framework

## Why Choose TanStack?

### 1. Type Safety First

Everything in TanStack is designed with TypeScript in mind. You get:

- Fully inferred types
- Compile-time error checking
- Excellent IDE support
- Reduced runtime errors

### 2. Developer Experience

The DX is exceptional:

- Intuitive APIs
- Excellent documentation
- Rich debugging tools
- Active community support

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

## Conclusion

TanStack provides a comprehensive solution for building modern React applications. The combination of type safety, developer experience, and performance makes it an excellent choice for any React project.

Give it a try in your next project - you won't be disappointed!
        `,
        date: '2024-01-10',
        slug: 'building-modern-react-applications-with-tanstack',
        tags: ['react', 'tanstack', 'typescript', 'web development'],
        readTime: 5,
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
  meta: ({ loaderData }) => [
    {
      title: `${loaderData.post.title} - Bùi Đại Dương (Zennn.mind)`,
    },
    {
      name: 'description',
      content: loaderData.post.excerpt,
    },
    {
      name: 'keywords',
      content: loaderData.post.tags.join(', '),
    },
  ],
})

function BlogPost() {
  const { post } = Route.useLoaderData()

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center text-slate-400 text-sm mb-4">
          <time>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      
      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: post.content
              .replace(/\n\n/g, '</p><p>')
              .replace(/\n/g, '<br/>')
              .replace(/^/, '<p>')
              .replace(/$/, '</p>')
              .replace(/# (.*)/g, '<h1>$1</h1>')
              .replace(/## (.*)/g, '<h2>$1</h2>')
              .replace(/### (.*)/g, '<h3>$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/`(.*?)`/g, '<code>$1</code>')
              .replace(/```tsx\n(.*?)\n```/gs, '<pre><code class="language-tsx">$1</code></pre>')
              .replace(/```(.*?)\n(.*?)\n```/gs, '<pre><code class="language-$1">$2</code></pre>')
              .replace(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
          }}
        />
      </div>
      
      <footer className="mt-8 pt-8 border-t border-slate-700">
        <div className="flex justify-between items-center">
          <Link
            to="/blog"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Blog
          </Link>
          
          <div className="text-slate-400 text-sm">
            Share this post on social media
          </div>
        </div>
      </footer>
    </article>
  )
} 