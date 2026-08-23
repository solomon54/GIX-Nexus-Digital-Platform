'use client'
import React, { Suspense, lazy } from 'react'

const Inner = lazy(() => import('./UserAvatarInner'))

export default function UserAvatar() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  )
}
