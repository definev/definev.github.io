import {
  Outlet,
  createRootRoute,
  Scripts,
  HeadContent,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import '../styles/globals.css'

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </QueryClientProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
})

export const Route = createRootRoute({
  head(ctx) {
    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: 'Bùi Đại Dương (Zennn.mind) - Software Engineer',
        },
        {
          name: 'description',
          content: 'Full-stack developer passionate about building great user experiences with modern technologies.',
        },
        {
          name: 'keywords',
          content: 'software engineer, full-stack developer, React, Flutter, Golang, TypeScript, mobile development',
        },
      ],
      links: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: "anonymous" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
      ]
    }
  },
  component: RootComponent,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
}) 