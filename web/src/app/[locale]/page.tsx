import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HeroCarousel } from '@/components/ui/HeroCarousel'
import type { Testimonial, News, Project, Media } from '@/payload-types'

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
// Images and slugs are fixed assets — service text comes from i18n
const SERVICES_DATA = [
  { slug: 'telecommunications-infrastructure', nameKey: 'telecomInfrastructure', image: '/images/services/telecom-infrastructure.jpg', imageAlt: 'Telecommunications infrastructure installation' },
  { slug: 'fiber-optic-solutions', nameKey: 'fiberOptic', image: '/images/services/fiber-optic-cables.jpg', imageAlt: 'Fiber optic cable installation' },
  { slug: 'satellite-wireless-communications', nameKey: 'satelliteWireless', image: '/images/services/satellite-dish.jpg', imageAlt: 'Satellite dish and wireless systems' },
  { slug: 'network-infrastructure', nameKey: 'networkInfrastructure', image: '/images/services/network-infrastructure.jpg', imageAlt: 'Network infrastructure and cabling' },
  { slug: 'telecom-power-systems', nameKey: 'telecomPower', image: '/images/services/telecom-power-systems-dc-power-systems.png', imageAlt: 'Telecom power systems' },
  { slug: 'maintenance-technical-support', nameKey: 'maintenance', image: '/images/services/maintenance-and-tehnical-suport.webp', imageAlt: 'Field maintenance and technical support' },
] as const

// Category label maps for display
const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  'telecom-infrastructure': 'Telecommunications Infrastructure',
  'fiber-optic': 'Fiber Optic Solutions',
  'satellite-wireless': 'Satellite & Wireless',
  'network-infrastructure': 'Network Infrastructure',
  'telecom-power': 'Telecom Power Systems',
  'maintenance': 'Maintenance & Support',
}

const NEWS_CATEGORY_LABELS: Record<string, string> = {
  'announcement': 'Announcement',
  'project-update': 'Project Update',
  'company-news': 'Company News',
  'partnership': 'Partnership',
}

