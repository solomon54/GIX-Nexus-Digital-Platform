import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'futureGoals' })
  return { title: t('pageTitle'), description: t('disclaimerBanner') }
}

function FutureGoalsPage({ locale }: { locale: string }) {
  const t = useTranslations('futureGoals')
  const objectives = t.raw('objectives') as Array<{ number: string; title: string; description: string }>

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* Background: forward-looking image — East Africa horizon, infrastructure growth */}
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.94), rgba(11,23,38,0.88))' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#65D51A] mb-3">{t('pageSubtitle')}</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t('pageTitle')}</h1>
        </div>
      </section>

      {/* Objectives — Source: Company Profile PDF, Page 10 */}
      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* CRITICAL disclaimer — these are PLANNED objectives, not current achievements */}
          <div className="mb-12 rounded-xl border border-[#65D51A]/30 bg-[#65D51A]/5 p-5 text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{t('disclaimerBanner')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {objectives.map((obj) => (
              <div key={obj.number} className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                {/* "Objective / Planned" badge — ALWAYS present per governance rules */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#65D51A]/30 bg-[#65D51A]/10 px-2.5 py-1 mb-4">
                  <span className="text-xs font-semibold text-[#65D51A]">{t('objectiveBadge')}</span>
                </div>
                <div className="text-3xl font-bold text-[#008CFF] mb-2">{obj.number}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--foreground)' }}>{obj.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{obj.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm mb-6 max-w-xl mx-auto" style={{ color: 'var(--foreground-subtle)' }}>
              {/* Source: Company Profile PDF, Page 10 */}
              GIX Nexus Telecom and Power is committed to sustainable growth and continuous improvement, becoming a trusted telecommunications and power engineering partner in Ethiopia and the East African region.
            </p>
            <Link href={`/${locale}/contact`}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-[#008CFF] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3FABFF] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <FutureGoalsPage locale={locale} />
}
