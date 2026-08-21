import React from 'react'
import '@/styles/payloadStyles.css'

// Payload CMS admin layout — isolated from the public site layout.
// Does NOT include locale providers, navigation, or footer.
// Tailwind is imported via payloadStyles.css (no preflight, safe for Payload admin).
export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
