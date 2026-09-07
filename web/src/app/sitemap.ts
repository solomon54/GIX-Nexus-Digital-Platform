import type { MetadataRoute } from 'next'
import { SERVICE_SLUGS } from '@/lib/constants'

const BASE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://gixnexustelecom.com').replace(/\/$/, '')
const LOCALES = ['en', 'am'] as const

const STATIC_PAGES = [
  '',           // home
  '/company',
  '/services',
  '/capabilities',
  '/industries',
  '/hseq',
  '/future-goals',
  '/contact',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static pages — both locales
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      const url = `${BASE_URL}/${locale}${page}`
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page}`,
            am: `${BASE_URL}/am${page}`,
          },
        },
      })
    }
  }

  // Service detail pages — all 8 slugs × 2 locales
  for (const slug of SERVICE_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/services/${slug}`,
            am: `${BASE_URL}/am/services/${slug}`,
          },
        },
      })
    }
  }

  return entries
}
