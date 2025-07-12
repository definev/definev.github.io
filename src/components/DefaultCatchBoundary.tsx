import {
  ErrorComponent,
  ErrorComponentProps,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import { Button } from './Button'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  console.error(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but something unexpected happened. Please try again.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => {
                router.invalidate()
              }}
              className="w-full"
            >
              Try Again
            </Button>
            {isRoot ? (
              <Button
                onClick={() => {
                  router.navigate({ to: '/' })
                }}
                variant="outline"
                className="w-full"
              >
                Go Home
              </Button>
            ) : (
              <Link
                to="/"
                className="block w-full"
              >
                <Button variant="outline" className="w-full">
                  Go Home
                </Button>
              </Link>
            )}
          </div>
        </div>
        <details className="mt-6 p-4 bg-gray-50 rounded border">
          <summary className="cursor-pointer text-sm text-gray-600 font-medium">
            Error Details
          </summary>
          <ErrorComponent error={error} />
        </details>
      </div>
    </div>
  )
} 