import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SERVICE_SLUGS } from '@/lib/constants'

type ServiceSlug = (typeof SERVICE_SLUGS)[number]

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

// Source: Company Profile PDF, Page 5 — exactly 6 service groupings
const SLUG_TO_KEY: Record<ServiceSlug, string> = {
  'telecommunications-infrastructure': 'telecomInfrastructure',
  'fiber-optic-solutions': 'fiberOptic',
  'satellite-wireless-communications': 'satelliteWireless',
  'network-infrastructure': 'networkInfrastructure',
  'telecom-power-systems': 'telecomPower',
  'maintenance-technical-support': 'maintenance',
}

const SLUG_TO_ICON: Record<ServiceSlug, string> = {
  'telecommunications-infrastructure': 'Tower',
  'fiber-optic-solutions': 'Cable',
  'satellite-wireless-communications': 'Radio',
  'network-infrastructure': 'Network',
  'telecom-power-systems': 'Zap',
  'maintenance-technical-support': 'Wrench',
}

export function generateStaticParams() {
  return SERVICE_SLUGS.flatMap((slug) =>
    ['en', 'am'].map((locale) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const nameKey = SLUG_TO_KEY[slug as ServiceSlug]
  if (!nameKey) return { title: 'Service Not Found' }
  const t = await getTranslations({ locale, namespace: 'services' })
  return {
    title: t(`groups.${nameKey}.name`),
    description: t(`groups.${nameKey}.description`),
  }
}

function ServiceDetailPage({ locale, slug }: { locale: string; slug: string }) {
  const t = useTranslations('services')
  const tCommon = useTranslations('common')
  const tNav = useTranslations('nav')

  const nameKey = SLUG_TO_KEY[slug as ServiceSlug]
  if (!nameKey) notFound()

  const capabilities = t.raw(`groups.${nameKey}.capabilities`) as string[]
  const name = t(`groups.${nameKey}.name`)
  const description = t(`groups.${nameKey}.description`)

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--muted-foreground)]" aria-label="Breadcrumb">
          <Link
            href={`/${locale}`}
            className="hover:text-[var(--brand-blue)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--brand-blue)] rounded"
          >
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/${locale}/services`}
            className="hover:text-[var(--brand-blue)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--brand-blue)] rounded"
          >
            {tNav('services')}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--foreground)]">{name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">{name}</h1>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">{description}</p>
        </div>

        {/* Capabilities */}
        <section aria-labelledby="capabilities-heading">
          <h2
            id="capabilities-heading"
            className="mb-6 text-xl font-bold text-[var(--foreground)]"
          >
            {t('capabilitiesLabel')}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
            {capabilities.map((cap, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue)]/10"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 text-[var(--brand-blue)]"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-sm text-[var(--foreground)]">{cap}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href={`/${locale}/services`}
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--brand-blue)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-2 rounded"
          >
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
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {tNav('services')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function Page({ params }: ServiceDetailPageProps) {
  const { locale, slug } = await params
  // Validate slug
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) {
    notFound()
  }
  return <ServiceDetailPage locale={locale} slug={slug} />
}
