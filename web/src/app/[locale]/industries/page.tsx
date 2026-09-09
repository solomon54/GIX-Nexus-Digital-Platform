import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Sector } from '@/payload-types'
import { PageHeroCarousel } from '@/components/ui/PageHeroCarousel'

export const revalidate = 3600

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://gixnexustelecom.com'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industries' })
  const title = t('pageTitle')
  const description = 'GIX Nexus Telecom and Power serves 14 sectors: telecom operators, government ministries, ISPs, NGOs, UN agencies, banks, data centers, embassies, universities, and engineering contractors across Ethiopia.'
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/industries`,
      languages: { en: `${BASE_URL}/en/industries`, am: `${BASE_URL}/am/industries` },
    },
    openGraph: {
      title: `${title} | GIX Nexus Telecom and Power`,
      description,
      url: `${BASE_URL}/${locale}/industries`,
    },
  }
}

// Source: Company Profile PDF, Page 9 — representative icons for 14 sectors
const SECTOR_ICONS = ['📡', '🔧', '🌐', '🏛', '⚡', '🌍', '🏛', '🤝', '🏦', '🖥', '🛡', '🎓', '🏭', '🏗'] as const

export default async function Page({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industries' })

  // Fetch sectors from Payload — fall back to i18n list if none in CMS yet
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'sectors',
    locale: locale as 'en' | 'am',
    fallbackLocale: 'en',
    sort: 'order',
    limit: 20,
  })

  // If CMS has sectors use them; otherwise fall back to i18n strings
  const cmsHasSectors = result.docs.length > 0
  const sectors: Array<{ name: string; description?: string | null }> = cmsHasSectors
    ? result.docs as Sector[]
    : (t.raw('sectors') as string[]).map(name => ({ name }))

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <PageHeroCarousel slides={[
          { src: '/images/industries/companies-we-serve.webp', motion: 'hero-drift-tr' },
          { src: '/images/hero/datacenter-solution.jpg', motion: 'hero-drift-up' },
          { src: '/images/services/telecom-infrastructure.jpg', motion: 'hero-drift-left' },
        ]} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 4 }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>{t('pageSubtitle')}</p>
          <h1 className="text-4xl font-bold sm:text-5xl" style={{ color: 'var(--foreground)' }}>{t('pageTitle')}</h1>
          <p className="mt-5 max-w-2xl mx-auto text-sm italic leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>{t('disclaimer')}</p>
        </div>
      </section>

      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectors.map((sector, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border p-5 sm:p-6 transition-colors hover:border-[var(--accent)]/40"
                style={{ background: '#FFFFFF', borderColor: 'var(--border)' }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: 'rgba(0,140,255,0.1)' }}>
                  {SECTOR_ICONS[i % SECTOR_ICONS.length]}
                </div>
                <div>
                  <p className="font-medium text-sm leading-snug" style={{ color: 'var(--foreground)' }}>{sector.name}</p>
                  {sector.description ? (
                    <p className="text-xs mt-0.5" style={{ color: 'var(--foreground-subtle)' }}>{sector.description}</p>
                  ) : (
                    <p className="text-xs mt-0.5 text-[var(--accent)]">Target Sector</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl p-8 text-center border" style={{ background: '#FFFFFF', borderColor: 'var(--border)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Is Your Organization in One of These Sectors?</h2>
            <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--foreground-subtle)' }}>
              GIX Nexus Telecom and Power welcomes opportunities to work as a contractor or subcontractor across all of these sectors throughout Ethiopia.
            </p>
            <Link href={`/${locale}/contact`} className="inline-flex min-h-[44px] items-center rounded-lg bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
