import Image from 'next/image'
import React from 'react'

// Payload admin panel — small icon shown in collapsed sidebar and browser tab bar
export default function AdminIcon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        background: '#0a1628',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <Image
        src="/assets/company-logo.png"
        alt="GIX"
        width={28}
        height={17}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}
