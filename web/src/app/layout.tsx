// Root layout — passthrough only.
// The [locale] layout owns the full <html>/<body> for the public site.
// The (payload) layout group owns its own <html>/<body> for the admin area.
// Having both render <html>/<body> causes hydration mismatches — this is the fix.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
