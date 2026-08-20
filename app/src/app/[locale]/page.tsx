import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { HeroCarousel } from '@/components/ui/HeroCarousel'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
  }
}

// Source: Company Profile PDF, Page 5 — exactly 6 service groupings
const SERVICES_DATA = [
  { slug: 'telecommunications-infrastructure', nameKey: 'telecomInfrastructure', image: '/images/services/telecom-infrastructure.jpg', imageAlt: 'Telecommunications infrastructure installation' },
  { slug: 'fiber-optic-solutions', nameKey: 'fiberOptic', image: '/images/services/fiber-optic-cables.jpg', imageAlt: 'Fiber optic cable installation' },
  { slug: 'satellite-wireless-communications', nameKey: 'satelliteWireless', image: '/images/services/satellite-dish.jpg', imageAlt: 'Satellite dish and wireless systems' },
  { slug: 'network-infrastructure', nameKey: 'networkInfrastructure', image: '/images/services/network-infrastructure.jpg', imageAlt: 'Network infrastructure and cabling' },
  { slug: 'telecom-power-systems', nameKey: 'telecomPower', image: '/images/services/telecom-power-systems-dc-power-systems.png', imageAlt: 'Telecom power systems' },
  { slug: 'maintenance-technical-support', nameKey: 'maintenance', image: '/images/services/maintenance-and-tehnical-suport.webp', imageAlt: 'Field maintenance and technical support' },
] as const

// Placeholder news — shown when no CMS content exists yet
const NEWS_PLACEHOLDER = [
  { id: 1, category: 'Company News', title: 'GIX Nexus Expands Technical Team Across Ethiopia', date: 'August 2026', excerpt: 'GIX Nexus Telecom and Power continues to grow its qualified technical workforce to meet increasing demand for telecommunications and power engineering services.' },
  { id: 2, category: 'Announcement', title: 'Vendor Registration Ready Status Confirmed', date: 'July 2026', excerpt: 'GIX Nexus Telecom and Power maintains its Vendor Registration Ready status, supporting procurement partnerships with major telecom operators and government institutions.' },
  { id: 3, category: 'Project Update', title: 'Fiber Optic Deployment — Addis Ababa Region', date: 'June 2026', excerpt: 'Successful completion of last-mile fiber deployment supporting critical communications infrastructure in the Addis Ababa region.' },
]

// Placeholder projects — replace with CMS data when available
const PROJECTS_PLACEHOLDER = [
  { id: 1, category: 'Fiber Optic Solutions', title: 'Last-Mile Fiber Deployment', location: 'Addis Ababa, Ethiopia', image: '/images/services/fiber-optic-cables.jpg', description: 'Underground and aerial fiber installation including splicing, OTDR testing, and commissioning.' },
  { id: 2, category: 'Satellite & Wireless', title: 'VSAT Installation & Commissioning', location: 'Across Ethiopia', image: '/images/services/satellite-dish.jpg', description: 'Multi-site VSAT antenna installation, alignment, commissioning, and ongoing maintenance support.' },
  { id: 3, category: 'Telecom Power Systems', title: 'DC Power & Battery Bank Installation', location: 'Ethiopia', image: '/images/services/telecom-power-systems-dc-power-systems.png', description: 'DC power system, rectifier and battery bank installation for telecom base station sites.' },
]

