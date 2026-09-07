import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HeroCarousel } from '@/components/ui/HeroCarousel'
import type { Testimonial, News, Project, Media } from '@/payload-types'

// Cache DB results — revalidate every hour. Instant page loads between revalidations.
export const revalidate = 3600

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

// Source: Company Profile PDF — 8 service domains
// Images and slugs are fixed assets — service text comes from i18n
const SERVICES_DATA = [
  { slug: 'telecommunications-infrastructure', nameKey: 'telecomInfrastructure', image: '/images/services/telecom-infrastructure.jpg', imageAlt: 'Telecommunications infrastructure installation' },
  { slug: 'fiber-optic-solutions', nameKey: 'fiberOptic', image: '/images/services/fiber-optic-cables.jpg', imageAlt: 'Fiber optic cable installation' },
  { slug: 'satellite-wireless-communications', nameKey: 'satelliteWireless', image: '/images/services/satellite-dish.jpg', imageAlt: 'Satellite dish and wireless systems' },
  { slug: 'rf-engineering', nameKey: 'rfEngineering', image: '/images/services/rf-engineering.jpg', imageAlt: 'RF engineering and antenna systems' },
  { slug: 'network-infrastructure', nameKey: 'networkInfrastructure', image: '/images/services/network-infrastructure.jpg', imageAlt: 'Network infrastructure and cabling' },
  { slug: 'telecom-power-systems', nameKey: 'telecomPower', image: '/images/services/telecom-power-systems-dc-power-systems.png', imageAlt: 'Telecom power systems' },
  { slug: 'smatv-matv-solutions', nameKey: 'smatvMatv', image: '/images/services/smatv-matv.jpg', imageAlt: 'SMATV/MATV satellite TV distribution systems' },
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
      {/* ── Scoped CSS hover rules ─────────────────────────────── */}
      <style>{`
        .svc-card {
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card);
          transition: box-shadow 250ms cubic-bezier(0.16,1,0.3,1),
                      transform 250ms cubic-bezier(0.16,1,0.3,1),
                      border-color 250ms;
        }
        .svc-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-3px);
          border-color: var(--accent);
        }
        .news-card {
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card);
          transition: box-shadow 250ms cubic-bezier(0.16,1,0.3,1), transform 250ms;
        }
        .news-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-2px);
        }
        .btn-outline-blue {
          border: 1.5px solid var(--accent);
          color: var(--accent);
          background: transparent;
          transition: background 200ms, color 200ms;
        }
        .btn-outline-blue:hover {
          background: var(--accent);
          color: #050D1A;
        }
        .btn-outline-muted {
          border: 1px solid var(--border);
          color: var(--foreground-muted);
          transition: border-color 200ms, color 200ms;
        }
        .btn-outline-muted:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" aria-labelledby="hero-heading">
        <HeroCarousel />
        {/* Minimized overlay — image as subtle bg texture */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-hero)', zIndex: 3 }} aria-hidden="true" />
        {/* Left/right vignette — content area is clear, edges fade */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(6,18,54,0.55) 20%, transparent 40%, transparent 80%, rgba(6,18,54,0.55) 100%)', zIndex: 4 }} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 w-full" style={{ zIndex: 5 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              {/* ── Glassmorphic "Across Ethiopia" badge ── */}
              <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(102,0,255,0.12) 100%)',
                  border: '1px solid rgba(0,212,255,0.35)',
                  boxShadow: '0 0 18px rgba(0,212,255,0.18), inset 0 1px 0 rgba(255,255,255,0.10)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-sm font-semibold tracking-wide" style={{
                  background: 'linear-gradient(90deg, #00D4FF, #A78BFA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Across Ethiopia
                </span>
              </div>
              <h1 id="hero-heading" className="font-bold text-white drop-shadow-sm" style={{ fontSize: 'clamp(20px, 3.5vw, 40px)', lineHeight: '1.15', letterSpacing: '-0.022em' }}>
                {t('heroTitle')}
              </h1>
              <p className="mt-4 text-[clamp(13px,1.5vw,16px)] text-white/90 max-w-lg leading-relaxed">{t('heroSubtitle')}</p>
              {/* ── Stats row — glass border, subtle, left/right fade ── */}
              <div className="relative mt-5 max-w-xs">
                {/* Left fade edge */}
                <div className="absolute left-0 top-0 bottom-0 w-4 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(6,18,54,0.6), transparent)', zIndex: 1 }} />
                {/* Right fade edge */}
                <div className="absolute right-0 top-0 bottom-0 w-4 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(6,18,54,0.6), transparent)', zIndex: 1 }} />
                <div className="grid grid-cols-3 gap-0 rounded-xl overflow-hidden"
                  style={{
                    border: '1px solid rgba(0,212,255,0.18)',
                    background: 'rgba(0,212,255,0.06)',
                    /* No backdrop-filter here — causes hero image blur in browsers */
                  }}
                >
                  <div className="text-center py-3 px-2">
                    <div className="text-xl sm:text-2xl font-bold text-white">8+</div>
                    <div className="text-[11px] text-white/80 mt-0.5 uppercase tracking-wider leading-tight">{t('stats.serviceDomainsLabel')}</div>
                  </div>
                  <div className="text-center py-3 px-2" style={{ borderLeft: '1px solid rgba(0,212,255,0.15)', borderRight: '1px solid rgba(0,212,255,0.15)' }}>
                    <div className="text-xl sm:text-2xl font-bold text-white">24/7</div>
                    <div className="text-[11px] text-white/80 mt-0.5 uppercase tracking-wider leading-tight">{t('stats.supportLabel')}</div>
                  </div>
                  <div className="text-center py-3 px-2">
                    <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                    <div className="text-[11px] text-white/80 mt-0.5 uppercase tracking-wider leading-tight">{t('stats.safetyLabel')}</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href={`/${locale}/services`}
                  className="btn-primary text-sm"
                >
                  {t('ctaServices')} →
                </Link>
                <Link href={`/${locale}/company`}
                  className="inline-flex items-center rounded-lg border border-white/25 px-5 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/40 transition-colors"
                >
                  {t('ctaProfile')}
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="rounded-2xl p-8 border w-full max-w-xs"
                style={{
                  background: 'linear-gradient(145deg, rgba(8,20,60,0.90) 0%, rgba(4,12,38,0.95) 100%)',
                  border: '1px solid rgba(0,212,255,0.22)',
                  boxShadow: '0 0 40px rgba(0,212,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <Image src="/assets/company-logo.png" alt="GIX Nexus Telecom and Power" width={260} height={130} className="object-contain w-full" priority />
                <div className="mt-6 pt-5 space-y-2 text-center" style={{ borderTop: '1px solid rgba(0,212,255,0.12)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)', opacity: 0.8 }}>Ethiopian-Owned Company</p>
                  <p className="text-sm font-bold text-white">Telecom & Power Engineering</p>
                  <p className="text-xs text-white/65">SATCOM · Fiber · RF · Network · Power</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 5 — exactly 6 groupings */}
      <section className="py-16 sm:py-20 md:py-28 section-top-divide bg-section-odd" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>What We Do</p>
            <h2 id="services-heading" className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--foreground)' }}>{t('servicesTitle')}</h2>
            <p className="mt-3 max-w-2xl mx-auto" style={{ color: 'var(--foreground-muted)' }}>{t('servicesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((service) => {
              const capabilities = tServices.raw(`groups.${service.nameKey}.capabilities`) as string[]
              return (
                <Link key={service.slug} href={`/${locale}/services/${service.slug}`}
                  className="svc-card group rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <Image src={service.image} alt={service.imageAlt} fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.65) 0%, transparent 55%)' }} />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>{tServices(`groups.${service.nameKey}.name`)}</h3>
                    <p className="mt-2 text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>{tServices(`groups.${service.nameKey}.description`)}</p>
                    <ul className="mt-3 space-y-1.5">
                      {capabilities.slice(0, 2).map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--foreground-muted)' }}>
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />{cap}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs font-semibold transition-colors" style={{ color: 'var(--accent)' }}>Learn more →</div>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/services`}
              className="btn-outline-blue inline-flex min-h-[44px] items-center rounded-lg px-8 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Partner with Us ──────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 9 */}
      <section className="py-24 section-top-divide bg-section-even" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Why Partner with Us</p>
            <h2 id="features-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>{t('featureTitle')}</h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: 'var(--foreground-muted)' }}>{t('featureSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {([
              {
                key: 'qualifiedTeam',
                icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
              },
              {
                key: 'reliableDelivery',
                icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
              },
              {
                key: 'safetyCommitment',
                icon: <><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a2 2 0 0 1 4 0v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></>,
              },
              {
                key: 'ethiopianOwned',
                icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
              },
            ] as const).map(({ key, icon }) => (
              <div
                key={key}
                className="rounded-xl p-6 transition-all duration-250"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg mb-4"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    {icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>{t(`features.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>{t(`features.${key}.description`)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/company`}
              className="btn-outline-muted inline-flex min-h-[44px] items-center rounded-lg px-6 py-2.5 text-sm font-medium"
            >
              About GIX Nexus →
            </Link>
          </div>
        </div>
      </section>

      {/* ── News & Announcements ─────────────────────────────────── */}
      <section className="py-24 section-top-divide bg-section-odd" aria-labelledby="news-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Latest</p>
              <h2 id="news-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>News & Announcements</h2>
            </div>
          </div>

          {news.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => {
                const coverUrl = item.coverImage && typeof item.coverImage === 'object'
                  ? (item.coverImage as Media).url ?? null
                  : null
                const dateLabel = item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })
                  : ''
                const categoryLabel = NEWS_CATEGORY_LABELS[item.category ?? ''] ?? 'News'
                return (
                  <article
                    key={item.id}
                    className="news-card rounded-xl overflow-hidden group"
                  >
                    {coverUrl && (
                      <div className="relative h-44 overflow-hidden">
                        <Image src={coverUrl} alt={item.title} fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="p-6">
                      <div
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3"
                        style={{ background: 'var(--chip-bg)', color: 'var(--chip-text)', border: '1px solid var(--chip-border)' }}
                      >
                        {categoryLabel}
                      </div>
                      <h3 className="font-semibold text-base leading-snug mb-3 transition-colors" style={{ color: 'var(--foreground)' }}>
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--foreground-muted)' }}>{item.excerpt}</p>
                      )}
                      <div className="mt-4">
                        <span className="text-xs" style={{ color: 'var(--foreground-faint)' }}>{dateLabel}</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="text-4xl mb-4" aria-hidden="true">📰</div>
              <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>News & announcements coming soon</p>
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Published news will appear here. Add articles via the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Projects & Experience ─────────────────────────────────── */}
      <section className="py-24 section-top-divide bg-section-even" aria-labelledby="projects-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Our Work</p>
              <h2 id="projects-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>Projects & Experience</h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                Delivering telecommunications and power engineering projects across Ethiopia with careful planning, efficient execution, and quality standards.
              </p>
            </div>
            {projects.length > 0 && (
              <Link href={`/${locale}/projects`} className="hidden sm:inline-flex min-h-[44px] items-center text-sm font-medium flex-shrink-0 transition-colors" style={{ color: 'var(--accent)' }}>
                All Projects →
              </Link>
            )}
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const coverUrl = project.coverImage && typeof project.coverImage === 'object'
                  ? (project.coverImage as Media).url ?? null
                  : null
                const categoryLabel = PROJECT_CATEGORY_LABELS[project.serviceCategory] ?? project.serviceCategory
                return (
                  <div
                    key={project.id}
                    className="rounded-xl overflow-hidden group"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <div className="relative h-48 overflow-hidden" style={{ background: 'var(--soft-surface)' }}>
                      {coverUrl ? (
                        <Image src={coverUrl} alt={project.title} fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl opacity-20">🏗</span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-4">
                        <span
                          className="text-xs font-medium rounded-full px-2.5 py-0.5"
                          style={{ background: 'var(--chip-bg)', color: 'var(--chip-text)' }}
                        >{categoryLabel}</span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--foreground)' }}>{project.title}</h3>
                      {project.location && (
                        <p className="text-xs mb-2 flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                          <span>📍</span>{project.location}
                        </p>
                      )}
                      {project.excerpt && (
                        <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--foreground-muted)' }}>{project.excerpt}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="text-4xl mb-4" aria-hidden="true">🏗</div>
              <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Projects coming soon</p>
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Completed and ongoing project showcases will appear here. Add projects via the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── HSEQ Banner ──────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Pages 1, 3, 8 */}
      <section className="relative py-20 overflow-hidden section-top-divide" aria-label="HSEQ Safety commitment">
        <div className="absolute inset-0">
          <Image src="/images/hseq/hseq-policy.jpeg" alt="" fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover hero-pan" aria-hidden="true" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,13,26,0.90) 0%, rgba(5,13,26,0.82) 60%, rgba(5,13,26,0.70) 100%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl border border-white/10" style={{ background: 'rgba(5,13,26,0.55)', backdropFilter: 'blur(12px)' }}>
              <div className="text-4xl font-bold text-[#00C97A] mb-2">HSEQ</div>
              <div className="text-sm font-semibold text-white mb-1">Policy</div>
              <p className="text-xs text-[#8AADCC]">Health, Safety, Environment & Quality — applied to every project</p>
            </div>
            <div className="p-6 rounded-xl border border-white/10" style={{ background: 'rgba(5,13,26,0.55)', backdropFilter: 'blur(12px)' }}>
              {/* Source: PDF Page 8 — Zero Accident Objective is a GOAL, never a result */}
              <div className="text-4xl font-bold text-[#00D4FF] mb-2">Zero</div>
              <div className="text-sm font-semibold text-white mb-1">Accident Objective</div>
              <p className="text-xs text-[#8AADCC]">Our stated safety commitment and goal on every project site</p>
            </div>
            <div className="p-6 rounded-xl border border-white/10" style={{ background: 'rgba(5,13,26,0.55)', backdropFilter: 'blur(12px)' }}>
              {/* Source: PDF Page 3 — policy statement, not a metric */}
              <div className="text-4xl font-bold text-[#00C97A] mb-2">100%</div>
              <div className="text-sm font-semibold text-white mb-1">Safety-First Approach</div>
              <p className="text-xs text-[#8AADCC]">Policy commitment — safety first on every project, without exception</p>
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
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>What They Say</p>
            <h2 id="testimonials-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>Testimonials</h2>
            <p className="mt-3 max-w-lg mx-auto text-sm" style={{ color: 'var(--foreground-muted)' }}>
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
                    className="rounded-xl p-6 flex flex-col gap-4"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <span className="text-3xl leading-none select-none" style={{ color: 'var(--accent)' }} aria-hidden="true">&ldquo;</span>
                    <blockquote className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                      {t.quote}
                    </blockquote>
                    <figcaption className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      {avatarUrl ? (
                        <Image src={avatarUrl} alt={t.authorName} width={40} height={40} className="rounded-full object-cover flex-shrink-0" />
                      ) : (
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                          style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                          aria-hidden="true"
                        >
                          {t.authorName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>{t.authorName}</p>
                        {(t.authorRole || t.organisation || t.sector) && (
                          <p className="text-xs truncate" style={{ color: 'var(--foreground-muted)' }}>
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
            <div className="rounded-2xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="text-4xl mb-4" aria-hidden="true">💬</div>
              <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Testimonials coming soon</p>
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                Client and partner testimonials will appear here once published via the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      {/* ── Ready to Work Together CTA ───────────────────────────── */}
      <section
        className="py-20 section-top-divide"
        style={{
          background: `
            radial-gradient(ellipse 80% 90% at 20% 50%, rgba(0,102,255,0.30) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 40%, rgba(102,0,255,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,212,255,0.12) 0%, transparent 50%),
            linear-gradient(160deg, #04102E 0%, #060C22 60%, #04102E 100%)
          `,
        }}
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-2xl font-bold text-white sm:text-3xl">{t('ctaTitle')}</h2>
          <p className="mt-4 text-base text-[#B8D4F0]">{t('ctaSubtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`} className="btn-cta">
              {t('ctaContact')}
            </Link>
            <Link href={`/${locale}/services`} className="inline-flex items-center rounded-lg border border-white/25 px-8 py-2.5 text-sm font-semibold text-white hover:bg-white/8 transition-colors">
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
