# GIX Nexus Digital Platform — Technical Reference

Audience: developers.

---

## Architecture

```
                    ┌──────────────────────────────────────┐
                    │         Next.js 15 (App Router)       │
                    │                                       │
                    │  ┌─────────────────┐  ┌───────────┐  │
                    │  │  Public site    │  │  /admin   │  │
                    │  │  /en/* /am/*    │  │  Payload  │  │
                    │  │  (8 pages)      │  │  CMS UI   │  │
                    │  └────────┬────────┘  └─────┬─────┘  │
                    └──────────┼────────────────── ┼────────┘
                               │                   │
                    ┌──────────▼───────────────────▼────────┐
                    │           Payload CMS (Node)           │
                    │   REST API · Local API · Admin UI      │
                    └──────────────────┬─────────────────────┘
                                       │
                    ┌──────────────────▼─────────────────────┐
                    │           PostgreSQL (Supabase)         │
                    └────────────────────────────────────────┘
```

Next.js serves both the public-facing site and the Payload admin panel. Payload runs as part of the same Node.js process — no separate backend server. The database is PostgreSQL hosted on Supabase.

---

## Tech stack

| Technology | Version | Why |
|---|---|---|
| Next.js (App Router) | 15.5.23 | SSR + static generation, layouts, metadata API, image optimization |
| Payload CMS | 3.88.0 | Headless CMS embedded in Next.js; no separate deployment needed |
| PostgreSQL (Supabase) | — | Relational DB; Payload's first-class adapter; managed hosting |
| React | 19.1.0 | Required by Next.js 15 |
| TypeScript | 5.8.3 | Type safety; Payload generates types from collection definitions |
| Tailwind CSS v4 | 4.3.3 | Utility-first styling; v4 uses CSS-first config |
| next-intl | 4.9.1 | Localized routing and translation string management |
| next-themes | 0.4.4 | Light/dark/system theme switching via CSS variables |
| Resend | — | Transactional email for inquiry notifications |
| Lexical (richText) | (via Payload) | Rich text editor in the CMS admin |
| Lucide React | 0.468.0 | Icon library for UI components |
| Node.js | **20 (required)** | See Node version section below |

---

## Node version — important

**Node 20 is required. Do not use Node 24.**

Payload 3.x imports CSS files using ESM `import` statements. Node 24 throws `ERR_UNKNOWN_FILE_EXTENSION` when it encounters a `.css` import in an ESM context — the dev server fails to start.

The workaround used in this project is a custom CSS noop loader (`css-noop-loader.mjs`, `css-noop-hooks.mjs`) injected via `NODE_OPTIONS="--import ./css-noop-loader.mjs"` in the `dev`, `build`, and `start` scripts. This works reliably on Node 20. The behavior may differ on Node 24 even with the loader.

The repo has a `.nvmrc` file in `web/` pinned to `20`.

```bash
cd web
nvm use 20    # always run this before npm run dev
npm run dev
```

---

## How to run

```bash
cd web
nvm use 20
npm install
# ensure .env.local is set up (see README.md)
npm run dev
```

Public site: `http://localhost:3000/en`  
Admin panel: `http://localhost:3000/admin`

---

## App folder structure

```
web/src/
├── app/
│   ├── [locale]/               # Public site — all pages served under /en/* and /am/*
│   │   ├── layout.tsx          # Locale layout: nav, footer, ThemeProvider, next-intl
│   │   ├── page.tsx            # Home page
│   │   ├── company/            # Company page
│   │   ├── services/
│   │   │   ├── page.tsx        # Services listing
│   │   │   └── [slug]/         # Individual service detail (dynamic)
│   │   ├── capabilities/       # Technical capabilities + inquiry form
│   │   ├── hseq/               # HSEQ policy page
│   │   ├── industries/         # Target sectors page
│   │   ├── future-goals/       # Future objectives page
│   │   └── contact/            # Contact page
│   ├── (payload)/              # Payload admin routes (auto-managed by Payload)
│   │   └── admin/[[...segments]]/
│   └── globals.css             # CSS variables, theme tokens, base styles
├── collections/                # Payload CMS collection definitions (TypeScript)
│   ├── Services.ts
│   ├── Sectors.ts
│   ├── FutureObjectives.ts
│   ├── Media.ts
│   ├── Pages.ts
│   ├── Users.ts
│   ├── News.ts
│   ├── TeamMembers.ts
│   ├── ServiceInquiries.ts
│   ├── Projects.ts
│   └── Testimonials.ts
├── components/
│   ├── admin/                  # Custom Payload admin components (Logo, Icon, NavUserCard)
│   ├── layout/                 # Navigation, Footer
│   └── ui/                     # Reusable UI components (ServiceCard, HeroCarousel, etc.)
├── i18n/
│   └── routing.ts              # next-intl locale routing configuration
└── payload.config.ts           # Payload CMS configuration (collections, localization, DB, email)
```

