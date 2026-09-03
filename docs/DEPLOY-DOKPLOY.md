# Deploying GIX Nexus Digital Platform on Dokploy

## Required Environment Variables

Set these in Dokploy → your app → **Environment Variables** before first deploy.

| Variable | Example | Notes |
|---|---|---|
| `DATABASE_URL` | `postgresql://user:pass@host:6543/postgres?sslmode=require` | Supabase pooler URL (port 6543) — **required** |
| `PAYLOAD_SECRET` | `a-long-random-string-min-32-chars` | Used to sign JWTs. Generate with: `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | `https://gixnexus.yourdomain.com` | Your public domain — **no trailing slash** |
| `NODE_OPTIONS` | `--import ./css-noop-loader.mjs` | Required for Payload + Next.js 15 CSS loading fix |

### Optional (leave blank if not using)

| Variable | Notes |
|---|---|
| `VERCEL_BLOB_READ_WRITE_TOKEN` | Only needed if using Vercel Blob for media storage |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`) |

---

## Dokploy Build Settings

| Setting | Value |
|---|---|
| **Root Directory** | `web` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm run start` |
| **Node Version** | 18+ (set in `.nvmrc`) |

---

## First Deploy Checklist

1. Set all required env vars above
2. Make sure `DATABASE_URL` points to your production Supabase project (not a paused one)
3. After first deploy, Payload will auto-migrate the DB schema on startup
4. Go to `https://yourdomain.com/admin` and create your first admin user
5. Publish your domain in Dokploy and set the same value as `NEXT_PUBLIC_APP_URL`

---

## SEO — After Deploy

Once live, submit to search engines:

1. **Google Search Console** — verify site, submit `https://yourdomain.com/sitemap.xml`
2. **Bing Webmaster Tools** — same sitemap URL
3. **Google Business Profile** — add `gixnexustelecom@gmail.com` as the business contact and link to the website

### Verify structured data is working

Go to: https://search.google.com/test/rich-results  
Enter your live URL — should show Organization and ProfessionalService schemas with no errors.

---

## Notes

- `web/media/` is gitignored (Payload upload storage). In production, uploaded files are stored locally on the Dokploy server. If you want persistent media across deploys, configure Payload to use an S3-compatible storage (e.g. Supabase Storage, Cloudflare R2, or AWS S3) — see `payload.config.ts`.
- The `.env.local` file is for local dev only. Never commit it.
- `PAYLOAD_SECRET` must be the same across restarts — if you change it, all admin sessions are invalidated.
