// Root-level not-found — rendered when Next.js can't match any route.
// Must include <html> and <body> because the root layout is a passthrough
// and doesn't provide them.
import Link from 'next/link'

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: '#07111C',
        color: '#e2e8f0',
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '0 24px',
      }}>
        <p style={{ fontSize: '5rem', fontWeight: 800, color: '#22d3ee', margin: 0, lineHeight: 1 }}>404</p>
        <h1 style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>Page not found</h1>
        <p style={{ marginTop: '0.5rem', color: '#94a3b8', maxWidth: 400 }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#94a3b8' }} lang="am">
          የሚፈልጉት ገጽ አልተገኘም
        </p>
        <Link
          href="/en"
          style={{
            marginTop: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: 44,
            padding: '10px 24px',
            borderRadius: 8,
            background: '#22d3ee',
            color: '#07111C',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
      </body>
    </html>
  )
}
