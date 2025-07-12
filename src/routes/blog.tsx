import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
  meta: () => [
    {
      title: 'Blog - Bùi Đại Dương (Zennn.mind)',
    },
    {
      name: 'description',
      content: 'Technical blog posts about software development, programming, and technology insights.',
    },
  ],
})

function BlogLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link to="/" className="text-white hover:text-blue-300 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">Blog</h1>
          <p className="text-slate-300 mt-2">
            Thoughts on technology, programming, and software development
          </p>
        </header>
        <Outlet />
      </div>
    </div>
  )
} 