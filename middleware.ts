import { NextResponse } from 'next/server'

export function middleware() {
  const response = NextResponse.next()

  // Basic security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Content Security Policy - configured for your portfolio
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline/eval
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Tailwind + Google Fonts
    "img-src 'self' data: https: blob:", // Allow images from any HTTPS source
    "font-src 'self' https://fonts.gstatic.com data:", // Google Fonts
    "connect-src 'self' https://vitals.vercel-insights.com", // Vercel analytics
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'block-all-mixed-content',
    'upgrade-insecure-requests',
  ].join('; ')

  response.headers.set('Content-Security-Policy', csp)

  // Permissions Policy (formerly Feature Policy)
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()', // Disable FLoC
    'payment=()',
    'usb=()',
  ].join(', ')

  response.headers.set('Permissions-Policy', permissionsPolicy)

  // Additional security headers
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none') // Portfolio needs to be embeddable
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups') // Allow mailto links
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin') // Allow cross-origin requests for assets

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)$).*)',
  ],
}
