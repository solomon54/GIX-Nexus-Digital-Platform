import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Services } from './collections/Services'
import { Sectors } from './collections/Sectors'
import { FutureObjectives } from './collections/FutureObjectives'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { News } from './collections/News'
import { TeamMembers } from './collections/TeamMembers'
import { ServiceInquiries } from './collections/ServiceInquiries'
import { Projects } from './collections/Projects'
import { Testimonials } from './collections/Testimonials'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // ── Collections ──────────────────────────────────────────────
  collections: [
    Users,
    Services,
    Sectors,
    FutureObjectives,
    Media,
    Pages,
    News,
    Projects,
    Testimonials,
    TeamMembers,
    ServiceInquiries,
  ],

  // ── Global rich-text editor ──────────────────────────────────
  editor: lexicalEditor(),

  // ── Email (Resend — free tier: 3,000 emails/month) ────────────
  // Set RESEND_API_KEY in .env.local / production env.
  // Get your key at: https://resend.com/api-keys
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_ADDRESS ?? 'noreply@gixnexus.com',
    defaultFromName: process.env.RESEND_FROM_NAME ?? 'GIX Nexus',
    apiKey: process.env.RESEND_API_KEY ?? '',
  }),

  // ── Security ─────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET ?? 'dev-secret-not-for-production',

  // ── TypeScript output ─────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ── Database — PostgreSQL (DEC-001) ───────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: process.env.NODE_ENV === 'development',
  }),

  // ── Localization (D-01, D-02) ─────────────────────────────────
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'አማርኛ (Amharic)', code: 'am' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  // ── Upload ────────────────────────────────────────────────────
  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },
})
