'use client'
import React from 'react'
import { useAuth } from '@payloadcms/ui'

/**
 * AvatarInner — renders the logged-in user's profile photo (or initials).
 *
 * Payload's useAuth() returns the user with `avatar` depth-populated as a
 * Media object { url, thumbnailURL, ... } when a photo has been uploaded.
 * We handle three cases:
 *   1. avatar is a Media object with url/thumbnailURL → show the photo
 *   2. avatar is a number (ID only, not populated) → show initials
 *   3. avatar is null / undefined → show initials
 */

interface MediaObject {
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
}

type AvatarField = number | null | MediaObject

interface UserWithAvatar {
  name?: string | null
  email?: string | null
  avatar?: AvatarField
}

function resolveAvatarUrl(avatar: AvatarField | undefined): string | null {
  if (!avatar || typeof avatar === 'number') return null
  // Media object
  const m = avatar as MediaObject
  return m.thumbnailURL ?? m.url ?? null
}

export default function AvatarInner() {
  const { user } = useAuth()
  const u = user as UserWithAvatar | null

  const name = u?.name ?? u?.email ?? 'U'
  const avatarUrl = resolveAvatarUrl(u?.avatar)
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U'

  return (
    <div
      title={name}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid rgba(0, 212, 255, 0.55)',
        boxShadow: '0 0 12px rgba(0, 212, 255, 0.30)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: avatarUrl
          ? 'transparent'
          : 'linear-gradient(135deg, #0077cc 0%, #00d4ff 100%)',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <span
          style={{
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {initials}
        </span>
      )}
    </div>
  )
}
