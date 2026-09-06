import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Rate limiting — simple in-memory store (per-process, dev only)
// In production, use Redis or Upstash
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3       // max submissions per window
const RATE_WINDOW = 60_000 // 1 minute window

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// Field validation
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function validatePhone(phone: string): boolean {
  // Allow Ethiopian +251 and international formats
  return /^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone.trim())
}

// ── Send notification email via Resend HTTP API ──────────────
// No SDK needed — plain fetch to Resend REST endpoint.
// INQUIRY_NOTIFY_EMAIL env var = who receives the notification.
// Change it in Dokploy without touching code.
async function sendInquiryNotification(data: {
  contactName: string
  organisation: string
  email: string
  phone: string
  serviceType: string
  location: string
  timeline: string
  message: string
  jobTitle: string
  sector: string
  submittedAt: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM_ADDRESS ?? 'onboarding@resend.dev'
  const fromName = process.env.RESEND_FROM_NAME ?? 'GIX Nexus'
  const notifyEmail = process.env.INQUIRY_NOTIFY_EMAIL ?? 'gixnexustelecom@gmail.com'

  if (!apiKey) {
    console.warn('[Inquiry] RESEND_API_KEY not set — skipping email notification')
    return
  }

  const serviceLabels: Record<string, string> = {
    'telecom-infrastructure': 'Telecommunications Infrastructure',
    'fiber-optic': 'Fiber Optic Solutions',
    'satellite-wireless': 'Satellite & Wireless Communications',
    'network-infrastructure': 'Network Infrastructure',
    'telecom-power': 'Telecom Power Systems',
    'maintenance': 'Maintenance & Technical Support',
    'multiple': 'Multiple Services',
    'general': 'General Inquiry',
  }

  const timelineLabels: Record<string, string> = {
    'urgent': 'Immediately / Urgent',
    '1-month': 'Within 1 month',
    '1-3-months': '1–3 months',
    '3-6-months': '3–6 months',
    'planning': 'Planning stage only',
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; font-size: 14px; color: #1a1a2e; background: #f5f7fa; margin: 0; padding: 20px; }
  .card { background: #ffffff; border-radius: 8px; padding: 28px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
  .badge { display: inline-block; background: #0066FF; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px; letter-spacing: 0.5px; margin-bottom: 16px; }
  h1 { font-size: 20px; margin: 0 0 20px; color: #0A1A4A; }
  .row { display: flex; gap: 8px; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
  .label { color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; min-width: 140px; padding-top: 2px; }
  .value { color: #1a1a2e; font-size: 14px; flex: 1; }
  .message-box { background: #f8fafc; border-radius: 6px; padding: 14px; margin-top: 12px; border-left: 3px solid #0066FF; font-size: 14px; line-height: 1.6; color: #334155; }
  .footer { margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center; }
  a { color: #0066FF; text-decoration: none; }
</style></head>
<body>
  <div class="card">
    <span class="badge">NEW INQUIRY</span>
    <h1>New Service Inquiry — GIX Nexus Website</h1>

    <div class="row"><div class="label">Name</div><div class="value"><strong>${data.contactName}</strong></div></div>
    <div class="row"><div class="label">Organisation</div><div class="value">${data.organisation || '—'}</div></div>
    ${data.jobTitle ? `<div class="row"><div class="label">Job Title</div><div class="value">${data.jobTitle}</div></div>` : ''}
    ${data.sector ? `<div class="row"><div class="label">Sector</div><div class="value">${data.sector}</div></div>` : ''}
    <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${data.email}">${data.email}</a></div></div>
    ${data.phone ? `<div class="row"><div class="label">Phone</div><div class="value"><a href="tel:${data.phone}">${data.phone}</a></div></div>` : ''}
    <div class="row"><div class="label">Service Required</div><div class="value"><strong>${serviceLabels[data.serviceType] ?? data.serviceType}</strong></div></div>
    ${data.location ? `<div class="row"><div class="label">Project Location</div><div class="value">${data.location}</div></div>` : ''}
    ${data.timeline ? `<div class="row"><div class="label">Timeline</div><div class="value">${timelineLabels[data.timeline] ?? data.timeline}</div></div>` : ''}
    ${data.message ? `<div class="row" style="border:none;flex-direction:column;"><div class="label" style="margin-bottom:6px;">Message</div><div class="message-box">${data.message.replace(/\n/g, '<br>')}</div></div>` : ''}

    <div class="footer">
      Submitted ${new Date(data.submittedAt).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })} via GIX Nexus website<br>
      Manage inquiries: <a href="${process.env.NEXT_PUBLIC_APP_URL ?? ''}admin/collections/service-inquiries">Admin Panel</a>
    </div>
  </div>
</body>
</html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${fromName} <${fromAddress}>`,
        to: [notifyEmail],
        reply_to: data.email,   // replying goes directly to the person who submitted
        subject: `New Inquiry: ${serviceLabels[data.serviceType] ?? 'Service'} — ${data.contactName} (${data.organisation})`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[Inquiry] Resend error:', res.status, err)
    } else {
      console.log('[Inquiry] Notification email sent to', notifyEmail)
    }
  } catch (err) {
    // Never crash the inquiry submission because email failed
    console.error('[Inquiry] Email send failed (non-fatal):', err)
  }
}

export async function POST(req: NextRequest) {
  // ── IP for rate limiting + audit ────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '0.0.0.0'

  // ── Rate limit check ─────────────────────────────────────────
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Please wait a minute before trying again.' },
      { status: 429 }
    )
  }

  // ── Parse body ───────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request format.' },
      { status: 400 }
    )
  }

  // ── Validation ───────────────────────────────────────────────
  const errors: Record<string, string> = {}

  const contactName = String(body.contactName ?? '').trim()
  const organisation = String(body.organisation ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const serviceType = String(body.serviceType ?? '').trim()
  const message = String(body.message ?? '').trim()
  const jobTitle = String(body.jobTitle ?? '').trim()
  const sector = String(body.sector ?? '').trim()
  const location = String(body.location ?? '').trim()
  const timeline = String(body.timeline ?? '').trim()

  if (!contactName || contactName.length < 2) {
    errors.contactName = 'Please enter your full name (at least 2 characters).'
  }
  if (contactName.length > 100) {
    errors.contactName = 'Name is too long (max 100 characters).'
  }
  if (!organisation || organisation.length < 2) {
    errors.organisation = 'Please enter your organisation name.'
  }
  if (!email) {
    errors.email = 'Email address is required.'
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (phone && !validatePhone(phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (!serviceType) {
    errors.serviceType = 'Please select the type of service you require.'
  }
  if (message && message.length > 2000) {
    errors.message = 'Message is too long (max 2000 characters).'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, error: 'Please correct the highlighted fields.', fieldErrors: errors },
      { status: 422 }
    )
  }

  // ── Save to Payload ──────────────────────────────────────────
  try {
    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'service-inquiries',
      data: {
        contactName,
        jobTitle: jobTitle || undefined,
        organisation,
        sector: sector || undefined,
        email,
        phone: phone || undefined,
        serviceType: serviceType as "telecom-infrastructure" | "fiber-optic" | "satellite-wireless" | "network-infrastructure" | "telecom-power" | "maintenance" | "multiple" | "general",
        location: location || undefined,
        timeline: (timeline || undefined) as "urgent" | "1-month" | "1-3-months" | "3-6-months" | "planning" | undefined,
        message: message || undefined,
        status: 'new',
        submittedAt: new Date().toISOString(),
        ipAddress: ip,
      },
    })

    // Fire-and-forget — never delay the response waiting for email
    const submittedAt = new Date().toISOString()
    void sendInquiryNotification({
      contactName, organisation, email, phone,
      serviceType, location, timeline, message,
      jobTitle, sector, submittedAt,
    })

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. We will respond within 2 business days.',
    })
  } catch (err) {
    console.error('[ServiceInquiry] Failed to save:', err)
    return NextResponse.json(
      { success: false, error: 'A server error occurred. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

// Block all other methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
