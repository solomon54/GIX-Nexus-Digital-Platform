'use client'

import { useState, useCallback } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FieldErrors {
  contactName?: string
  organisation?: string
  email?: string
  phone?: string
  serviceType?: string
  message?: string
}

interface FormData {
  contactName: string
  jobTitle: string
  organisation: string
  sector: string
  email: string
  phone: string
  serviceType: string
  location: string
  timeline: string
  message: string
}

const INITIAL: FormData = {
  contactName: '', jobTitle: '', organisation: '', sector: '',
  email: '', phone: '', serviceType: '', location: '', timeline: '', message: '',
}

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service...' },
  { value: 'telecom-infrastructure', label: 'Telecommunications Infrastructure' },
  { value: 'fiber-optic', label: 'Fiber Optic Solutions' },
  { value: 'satellite-wireless', label: 'Satellite & Wireless Communications' },
  { value: 'network-infrastructure', label: 'Network Infrastructure' },
  { value: 'telecom-power', label: 'Telecom Power Systems' },
  { value: 'maintenance', label: 'Maintenance & Technical Support' },
  { value: 'multiple', label: 'Multiple Services' },
  { value: 'general', label: 'General Inquiry' },
]

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select timeline...' },
  { value: 'urgent', label: 'Immediately / Urgent' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1–3 months' },
  { value: '3-6-months', label: '3–6 months' },
  { value: 'planning', label: 'Planning stage only' },
]

// Input field styles
const inputBase: React.CSSProperties = {
  width: '100%',
  borderRadius: '10px',
  border: '1px solid var(--border)',
  background: 'var(--background)',
  color: 'var(--foreground)',
  padding: '11px 14px',
  fontSize: '14px',
  lineHeight: '1.5',
  outline: 'none',
  transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
}
const inputError: React.CSSProperties = {
  ...inputBase,
  borderColor: '#D83A3A',
  boxShadow: '0 0 0 3px rgba(216,58,58,0.10)',
}

