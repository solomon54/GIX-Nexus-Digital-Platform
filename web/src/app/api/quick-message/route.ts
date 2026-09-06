import { type NextRequest, NextResponse } from 'next/server'

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '0.0.0.0'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many messages. Please wait a minute.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()

  // Validate
  if (!name || name.length < 2) {
    return NextResponse.json({ success: false, error: 'Please enter your name.' }, { status: 422 })
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 422 })
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ success: false, error: 'Please enter a message (at least 10 characters).' }, { status: 422 })
  }
  if (message.length > 2000) {
    return NextResponse.json({ success: false, error: 'Message too long (max 2000 characters).' }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM_ADDRESS ?? 'noreply@gixnexus.com'
  const fromName = process.env.RESEND_FROM_NAME ?? 'GIX Nexus'
  const notifyEmail = process.env.INQUIRY_NOTIFY_EMAIL ?? 'gixnexustelecom@gmail.com'

  if (!apiKey) {
    console.warn('[QuickMessage] RESEND_API_KEY not set')
    return NextResponse.json(
      { success: false, error: 'Email service not configured. Please contact us directly.' },
      { status: 503 }
    )
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; font-size: 14px; color: #1a1a2e; background: #f5f7fa; margin: 0; padding: 20px; }
  .card { background: #ffffff; border-radius: 8px; padding: 28px; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; }
  .badge { display: inline-block; background: #0066FF; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px; letter-spacing: 0.5px; margin-bottom: 16px; }
  h1 { font-size: 18px; margin: 0 0 20px; color: #0A1A4A; }
  .row { padding: 7px 0; border-bottom: 1px solid #f1f5f9; display: flex; gap: 8px; }
  .label { color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; min-width: 80px; padding-top: 2px; }
  .value { color: #1a1a2e; font-size: 14px; flex: 1; }
  .message-box { background: #f8fafc; border-radius: 6px; padding: 14px; margin-top: 16px; border-left: 3px solid #0066FF; font-size: 14px; line-height: 1.7; color: #334155; white-space: pre-wrap; }
  .footer { margin-top: 22px; font-size: 12px; color: #94a3b8; text-align: center; }
  a { color: #0066FF; }
</style></head>
<body>
  <div class="card">
    <span class="badge">QUICK MESSAGE</span>
    <h1>New Message via GIX Nexus Website</h1>
    <div class="row"><div class="label">From</div><div class="value"><strong>${name}</strong></div></div>
    <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
    <div style="margin-top:4px;"><div class="label" style="padding-bottom:6px;">Message</div><div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</div></div>
    <div class="footer">
      Sent ${new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })} via GIX Nexus website
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
        reply_to: email,
        subject: `Message from ${name} — GIX Nexus Website`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[QuickMessage] Resend error:', res.status, err)
      return NextResponse.json(
        { success: false, error: 'Failed to send message. Please try again or contact us directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Message sent. We will get back to you soon.' })
  } catch (err) {
    console.error('[QuickMessage] Fetch error:', err)
    return NextResponse.json(
      { success: false, error: 'Network error. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
