# Deploying GIX Nexus Digital Platform on Dokploy

## Summary: What needs to change for Dokploy

| Service | Action |
|---|---|
| **Supabase (PostgreSQL)** | **Keep as-is** — just use the same DATABASE_URL. Dokploy hosts the app, not the DB. |
| **Vercel Blob (media storage)** | **Drop it** — don't set BLOB_READ_WRITE_TOKEN. Payload falls back to local disk automatically. Mount a persistent volume so uploads survive redeploys. |
| **Vercel (app hosting)** | **Replace with Dokploy** — this is what you're deploying. |

---

## Required Environment Variables

Set in Dokploy → your app → **Environment Variables**.

| Variable | Example value | Required |
|---|---|---|
| `DATABASE_URL` | `postgresql://user:pass@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require` | ✅ |
| `PAYLOAD_SECRET` | `generate with: openssl rand -base64 32` | ✅ |
| `NEXT_PUBLIC_APP_URL` | `https://gixnexus.yourdomain.com` | ✅ |
| `NODE_OPTIONS` | `--import ./css-noop-loader.mjs` | ✅ |

**Do NOT set** `BLOB_READ_WRITE_TOKEN` — leaving it unset tells Payload to use local disk for media uploads.

### Optional

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | Email notifications for service inquiries (optional) |
| `RESEND_FROM_ADDRESS` | e.g. `noreply@yourdomain.com` |

---

## Dokploy Build Settings

| Setting | Value |
|---|---|
| **Root Directory** | `web` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Node Version** | 18 or 20 |

---

## Persistent Volume (critical for media uploads)

Without a persistent volume, every redeploy wipes uploaded images.

In Dokploy, add a volume mount:

| Host path | Container path |
|---|---|
| `/dokploy-data/gix-nexus/media` | `/app/media` |

> The exact container path depends on your working directory. If Dokploy sets it to `/app/web`, then use `/app/web/media`.
> Check by running `pwd` in the container after first deploy.

---

## First Deploy Checklist

1. Set the 4 required env vars above
2. Add the persistent volume mount
3. Deploy — Payload auto-migrates the DB schema on first startup
4. Visit `https://yourdomain.com/admin` and create your admin user
5. Upload the company logo and test an image upload — confirm it saves correctly

---

## Migrating existing media from Vercel Blob (if needed)

If you already uploaded files to Vercel Blob and want them on Dokploy:

1. Go to Supabase → Table Editor → `media` table
2. Note the `filename` and `url` columns for each uploaded file
3. Download each file from its Vercel Blob URL
4. Copy the files into the persistent volume at the same `filename`

This is only needed if you have real content uploaded. For a fresh launch, skip this.

---

## After Deploy — SEO

1. Submit `https://yourdomain.com/sitemap.xml` to Google Search Console
2. Test structured data: https://search.google.com/test/rich-results
3. Add your domain to Google Business Profile and link it to the website

---

## Why keep Supabase?

Supabase free tier gives you:
- Managed PostgreSQL with automatic backups
- Pooled connections via pgBouncer (port 6543)
- No maintenance overhead

Self-hosting Postgres on Dokploy means you're responsible for backups, uptime, and disk space. There's no practical benefit for a site at this scale.

If you later want everything on one server, you can add a Postgres service in Dokploy and migrate with `pg_dump` / `pg_restore` — but that's optional and can be done months after launch.
