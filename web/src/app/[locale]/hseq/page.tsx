import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { PageHeroCarousel } from '@/components/ui/PageHeroCarousel'

export const revalidate = 3600

const BASE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://gixnexustelecom.com').replace(/\/$/, '')

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hseq' })
  const title = t('pageTitle')
  const description = 'GIX Nexus HSEQ Policy — Health, Safety, Environment & Quality. Zero Accident Objective and 100% safety-first approach on every telecom and power engineering project across Ethiopia.'
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/hseq`,
      languages: { en: `${BASE_URL}/en/hseq`, am: `${BASE_URL}/am/hseq` },
    },
    openGraph: {
      title: `${title} | GIX Nexus Telecom and Power`,
      description,
      url: `${BASE_URL}/${locale}/hseq`,
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hseq' })
  const programElements = t.raw('programElements') as string[]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <PageHeroCarousel slides={[
          { src: '/images/hseq/hseq-policy.jpeg', motion: 'hero-drift-tr' },
          { src: '/images/industries/safety-equipment.jpg', motion: 'hero-drift-up' },
          { src: '/images/hero/services-page-hero/engineers-data-center.webp', motion: 'hero-drift-left' },
        ]} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 4 }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--green)' }}>{t('pageSubtitle')}</p>
          <h1 className="text-4xl font-bold sm:text-5xl" style={{ color: 'var(--foreground)' }}>{t('pageTitle')}</h1>
          <p className="mt-5 max-w-3xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>{t('heroDescription')}</p>
        </div>
      </section>

      {/* ── Policy Statement ─────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Pages 1, 3, 8 */}
      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

            {/* HSEQ Policy card */}
            <div className="col-span-1 lg:col-span-2 rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
              <div className="relative h-56">
                <Image
                  src="/images/hseq/hseq-policy.jpeg"
                  alt="Engineers working with safety protocols"
                  fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hero-pan"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,18,54,0.60), rgba(6,18,54,0.08))' }} />
                <div className="absolute bottom-4 left-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#00C97A]">HSEQ Policy</p>
                </div>
              </div>
              <div className="p-6" style={{ background: '#FFFFFF' }}>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>{t('policyHeading')}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{t('policyText')}</p>
              </div>
            </div>

            {/* Key commitments */}
            <div className="space-y-4">
              {/* Source: Company Profile PDF, Page 8 — Zero Accident Objective is a GOAL, not a result */}
              <div className="rounded-xl p-5 border" style={{ background: '#FFFFFF', borderColor: 'var(--border)' }}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 mb-2">
                      <span className="text-xs font-semibold text-[var(--accent)]">{t('zeroAccidentBadge')}</span>
                    </div>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{t('zeroAccidentLabel')}</h3>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{t('zeroAccidentDescription')}</p>
                  </div>
                </div>
              </div>

              {/* Source: Company Profile PDF, Page 3 — 100% Safety-first is a POLICY STATEMENT, not a metric */}
              <div className="rounded-xl p-5 border" style={{ background: '#FFFFFF', borderColor: 'var(--border)' }}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🛡</div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00C97A]/30 bg-[#00C97A]/10 px-2.5 py-0.5 mb-2">
                      <span className="text-xs font-semibold text-[#00C97A]">{t('safetyFirstBadge')}</span>
                    </div>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{t('safetyFirstLabel')}</h3>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{t('safetyFirstDescription')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Elements — Source: Company Profile PDF, Page 8 */}
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">Program Elements</p>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{t('programTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programElements.map((element, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border p-4" style={{ background: '#FFFFFF', borderColor: 'var(--border)' }}>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ background: '#00C97A' }}>
                  ✓
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{element}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
