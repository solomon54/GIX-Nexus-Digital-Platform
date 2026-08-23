/**
 * GIX Nexus Service Worker
 * Strategy: Network-first with offline fallback
 */

const CACHE_NAME = 'gix-nexus-v1'

// Offline fallback pages (one per locale)
const OFFLINE_PAGES = ['/en/offline', '/am/offline']

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
  ...OFFLINE_PAGES,
  '/icon.svg',
  '/assets/company-logo.png',
  '/manifest.json',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Add assets one by one — don't let a single failure block all caching
      Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch(() => {})
        )
      )
    )
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  if (!event.request.url.startsWith(self.location.origin)) return

  const url = new URL(event.request.url)

  // Never intercept: Next.js internals, API, admin
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/admin')
  ) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful HTML page responses
        if (response.ok && event.request.mode === 'navigate') {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) =>
            cache.put(event.request, clone)
          )
        }
        return response
      })
      .catch(async () => {
        // Offline — try exact cache match first
        const cached = await caches.match(event.request)
        if (cached) return cached

        // For navigation, show locale-appropriate offline page
        if (event.request.mode === 'navigate') {
          const locale = url.pathname.startsWith('/am') ? 'am' : 'en'
          const offlinePage = await caches.match(`/${locale}/offline`)
          if (offlinePage) return offlinePage
        }

        return new Response('Offline', { status: 503 })
      })
  )
})
