import React from 'react'

// Payload CMS admin layout — isolated from the public site layout.
// Does NOT include locale providers, navigation, or footer.
export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
