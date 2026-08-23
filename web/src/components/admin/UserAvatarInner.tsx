'use client'
import React from 'react'
import { useAuth } from '@payloadcms/ui'

type UserWithExtras = {
  name?: string
  email?: string
  avatar?: { url?: string; thumbnailURL?: string }
}

export default function UserAvatarInner() {
  const { user } = useAuth()
  const u = user as UserWithExtras | null
  const name = u?.name ?? u?.email ?? 'U'
  const avatarUrl = u?.avatar?.thumbnailURL ?? u?.avatar?.url
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%', overflow: 'hidden',
      border: '2px solid rgba(34,211,238,0.5)',
      boxShadow: '0 0 10px rgba(34,211,238,0.25)',
      background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #0891b2, #22d3ee)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'all 0.2s',
    }}>
      {avatarUrl
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={avatarUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>{initials}</span>
      }
    </div>
  )
}
