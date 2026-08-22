'use client'
import React from 'react'
import { useAuth } from '@payloadcms/ui'

// Shows user's avatar photo in the bottom-left of the admin nav.
// Falls back to initials if no photo is uploaded.
export default function AdminAvatar() {
  const { user } = useAuth()

  const name = (user as { name?: string })?.name ?? (user as { email?: string })?.email ?? 'U'
  const avatar = (user as { avatar?: { url?: string } })?.avatar

  const initials = name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid rgba(0, 194, 255, 0.4)',
        boxShadow: '0 0 8px rgba(0, 194, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: avatar?.url ? 'transparent' : 'linear-gradient(135deg, #0099CC, #00C2FF)',
        flexShrink: 0,
        cursor: 'pointer',
      }}
      title={name}
    >
      {avatar?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar.url}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span
          style={{
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {initials}
        </span>
      )}
    </div>
  )
}
