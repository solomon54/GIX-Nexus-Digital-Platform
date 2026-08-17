import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { FutureObjectiveCard } from '@/components/ui/FutureObjectiveCard'

interface FutureGoalsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: FutureGoalsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'futureGoals' })
  return {
    title: t('pageTitle'),
    description: t('disclaimerBanner'),
  }
}

interface ObjectiveData {
  number: string
  title: string
  description: string
}

function FutureGoalsPage() {
  const t = useTranslations('futureGoals')

  // Source: Company Profile PDF, Page 10 — 8 future objectives
  // GOVERNANCE: Always labeled "Objective / Planned", never mixed with current services
  const objectives = t.raw('objectives') as ObjectiveData[]

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-2 text-lg font-medium text-[var(--brand-blue)]">
            {t('pageSubtitle')}
          </p>
        </div>

        {/*
          ── DISCLAIMER BANNER ──────────────────────────────────────
          GOVERNANCE RULE: Future objectives MUST have this visual separator.
          They must never be mixed with or presented as current services.
          Source: Company Profile PDF, Page 10 — explicitly future objectives.
        */}
        <div
          className="mb-10 rounded-xl border-2 border-amber-300 bg-amber-50 p-6 dark:border-amber-700 dark:bg-amber-900/20"
          role="note"
          aria-label="Future objectives disclaimer"
        >
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-300">
                Important Notice
              </p>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                {t('disclaimerBanner')}
              </p>
            </div>
          </div>
        </div>

        {/* Objectives list */}
        <div className="flex flex-col gap-5">
          {objectives.map((objective) => (
            <FutureObjectiveCard
              key={objective.number}
              number={objective.number}
              title={objective.title}
              description={objective.description}
              badgeLabel={t('objectiveBadge')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function Page({ params }: FutureGoalsPageProps) {
  await params
  return <FutureGoalsPage />
}
