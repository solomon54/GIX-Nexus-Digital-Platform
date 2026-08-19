import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all paths EXCEPT:
  // - /admin and everything under it (Payload CMS)
  // - /api and everything under it (Payload REST API)
  // - Next.js internals (_next, _vercel)
  // - Static files (anything with a file extension)
  matcher: [
    '/((?!admin|api|_next|_vercel|.*\\..*).*)',
  ],
}
