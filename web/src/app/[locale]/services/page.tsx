import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export const revalidate = 3600

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://gixnexustelecom.com'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  const title = t('pageTitle')
  const description = 'GIX Nexus services: Telecommunications Infrastructure, Fiber Optic, Satellite & Wireless Communications, RF Engineering, Network Infrastructure, Telecom Power Systems, SMATV/MATV, and Maintenance & Technical Support across Ethiopia.'
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: { en: `${BASE_URL}/en/services`, am: `${BASE_URL}/am/services` },
    },
    openGraph: {
      title: `${title} | GIX Nexus Telecom and Power`,
      description,
      url: `${BASE_URL}/${locale}/services`,
    },
  }
}

const SERVICES = [
  {
    slug: 'telecommunications-infrastructure',
    nameKey: 'telecomInfrastructure',
    image: '/images/services/telecom-infrastructure.jpg',
    imageAlt: 'Telecommunications infrastructure installation',
    highlights: ['BTS/NodeB/eNodeB/5G site installation', 'Antenna installation and alignment', 'Feeder cable installation', 'Site integration and commissioning'],
  },
  {
    slug: 'fiber-optic-solutions',
    nameKey: 'fiberOptic',
    image: '/images/services/fiber-optic-cables.jpg',
    imageAlt: 'Fiber optic cable installation and splicing',
    highlights: ['Underground and aerial fiber installation', 'OTDR testing', 'Fiber splicing and joint closure', 'Last-mile fiber deployment'],
  },
  {
    slug: 'satellite-wireless-communications',
    nameKey: 'satelliteWireless',
    image: '/images/services/satellite-dish.jpg',
    imageAlt: 'VSAT satellite dish installation',
    highlights: ['VSAT antenna installation and commissioning', 'BUC/LNB replacement', 'Microwave radio link installation', 'RF troubleshooting'],
  },
  {
    slug: 'rf-engineering',
    nameKey: 'rfEngineering',
    image: '/images/services/rf-engineering.jpg',
    imageAlt: 'RF engineering and antenna feed systems',
    highlights: ['RF signal testing and measurement', 'Spectrum analysis', 'BUC, LNB & RF chain support', 'Interference troubleshooting'],
  },
  {
    slug: 'network-infrastructure',
    nameKey: 'networkInfrastructure',
    image: '/images/services/network-infrastructure.jpg',
    imageAlt: 'Network infrastructure and cabling',
    highlights: ['Cat6/Cat6A/Cat7 structured cabling', 'Fluke testing and certification', 'LAN/WAN infrastructure', 'Network rack installation'],
  },
  {
    slug: 'telecom-power-systems',
    nameKey: 'telecomPower',
    image: '/images/services/telecom-power-systems-dc-power-systems.png',
    imageAlt: 'Telecom power system installation',
    highlights: ['DC power system installation', 'Rectifier and UPS installation', 'Battery bank installation', 'Solar-powered telecom sites'],
  },
  {
    slug: 'smatv-matv-solutions',
    nameKey: 'smatvMatv',
    image: '/images/services/smatv-matv.jpg',
    imageAlt: 'SMATV/MATV satellite TV distribution system',
    highlights: ['SMATV and MATV system installation', 'Headend equipment configuration', 'RF signal testing and optimization', 'Multiswitch and distribution equipment'],
  },
  {
    slug: 'maintenance-technical-support',
    nameKey: 'maintenance',
    image: '/images/services/maintenance-and-tehnical-suport.webp',
    imageAlt: 'Field maintenance and technical support',
    highlights: ['Preventive and corrective maintenance', 'Emergency fault response', '24/7 technical support', 'Equipment replacement and upgrades'],
  },
] as const

function ServicesPage({ locale }: { locale: string }) {
  const t = useTranslations('services')

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* Background: telecom towers at night */}
          <Image
            src="/images/hero/telecom-towers-night.jpg"
            alt=""
            fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover hero-pan"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,18,54,0.75) 0%, rgba(6,18,54,0.55) 55%, rgba(6,18,54,0.35) 100%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">What We Offer</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t('pageTitle')}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-[var(--foreground-muted)] leading-relaxed">{t('pageDescription')}</p>
        </div>
      </section>

      {/* ── Service Cards ─────────────────────────────────────────── */}
      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-[var(--border)] flex flex-col gap-y-4">
            {SERVICES.map((service, index) => {
              const capabilities = t.raw(`groups.${service.nameKey}.capabilities`) as string[]
              const isEven = index % 2 === 0
              return (
                <div key={service.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-20">

                  {/* Image — alternating left/right layout */}
                  <div className={`rounded-2xl overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative h-80 lg:h-96">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover hero-pan"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,17,28,0.6) 0%, transparent 50%)' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                      Service {String(index + 1).padStart(2, '0')} of 08
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
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional outdoor/indoor details — Source: Company Profile PDF, Pages 6, 7 */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--foreground-subtle)' }}>Includes</p>
                      <div className="flex flex-wrap gap-2">
                        {service.highlights.map((item, i) => (
                          <span key={i} className="rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: 'var(--border)', color: 'var(--foreground-subtle)' }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href={`/${locale}/contact`}
                      className="mt-6 inline-flex min-h-[44px] items-center rounded-lg bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">
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