---

## CMS collections

All collections are defined in `web/src/collections/`. Payload generates TypeScript types from these definitions (`payload-types.ts`).

| Collection | Slug | Purpose |
|---|---|---|
| Users | `users` | Admin panel user accounts. Auth is Payload's built-in. |
| Services | `services` | The 6 service groupings. Localized name, description, capabilities array, icon, order (1–6). |
| Sectors | `sectors` | The 14 target-client sectors. Localized. Used on the Industries page. |
| FutureObjectives | `future-objectives` | The 8 planned objectives. Numbers 1–8, localized title and description. Always displayed with a "Planned" label. |
| Media | `media` | File uploads. Max 10MB per file. |
| Pages | `pages` | Generic pages content (for CMS-managed page body text if needed). |
| News | `news` | Company news and announcements. Localized title, excerpt, body (rich text), cover image, category, publish date, draft/published status. |
| Projects | `projects` | Completed and ongoing projects. Localized title, excerpt, description (rich text), service category, location, client sector (never client name without authorization), cover image, gallery, completion date. |
| Testimonials | `testimonials` | Client/partner testimonials. Only publish verified, real statements. Never fabricate. Localized quote, author name, role, organisation, sector. |
| TeamMembers | `team-members` | Staff profiles for the Company page. Name, role, bio, photo. |
| ServiceInquiries | `service-inquiries` | Form submissions from the Capabilities page. Read-only from admin (no manual create). Track status and add internal notes. |

---

## Localization

**Locales:** English (`en`) and Amharic (`am`)

**URL structure:** `/en/[page]` and `/am/[page]`. The default locale is `en`. Locale is passed as a URL segment, not via headers or cookies.

**Static strings:** Stored in `web/messages/en.json` and `web/messages/am.json`. These cover navigation labels, button text, section headings, and any hardcoded UI strings. Managed via next-intl's `useTranslations()` hook.

**CMS content:** Collection fields marked `localized: true` store separate values per locale. When editing in Payload admin, you switch between locales using the locale selector at the top of the edit form.

**Fallback:** If Amharic content is not yet set for a field, Payload falls back to the English value (`fallback: true` in payload.config.ts).

**Digit convention:** Western/Arabic digits (0–9) for both locales. Ge'ez numerals are not used.

**Calendar:** English content uses Gregorian dates. Amharic content should use Ethiopian calendar representation where appropriate.

**Timezone:** Africa/Addis_Ababa for all time-sensitive content and admin timestamps.

---

## Design system

### Brand colors

| Token | Hex | Use |
|---|---|---|
| Primary blue | `#008CFF` | Links, CTAs, highlights, active states |
| Accent blue (hover) | `#3FABFF` | Hover state for primary blue elements |
| Cyan (light) | `#12C8FF` | Secondary hover accent |
| Green | `#65D51A` | Safety/success indicators, HSEQ accents |
| Dark background | `#07111C` | Page background (dark theme) |
| Dark surface | `#0B1726` | Card/section backgrounds (dark theme) |
| Subtle text | `#B9C6D3` | Body text on dark backgrounds |
| Muted text | `#708090` | Secondary/caption text |

Light and dark theme tokens are defined as CSS custom properties in `globals.css` (`--background`, `--foreground`, `--surface`, `--border`, `--foreground-subtle`). Components use these variables rather than hardcoded hex values, so they respond to theme changes automatically. Brand accent colors (`#008CFF`, `#65D51A`) are used directly in both themes.

### Typography

- **English:** Noto Sans (loaded via Google Fonts, `font-sans` class)
- **Amharic:** Noto Sans Ethiopic (loaded via Google Fonts, `font-ethiopic` class applied to `<body>` when locale is `am`)

