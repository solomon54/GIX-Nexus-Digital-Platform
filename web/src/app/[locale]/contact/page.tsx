import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://gixnexustelecom.com'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  const title = t('pageTitle')
  const description = 'Contact GIX Nexus Telecom and Power — Addis Ababa, Ethiopia. Phone: +251 911 509 555. Email: gixnexustelecom@gmail.com. Professional SATCOM, VSAT, RF, fiber optic, and telecom engineering services across Ethiopia.'
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        am: `${BASE_URL}/am/contact`,
      },
    },
    openGraph: {
      title: `${title} | GIX Nexus Telecom and Power`,
      description,
      url: `${BASE_URL}/${locale}/contact`,
    },
  }
}

function ContactPage() {
  const t = useTranslations('contact')

  return (
    <>
      {/* LocalBusiness structured data — helps Google show contact info in search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            '@id': `${BASE_URL}/#organization`,
            name: 'GIX Nexus Telecom and Power',
            url: BASE_URL,
            logo: `${BASE_URL}/assets/company-logo.png`,
            image: `${BASE_URL}/assets/leader-prof-img.png`,
            description: 'Ethiopian-owned telecommunications and power engineering company. Specializing in SATCOM, VSAT, RF engineering, fiber optic, network infrastructure, SMATV/MATV, and telecom power solutions. GVF-certified. 20+ years SATCOM experience.',
            telephone: '+251911509555',
            email: 'gixnexustelecom@gmail.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Addis Ababa',
              addressCountry: 'ET',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 9.0222,
              longitude: 38.7469,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
            areaServed: { '@type': 'Country', name: 'Ethiopia' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Telecommunications & Engineering Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SATCOM & VSAT Installation' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RF Engineering' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fiber Optic Solutions' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Network Infrastructure' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SMATV/MATV Solutions' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Telecom Power Systems' } },
              ],
            },
          }),
        }}
      />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        {/* Background: hero image for contact */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-1.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,13,26,0.72) 0%, rgba(11,23,38,0.50) 60%, rgba(5,13,26,0.35) 100%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">{t('heroEyebrow')}</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t('pageTitle')}</h1>
          <p className="mt-5 max-w-3xl mx-auto text-lg text-[var(--foreground-muted)] leading-relaxed">{t('heroDescription')}</p>
        </div>
      </section>

      {/* ── Contact Info ─────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 10 — contact details */}
      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: Contact card with MD photo */}
            <div>
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                {/* MD photo */}
                <div className="relative h-64">
                  <Image
                    src="/assets/leader-prof-img.png"
                    alt="Getachew Teshome — Managing Director, GIX Nexus Telecom and Power"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.9), transparent 60%)' }} />
                  <div className="absolute bottom-4 left-5">
                    {/* Source: Company Profile PDF, Page 10 */}
                    <p className="font-semibold text-white">{t('mdName')}</p>
                    <p className="text-sm text-[var(--foreground-muted)]">{t('mdLabel')}</p>
                  </div>
                </div>

                <div className="p-6 space-y-5" style={{ background: 'var(--surface)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{t('intro')}</p>

                  {/* Phone — Source: Company Profile PDF, Page 10 */}
                  <a href={`tel:${t('phone')}`}
                    className="flex items-center gap-4 p-4 rounded-xl border group hover:border-[var(--accent)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                    style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg" style={{ background: 'var(--accent-light)' }}>
                      📞
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>{t('phoneLabel')}</p>
                      <p className="text-base font-semibold text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">
                        {/* Source: Company Profile PDF, Page 10 */}
                        +251 911509555
                      </p>
                    </div>
                  </a>

                  {/* Email — Source: Company Profile PDF, Page 10 */}
                  <a href={`mailto:${t('email')}`}
                    className="flex items-center gap-4 p-4 rounded-xl border group hover:border-[var(--accent)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                    style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg" style={{ background: 'var(--accent-light)' }}>
                      ✉️
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>{t('emailLabel')}</p>
                      <p className="text-base font-semibold text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors break-all">
                        {/* Source: Company Profile PDF, Page 10 */}
                        gixnexustelecom@gmail.com
                      </p>
                    </div>
                  </a>

                  {/* Address — Source: Company Profile PDF, Page 10 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg" style={{ background: 'var(--green-light)' }}>
                      📍
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>{t('addressLabel')}</p>
                      {/* Source: Company Profile PDF, Page 10 */}
                      <p className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>Addis Ababa, Ethiopia</p>
                      <p className="text-xs text-[#00C97A]">Operating Across Ethiopia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info panels */}
            <div className="space-y-6">
              <div className="rounded-2xl p-6 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--foreground)' }}>About GIX Nexus</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground-subtle)' }}>
                  {/* Source: Company Profile PDF, Page 1 */}
                  An Ethiopian-owned telecommunications and power engineering company delivering reliable, innovative, and cost-effective infrastructure solutions across Ethiopia — from site surveys and installation to commissioning, maintenance, and 24/7 technical support.
                </p>
                <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--foreground-subtle)' }}>Ownership</span>
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>Ethiopian-owned</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--foreground-subtle)' }}>Operations</span>
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>Across Ethiopia</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--foreground-subtle)' }}>Support</span>
                    <span className="font-medium text-[var(--accent)]">24/7 Technical</span>
                  </div>
                  {/* Across Ethiopia — Source: Company Profile PDF, Page 1 */}
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--foreground-subtle)' }}>Operations</span>
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>Across Ethiopia</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-4 border" style={{ background: 'var(--soft-surface)', borderColor: 'var(--border)' }}>
                <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>
                  <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Response: </span>
                  {t('responseNote')}
                </p>
                <p className="mt-2 text-sm" style={{ color: 'var(--foreground-subtle)' }}>
                  {t('operationsNote')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <ContactPage />
}
