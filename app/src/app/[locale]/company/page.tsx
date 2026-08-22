import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'company' })
  return { title: t('pageTitle'), description: t('overviewText') }
}

// Core values with icons — Source: Company Profile PDF, Page 4
const CORE_VALUES = [
  { key: 'timeToMarket', icon: '⏱' },
  { key: 'qualityWorkmanship', icon: '🔩' },
  { key: 'safetyFirst', icon: '🛡' },
  { key: 'customerFocused', icon: '🤝' },
  { key: 'integrity', icon: '⚖' },
  { key: 'continuousImprovement', icon: '📈' },
] as const

function CompanyPage({ locale }: { locale: string }) {
  const t = useTranslations('company')

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" aria-labelledby="company-heading">
        {/* Background: professional telecom environment */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/telecom-towers-night.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.95), rgba(11,23,38,0.90))' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-3">About Us</p>
          <h1 id="company-heading" className="text-4xl font-bold text-white sm:text-5xl">{t('pageTitle')}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-[#B9C6D3] leading-relaxed">{t('overviewText')}</p>
          {/* Source: Company Profile PDF, Page 1 */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#65D51A]/30 bg-[#65D51A]/10 px-4 py-1.5">
            <span className="text-sm font-medium text-[#65D51A]">{t('vendorStatus')}</span>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 4 — verbatim, attributed */}
      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Vision */}
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
              <div className="relative h-48">
                {/* GIX Nexus company vision */}
                <Image
                  src="/images/company/vission-logo.jpeg"
                  alt="GIX Nexus — company vision"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.85), rgba(11,23,38,0.3))' }} />
                <div className="absolute bottom-4 left-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#008CFF]">Our Vision</p>
                </div>
              </div>
              <div className="p-6" style={{ background: 'var(--surface)' }}>
                {/* Source: Company Profile PDF, Page 4 — verbatim company self-statement */}
                <blockquote className="text-base font-medium leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  &ldquo;{t('vision')}&rdquo;
                </blockquote>
                <p className="mt-3 text-xs text-[#708090]">— Company Vision Statement</p>
              </div>
            </div>

            {/* Mission */}
            <div className="rounded-2xl p-6 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#008CFF] mb-4">Our Mission</p>
              <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>{t('missionTitle')}</h2>
              {/* Source: Company Profile PDF, Page 4 — 5 mission points */}
              <ul className="space-y-3">
                {(t.raw('missionPoints') as string[]).map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: '#008CFF' }}>
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 4 — 6 core values */}
      <section className="py-20 section-top-divide bg-section-even">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">What Guides Us</p>
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>{t('valuesTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map(({ key, icon }) => (
              <div key={key} className="flex gap-4 p-5 sm:p-6 rounded-xl border" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                <div className="text-2xl flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                    {t(`values.${key}.name`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Pages 2, 10 */}
      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Leadership</p>
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>{t('leadershipTitle')}</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {/* Photo card — elegant: image fills frame, name/role overlaid at bottom */}
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="relative" style={{ aspectRatio: '4/3' }}>
                {/* Source: leader-prof-img.png — Getachew Teshome, Managing Director */}
                <Image
                  src="/assets/leader-prof-img.png"
                  alt="Getachew Teshome — Managing Director, GIX Nexus Telecom and Power"
                  fill
                  className="object-cover object-top"
                />
                {/* Gradient overlay — name/role readable at bottom */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,17,28,0.92) 0%, rgba(11,23,38,0.4) 40%, transparent 70%)' }} />
                {/* Name + role at bottom — always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Source: Company Profile PDF, Page 2 — name and title */}
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#008CFF] mb-1">{t('mdTitle')}</p>
                  <h3 className="text-xl font-bold text-white">{t('mdName')}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#B9C6D3]">
                    <span>📍 {t('hqValue')}</span>
                    <span className="opacity-40">·</span>
                    <span>🌍 {t('operationsValue')}</span>
                  </div>
                </div>
              </div>

              {/* Quote — below photo, clean white card */}
              <div className="p-6" style={{ background: 'var(--surface)' }}>
                {/* Source: Company Profile PDF, Page 2 — verbatim MD statement */}
                <blockquote className="text-sm italic leading-relaxed border-l-2 border-[#008CFF] pl-4" style={{ color: 'var(--foreground-muted)' }}>
                  &ldquo;{t('mdMessage')}&rdquo;
                </blockquote>
                <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="text-xs text-[#008CFF] font-medium">Managing Director · GIX Nexus Telecom and Power</span>
                  <Link href={`/${locale}/contact`}
                    className="inline-flex min-h-[36px] items-center rounded-lg bg-[#008CFF] px-5 py-2 text-xs font-semibold text-white hover:bg-[#3FABFF] transition-colors">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <CompanyPage locale={locale} />
}
