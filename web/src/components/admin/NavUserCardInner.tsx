'use client'
import React from 'react'
import { useAuth } from '@payloadcms/ui'
import Link from 'next/link'

type UserWithExtras = {
  name?: string
  email?: string
  role?: string
  avatar?: { url?: string }
}

// Rendered only after Payload's React context is ready (lazy-loaded via NavUserCard.tsx)
export default function NavUserCardInner() {
  const { user } = useAuth()
  const u = user as UserWithExtras | null

  if (!u) return null

  const name = u.name ?? u.email ?? 'User'
  const role = u.role ?? 'editor'
  const avatarUrl = u.avatar?.url
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  const roleColors: Record<string, string> = {
    admin: '#00C2FF',
    editor: '#10b981',
    reviewer: '#f59e0b',
  }
  const roleColor = roleColors[role] ?? '#6b7280'

  return (
    <Link
      href="/admin/account"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 16px',
        margin: '8px 8px 0',
        borderRadius: 10,
        border: '1px solid rgba(0, 194, 255, 0.1)',
        background: 'rgba(0, 194, 255, 0.04)',
        textDecoration: 'none',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0, 194, 255, 0.1)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 194, 255, 0.3)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0, 194, 255, 0.04)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 194, 255, 0.1)'
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        border: `2px solid ${roleColor}`, overflow: 'hidden', flexShrink: 0,
        background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #0099CC, #00C2FF)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 8px ${roleColor}40`,
      }}>
        {avatarUrl
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={avatarUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{initials}</span>
        }
      </div>

      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{ color: '#ddeeff', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </div>
        <div style={{ color: roleColor, fontSize: 11, fontWeight: 600, textTransform: 'capitalize', letterSpacing: '0.04em', marginTop: 1 }}>
          {role}
        </div>
      </div>

      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,194,255,0.4)" strokeWidth="2" strokeLinecap="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    </Link>
  )
}