export function InquiryForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [state, setState] = useState<FormState>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [serverMessage, setServerMessage] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const update = useCallback((field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear field error as user types
    if (fieldErrors[field as keyof FieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [fieldErrors])

  const focusStyle = (name: string): React.CSSProperties => ({
    ...(fieldErrors[name as keyof FieldErrors] ? inputError : inputBase),
    ...(focusedField === name ? { borderColor: '#008CFF', boxShadow: '0 0 0 3px rgba(0,140,255,0.12)' } : {}),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state === 'submitting') return

    setState('submitting')
    setFieldErrors({})
    setServerMessage('')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (data.success) {
        setState('success')
        setServerMessage(data.message)
        setForm(INITIAL)
      } else if (data.fieldErrors) {
        setState('idle')
        setFieldErrors(data.fieldErrors)
        setServerMessage(data.error ?? 'Please correct the highlighted fields.')
      } else {
        setState('error')
        setServerMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setServerMessage('Network error. Please check your connection and try again.')
    }
  }

  // ── Success state ────────────────────────────────────────────
  if (state === 'success') {
    return (
      <div className="rounded-2xl border p-10 text-center" style={{ background: 'var(--surface)', borderColor: 'rgba(101,213,26,0.3)' }}>
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(101,213,26,0.12)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#65D51A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Inquiry Received</h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--foreground-subtle)' }}>{serverMessage}</p>
        <p className="text-xs" style={{ color: 'var(--foreground-subtle)' }}>
          You can also reach us directly at{' '}
          <a href="mailto:gixnexustelecom@gmail.com" className="text-[#008CFF] hover:underline">
            gixnexustelecom@gmail.com
          </a>
        </p>
        <button
          type="button"
          onClick={() => { setState('idle'); setServerMessage('') }}
          className="mt-6 inline-flex min-h-[40px] items-center rounded-lg border px-5 py-2 text-sm font-medium transition-colors hover:bg-[#008CFF]/8"
          style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>

        {/* Form header */}
        <div className="px-7 py-6 border-b" style={{ borderColor: 'var(--border)', background: 'var(--soft-surface)' }}>
          <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Submit a Service Inquiry</h3>
          <p className="mt-1 text-sm" style={{ color: 'var(--foreground-subtle)' }}>
            Fill in your details and we will respond within 2 business days. All fields marked * are required.
          </p>
        </div>

        <div className="px-7 py-6 space-y-6">

          {/* Error banner */}
          {state === 'error' && (
            <div className="rounded-xl border p-4 flex items-start gap-3" style={{ background: 'rgba(216,58,58,0.06)', borderColor: 'rgba(216,58,58,0.3)' }}>
              <span className="text-lg flex-shrink-0">⚠️</span>
              <p className="text-sm" style={{ color: '#D83A3A' }}>{serverMessage}</p>
            </div>
          )}
          {state === 'idle' && serverMessage && (
            <div className="rounded-xl border p-4" style={{ background: 'rgba(216,58,58,0.06)', borderColor: 'rgba(216,58,58,0.3)' }}>
              <p className="text-sm" style={{ color: '#D83A3A' }}>{serverMessage}</p>
            </div>
          )}

          {/* Row 1: Name + Job Title */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
                Full Name *
              </label>
              <input
                type="text"
                value={form.contactName}
                onChange={e => update('contactName', e.target.value)}
                onFocus={() => setFocusedField('contactName')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Bekele Haile"
                autoComplete="name"
                disabled={state === 'submitting'}
                style={focusStyle('contactName')}
                aria-invalid={!!fieldErrors.contactName}
                aria-describedby={fieldErrors.contactName ? 'err-name' : undefined}
              />
              {fieldErrors.contactName && (
                <p id="err-name" className="mt-1.5 text-xs" style={{ color: '#D83A3A' }}>{fieldErrors.contactName}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
                Job Title
              </label>
              <input
                type="text"
                value={form.jobTitle}
                onChange={e => update('jobTitle', e.target.value)}
                onFocus={() => setFocusedField('jobTitle')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Head of IT"
                autoComplete="organization-title"
                disabled={state === 'submitting'}
                style={focusStyle('jobTitle')}
              />
            </div>
          </div>

          {/* Row 2: Organisation + Sector */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
                Organisation *
              </label>
              <input
                type="text"
                value={form.organisation}
                onChange={e => update('organisation', e.target.value)}
                onFocus={() => setFocusedField('organisation')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Ethio Telecom"
                autoComplete="organization"
                disabled={state === 'submitting'}
                style={focusStyle('organisation')}
                aria-invalid={!!fieldErrors.organisation}
                aria-describedby={fieldErrors.organisation ? 'err-org' : undefined}
              />
              {fieldErrors.organisation && (
                <p id="err-org" className="mt-1.5 text-xs" style={{ color: '#D83A3A' }}>{fieldErrors.organisation}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
                Sector
              </label>
              <input
                type="text"
                value={form.sector}
                onChange={e => update('sector', e.target.value)}
                onFocus={() => setFocusedField('sector')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Government / Telecom Operator"
                disabled={state === 'submitting'}
                style={focusStyle('sector')}
              />
            </div>
          </div>

          {/* Row 3: Email + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
                Email Address *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="you@organisation.com"
                autoComplete="email"
                disabled={state === 'submitting'}
                style={focusStyle('email')}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'err-email' : undefined}
              />
              {fieldErrors.email && (
                <p id="err-email" className="mt-1.5 text-xs" style={{ color: '#D83A3A' }}>{fieldErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder="+251 9XX XXX XXX"
                autoComplete="tel"
                disabled={state === 'submitting'}
                style={focusStyle('phone')}
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
              />
              {fieldErrors.phone && (
                <p id="err-phone" className="mt-1.5 text-xs" style={{ color: '#D83A3A' }}>{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Row 4: Service Type + Location */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
                Service Required *
              </label>
              <select
                value={form.serviceType}
                onChange={e => update('serviceType', e.target.value)}
                onFocus={() => setFocusedField('serviceType')}
                onBlur={() => setFocusedField(null)}
                disabled={state === 'submitting'}
                style={focusStyle('serviceType')}
                aria-invalid={!!fieldErrors.serviceType}
                aria-describedby={fieldErrors.serviceType ? 'err-service' : undefined}
              >
                {SERVICE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                ))}
              </select>
              {fieldErrors.serviceType && (
                <p id="err-service" className="mt-1.5 text-xs" style={{ color: '#D83A3A' }}>{fieldErrors.serviceType}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
                Project Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={e => update('location', e.target.value)}
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Addis Ababa / Across Ethiopia"
                disabled={state === 'submitting'}
                style={focusStyle('location')}
              />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
              Expected Timeline
            </label>
            <select
              value={form.timeline}
              onChange={e => update('timeline', e.target.value)}
              onFocus={() => setFocusedField('timeline')}
              onBlur={() => setFocusedField(null)}
              disabled={state === 'submitting'}
              style={focusStyle('timeline')}
            >
              {TIMELINE_OPTIONS.map(o => (
                <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>
              Project Details / Message
              <span className="ml-2 font-normal normal-case" style={{ color: 'var(--foreground-subtle)' }}>
                ({form.message.length}/2000)
              </span>
            </label>
            <textarea
              value={form.message}
              onChange={e => update('message', e.target.value)}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={4}
              placeholder="Describe your project requirements, scope, or any specific questions..."
              disabled={state === 'submitting'}
              style={{ ...focusStyle('message'), resize: 'vertical', minHeight: '100px' }}
              maxLength={2000}
              aria-invalid={!!fieldErrors.message}
            />
            {fieldErrors.message && (
              <p className="mt-1.5 text-xs" style={{ color: '#D83A3A' }}>{fieldErrors.message}</p>
            )}
          </div>

          {/* Privacy note */}
          <p className="text-xs" style={{ color: 'var(--foreground-subtle)' }}>
            Your information is used solely to respond to your inquiry. We do not share your details with third parties.
          </p>
        </div>

        {/* Submit bar */}
        <div className="px-7 py-5 border-t flex items-center justify-between gap-4" style={{ borderColor: 'var(--border)', background: 'var(--soft-surface)' }}>
          <p className="text-xs" style={{ color: 'var(--foreground-subtle)' }}>
            Or contact us directly:{' '}
            <a href="tel:+251911509555" className="text-[#008CFF] hover:underline font-medium">+251 911 509 555</a>
          </p>
          <button
            type="submit"
            disabled={state === 'submitting'}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-8 py-2.5 text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2"
            style={{
              background: state === 'submitting' ? '#465463' : '#008CFF',
              cursor: state === 'submitting' ? 'not-allowed' : 'pointer',
            }}
          >
            {state === 'submitting' ? (
              <>
                <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting…
              </>
            ) : (
              'Submit Inquiry →'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
