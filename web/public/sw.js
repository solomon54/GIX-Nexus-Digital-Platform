const CACHE_NAME = 'gix-nexus-v2'

const OFFLINE_PAGES = ['/en/offline', '/am/offline']

const PRECACHE_ASSETS = [
  ...OFFLINE_PAGES,
  '/icon.svg',
  '/assets/company-logo.png',
  '/manifest.json',
]

const OFFLINE_HTML_FALLBACK = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline — GIX Nexus</title><style>*{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#07111C;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:32px;text-align:center}.icon{width:80px;height:80px;border-radius:50%;background:rgba(34,211,238,.1);border:2px solid rgba(34,211,238,.3);display:flex;align-items:center;justify-content:center;margin-bottom:24px}.icon svg{width:36px;height:36px;stroke:#22d3ee;stroke-width:1.5;fill:none;stroke-linecap:round;stroke-linejoin:round}h1{font-size:24px;font-weight:700;margin:0}p{color:#94a3b8;max-width:400px;margin:8px auto 0;line-height:1.5}.btn{margin-top:32px;display:inline-flex;align-items:center;padding:10px 24px;border-radius:8px;background:#22d3ee;color:#07111C;font-weight:600;text-decoration:none;min-height:44px}.meta{color:#64748b;font-size:12px;margin-top:24px}</style></head><body><div class="icon"><svg viewBox="0 0 24 24"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg></div><h1>You're offline</h1><p>No internet connection detected. Please reconnect and try again.</p><p style="font-size:14px;color:#94a3b8">የኢንተርኔት ግንኙነት የለም። እባክዎ ግንኙነቱን ያረጋግጡ።</p><a class="btn" href="/en">Go to home</a><p class="meta">GIX Nexus Telecom and Power</p></body></html>`

function safeHtmlOfflineResponse() {
  return new Response(OFFLINE_HTML_FALLBACK, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_ASSETS.map((url) =>
            cache.add(url).catch(() => {})
          )
        )
      )
      .catch(() => {})
  )
  try { self.skipWaiting() } catch (_) {}
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key).catch(() => false))
        )
      )
      .catch(() => {})
      .then(() => self.clients.claim().catch(() => {}))
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const reqUrl = event.request.url
  if (typeof reqUrl !== 'string') return
  if (!reqUrl.startsWith(self.location.origin)) return

  let url
  try { url = new URL(reqUrl) } catch (_) { return }

  const pn = url.pathname
  if (
    pn.startsWith('/_next/') ||
    pn.startsWith('/api/') ||
    pn.startsWith('/admin')
  ) return

  const isNavigate = event.request.mode === 'navigate'

  event.respondWith(
    Promise.resolve()
      .then(() => fetch(event.request))
      .then((response) => {
        try {
          if (response && response.ok && isNavigate) {
            const clone = response.clone()
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, clone))
              .catch(() => {})
          }
        } catch (_) {}
        return response
      })
      .catch(async () => {
        try {
          const cached = await caches.match(event.request)
          if (cached) return cached
        } catch (_) {}

        if (isNavigate) {
          try {
            const locale = pn && pn.startsWith('/am') ? 'am' : 'en'
            const offlinePage = await caches.match(`/${locale}/offline`)
            if (offlinePage) return offlinePage
          } catch (_) {}

          try { return safeHtmlOfflineResponse() } catch (_) {}
        }

        if (isNavigate) {
          try { return safeHtmlOfflineResponse() } catch (_) {}
        }

        return new Response('', {
          status: 503,
          statusText: 'Service Unavailable',
        })
      })
  )
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    try { self.skipWaiting() } catch (_) {}
  }
})

self.addEventListener('error', (event) => {
  try { event.preventDefault() } catch (_) {}
})

self.addEventListener('unhandledrejection', (event) => {
  try { event.preventDefault() } catch (_) {}
})
