import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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
  // serverURL tells Payload where the app is hosted.
  // Strip trailing slash — Payload constructs media URLs by appending paths
  // directly, so a trailing slash would produce double-slash URLs.
  serverURL: (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, ''),

  csrf: [
    ...(process.env.NEXT_PUBLIC_APP_URL
      ? [process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')]
      : []
    ),
    'http://localhost:3000',
  ],

  admin: {
    user: Users.slug,
    avatar: { Component: '/components/admin/Avatar' },
    importMap: {
      baseDir: path.resolve(dirname),
    },


    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
      views: {
        // Custom dashboard — replaces the default Payload dashboard with
        // a beautiful card-based CMS overview with view + edit flow.
        dashboard: {
          Component: '/components/admin/Dashboard',
        },
      },
      // NOTE: afterNavLinks / beforeNavLinks components that use React hooks
      // (useAuth, usePathname) crash the nav RSC render in Payload 3.88.
      // Icons are handled via admin.css instead. NavUserCard was removed.
    },

    meta: {
      titleSuffix: '— GIX Nexus',
      icons: [{ url: '/icon.svg' }],
    },

    theme: 'dark',
  },

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

  editor: lexicalEditor(),

  plugins: [
    // Media storage: uses Vercel Blob when BLOB_READ_WRITE_TOKEN is set (Vercel/cloud),
    // falls back to local disk (web/media/) when not set (Dokploy / self-hosted).
    // For Dokploy: do NOT set BLOB_READ_WRITE_TOKEN — mount a persistent volume to
    // the media directory so uploads survive container redeploys.
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN
        ?? 'vercel_blob_rw_placeholder00000000_fakefakefakefakefakefakefakefake',
    }),
  ],

  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_ADDRESS ?? 'noreply@gixnexus.com',
    defaultFromName: process.env.RESEND_FROM_NAME ?? 'GIX Nexus',
    apiKey: process.env.RESEND_API_KEY ?? '',
  }),

  secret: process.env.PAYLOAD_SECRET ?? 'dev-secret-not-for-production',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: process.env.NODE_ENV === 'development',
  }),

  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'አማርኛ (Amharic)', code: 'am' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
})
