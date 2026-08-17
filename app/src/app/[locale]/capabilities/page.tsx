import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

interface CapabilitiesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: CapabilitiesPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'capabilities' })
  return {
    title: t('pageTitle'),
    description: t('pageSubtitle'),
  }
}

function CapabilitiesPage() {
  const t = useTranslations('capabilities')

  // Source: Company Profile PDF, Pages 2, 8 — personnel roles
  const personnelRoles = t.raw('personnelRoles') as string[]

  // Source: Company Profile PDF, Page 9 — equipment categories
  const equipmentCategories = [
    'testInstruments',
    'installationTools',
    'safetyEquipment',
  ] as const

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-2 text-lg text-[var(--muted-foreground)]">{t('pageSubtitle')}</p>
        </div>

        {/* ── Technical Personnel ───────────────────────────────── */}
        {/* Source: Company Profile PDF, Pages 2, 8 */}
        <section className="mb-16" aria-labelledby="personnel-heading">
          <h2
            id="personnel-heading"
            className="mb-6 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('personnelTitle')}
          </h2>
          <ul
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {personnelRoles.map((role, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue)]/10"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-[var(--brand-blue)]"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[var(--foreground)]">{role}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Equipment & Tools ─────────────────────────────────── */}
        {/* Source: Company Profile PDF, Page 9 */}
        <section aria-labelledby="equipment-heading">
          <h2
            id="equipment-heading"
            className="mb-6 text-2xl font-bold text-[var(--foreground)]"
          >
            {t('equipmentTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {equipmentCategories.map((category) => {
              const items = t.raw(
                `equipmentCategories.${category}.items`,
              ) as string[]
              return (
                <div
                  key={category}
                  className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
                >
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {t(`equipmentCategories.${category}.name`)}
                  </h3>
                  <ul className="flex flex-col gap-2" role="list">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-blue)]"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default async function Page({ params }: CapabilitiesPageProps) {
  await params
  return <CapabilitiesPage />
}
