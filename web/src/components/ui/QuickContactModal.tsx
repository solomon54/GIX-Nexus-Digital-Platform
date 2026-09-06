'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useContactModal } from '@/context/ContactModalContext'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function QuickContactModal() {
  const { isOpen, close } = useContactModal()

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [state,   setState]   = useState<FormState>('idle')
  const [error,   setError]   = useState('')

  const nameRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameRef.current?.focus(), 50)
    } else {
      // Reset on close
      setState('idle')
      setError('')
      setName('')
      setEmail('')
      setMessage('')
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close()
  }, [close])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state === 'submitting') return
    setState('submitting')
    setError('')

    try {
      const res = await fetch('/api/quick-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (data.success) {
        setState('success')
      } else {
        setState('error')
        setError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setError('Network error. Please check your connection.')
    }
  }

  if (!isOpen) return null

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface-sunken)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '10px 13px',
    fontSize: '14px',
    color: 'var(--foreground)',
    outline: 'none',
    transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
  }

  return (
    /* ── Backdrop ── */
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qcm-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(4, 10, 30, 0.80)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: 'fadeIn 150ms ease',
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        .qcm-input:focus   { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(0,212,255,0.15) !important; }
        .qcm-close:hover   { background: rgba(0,212,255,0.10) !important; color: var(--accent) !important; }
      `}</style>

      {/* ── Panel ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: '16px',
          background: 'linear-gradient(145deg, rgba(14,34,92,0.98) 0%, rgba(8,20,60,0.98) 100%)',
          border: '1px solid rgba(0,212,255,0.22)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.70), 0 0 0 1px rgba(0,212,255,0.10)',
          overflow: 'hidden',
          animation: 'fadeIn 180ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 22px 16px',
          borderBottom: '1px solid rgba(0,212,255,0.10)',
          background: 'rgba(0,212,255,0.04)',
        }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '2px' }}>
              GIX Nexus Telecom and Power
            </p>
            <h2 id="qcm-title" style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              Send us a message
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="qcm-close"
            style={{
              width: 32, height: 32, borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: 'transparent', color: 'var(--foreground-sub)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, color 0.15s', flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '22px' }}>

          {/* ── Success state ── */}
          {state === 'success' ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', margin: '0 auto 16px',
                background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>Message Sent!</p>
              <p style={{ fontSize: '14px', color: 'var(--foreground-muted)', marginBottom: '20px' }}>
                We received your message and will respond within 2 business days.
              </p>
              <button
                type="button"
                onClick={close}
                className="btn-primary"
                style={{ fontSize: '13px', padding: '8px 24px' }}
              >
                Close
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div style={{
                  background: 'rgba(216,58,58,0.10)', border: '1px solid rgba(216,58,58,0.30)',
                  borderRadius: '8px', padding: '10px 14px', marginBottom: '16px',
                  fontSize: '13px', color: '#F87171',
                }}>
                  {error}
                </div>
              )}

              {/* Name */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--foreground-sub)', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Bekele Haile"
                  required
                  disabled={state === 'submitting'}
                  className="qcm-input"
                  style={inputStyle}
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--foreground-sub)', marginBottom: '6px' }}>
                  Your Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@organisation.com"
                  required
                  disabled={state === 'submitting'}
                  className="qcm-input"
                  style={inputStyle}
                  autoComplete="email"
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--foreground-sub)', marginBottom: '6px' }}>
                  Message *
                  <span style={{ fontWeight: 400, textTransform: 'none', marginLeft: '6px', opacity: 0.6 }}>
                    ({message.length}/2000)
                  </span>
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us about your project or ask a question..."
                  required
                  rows={4}
                  disabled={state === 'submitting'}
                  className="qcm-input"
                  maxLength={2000}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '96px' }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="btn-primary"
                  style={{ fontSize: '14px', padding: '9px 24px', flex: 1, justifyContent: 'center', opacity: state === 'submitting' ? 0.7 : 1, cursor: state === 'submitting' ? 'not-allowed' : 'pointer' }}
                >
                  {state === 'submitting' ? (
                    <>
                      <svg className="animate-spin" style={{ marginRight: '8px', width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending…
                    </>
                  ) : 'Send Message →'}
                </button>
                <button
                  type="button"
                  onClick={close}
                  style={{
                    padding: '9px 16px', borderRadius: '8px', fontSize: '13px',
                    border: '1px solid var(--border)', color: 'var(--foreground-sub)',
                    background: 'transparent', cursor: 'pointer',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                >
                  Cancel
                </button>
              </div>

              <p style={{ marginTop: '14px', fontSize: '11px', color: 'var(--foreground-faint)', textAlign: 'center' }}>
                Or call us directly: <a href="tel:+251911509555" style={{ color: 'var(--accent)' }}>+251 911 509 555</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