The layout automatically applies `font-ethiopic` on the body element when the locale is `am`. This ensures correct Amharic script rendering without any manual per-component logic.

### Navigation

The navigation bar is always rendered dark (using the dark theme color variables directly), regardless of the current page theme. This is a deliberate design rule — the nav background is never switched to light mode.

---

## Key code conventions

**Source comments on hardcoded facts** — anywhere a value is hardcoded from the company profile (e.g., the 6 services list, the `7+` stat, the `100%` safety claim), there is a comment like `// Source: Company Profile PDF, Page 5`. This makes it easy to verify what's intentional vs. what needs updating.

**Bilingual parity rule** — every public page must have equivalent content in both English and Amharic. If you add a new section in English, the corresponding Amharic translation must be added before the page is published.

**6 services rule** — the Services collection enforces `max: 6` on the `order` field and the admin description explicitly states "DO NOT add a 7th." The source documents exactly 6 service groupings; the "7+" is a verbatim company claim reproduced as-is.

**Future objectives separation** — the FutureObjectives collection is structurally separate from Services. Future objectives must always display with a "Planned / Objective" label. Never merge them visually or architecturally with current services.

**No client names without authorization** — the Projects collection description states: "Never invent client names — use sector categories only unless explicitly provided." The clientSector field exists for this reason.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string (`postgresql://...`) |
| `PAYLOAD_SECRET` | Yes | Long random string for Payload encryption. Generate: `openssl rand -hex 32` |
| `NEXT_PUBLIC_APP_URL` | Yes | Base URL of the app (e.g., `http://localhost:3000` or `https://www.gixnexus.com`) |
| `BLOB_READ_WRITE_TOKEN` | Prod only | Vercel Blob token — enables cloud media storage. Not needed locally. |
| `RESEND_API_KEY` | For email | Resend API key for outbound email |
| `RESEND_FROM_ADDRESS` | For email | Sender address (e.g., `noreply@gixnexus.com`) |
| `RESEND_FROM_NAME` | For email | Sender display name (e.g., `GIX Nexus`) |
| `NODE_ENV` | Yes | `development` or `production` |

Copy `.env.local` — it already has working dev values. Never commit `.env.local` to version control.

---

## Deploying to Vercel

### Why Vercel needs special setup

Vercel's filesystem is ephemeral — it resets on every deploy. Any file uploaded through the Payload admin (images, documents) would be lost. The project uses **Vercel Blob** to store all uploaded media in persistent cloud storage.

### Step-by-step deployment

**1. Push the repo to GitHub** (if not already done)

**2. Import the project in Vercel**
- Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
- Set the **Root Directory** to `web` (not the repo root)
- Framework preset: **Next.js** (auto-detected)
- Node.js version: set to **20.x** in Project Settings → General

**3. Create a Vercel Blob store**
- In your Vercel project → Storage tab → Create Database → Blob
- Name it anything (e.g. `gix-nexus-media`)
- Click **Connect to Project** — this automatically adds `BLOB_READ_WRITE_TOKEN` to your environment variables

**4. Add all environment variables** in Vercel Project Settings → Environment Variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Supabase PostgreSQL connection string |
| `PAYLOAD_SECRET` | Run `openssl rand -hex 32` and paste the result |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` (or your custom domain) |
| `BLOB_READ_WRITE_TOKEN` | Auto-added when you connect the Blob store in step 3 |
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_ADDRESS` | e.g. `noreply@gixnexus.com` |
| `RESEND_FROM_NAME` | `GIX Nexus` |
| `NODE_ENV` | `production` |

**5. Deploy** — Vercel builds automatically on every push to `main`.

### After first deploy

- Visit `https://your-domain.vercel.app/admin` and create the first admin user
- All media uploaded via the admin panel will be stored in Vercel Blob automatically
- Schema migrations: if you change a collection definition, run `npx payload migrate` locally against the production database URL before deploying

### Important notes

- **Do not change `PAYLOAD_SECRET` after the first deploy** — it's used to encrypt sessions. Changing it logs out all admin users.
- **Node 20 only** — set this explicitly in Vercel Project Settings. Vercel defaults to Node 22 which may cause the CSS ESM issue described above.
- **`db: push` is disabled in production** — schema changes require running migrations manually.
