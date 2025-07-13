/**
 * Configuration utilities for environment-specific settings
 */

export interface AppConfig {
  baseUrl: string
  isDevelopment: boolean
  isProduction: boolean
}

/**
 * Get the base URL for the application
 */
export function getBaseUrl(): string {
  // Check for environment variable first
  if (typeof window !== 'undefined') {
    // Client-side
    const envUrl = import.meta.env.VITE_APP_URL
    if (envUrl) {
      return envUrl
    }
  } else {
    // Server-side
    const envUrl = process.env.VITE_APP_URL
    if (envUrl) {
      return envUrl
    }
  }

  // Development defaults
  if (typeof window !== 'undefined') {
    // Client-side: use current origin
    return window.location.origin
  } else {
    // Server-side development default
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000'
    }
    
    // Production fallback - this should be set via environment variables
    return 'https://definev.github.io'
  }
}

/**
 * Get environment information
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  if (typeof window !== 'undefined') {
    // Client-side
    const env = import.meta.env.MODE
    return env === 'development' ? 'development' : 'production'
  } else {
    // Server-side
    return (process.env.NODE_ENV as any) || 'development'
  }
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development'
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production'
}

/**
 * Get full application configuration
 */
export function getAppConfig(): AppConfig {
  const baseUrl = getBaseUrl()
  const env = getEnvironment()
  
  return {
    baseUrl,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
  }
}

/**
 * Build a full URL from a path
 */
export function buildUrl(path: string): string {
  const baseUrl = getBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
} 