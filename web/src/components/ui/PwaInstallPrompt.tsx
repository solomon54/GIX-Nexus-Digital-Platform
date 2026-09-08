'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const DISMISSED_COUNT_KEY = 'gix-pwa-dismissed-count'  // increments each dismissal
const DISMISSED_AT_KEY    = 'gix-pwa-dismissed-at'     // timestamp of last dismissal
const VERSION_KEY         = 'gix-pwa-installed-version'
const APP_VERSION         = '1.1.0'
const DISMISS_DELAY_MS    = 3 * 24 * 60 * 60 * 1000  // 3 days between shows
const PERMANENT_AFTER     = 3  // permanently hidden after 3 dismissals

export function PwaInstallPrompt() {
  const [prompt, setPrompt]   = useState<any>(null)
  const [mode, setMode]       = useState<'install' | 'update' | null>(null)
  const [phase, setPhase]     = useState<'idle' | 'installing' | 'done'>('idle')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissCount = parseInt(localStorage.getItem(DISMISSED_COUNT_KEY) ?? '0', 10)
    const dismissedAt  = parseInt(localStorage.getItem(DISMISSED_AT_KEY) ?? '0', 10)
    const isInstalled  = window.matchMedia('(display-mode: standalone)').matches ||
                         (window.navigator as any).standalone === true

    // Already installed — check for updates
    if (isInstalled) {
      const storedVersion = localStorage.getItem(VERSION_KEY)
      if (storedVersion && storedVersion !== APP_VERSION) {
        setMode('update'); setVisible(true)
      } else if (!storedVersion) {
        localStorage.setItem(VERSION_KEY, APP_VERSION)
      }
      return
    }

    // Permanently dismissed after 3 times
    if (dismissCount >= PERMANENT_AFTER) return

    // Dismissed recently — wait 3 days before showing again
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_DELAY_MS) return

    // Wait for browser install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e)
      // Delay showing — don't pop up the moment the page loads
      setTimeout(() => {
        setMode('install')
        setVisible(true)
      }, 8000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!prompt) return
    setPhase('installing')
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      localStorage.setItem(VERSION_KEY, APP_VERSION)
      setPhase('done')
      setTimeout(() => setVisible(false), 2200)
    } else {
      setPhase('idle')
    }
    setPrompt(null)
  }

  const handleDismiss = () => {
    const count = parseInt(localStorage.getItem(DISMISSED_COUNT_KEY) ?? '0', 10) + 1
    localStorage.setItem(DISMISSED_COUNT_KEY, String(count))
    localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()))
    setVisible(false)
  }

  const handleUpdateDismiss = () => {
    localStorage.setItem(VERSION_KEY, APP_VERSION)
    setVisible(false)
  }

  if (!visible || !mode) return null

  return (
    <>
      {/* ── Backdrop — very subtle, non-blocking ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9990,
          background: 'rgba(4,10,30,0.30)',
          backdropFilter: 'blur(2px)',
          pointerEvents: 'none',
          animation: 'pwa-fade-in 400ms ease forwards',
        }}
        aria-hidden="true"
      />

      {/* ── Panel — bottom-centre on mobile, bottom-right on desktop ── */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label={mode === 'install' ? 'Install GIX Nexus app' : 'App update available'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          left: 'auto',
          zIndex: 9991,
          width: '340px',
          maxWidth: 'calc(100vw - 32px)',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(10,24,70,0.96) 0%, rgba(6,14,46,0.98) 100%)',
          border: '1px solid rgba(0,212,255,0.20)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,212,255,0.08), 0 0 40px rgba(0,82,204,0.12)',
          animation: 'pwa-slide-up 420ms cubic-bezier(0.16,1,0.3,1) forwards',
        }}
      >
        <style>{`
          @keyframes pwa-fade-in  { from { opacity:0 } to { opacity:1 } }
          @keyframes pwa-slide-up { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
          @keyframes pwa-spin     { to { transform: rotate(360deg) } }
          @keyframes pwa-check    { from { stroke-dashoffset: 24 } to { stroke-dashoffset: 0 } }
        `}</style>

        {/* ── Top accent line ── */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #00D4FF 0%, #6600FF 100%)' }} />

        <div style={{ padding: '20px' }}>

          {/* ── INSTALL MODE ── */}
          {mode === 'install' && (
            <>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '14px', flexShrink: 0, overflow: 'hidden',
                  border: '1px solid rgba(0,212,255,0.20)',
                  background: 'rgba(0,0,0,0.3)',
                }}>
                  <Image src="/assets/company-logo.png" alt="GIX Nexus" width={52} height={52} className="object-contain w-full h-full p-1" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.3 }}>
                    GIX Nexus
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(180,210,230,0.70)', margin: '2px 0 0', lineHeight: 1.3 }}>
                    Telecom & Engineering Platform
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="10" height="10" viewBox="0 0 10 10" fill="#00D4FF" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0L6.12 3.45H9.76L6.82 5.59L7.94 9.04L5 6.9L2.06 9.04L3.18 5.59L0.24 3.45H3.88L5 0Z"/>
                      </svg>
                    ))}
                    <span style={{ fontSize: '11px', color: 'rgba(180,210,230,0.55)', marginLeft: '2px' }}>Telecom Platform</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDismiss}
                  aria-label="Dismiss — never show again"
                  style={{
                    width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.06)', color: 'rgba(180,210,230,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'background 0.15s',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                {[
                  { icon: '⚡', text: 'Instant access — no browser needed' },
                  { icon: '📱', text: 'Works on any device' },
                  { icon: '🔔', text: 'Get notified about updates' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>{icon}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(200,225,245,0.75)' }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              {phase === 'idle' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={handleInstall}
                    style={{
                      flex: 1, height: '40px', borderRadius: '10px', border: 'none',
                      background: 'linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)',
                      color: '#FFFFFF', fontSize: '13px', fontWeight: 700,
                      cursor: 'pointer', transition: 'opacity 0.15s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Install App
                  </button>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    style={{
                      flex: 1, height: '40px', borderRadius: '10px',
                      border: '1px solid rgba(0,212,255,0.18)',
                      background: 'transparent', color: 'rgba(180,210,230,0.70)',
                      fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    Not Now
                  </button>
                </div>
              )}

              {phase === 'installing' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '40px' }}>
                  <svg style={{ animation: 'pwa-spin 0.8s linear infinite' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2a10 10 0 0 1 10 10" opacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/>
                  </svg>
                  <span style={{ fontSize: '13px', color: 'rgba(200,225,245,0.80)' }}>Installing…</span>
                </div>
              )}

              {phase === 'done' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '40px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C97A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 24, animation: 'pwa-check 400ms ease forwards' }}/>
                  </svg>
                  <span style={{ fontSize: '13px', color: '#00C97A', fontWeight: 600 }}>Installed successfully!</span>
                </div>
              )}

              <p style={{ fontSize: '11px', color: 'rgba(180,210,230,0.35)', textAlign: 'center', marginTop: '12px', lineHeight: 1.4 }}>
                "Not Now" hides this for 3 days
              </p>
            </>
          )}

          {/* ── UPDATE MODE ── */}
          {mode === 'update' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(0,201,122,0.12)',
                  border: '1px solid rgba(0,201,122,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C97A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Update available</p>
                  <p style={{ fontSize: '12px', color: 'rgba(180,210,230,0.65)', margin: '2px 0 0' }}>
                    GIX Nexus v{APP_VERSION} is ready
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleUpdateDismiss}
                  aria-label="Dismiss update"
                  style={{
                    marginLeft: 'auto', width: 28, height: 28, borderRadius: '50%',
                    border: 'none', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(180,210,230,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
                  </svg>
                </button>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => { window.location.reload(); handleUpdateDismiss() }}
                  style={{
                    flex: 1, height: '38px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #00C97A 0%, #0066FF 100%)',
                    color: '#FFFFFF', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Update Now
                </button>
                <button
                  type="button"
                  onClick={handleUpdateDismiss}
                  style={{
                    flex: 1, height: '38px', borderRadius: '10px',
                    border: '1px solid rgba(0,212,255,0.18)',
                    background: 'transparent', color: 'rgba(180,210,230,0.70)',
                    fontSize: '13px', cursor: 'pointer',
                  }}
                >
                  Later
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  )
}
