import Image from 'next/image'
import React from 'react'

// Payload admin panel — full logo shown in the sidebar header
export default function AdminLogo() {
  return (
    <div style={{ padding: '4px 0', display: 'flex', alignItems: 'center' }}>
      <Image
        src="/assets/company-logo.png"
        alt="GIX Nexus"
        width={120}
        height={73}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}
