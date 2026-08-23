# GIX Nexus Digital Platform

Bilingual informational website and content management system for **GIX Nexus Telecom and Power**, an Ethiopian-owned telecommunications and power engineering company headquartered in Addis Ababa.

The platform gives GIX Nexus a professional public presence — showcasing services, team, HSEQ commitment, and target sectors in both English and Amharic — with a full CMS for staff to manage content without touching code.

---

## Repo layout

```
GIX-Nexus-Digital-Platform/
├── web/                          # Next.js + Payload CMS application
│   ├── src/
│   │   ├── app/
│   │   │   ├── [locale]/         # Public-facing pages (en + am)
│   │   │   └── (payload)/        # Payload admin panel routes
│   │   ├── collections/          # Payload CMS collection definitions
│   │   ├── components/           # React components (UI + layout + admin)
│   │   ├── i18n/                 # Locale routing config
│   │   └── payload.config.ts     # CMS configuration
│   ├── messages/                 # Translation strings (en.json, am.json)
│   ├── public/                   # Static assets (images, icons)
│   └── .nvmrc                    # Node version pin: 20
└── docs/
    ├── COMPANY.md                # Company facts reference
    ├── PRODUCT.md                # What the platform is and does
    ├── TECHNICAL.md              # Architecture, stack, conventions
    ├── CONTENT.md                # CMS user guide for staff
    ├── ROADMAP.md                # Phase 1 done, Phase 2 next, Phase 3 later
    └── source-files/             # Original PDFs and assets (do not edit)
```

---

## Tech stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.5.23 |
| CMS | Payload CMS | 3.88.0 |
| Database | PostgreSQL (Supabase) | — |
| Language | TypeScript | 5.8.3 |
| Styling | Tailwind CSS v4 | 4.3.3 |
| Localization | next-intl | 4.9.1 |
| Theming | next-themes | 0.4.4 |
| Email | Resend | — |
| Runtime | Node.js | **20 (required)** |

---

## Running locally

### Node version

**Node 24 is required** (Node 20 deprecated by Vercel from 2026-10-01). A CSS noop loader handles Payload's ESM `.css` issue on Node 24. The repo `.nvmrc` is pinned to `24`.

```bash
nvm use 24
```

If you don't have nvm, install it or manually ensure `node --version` returns `v20.x.x`.

### Setup

```bash
cd web
nvm use 24
npm install
```

### Environment variables

Copy `.env.local` and fill in your values (the file already has a working dev configuration):

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Payload CMS encryption secret (long random string) |
| `NEXT_PUBLIC_APP_URL` | App base URL (e.g. `http://localhost:3000`) |
| `RESEND_API_KEY` | Resend API key for outbound email |
| `RESEND_FROM_ADDRESS` | Sender address (e.g. `noreply@gixnexus.com`) |
| `RESEND_FROM_NAME` | Sender name (e.g. `GIX Nexus`) |
| `NODE_ENV` | `development` or `production` |

### Start dev server

```bash
npm run dev
```

The public site is at `http://localhost:3000/en` (or `/am` for Amharic).  
The admin panel is at `http://localhost:3000/admin`.

---

## Docs

- [COMPANY.md](docs/COMPANY.md) — company facts, services, team, HSEQ, sectors, objectives
- [PRODUCT.md](docs/PRODUCT.md) — what the platform is, what's built, what isn't, phases
- [TECHNICAL.md](docs/TECHNICAL.md) — architecture, collections, design system, conventions
- [CONTENT.md](docs/CONTENT.md) — CMS user guide for GIX Nexus staff
- [ROADMAP.md](docs/ROADMAP.md) — Phase 1 done, Phase 2 next, Phase 3 later
