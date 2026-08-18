import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
// Source: Company Profile PDF, Page 10
import { CONTACT } from '@/lib/constants'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('pageTitle'),
    description: t('intro'),
  }
}

// GOVERNANCE: No form, no client portal, no CRM.
// Static display of MD contact information only.
// Source: Company Profile PDF, Page 10
function ContactPage() {
  const t = useTranslations('contact')

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-4 text-lg text-[var(--foreground-subtle)]">{t('intro')}</p>
        </div>

        {/* Contact card */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          {/* Header bar */}
          <div className="bg-[var(--gix-blue)] px-8 py-6">
            <p className="text-sm font-medium text-white/80">{t('mdLabel')}</p>
            {/* Source: Company Profile PDF, Page 10 */}
            <p className="mt-1 text-2xl font-bold text-white">{CONTACT.name}</p>
            <p className="text-sm text-white/80">{CONTACT.title}</p>
          </div>

          {/* Contact details */}
          <div className="divide-y divide-[var(--border)] px-8">
            {/* Phone */}
            <div className="flex items-center gap-4 py-5">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gix-blue)]/10"
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
                  className="h-5 w-5 text-[var(--gix-blue)]"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-subtle)]">
                  {t('phoneLabel')}
                </p>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-lg font-medium text-[var(--foreground)] hover:text-[var(--gix-blue)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gix-blue)] rounded"
                >
                  {/* Source: Company Profile PDF, Page 10 */}
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 py-5">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gix-blue)]/10"
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
                  className="h-5 w-5 text-[var(--gix-blue)]"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-subtle)]">
                  {t('emailLabel')}
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-lg font-medium text-[var(--foreground)] hover:text-[var(--gix-blue)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gix-blue)] rounded break-all"
                >
                  {/* Source: Company Profile PDF, Page 10 */}
                  {CONTACT.email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 py-5">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gix-blue)]/10"
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
                  className="h-5 w-5 text-[var(--gix-blue)]"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--foreground-subtle)]">
                  {t('addressLabel')}
                </p>
                {/* Source: Company Profile PDF, Page 10 */}
                <p className="text-lg font-medium text-[var(--foreground)]">{CONTACT.address}</p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="border-t border-[var(--border)] bg-[var(--soft-surface)]/30 px-8 py-4">
            <p className="text-sm text-[var(--foreground-subtle)]">{t('responseNote')}</p>
            <p className="mt-1 text-sm text-[var(--foreground-subtle)]">{t('operationsNote')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function Page({ params }: ContactPageProps) {
  await params
  return <ContactPage />
}
