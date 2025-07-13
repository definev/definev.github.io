import { createFileRoute, Outlet } from '@tanstack/react-router'
import FloatingNavbar from '~/components/FloatingNavbar'

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
  head: () => ({
    meta: [
      {
        title: 'Blog - Bùi Đại Dương (Zennn.mind)',
      },
      {
        name: 'description',
        content: 'Technical blog posts about software development, programming, and technology insights.',
      },
    ],
  }),
})

function BlogLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
} 