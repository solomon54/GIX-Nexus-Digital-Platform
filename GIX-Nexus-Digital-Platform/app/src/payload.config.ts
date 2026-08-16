import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Services } from './collections/Services'
import { Sectors } from './collections/Sectors'
import { FutureObjectives } from './collections/FutureObjectives'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // ── Admin ────────────────────────────────────────────────────
  // PUBLIC SITE HAS NO AUTH. This admin is for internal CMS use only.
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
  ],

  // ── Global rich-text editor ──────────────────────────────────
  editor: lexicalEditor(),

  // ── Security ─────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET ?? (() => { throw new Error('PAYLOAD_SECRET env var is required') })(),

  // ── TypeScript output ─────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ── Database — PostgreSQL (DEC-001) ───────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  // ── Localization (D-01, D-02) ─────────────────────────────────
  // Source: governance decisions D-01 (bilingual EN/AM) and D-02 (western digits)
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      // [AM TRANSLATION PENDING] — requires review by Amharic speaker before production
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
