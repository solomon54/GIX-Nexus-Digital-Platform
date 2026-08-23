'use client'
import React, { Suspense, lazy } from 'react'

const Inner = lazy(() => import('./AvatarInner'))

export default function AdminAvatar() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  )
}
