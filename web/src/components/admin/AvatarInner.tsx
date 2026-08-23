'use client'
import React from 'react'
import { useAuth } from '@payloadcms/ui'

type UserWithExtras = {
  name?: string
  email?: string
  avatar?: { url?: string }
}

export default function AvatarInner() {
  const { user } = useAuth()
  const u = user as UserWithExtras | null
  const name = u?.name ?? u?.email ?? 'U'
  const avatarUrl = u?.avatar?.url
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%', overflow: 'hidden',
      border: '2px solid rgba(0, 194, 255, 0.4)',
      boxShadow: '0 0 8px rgba(0, 194, 255, 0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #0099CC, #00C2FF)',
      flexShrink: 0, cursor: 'pointer',
    }} title={name}>
      {avatarUrl
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={avatarUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>{initials}</span>
      }
    </div>
  )
}