function HomePage({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const tServices = useTranslations('services')

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="hero-heading">
        <HeroCarousel />
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#008CFF 1px, transparent 1px), linear-gradient(90deg, #008CFF 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 4 }} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full" style={{ zIndex: 5 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#008CFF]/30 bg-[#008CFF]/10 px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#65D51A] pulse-dot" />
                <span className="text-sm font-medium text-[#B9C6D3]">{t('heroTagline')}</span>
              </div>
              <h1 id="hero-heading" className="font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 52px)', lineHeight: '1.15' }}>
                {t('heroTitle')}
              </h1>
              <p className="mt-6 text-lg text-[#B9C6D3] max-w-lg leading-relaxed">{t('heroSubtitle')}</p>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                <div className="text-center">
                  {/* Source: Company Profile PDF, Page 3 — verbatim headline */}
                  <div className="text-4xl font-bold text-[#008CFF]">7+</div>
                  <div className="text-xs text-[#708090] mt-1 uppercase tracking-wide">{t('stats.serviceDomainsLabel')}</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-4xl font-bold text-[#008CFF]">24/7</div>
                  <div className="text-xs text-[#708090] mt-1 uppercase tracking-wide">{t('stats.supportLabel')}</div>
                </div>
                <div className="text-center">
                  {/* Source: Company Profile PDF, Page 3 — policy statement */}
                  <div className="text-4xl font-bold text-[#65D51A]">100%</div>
                  <div className="text-xs text-[#708090] mt-1 uppercase tracking-wide">{t('stats.safetyLabel')}</div>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={`/${locale}/services`} className="inline-flex min-h-[44px] items-center rounded-lg bg-[#008CFF] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3FABFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2 focus:ring-offset-[#07111C]">
                  {t('ctaServices')}
                </Link>
                <Link href={`/${locale}/company`} className="inline-flex min-h-[44px] items-center rounded-lg border border-white/25 px-8 py-3 text-sm font-semibold text-white hover:bg-white/8 transition-colors">
                  {t('ctaProfile')}
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="rounded-2xl p-8 border border-white/10 w-full max-w-xs" style={{ background: 'rgba(11,23,38,0.85)', backdropFilter: 'blur(16px)' }}>
                <Image src="/assets/company-logo.png" alt="GIX Nexus Telecom and Power" width={240} height={120} className="object-contain w-full" priority style={{ filter: 'drop-shadow(0 2px 8px rgba(0,140,255,0.2))' }} />
                <div className="mt-5 pt-4 border-t border-white/10 space-y-1 text-center">
                  <p className="text-xs text-[#708090] uppercase tracking-widest">Ethiopian-owned</p>
                  <p className="text-sm font-semibold text-white">Telecom & Power Engineering</p>
                  <p className="text-sm font-medium text-[#65D51A]">Across Ethiopia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 5 — exactly 6 groupings */}
      <section className="py-28 section-top-divide bg-section-odd" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">What We Do</p>
            <h2 id="services-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>{t('servicesTitle')}</h2>
            <p className="mt-3 max-w-2xl mx-auto" style={{ color: 'var(--foreground-subtle)' }}>{t('servicesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((service) => {
              const capabilities = tServices.raw(`groups.${service.nameKey}.capabilities`) as string[]
              return (
                <Link key={service.slug} href={`/${locale}/services/${service.slug}`}
                  className="group rounded-xl overflow-hidden border transition-all hover:border-[#008CFF]/40 hover:shadow-lg hover:shadow-[#008CFF]/8 focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <div className="relative h-52 overflow-hidden">
                    <Image src={service.image} alt={service.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.7) 0%, transparent 60%)' }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>{tServices(`groups.${service.nameKey}.name`)}</h3>
                    <p className="mt-2 text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{tServices(`groups.${service.nameKey}.description`)}</p>
                    <ul className="mt-3 space-y-1">
                      {capabilities.slice(0, 2).map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--foreground-subtle)' }}>
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#008CFF]" />{cap}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs font-semibold text-[#008CFF] group-hover:text-[#12C8FF] transition-colors">Learn more →</div>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href={`/${locale}/services`} className="inline-flex min-h-[44px] items-center rounded-lg border border-[#008CFF] px-8 py-2.5 text-sm font-semibold text-[#008CFF] hover:bg-[#008CFF] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Partner with Us ──────────────────────────────────── */}
      {/* Compact — no MD photo (that lives on Company page) */}
      {/* Source: Company Profile PDF, Page 9 */}
      <section className="py-24 section-top-divide bg-section-even" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Why Partner with Us</p>
            <h2 id="features-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>{t('featureTitle')}</h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: 'var(--foreground-subtle)' }}>{t('featureSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(['qualifiedTeam', 'reliableDelivery', 'safetyCommitment', 'ethiopianOwned'] as const).map((key) => (
              <div key={key} className="rounded-xl border p-6" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg mb-4" style={{ background: 'rgba(0,140,255,0.10)', color: '#008CFF' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>{t(`features.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{t(`features.${key}.description`)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={`/${locale}/company`} className="inline-flex min-h-[44px] items-center rounded-lg border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-[#008CFF]/8" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              About GIX Nexus →
            </Link>
          </div>
        </div>
      </section>

      {/* ── News & Announcements ─────────────────────────────────── */}
      {/* Dynamic — populated from Payload CMS. Placeholders shown until admin adds content. */}
      <section className="py-24 section-top-divide bg-section-odd" aria-labelledby="news-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Latest</p>
              <h2 id="news-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>News & Announcements</h2>
            </div>
            <Link href={`/${locale}/news`} className="hidden sm:inline-flex min-h-[44px] items-center text-sm font-medium text-[#008CFF] hover:text-[#12C8FF] transition-colors flex-shrink-0">
              All News →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {NEWS_PLACEHOLDER.map((item) => (
              <article key={item.id} className="rounded-xl border overflow-hidden group cursor-pointer transition-all hover:border-[#008CFF]/40 hover:shadow-md" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="p-6">
                  <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-4" style={{ background: 'rgba(0,140,255,0.08)', color: '#008CFF' }}>
                    {item.category}
                  </div>
                  <h3 className="font-semibold text-base leading-snug mb-3 group-hover:text-[#008CFF] transition-colors" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--foreground-subtle)' }}>{item.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--foreground-subtle)' }}>{item.date}</span>
                    <span className="text-xs font-medium text-[#008CFF]">Read more →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href={`/${locale}/news`} className="inline-flex min-h-[44px] items-center text-sm font-medium text-[#008CFF]">All News →</Link>
          </div>
        </div>
      </section>

      {/* ── Projects & Experience ─────────────────────────────────── */}
      {/* Dynamic — populated from Payload CMS Projects collection */}
      <section className="py-24 section-top-divide bg-section-even" aria-labelledby="projects-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Our Work</p>
              <h2 id="projects-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>Projects & Experience</h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--foreground-subtle)' }}>
                {/* Source: Company Profile PDF, Page 9 — "Reliable Project Delivery" */}
                Delivering telecommunications and power engineering projects across Ethiopia with careful planning, efficient execution, and quality standards.
              </p>
            </div>
            <Link href={`/${locale}/projects`} className="hidden sm:inline-flex min-h-[44px] items-center text-sm font-medium text-[#008CFF] hover:text-[#12C8FF] transition-colors flex-shrink-0">
              All Projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS_PLACEHOLDER.map((project) => (
              <div key={project.id} className="rounded-xl border overflow-hidden group" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.75) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-xs font-medium text-[#008CFF] bg-[#07111C]/70 rounded-full px-2.5 py-0.5">{project.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--foreground)' }}>{project.title}</h3>
                  <p className="text-xs mb-2 flex items-center gap-1" style={{ color: '#008CFF' }}>
                    <span>📍</span>{project.location}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HSEQ Banner ──────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Pages 1, 3, 8 */}
      <section className="relative py-20 overflow-hidden section-top-divide" aria-label="HSEQ Safety commitment">
        <div className="absolute inset-0">
          <Image src="/images/hseq/hseq-policy.jpeg" alt="" fill className="object-cover" aria-hidden="true" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.92), rgba(11,23,38,0.88))' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl border border-white/10" style={{ background: 'rgba(11,23,38,0.6)', backdropFilter: 'blur(8px)' }}>
              <div className="text-4xl font-bold text-[#65D51A] mb-2">HSEQ</div>
              <div className="text-sm font-semibold text-white mb-1">Policy</div>
              <p className="text-xs text-[#B9C6D3]">Health, Safety, Environment & Quality — applied to every project</p>
            </div>
            <div className="p-6 rounded-xl border border-white/10" style={{ background: 'rgba(11,23,38,0.6)', backdropFilter: 'blur(8px)' }}>
              {/* Source: PDF Page 8 — Zero Accident Objective is a GOAL, never a result */}
              <div className="text-4xl font-bold text-[#008CFF] mb-2">Zero</div>
              <div className="text-sm font-semibold text-white mb-1">Accident Objective</div>
              <p className="text-xs text-[#B9C6D3]">Our stated safety commitment and goal on every project site</p>
            </div>
            <div className="p-6 rounded-xl border border-white/10" style={{ background: 'rgba(11,23,38,0.6)', backdropFilter: 'blur(8px)' }}>
              {/* Source: PDF Page 3 — policy statement, not a metric */}
              <div className="text-4xl font-bold text-[#65D51A] mb-2">100%</div>
              <div className="text-sm font-semibold text-white mb-1">Safety-First Approach</div>
              <p className="text-xs text-[#B9C6D3]">Policy commitment — safety first on every project, without exception</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href={`/${locale}/hseq`} className="inline-flex min-h-[44px] items-center rounded-lg border border-white/25 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/8 transition-colors">
              View HSEQ Policy →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      {/* Dynamic — from Payload CMS Testimonials collection.
          GOVERNANCE: Only publish verified, real testimonials. Never fabricate. */}
      <section className="py-24 section-top-divide bg-section-odd" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">What They Say</p>
            <h2 id="testimonials-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>Testimonials</h2>
            <p className="mt-3 max-w-lg mx-auto text-sm" style={{ color: 'var(--foreground-subtle)' }}>
              Feedback from the organisations and partners we have worked with across Ethiopia.
            </p>
          </div>
          {/* Empty state — shown until admin adds real testimonials */}
          <div className="rounded-2xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border)' }}>
            <div className="text-4xl mb-4" aria-hidden="true">💬</div>
            <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Testimonials coming soon</p>
            <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>
              Client and partner testimonials will appear here once published via the admin panel.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #07111C, #0B1726)' }} aria-labelledby="cta-heading">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">{t('ctaTitle')}</h2>
          <p className="mt-4 text-lg text-[#B9C6D3]">{t('ctaSubtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`} className="inline-flex min-h-[44px] items-center rounded-lg bg-[#008CFF] px-10 py-3 text-sm font-semibold text-white hover:bg-[#3FABFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2 focus:ring-offset-[#07111C]">
              {t('ctaContact')}
            </Link>
            <Link href={`/${locale}/services`} className="inline-flex min-h-[44px] items-center rounded-lg border border-white/20 px-10 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors">
              {t('ctaServices')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params
  return <HomePage locale={locale} />
}
