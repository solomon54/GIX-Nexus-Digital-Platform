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
        serviceType,
        location: location || undefined,
        timeline: timeline || undefined,
        message: message || undefined,
        status: 'new',
        submittedAt: new Date().toISOString(),
        ipAddress: ip,
      },
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
