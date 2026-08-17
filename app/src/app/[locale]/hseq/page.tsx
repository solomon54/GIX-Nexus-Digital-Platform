import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { HseqBadge } from '@/components/ui/HseqBadge'

interface HseqPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HseqPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hseq' })
  return {
    title: t('pageTitle'),
    description: t('policyText'),
  }
}

function HseqPage() {
  const t = useTranslations('hseq')

  const programElements = t.raw('programElements') as string[]
  const equipmentItems = t.raw('equipmentItems') as string[]

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-4">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-2 text-lg font-medium text-[var(--brand-blue)]">
            {t('pageSubtitle')}
          </p>
        </div>

        {/* ── Policy overview ───────────────────────────────────── */}
        {/* Source: Company Profile PDF, Page 8 */}
        <section className="mb-12" aria-labelledby="policy-heading">
          <h2
            id="policy-heading"
            className="mb-4 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('policyHeading')}
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed">{t('policyText')}</p>
        </section>

        {/* ── HSEQ Key Statements ───────────────────────────────── */}
        {/*
          IMPORTANT:
          - "Zero Accident Objective" = a goal/commitment, NOT a reported metric
          - "100% Safety-first" = a policy statement, NOT a historical performance figure
          Source: Company Profile PDF, Pages 3, 8
        */}
        <section className="mb-12" aria-labelledby="statements-heading">
          <h2 id="statements-heading" className="sr-only">
            HSEQ Key Commitments
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <HseqBadge
              variant="objective"
              label={t('zeroAccidentLabel')}
              description={t('zeroAccidentDescription')}
              badgeText={t('zeroAccidentBadge')}
            />
            <HseqBadge
              variant="policy"
              label={t('safetyFirstLabel')}
              description={t('safetyFirstDescription')}
              badgeText={t('safetyFirstBadge')}
            />
          </div>
        </section>

        {/* ── HSEQ Program Elements ─────────────────────────────── */}
        {/* Source: Company Profile PDF, Page 8 */}
        <section className="mb-12" aria-labelledby="program-heading">
          <h2
            id="program-heading"
            className="mb-6 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('programTitle')}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {programElements.map((element, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-green)]/10"
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
                    className="h-4 w-4 text-[var(--brand-green)]"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[var(--foreground)]">{element}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Safety Equipment ──────────────────────────────────── */}
        {/* Source: Company Profile PDF, Page 9 */}
        <section aria-labelledby="equipment-heading">
          <h2
            id="equipment-heading"
            className="mb-6 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('equipmentTitle')}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
            {equipmentItems.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3"
              >
                <span
                  className="h-2 w-2 flex-shrink-0 rounded-full bg-[var(--brand-blue)]"
                  aria-hidden="true"
                />
                <span className="text-sm text-[var(--foreground)]">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default async function Page({ params }: HseqPageProps) {
  await params
  return <HseqPage />
}
