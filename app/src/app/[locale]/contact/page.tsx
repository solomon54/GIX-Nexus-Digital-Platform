import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: t('pageTitle'), description: t('intro') }
}

function ContactPage() {
  const t = useTranslations('contact')

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        {/* Background: Addis Ababa cityscape / Ethiopia */}
        {/* Image: Unsplash photo-1501854140801 — panoramic landscape, Ethiopia feel */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.93), rgba(11,23,38,0.88))' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-3">Reach Us</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t('pageTitle')}</h1>
          <p className="mt-4 text-lg text-[#B9C6D3]">{t('pageSubtitle')}</p>
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
                    <p className="text-sm text-[#B9C6D3]">{t('mdLabel')}</p>
                  </div>
                </div>

                <div className="p-6 space-y-5" style={{ background: 'var(--surface)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{t('intro')}</p>

                  {/* Phone — Source: Company Profile PDF, Page 10 */}
                  <a href={`tel:${t('phone')}`}
                    className="flex items-center gap-4 p-4 rounded-xl border group hover:border-[#008CFF]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2"
                    style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg" style={{ background: 'rgba(0,140,255,0.12)' }}>
                      📞
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>{t('phoneLabel')}</p>
                      <p className="text-base font-semibold text-[#008CFF] group-hover:text-[#12C8FF] transition-colors">
                        {/* Source: Company Profile PDF, Page 10 */}
                        +251 911509555
                      </p>
                    </div>
                  </a>

                  {/* Email — Source: Company Profile PDF, Page 10 */}
                  <a href={`mailto:${t('email')}`}
                    className="flex items-center gap-4 p-4 rounded-xl border group hover:border-[#008CFF]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2"
                    style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg" style={{ background: 'rgba(0,140,255,0.12)' }}>
                      ✉️
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>{t('emailLabel')}</p>
                      <p className="text-base font-semibold text-[#008CFF] group-hover:text-[#12C8FF] transition-colors break-all">
                        {/* Source: Company Profile PDF, Page 10 */}
                        gixnexustelecom@gmail.com
                      </p>
                    </div>
                  </a>

                  {/* Address — Source: Company Profile PDF, Page 10 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg" style={{ background: 'rgba(101,213,26,0.12)' }}>
                      📍
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--foreground-subtle)' }}>{t('addressLabel')}</p>
                      {/* Source: Company Profile PDF, Page 10 */}
                      <p className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>Addis Ababa, Ethiopia</p>
                      <p className="text-xs text-[#65D51A]">Operating Across Ethiopia</p>
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
                    <span className="font-medium text-[#008CFF]">24/7 Technical</span>
                  </div>
                  {/* Source: Company Profile PDF, Page 1 */}
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--foreground-subtle)' }}>Status</span>
                    <span className="font-medium text-[#65D51A]">Vendor Registration Ready</span>
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