function HomePage({
  locale,
  news,
  projects,
  testimonials,
}: {
  locale: string
  news: News[]
  projects: Project[]
  testimonials: Testimonial[]
}) {
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
              <h1 id="hero-heading" className="font-bold text-white" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', lineHeight: '1.15' }}>
                {t('heroTitle')}
              </h1>
              <p className="mt-6 text-[clamp(15px,1.8vw,18px)] text-[#B9C6D3] max-w-lg leading-relaxed">{t('heroSubtitle')}</p>
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
            {([
              {
                key: 'qualifiedTeam',
                // Qualified team — people/users icon
                icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
              },
              {
                key: 'reliableDelivery',
                // Reliable delivery — shield with checkmark
                icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
              },
              {
                key: 'safetyCommitment',
                // Safety commitment — hard hat / safety gear
                icon: <><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a2 2 0 0 1 4 0v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></>,
              },
              {
                key: 'ethiopianOwned',
                // Ethiopian-owned — flag/map pin
                icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
              },
            ] as const).map(({ key, icon }) => (
              <div key={key} className="rounded-xl border p-6" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg mb-4" style={{ background: 'rgba(0,140,255,0.10)', color: '#008CFF' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    {icon}
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
      {/* Dynamic — fetched from Payload CMS news collection */}
      <section className="py-24 section-top-divide bg-section-odd" aria-labelledby="news-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Latest</p>
              <h2 id="news-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>News & Announcements</h2>
            </div>
            {news.length > 0 && (
              <Link href={`/${locale}/news`} className="hidden sm:inline-flex min-h-[44px] items-center text-sm font-medium text-[#008CFF] hover:text-[#12C8FF] transition-colors flex-shrink-0">
                All News →
              </Link>
            )}
          </div>

          {news.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => {
                const coverUrl = item.coverImage && typeof item.coverImage === 'object'
                  ? (item.coverImage as Media).url ?? null
                  : null
                const dateLabel = item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })
                  : ''
                const categoryLabel = NEWS_CATEGORY_LABELS[item.category ?? ''] ?? 'News'
                return (
                  <article key={item.id} className="rounded-xl border overflow-hidden group transition-all hover:border-[#008CFF]/40 hover:shadow-md" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    {coverUrl && (
                      <div className="relative h-44 overflow-hidden">
                        <Image src={coverUrl} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.6) 0%, transparent 60%)' }} />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-4" style={{ background: 'rgba(0,140,255,0.08)', color: '#008CFF' }}>
                        {categoryLabel}
                      </div>
                      <h3 className="font-semibold text-base leading-snug mb-3 group-hover:text-[#008CFF] transition-colors" style={{ color: 'var(--foreground)' }}>
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--foreground-subtle)' }}>{item.excerpt}</p>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs" style={{ color: 'var(--foreground-subtle)' }}>{dateLabel}</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border)' }}>
              <div className="text-4xl mb-4" aria-hidden="true">📰</div>
              <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>News & announcements coming soon</p>
              <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>
                Published news will appear here. Add articles via the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Projects & Experience ─────────────────────────────────── */}
      {/* Dynamic — fetched from Payload CMS projects collection */}
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
            {projects.length > 0 && (
              <Link href={`/${locale}/projects`} className="hidden sm:inline-flex min-h-[44px] items-center text-sm font-medium text-[#008CFF] hover:text-[#12C8FF] transition-colors flex-shrink-0">
                All Projects →
              </Link>
            )}
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const coverUrl = project.coverImage && typeof project.coverImage === 'object'
                  ? (project.coverImage as Media).url ?? null
                  : null
                const categoryLabel = PROJECT_CATEGORY_LABELS[project.serviceCategory] ?? project.serviceCategory
                return (
                  <div key={project.id} className="rounded-xl border overflow-hidden group" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1726, #172331)' }}>
                      {coverUrl ? (
                        <Image src={coverUrl} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl opacity-20">🏗</span>
                        </div>
                      )}
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.75) 0%, transparent 55%)' }} />
                      <div className="absolute bottom-3 left-4">
                        <span className="text-xs font-medium text-[#008CFF] bg-[#07111C]/70 rounded-full px-2.5 py-0.5">{categoryLabel}</span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--foreground)' }}>{project.title}</h3>
                      {project.location && (
                        <p className="text-xs mb-2 flex items-center gap-1" style={{ color: '#008CFF' }}>
                          <span>📍</span>{project.location}
                        </p>
                      )}
                      {project.excerpt && (
                        <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--foreground-subtle)' }}>{project.excerpt}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border)' }}>
              <div className="text-4xl mb-4" aria-hidden="true">🏗</div>
              <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Projects coming soon</p>
              <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>
                Completed and ongoing project showcases will appear here. Add projects via the admin panel.
              </p>
            </div>
          )}
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

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => {
                const avatarUrl = t.avatar && typeof t.avatar === 'object' && 'url' in t.avatar
                  ? (t.avatar as { url?: string }).url
                  : null
                return (
                  <figure
                    key={t.id}
                    className="rounded-xl border p-6 flex flex-col gap-4"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    {/* Quote mark */}
                    <span className="text-3xl leading-none text-[#008CFF] select-none" aria-hidden="true">&ldquo;</span>
                    <blockquote className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                      {t.quote}
                    </blockquote>
                    <figcaption className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={t.authorName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                          style={{ background: 'rgba(0,140,255,0.2)', color: '#008CFF' }}
                          aria-hidden="true"
                        >
                          {t.authorName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>{t.authorName}</p>
                        {(t.authorRole || t.organisation || t.sector) && (
                          <p className="text-xs truncate" style={{ color: 'var(--foreground-subtle)' }}>
                            {[t.authorRole, t.organisation ?? t.sector].filter(Boolean).join(' · ')}
                          </p>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          ) : (
            /* Empty state — shown until admin adds real testimonials */
            <div className="rounded-2xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border)' }}>
              <div className="text-4xl mb-4" aria-hidden="true">💬</div>
              <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Testimonials coming soon</p>
              <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>
                Client and partner testimonials will appear here once published via the admin panel.
              </p>
            </div>
          )}
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
  const loc = locale as 'en' | 'am'

  const payload = await getPayload({ config: configPromise })

  const [testimonialsResult, newsResult, projectsResult] = await Promise.all([
    payload.find({
      collection: 'testimonials',
      where: { _status: { equals: 'published' } },
      locale: loc,
      fallbackLocale: 'en',
      limit: 6,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'news',
      where: { _status: { equals: 'published' } },
      locale: loc,
      fallbackLocale: 'en',
      limit: 3,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'projects',
      where: { _status: { equals: 'published' } },
      locale: loc,
      fallbackLocale: 'en',
      limit: 3,
      sort: '-createdAt',
    }),
  ])

  return (
    <HomePage
      locale={locale}
      testimonials={testimonialsResult.docs as Testimonial[]}
      news={newsResult.docs as News[]}
      projects={projectsResult.docs as Project[]}
    />
  )
}
