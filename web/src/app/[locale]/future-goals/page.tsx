import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { FutureObjective } from '@/payload-types'
import { PageHeroCarousel } from '@/components/ui/PageHeroCarousel'

export const revalidate = 3600

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://gixnexustelecom.com'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'futureGoals' })
  const title = t('pageTitle')
  const description = 'GIX Nexus strategic objectives: expand operations across Ethiopia, build telecom partnerships, enhance technical capacity, achieve industry certifications, and support Ethiopia\'s digital transformation.'
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/future-goals`,
      languages: { en: `${BASE_URL}/en/future-goals`, am: `${BASE_URL}/am/future-goals` },
    },
    openGraph: {
      title: `${title} | GIX Nexus Telecom and Power`,
      description,
      url: `${BASE_URL}/${locale}/future-goals`,
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'futureGoals' })

  // Fetch objectives from Payload — fall back to i18n if none in CMS yet
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'future-objectives',
    locale: locale as 'en' | 'am',
    fallbackLocale: 'en',
    sort: 'number',
    limit: 8,
  })

  const cmsHasObjectives = result.docs.length > 0
  const objectives: Array<{ number: string; title: string; description: string }> = cmsHasObjectives
    ? (result.docs as FutureObjective[]).map(o => ({
        number: String(o.number),
        title: o.title,
        description: o.description ?? '',
      }))
    : (t.raw('objectives') as Array<{ number: string; title: string; description: string }>)

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <PageHeroCarousel slides={[
          { src: '/images/future-goals/future-goals.jpeg', motion: 'hero-drift-tr' },
          { src: '/images/hero/company-page-hero/satellite-earth-blue.jpg', motion: 'hero-drift-up' },
          { src: '/images/hero/services-page-hero/power-towers-digital.jpg', motion: 'hero-drift-left' },
        ]} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 4 }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--green)' }}>{t('pageSubtitle')}</p>
          <h1 className="text-4xl font-bold sm:text-5xl" style={{ color: 'var(--foreground)' }}>{t('pageTitle')}</h1>
          <p className="mt-5 max-w-3xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>{t('heroDescription')}</p>
        </div>
      </section>

      {/* Objectives — Source: Company Profile PDF, Page 10 */}
      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* CRITICAL disclaimer — these are PLANNED objectives, not current achievements */}
          <div className="mb-12 rounded-xl border border-[#00C97A]/30 bg-[#00C97A]/5 p-5 text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{t('disclaimerBanner')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {objectives.map((obj) => (
              <div key={obj.number} className="rounded-xl border p-6" style={{ background: '#FFFFFF', borderColor: 'var(--border)' }}>
                {/* "Objective / Planned" badge — ALWAYS present per governance rules */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00C97A]/30 bg-[#00C97A]/10 px-2.5 py-1 mb-4">
                  <span className="text-xs font-semibold text-[#00C97A]">{t('objectiveBadge')}</span>
                </div>
                <div className="text-3xl font-bold text-[var(--accent)] mb-2">{obj.number}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--foreground)' }}>{obj.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{obj.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm mb-6 max-w-xl mx-auto" style={{ color: 'var(--foreground-subtle)' }}>
              {/* Source: Company Profile PDF, Page 10 */}
              GIX Nexus Telecom and Power is committed to sustainable growth and continuous improvement, becoming a trusted telecommunications and power engineering partner in Ethiopia and the East African region.
            </p>
            <Link href={`/${locale}/contact`}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
