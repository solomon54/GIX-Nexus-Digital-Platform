import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
// Source: Company Profile PDF, Page 10
import { CONTACT } from '@/lib/constants'

interface CompanyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'company' })
  return {
    title: t('pageTitle'),
    description: t('overviewText'),
  }
}

function CompanyPage() {
  const t = useTranslations('company')

  const missionPoints = t.raw('missionPoints') as string[]
  const values = [
    'timeToMarket',
    'qualityWorkmanship',
    'safetyFirst',
    'customerFocused',
    'integrity',
    'continuousImprovement',
  ] as const

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            {t('pageTitle')}
          </h1>
        </div>

        {/* ── Overview ──────────────────────────────────────────── */}
        <section className="mb-16" aria-labelledby="overview-heading">
          <h2
            id="overview-heading"
            className="mb-4 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('overviewTitle')}
          </h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <p className="text-[var(--foreground)] leading-relaxed">{t('overviewText')}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-[var(--brand-blue)]/10 px-4 py-1.5 text-sm font-medium text-[var(--brand-blue)]">
                {/* Source: Company Profile PDF, Page 1 */}
                🇪🇹 Ethiopian-Owned
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[var(--muted)] px-4 py-1.5 text-sm font-medium text-[var(--foreground)]">
                📍 {t('hqValue')}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[var(--muted)] px-4 py-1.5 text-sm font-medium text-[var(--foreground)]">
                🗺️ {t('operationsValue')}
              </div>
              {/* Source: Company Profile PDF, Page 1 — status only, no portal */}
              <div className="flex items-center gap-2 rounded-full bg-[var(--brand-green)]/10 px-4 py-1.5 text-sm font-medium text-[var(--brand-green)]">
                ✓ {t('vendorStatus')}
              </div>
            </div>
          </div>
        </section>

        {/* ── Vision ────────────────────────────────────────────── */}
        {/* Source: Company Profile PDF, Page 4 — verbatim */}
        <section className="mb-16" aria-labelledby="vision-heading">
          <h2
            id="vision-heading"
            className="mb-4 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('visionTitle')}
          </h2>
          <blockquote className="rounded-xl border-l-4 border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 p-6 sm:p-8">
            <p className="text-lg font-medium italic text-[var(--foreground)] leading-relaxed">
              &ldquo;{t('vision')}&rdquo;
            </p>
          </blockquote>
        </section>

        {/* ── Mission ───────────────────────────────────────────── */}
        {/* Source: Company Profile PDF, Page 4 — 5 mission points */}
        <section className="mb-16" aria-labelledby="mission-heading">
          <h2
            id="mission-heading"
            className="mb-6 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('missionTitle')}
          </h2>
          <ol className="flex flex-col gap-4" role="list">
            {missionPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
              >
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue)] text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-[var(--foreground)]">{point}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Core Values ───────────────────────────────────────── */}
        {/* Source: Company Profile PDF, Page 4 — 6 core values */}
        <section className="mb-16" aria-labelledby="values-heading">
          <h2
            id="values-heading"
            className="mb-6 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((key) => (
              <div
                key={key}
                className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
              >
                <div className="h-1 w-10 rounded-full bg-[var(--brand-blue)]" aria-hidden="true" />
                <h3 className="font-semibold text-[var(--foreground)]">
                  {t(`values.${key}.name`)}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Leadership ────────────────────────────────────────── */}
        {/* Source: Company Profile PDF, Page 10 */}
        <section aria-labelledby="leadership-heading">
          <h2
            id="leadership-heading"
            className="mb-6 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('leadershipTitle')}
          </h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              {/* Avatar placeholder */}
              <div
                className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue)]/10 text-3xl"
                aria-hidden="true"
              >
                GT
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  {/* Source: Company Profile PDF, Page 10 */}
                  <p className="text-xl font-bold text-[var(--foreground)]">
                    {CONTACT.name}
                  </p>
                  <p className="text-sm font-medium text-[var(--brand-blue)]">
                    {t('mdTitle')}
                  </p>
                </div>

                {/* Source: Company Profile PDF, Page 10 — MD message verbatim */}
                <blockquote className="border-l-4 border-[var(--brand-blue)] pl-4">
                  <p className="italic text-[var(--foreground)] leading-relaxed">
                    &ldquo;{t('mdMessage')}&rdquo;
                  </p>
                </blockquote>

                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="flex items-center gap-1.5 text-[var(--muted-foreground)] hover:text-[var(--brand-blue)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--brand-blue)] rounded"
                  >
                    📞 {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-1.5 text-[var(--muted-foreground)] hover:text-[var(--brand-blue)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--brand-blue)] rounded"
                  >
                    ✉️ {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default async function Page({ params }: CompanyPageProps) {
  await params // ensure locale is resolved
  return <CompanyPage />
}
