import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  return { title: t('pageTitle'), description: t('pageDescription') }
}

// Source: Company Profile PDF, Page 5 — exactly 6 groupings
// Images: Unsplash free license — replace with real GIX field photos when available
const SERVICES = [
  {
    slug: 'telecommunications-infrastructure',
    nameKey: 'telecomInfrastructure',
    // Workers installing telecom equipment on tower — matches outdoor/indoor facilities
    image: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800&q=80',
    imageAlt: 'Telecommunications infrastructure installation',
    // Source: Company Profile PDF, Page 6 — outdoor deployment details
    outdoor: ['BTS/NodeB/eNodeB/5G site installation', 'Antenna installation and alignment', 'Feeder cable installation', 'Site integration and commissioning'],
  },
  {
    slug: 'fiber-optic-solutions',
    nameKey: 'fiberOptic',
    // Fiber optic cables with colorful light — visually accurate
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    imageAlt: 'Fiber optic cable installation and splicing',
    outdoor: ['Underground and aerial fiber installation', 'OTDR testing', 'Fiber splicing and joint closure', 'Last-mile fiber deployment'],
  },
  {
    slug: 'satellite-wireless-communications',
    nameKey: 'satelliteWireless',
    // Satellite dish against open sky — VSAT and satellite systems
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
    imageAlt: 'VSAT satellite dish installation',
    outdoor: ['VSAT antenna installation and commissioning', 'BUC/LNB replacement', 'Microwave radio link installation', 'RF troubleshooting'],
  },
  {
    slug: 'network-infrastructure',
    nameKey: 'networkInfrastructure',
    // Network rack with cables — structured cabling, LAN/WAN
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    imageAlt: 'Network infrastructure and cabling',
    outdoor: ['Cat6/Cat6A/Cat7 structured cabling', 'Fluke testing and certification', 'LAN/WAN infrastructure', 'Network rack installation'],
  },
  {
    slug: 'telecom-power-systems',
    nameKey: 'telecomPower',
    // Power infrastructure — electrical systems
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    imageAlt: 'Telecom power system installation',
    outdoor: ['DC power system installation', 'Rectifier and UPS installation', 'Battery bank installation', 'Solar-powered telecom sites'],
  },
  {
    slug: 'maintenance-technical-support',
    nameKey: 'maintenance',
    // Field engineer doing technical work
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    imageAlt: 'Field maintenance and technical support',
    outdoor: ['Preventive and corrective maintenance', 'Emergency fault response', '24/7 technical support', 'Equipment replacement and upgrades'],
  },
] as const

function ServicesPage({ locale }: { locale: string }) {
  const t = useTranslations('services')

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* Background: network/telecom overview image */}
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.95), rgba(11,23,38,0.88))' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-3">What We Offer</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t('pageTitle')}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-[#B9C6D3] leading-relaxed">{t('pageDescription')}</p>
        </div>
      </section>

      {/* ── Service Cards ─────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--background)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {SERVICES.map((service, index) => {
              const capabilities = t.raw(`groups.${service.nameKey}.capabilities`) as string[]
              const isEven = index % 2 === 0
              return (
                <div key={service.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                  {/* Image — alternating left/right layout */}
                  <div className={`rounded-2xl overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative h-72 lg:h-80">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,17,28,0.6) 0%, transparent 50%)' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#008CFF] mb-2">
                      Service {String(index + 1).padStart(2, '0')} of 06
                    </p>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                      {t(`groups.${service.nameKey}.name`)}
                    </h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--foreground-subtle)' }}>
                      {t(`groups.${service.nameKey}.description`)}
                    </p>

                    {/* Capabilities list — Source: Company Profile PDF, Page 5 */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--foreground-subtle)' }}>Capabilities</p>
                      <ul className="space-y-2">
                        {capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--foreground)' }}>
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#008CFF]" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional outdoor/indoor details — Source: Company Profile PDF, Pages 6, 7 */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--foreground-subtle)' }}>Includes</p>
                      <div className="flex flex-wrap gap-2">
                        {service.outdoor.map((item, i) => (
                          <span key={i} className="rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: 'var(--border)', color: 'var(--foreground-subtle)' }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href={`/${locale}/contact`}
                      className="mt-6 inline-flex min-h-[44px] items-center rounded-lg bg-[#008CFF] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#3FABFF] transition-colors">
                      Enquire About This Service
                    </Link>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <ServicesPage locale={locale} />
}
