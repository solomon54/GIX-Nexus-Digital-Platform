import type { Metadata } from 'next'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { SectorCard } from '@/components/ui/SectorCard'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
  }
}

// Source: Company Profile PDF, Page 5 — exactly 6 service groupings
const SERVICES_DATA = [
  {
    slug: 'telecommunications-infrastructure',
    icon: 'Tower',
    nameKey: 'telecomInfrastructure',
  },
  {
    slug: 'fiber-optic-solutions',
    icon: 'Cable',
    nameKey: 'fiberOptic',
  },
  {
    slug: 'satellite-wireless-communications',
    icon: 'Radio',
    nameKey: 'satelliteWireless',
  },
  {
    slug: 'network-infrastructure',
    icon: 'Network',
    nameKey: 'networkInfrastructure',
  },
  {
    slug: 'telecom-power-systems',
    icon: 'Zap',
    nameKey: 'telecomPower',
  },
  {
    slug: 'maintenance-technical-support',
    icon: 'Wrench',
    nameKey: 'maintenance',
  },
] as const

// Source: Company Profile PDF, Page 9 — first 6 of 14 target sectors for teaser
const SECTOR_TEASER_INDICES = [0, 1, 2, 3, 4, 5]

function HomePage({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const tServices = useTranslations('services')
  const tIndustries = useTranslations('industries')

  const sectors = tIndustries.raw('sectors') as string[]
  const teaserSectors = SECTOR_TEASER_INDICES.map((i) => sectors[i]).filter(Boolean)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[var(--gix-blue)] to-[var(--gix-blue)]/80 py-20 sm:py-28"
        aria-labelledby="hero-heading"
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Tagline pill */}
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
              {/* Source: Company Profile PDF, Page 1 */}
              {t('heroTagline')}
            </p>

            <h1
              id="hero-heading"
              className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {t('heroTitle')}
            </h1>

            <p className="mt-6 text-lg text-white/85 sm:text-xl">
              {t('heroSubtitle')}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/services`}
                className="inline-flex min-h-[44px] items-center rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[var(--gix-blue)] shadow hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--gix-blue)]"
              >
                {t('ctaServices')}
              </Link>
              <Link
                href={`/${locale}/company`}
                className="inline-flex min-h-[44px] items-center rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--gix-blue)]"
              >
                {t('ctaProfile')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Pages 1, 3, 8 */}
      <section
        className="border-b border-[var(--border)] bg-[var(--surface)]"
        aria-label="Key facts"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 divide-y divide-[var(--border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* 7+ Service Domains — headline only, not a structural claim */}
            <div className="flex flex-col items-center py-8 px-4 text-center">
              <dt className="text-sm font-medium text-[var(--foreground-subtle)]">
                {t('stats.serviceDomainsLabel')}
              </dt>
              <dd
                className="mt-2 text-4xl font-extrabold text-[var(--gix-blue)]"
                aria-label="7 plus service domains"
              >
                {/* Source: Company Profile PDF, Page 3 — quoted headline */}
                {t('stats.serviceDomainsValue')}+
              </dd>
              {/* Quoted to signal source language, not a precise structural count */}
              <p className="mt-1 text-xs text-[var(--foreground-subtle)]">
                {t('stats.serviceDomainsNote')}
              </p>
            </div>

            {/* 24/7 Technical Support */}
            <div className="flex flex-col items-center py-8 px-4 text-center">
              <dt className="text-sm font-medium text-[var(--foreground-subtle)]">
                {t('stats.supportLabel')}
              </dt>
              <dd className="mt-2 text-4xl font-extrabold text-[var(--gix-blue)]">
                {t('stats.supportValue')}
              </dd>
            </div>

            {/* 100% Safety-First — policy statement, never a metric */}
            <div className="flex flex-col items-center py-8 px-4 text-center">
              <dt className="text-sm font-medium text-[var(--foreground-subtle)]">
                {t('stats.safetyLabel')}
              </dt>
              <dd className="mt-2 text-4xl font-extrabold text-[var(--gix-green)]">
                {t('stats.safetyValue')}
              </dd>
              <p className="mt-1 text-xs text-[var(--foreground-subtle)]">
                {t('stats.safetyNote')}
              </p>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Services preview ──────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 5 */}
      <section
        className="py-16 sm:py-20"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="services-heading"
              className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl"
            >
              {t('servicesTitle')}
            </h2>
            <p className="mt-3 text-[var(--foreground-subtle)]">{t('servicesSubtitle')}</p>
          </div>

          {/* 6-column grid on desktop, 1-column on mobile */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((service) => {
              const capabilities = tServices.raw(
                `groups.${service.nameKey}.capabilities`,
              ) as string[]
              return (
                <ServiceCard
                  key={service.slug}
                  name={tServices(`groups.${service.nameKey}.name`)}
                  description={tServices(`groups.${service.nameKey}.description`)}
                  capabilities={capabilities}
                  icon={service.icon}
                  slug={service.slug}
                  locale={locale}
                />
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-[var(--gix-blue)] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[var(--gix-blue)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gix-blue)] focus:ring-offset-2"
            >
              {t('viewAllSectors')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Partner with Us ───────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 9 */}
      <section
        className="bg-[var(--surface)] py-16 sm:py-20"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="features-heading"
              className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl"
            >
              {t('featureTitle')}
            </h2>
            <p className="mt-3 text-[var(--foreground-subtle)]">{t('featureSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {(
              [
                'qualifiedTeam',
                'reliableDelivery',
                'safetyCommitment',
                'ethiopianOwned',
              ] as const
            ).map((key) => (
              <div
                key={key}
                className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--gix-blue)]/10 text-[var(--gix-blue)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--foreground-subtle)]">
                    {t(`features.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sectors teaser ────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 9 — target sectors, NOT existing clients */}
      <section
        className="py-16 sm:py-20"
        aria-labelledby="sectors-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-center">
            <h2
              id="sectors-heading"
              className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl"
            >
              {t('sectorsTitle')}
            </h2>
            <p className="mt-3 text-[var(--foreground-subtle)]">{t('sectorsSubtitle')}</p>
          </div>

          {/* Disclaimer — sectors are target/prospective, not confirmed clients */}
          <p className="mb-8 text-center text-sm text-[var(--foreground-subtle)] italic">
            {t('sectorsDisclaimer')}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teaserSectors.map((sector, i) => (
              <SectorCard
                key={i}
                name={sector}
                order={i + 1}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/industries`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-6 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--soft-surface)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gix-blue)] focus:ring-offset-2"
            >
              {t('viewAllSectors')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section
        className="bg-[var(--gix-blue)] py-16"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="cta-heading"
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            {t('ctaTitle')}
          </h2>
          <p className="mt-4 text-lg text-white/85">{t('ctaSubtitle')}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-flex min-h-[44px] items-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-[var(--gix-blue)] hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--gix-blue)]"
          >
            {t('ctaContact')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params
  return <HomePage locale={locale} />
}
