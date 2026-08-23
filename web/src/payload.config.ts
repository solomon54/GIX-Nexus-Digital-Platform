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
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },


    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
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
    // Vercel Blob storage — replaces local disk storage for uploaded media.
    // Required on Vercel because the filesystem is ephemeral (wiped on redeploy).
    // In development (no BLOB_READ_WRITE_TOKEN) files fall back to local storage.
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
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
