'use client'
import React, { Suspense, lazy } from 'react'

// Lazy-load the inner component so useAuth is only called once the
// Payload client context tree is fully initialised.
const Inner = lazy(() => import('./NavUserCardInner'))

export default function NavUserCard() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  )
}
