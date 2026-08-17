import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SectorCard } from '@/components/ui/SectorCard'

interface IndustriesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: IndustriesPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industries' })
  return {
    title: t('pageTitle'),
    description: t('disclaimer'),
  }
}

function IndustriesPage() {
  const t = useTranslations('industries')

  // Source: Company Profile PDF, Page 9 — 14 target sectors
  // IMPORTANT: These are TARGET SECTORS, not existing/confirmed clients
  const sectors = t.raw('sectors') as string[]

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-4">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-2 text-lg font-medium text-[var(--brand-blue)]">
            {t('pageSubtitle')}
          </p>
        </div>

        {/* Disclaimer banner */}
        {/*
          GOVERNANCE RULE: The 14 sectors must be displayed as TARGET SECTORS,
          never as "clients" or "existing customers".
          Source: Company Profile PDF, Page 9 — "Target Clients" means prospective.
        */}
        <div
          className="mb-10 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20"
          role="note"
          aria-label="Sector disclaimer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-amber-800 dark:text-amber-300">{t('disclaimer')}</p>
        </div>

        {/* Sectors grid — all 14 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <SectorCard
              key={i}
              name={sector}
              order={i + 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function Page({ params }: IndustriesPageProps) {
  await params
  return <IndustriesPage />
}
