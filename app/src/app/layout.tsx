// Root layout — must render <html> and <body> for Next.js App Router.
// The [locale] layout handles the actual page wrapper with providers.
// The (payload) layout group handles the CMS admin area.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
