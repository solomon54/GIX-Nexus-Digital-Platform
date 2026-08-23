// Offline fallback page — served by the service worker when the user is
// offline and no cached version of the requested page is available.
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'You are offline — GIX Nexus',
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(34,211,238,0.1)',
        border: '2px solid rgba(34,211,238,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem',
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"/>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
          <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/>
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
          <line x1="12" y1="20" x2="12.01" y2="20"/>
        </svg>
      </div>

      <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
        You&apos;re offline
      </h1>
      <p className="mt-2 max-w-sm" style={{ color: 'var(--foreground-subtle)' }}>
        No internet connection detected. Please check your connection and try again.
      </p>
      <p className="mt-1 text-sm" style={{ color: 'var(--foreground-subtle)' }} lang="am">
        የኢንተርኔት ግንኙነት የለም። እባክዎ ግንኙነቱን ያረጋግጡ።
      </p>

      <div className="mt-8 flex gap-3 flex-wrap justify-center">
        <Link
          href="/en"
          className="inline-flex items-center min-h-[44px] px-6 py-2 rounded-lg font-medium text-sm transition-colors"
          style={{ background: '#22d3ee', color: '#07111C' }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
