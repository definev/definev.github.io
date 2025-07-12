import { Link } from '@tanstack/react-router'
import { Button } from './Button'

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="w-full">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 