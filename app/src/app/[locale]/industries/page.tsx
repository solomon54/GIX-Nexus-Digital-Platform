import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industries' })
  return { title: t('pageTitle'), description: t('disclaimer') }
}

// Source: Company Profile PDF, Page 9 — 14 target sectors with representative icons
const SECTOR_ICONS = ['📡', '🔧', '🌐', '🏛', '⚡', '🌍', '🏛', '🤝', '🏦', '🖥', '🛡', '🎓', '🏭', '🏗'] as const

function IndustriesPage({ locale }: { locale: string }) {
  const t = useTranslations('industries')
  const sectors = t.raw('sectors') as string[]

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/industries/companies-we-serve.webp"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.94), rgba(11,23,38,0.88))' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-3">{t('pageSubtitle')}</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t('pageTitle')}</h1>
          <p className="mt-5 max-w-2xl mx-auto text-sm italic text-[#B9C6D3] leading-relaxed">{t('disclaimer')}</p>
        </div>
      </section>

      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectors.map((sector, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border p-5 transition-colors hover:border-[#008CFF]/40"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: 'rgba(0,140,255,0.1)' }}>
                  {SECTOR_ICONS[i]}
                </div>
                <div>
                  <p className="font-medium text-sm leading-snug" style={{ color: 'var(--foreground)' }}>{sector}</p>
                  <p className="text-xs mt-0.5 text-[#008CFF]">Target Sector</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl p-8 text-center border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Is Your Organization in One of These Sectors?</h2>
            <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--foreground-subtle)' }}>
              GIX Nexus Telecom and Power welcomes opportunities to work as a contractor or subcontractor across all of these sectors throughout Ethiopia.
            </p>
            <Link href={`/${locale}/contact`} className="inline-flex min-h-[44px] items-center rounded-lg bg-[#008CFF] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3FABFF] transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <IndustriesPage locale={locale} />
}
