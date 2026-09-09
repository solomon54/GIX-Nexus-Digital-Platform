import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
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

// Source: Company Profile PDF — 8 service domains
const SERVICES_DATA = [
  { slug: 'telecommunications-infrastructure', nameKey: 'telecomInfrastructure', image: '/images/services/telecom-infrastructure.jpg', imageAlt: 'Telecommunications infrastructure installation' },
  { slug: 'fiber-optic-solutions', nameKey: 'fiberOptic', image: '/images/services/fiber-optic-cables.jpg', imageAlt: 'Fiber optic cable installation' },
  { slug: 'satellite-wireless-communications', nameKey: 'satelliteWireless', image: '/images/services/satellite-dish.jpg', imageAlt: 'Satellite dish and wireless systems' },
  { slug: 'rf-engineering', nameKey: 'rfEngineering', image: '/images/services/rf-engineering.jpg', imageAlt: 'RF engineering and antenna systems' },
  { slug: 'network-infrastructure', nameKey: 'networkInfrastructure', image: '/images/services/network-infrastructure.jpg', imageAlt: 'Network infrastructure and cabling' },
  { slug: 'telecom-power-systems', nameKey: 'telecomPower', image: '/images/services/telecom-power-systems-dc-power-systems.png', imageAlt: 'Telecom power systems' },
  { slug: 'smatv-matv-solutions', nameKey: 'smatvMatv', image: '/images/services/smatv-matv.jpg', imageAlt: 'SMATV/MATV satellite TV distribution systems' },
  { slug: 'maintenance-technical-support', nameKey: 'maintenance', image: '/images/services/maintenance-and-technical-support.webp', imageAlt: 'Field maintenance and technical support' },
] as const

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
{/* ════════════════════════════════════════════════════════════
    SCOPED CSS
    ════════════════════════════════════════════════════════════ */}
<style>{`
  /* ── Service cards — on dark section-2 bg ── */
  .svc-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition:
      box-shadow 250ms cubic-bezier(0.16,1,0.3,1),
      transform 250ms cubic-bezier(0.16,1,0.3,1),
      border-color 250ms,
      background 250ms;
  }
  .svc-card:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(34,211,238,0.40);
    box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(34,211,238,0.18);
    transform: translateY(-4px);
  }

  /* ── News cards — on light section-5 bg ── */
  .news-card {
    background: #FFFFFF;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    transition:
      box-shadow 250ms cubic-bezier(0.16,1,0.3,1),
      transform 250ms,
      border-color 250ms;
  }
  .news-card:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: var(--accent);
    transform: translateY(-3px);
  }

  /* ── Outline buttons — on dark bg ── */
  .btn-outline-white {
    border: 1.5px solid rgba(255,255,255,0.35);
    color: rgba(255,255,255,0.90);
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(8px);
    transition: background 200ms, border-color 200ms, color 200ms, transform 200ms;
  }
  .btn-outline-white:hover {
    background: rgba(255,255,255,0.14);
    border-color: rgba(34,211,238,0.60);
    color: #22D3EE;
    transform: translateY(-1px);
  }

  /* ── Outline buttons — on light bg ── */
  .btn-outline-teal {
    border: 1.5px solid var(--accent);
    color: var(--accent);
    background: transparent;
    transition: background 200ms, color 200ms, transform 200ms;
  }
  .btn-outline-teal:hover {
    background: var(--accent);
    color: #fff;
    transform: translateY(-1px);
  }

  /* ── Hero glass card ── */
  .hero-glass {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.16);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 24px 64px rgba(0,0,0,0.30),
      inset 0 1px 0 rgba(255,255,255,0.12);
  }

  /* ── Hero stat cells ── */
  .hero-stat {
    background: rgba(255,255,255,0.05);
    transition: background 200ms, transform 200ms;
  }
  .hero-stat:hover {
    background: rgba(14,165,201,0.14);
    transform: translateY(-2px);
  }

  /* ── Feature cards — on section-3 mid-teal bg ── */
  .feature-card {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.13);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition:
      background 250ms,
      border-color 250ms,
      transform 250ms,
      box-shadow 250ms;
  }
  .feature-card:hover {
    background: rgba(255,255,255,0.14);
    border-color: rgba(34,211,238,0.35);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.20);
  }

  /* ── Project cards — on light section-6 bg ── */
  .project-card {
    background: #FFFFFF;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    transition:
      box-shadow 250ms,
      border-color 250ms,
      transform 250ms;
  }
  .project-card:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: var(--accent);
    transform: translateY(-3px);
  }

  /* ── Section label pill ── */
  .section-label-dark {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(34,211,238,0.12);
    border: 1px solid rgba(34,211,238,0.25);
    border-radius: 99px;
    padding: 3px 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #22D3EE;
  }
  .section-label-light {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(14,165,201,0.10);
    border: 1px solid rgba(14,165,201,0.22);
    border-radius: 99px;
    padding: 3px 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
  }

  /* ── chip vars for light sections (news, projects) ── */
  .news-card .chip-light,
  .project-card .chip-light {
    background: rgba(14,165,201,0.10);
    color: #0369A1;
    border: 1px solid rgba(14,165,201,0.25);
  }
`}</style>


{/* ════════════════════════════════════════════════════════════
    §1  HERO  — deep navy → ocean blue  (darkest)
    ════════════════════════════════════════════════════════════ */}
<section
  className="relative min-h-[92vh] flex items-center overflow-hidden"
  aria-labelledby="hero-heading"
  style={{ background: 'linear-gradient(155deg, #0D1B3E 0%, #0A3060 55%, #0B4070 100%)' }}
>
  {/* Teal horizon line — purely CSS, no image */}
  <div
    className="absolute bottom-0 left-0 right-0 pointer-events-none"
    style={{
      height: '2px',
      background: 'linear-gradient(90deg, transparent 0%, #0EA5C9 30%, #22D3EE 50%, #0EA5C9 70%, transparent 100%)',
      opacity: 0.6,
    }}
    aria-hidden="true"
  />

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">

      {/* ── Left ── */}
      <div className="max-w-2xl">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-3 rounded-full px-4 py-2 mb-8"
          style={{
            background: 'rgba(14,165,201,0.12)',
            border: '1px solid rgba(14,165,201,0.28)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: '#22D3EE' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#22D3EE' }} />
          </span>
          <span className="text-sm font-medium tracking-wide" style={{ color: '#22D3EE' }}>
            Across Ethiopia
          </span>
          <span className="h-4 w-px" style={{ background: 'rgba(34,211,238,0.30)' }} />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Telecom & Power
          </span>
        </div>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="font-bold text-white"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
          }}
        >
          {t('heroTitle')}
        </h1>

        {/* Teal accent rule */}
        <div className="mt-6 flex items-center gap-3">
          <span
            className="h-[3px] w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, #22D3EE, rgba(34,211,238,0))' }}
          />
          <span className="text-xs uppercase tracking-[0.22em]" style={{ color: 'rgba(34,211,238,0.70)' }}>
            Satellite Services
          </span>
        </div>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: 'rgba(255,255,255,0.78)' }}
        >
          {t('heroSubtitle')}
        </p>

        {/* Stats strip */}
        <div className="mt-8 max-w-xl">
          <div
            className="grid grid-cols-3 overflow-hidden rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            {[
              { value: '8+',    label: t('stats.serviceDomainsLabel') },
              { value: '24/7',  label: t('stats.supportLabel') },
              { value: '100%',  label: t('stats.safetyLabel') },
            ].map((stat, i) => (
              <div
                key={i}
                className="hero-stat text-center px-4 py-4"
                style={i === 1 ? {
                  borderLeft: '1px solid rgba(255,255,255,0.08)',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                } : {}}
              >
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#22D3EE' }}>
                  {stat.value}
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/${locale}/services`}
            className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #0EA5C9 0%, #22D3EE 100%)',
              color: '#0D1B3E',
              boxShadow: '0 8px 28px rgba(14,165,201,0.40)',
            }}
          >
            {t('ctaServices')}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          <Link
            href={`/${locale}/company`}
            className="btn-outline-white inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium"
          >
            {t('ctaProfile')}
          </Link>
        </div>

      </div>

      {/* ── Right — GIF card ── */}
      <div className="hidden lg:flex justify-end">
        <div className="relative w-full max-w-[420px]">

          {/* Teal glow behind card */}
          <div
            className="absolute inset-8 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(14,165,201,0.22) 0%, transparent 70%)',
              filter: 'blur(32px)',
            }}
          />

          {/* Glass card */}
          <div className="hero-glass relative overflow-hidden rounded-[2rem] p-5 sm:p-7">

            {/* Card top bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  Technology
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  Connected Infrastructure
                </p>
              </div>
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{ background: 'rgba(14,165,201,0.15)', border: '1px solid rgba(14,165,201,0.28)' }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22D3EE' }} />
                <span className="text-[10px]" style={{ color: '#22D3EE' }}>24/7</span>
              </div>
            </div>

            {/* Antenna — mp4 played as silent looping video */}
            <div className="relative flex justify-center">
              <video
                src="/assets/antenna-compressed.gif.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="GIX Nexus antenna — telecom and satellite services"
                className="relative z-10 h-[300px] w-full object-contain"
                style={{ maxWidth: '380px' }}
              />
            </div>

            {/* Card bottom */}
            <div
              className="pt-4 mt-1 text-center"
              style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
            >
              <p className="text-sm font-semibold text-white">Telecom & Satellite Services</p>
              <p className="mt-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                SATCOM · Fiber · RF · Network · Power
              </p>
            </div>

            {/* Accent dots */}
            <div className="absolute left-5 top-24 h-1.5 w-1.5 rounded-full" style={{ background: 'rgba(34,211,238,0.60)' }} />
            <div className="absolute right-6 bottom-16 h-1.5 w-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.30)' }} />
          </div>

          {/* Floating pill */}
          <div
            className="absolute -bottom-4 -left-6 rounded-2xl px-4 py-3"
            style={{
              background: 'rgba(13,27,62,0.90)',
              border: '1px solid rgba(14,165,201,0.30)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.30)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{ background: 'rgba(14,165,201,0.15)' }}
              >
                <span className="text-base" style={{ color: '#22D3EE' }}>⌁</span>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>Network</p>
                <p className="text-xs font-semibold text-white">Reliable Infrastructure</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>


{/* ════════════════════════════════════════════════════════════
    §2  SERVICES  — ocean blue → mid teal-blue  (dark)
    ════════════════════════════════════════════════════════════ */}
<section
  className="py-20 sm:py-24 lg:py-28"
  style={{ background: 'linear-gradient(160deg, #0A3D5C 0%, #0C5272 100%)' }}
  aria-labelledby="services-heading"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* Header */}
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <span className="section-label-dark mb-4 inline-flex">What We Do</span>
      <h2
        id="services-heading"
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {t('servicesTitle')}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {t('servicesSubtitle')}
      </p>
    </div>

    {/* Cards grid */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {SERVICES_DATA.map((service, index) => {
        const capabilities = tServices.raw(`groups.${service.nameKey}.capabilities`) as string[]
        return (
          <Link
            key={service.slug}
            href={`/${locale}/services/${service.slug}`}
            className="svc-card group relative overflow-hidden rounded-2xl"
          >
            {/* Service image — content image, kept */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay so name stays legible */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,30,60,0.85), rgba(10,30,60,0.10) 65%)' }}
              />
              {/* Number badge */}
              <div
                className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold"
                style={{
                  background: 'rgba(14,165,201,0.25)',
                  border: '1px solid rgba(34,211,238,0.40)',
                  color: '#22D3EE',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              {/* Name */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-sm font-semibold text-white leading-snug">
                  {tServices(`groups.${service.nameKey}.name`)}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
                {tServices(`groups.${service.nameKey}.description`)}
              </p>

              <ul className="mt-3 space-y-1.5">
                {capabilities.slice(0, 2).map((cap, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <span
                      className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full text-[8px]"
                      style={{ background: 'rgba(34,211,238,0.18)', color: '#22D3EE' }}
                    >✓</span>
                    {cap}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: '#22D3EE' }}>
                Explore
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>

    {/* CTA */}
    <div className="mt-12 text-center">
      <Link
        href={`/${locale}/services`}
        className="btn-outline-white inline-flex min-h-[44px] items-center rounded-lg px-7 py-2.5 text-sm font-semibold"
      >
        View All Services →
      </Link>
    </div>

  </div>
</section>


{/* ════════════════════════════════════════════════════════════
    §3  WHY PARTNER  — mid teal-blue → teal  (mid-dark)
    ════════════════════════════════════════════════════════════ */}
<section
  className="py-24"
  style={{ background: 'linear-gradient(160deg, #0C5272 0%, #0E6B8A 100%)' }}
  aria-labelledby="features-heading"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mb-12 text-center">
      <span className="section-label-dark mb-4 inline-flex">Why Partner with Us</span>
      <h2 id="features-heading" className="text-3xl font-bold text-white sm:text-4xl">{t('featureTitle')}</h2>
      <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{t('featureSubtitle')}</p>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {([
        { key: 'qualifiedTeam',    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
        { key: 'reliableDelivery', icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></> },
        { key: 'safetyCommitment', icon: <><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a2 2 0 0 1 4 0v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></> },
        { key: 'ethiopianOwned',   icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></> },
      ] as const).map(({ key, icon }) => (
        <div key={key} className="feature-card rounded-2xl p-6">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
            style={{ background: 'rgba(34,211,238,0.14)', color: '#22D3EE' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="h-5 w-5" aria-hidden="true">
              {icon}
            </svg>
          </div>
          <h3 className="font-semibold text-sm mb-2 text-white">{t(`features.${key}.title`)}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>{t(`features.${key}.description`)}</p>
        </div>
      ))}
    </div>

    <div className="mt-10 text-center">
      <Link
        href={`/${locale}/company`}
        className="btn-outline-white inline-flex min-h-[44px] items-center rounded-lg px-6 py-2.5 text-sm font-medium"
      >
        About GIX Nexus →
      </Link>
    </div>
  </div>
</section>


{/* ════════════════════════════════════════════════════════════
    §4  NEWS  — lighter teal → sky  (transitioning light)
    ════════════════════════════════════════════════════════════ */}
<section
  className="py-24"
  style={{ background: 'linear-gradient(160deg, #D9F2FC 0%, #EBF8FF 100%)' }}
  aria-labelledby="news-heading"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mb-12 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <span className="section-label-light mb-3 inline-flex">Latest</span>
        <h2 id="news-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
          News & Announcements
        </h2>
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
            <article key={item.id} className="news-card rounded-2xl overflow-hidden group">
              {coverUrl && (
                <div className="relative h-44 overflow-hidden">
                  <Image src={coverUrl} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="p-6">
                <div
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3"
                  style={{ background: 'rgba(14,165,201,0.10)', color: '#0369A1', border: '1px solid rgba(14,165,201,0.25)' }}
                >
                  {categoryLabel}
                </div>
                <h3 className="font-semibold text-base leading-snug mb-3" style={{ color: 'var(--foreground)' }}>
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
      <div
        className="rounded-2xl border-2 border-dashed p-12 text-center"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="text-4xl mb-4" aria-hidden="true">📰</div>
        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>News & announcements coming soon</p>
        <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Published news will appear here. Add articles via the admin panel.</p>
      </div>
    )}
  </div>
</section>


{/* ════════════════════════════════════════════════════════════
    §5  PROJECTS  — near-white sky  (lightest)
    ════════════════════════════════════════════════════════════ */}
<section
  className="py-24"
  style={{ background: 'linear-gradient(160deg, #EBF8FF 0%, #F0FAFF 100%)' }}
  aria-labelledby="projects-heading"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mb-12 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <span className="section-label-light mb-3 inline-flex">Our Work</span>
        <h2 id="projects-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
          Projects & Experience
        </h2>
        <p className="mt-2 text-sm max-w-xl" style={{ color: 'var(--foreground-muted)' }}>
          Delivering telecommunications and power engineering projects across Ethiopia with careful planning and quality standards.
        </p>
      </div>
      {projects.length > 0 && (
        <Link
          href={`/${locale}/projects`}
          className="hidden sm:inline-flex min-h-[44px] items-center text-sm font-semibold flex-shrink-0 transition-colors btn-outline-teal rounded-lg px-5 py-2"
        >
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
            <div key={project.id} className="project-card rounded-2xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden" style={{ background: 'var(--soft-surface)' }}>
                {coverUrl ? (
                  <Image src={coverUrl} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-20">🏗</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-4">
                  <span
                    className="text-xs font-medium rounded-full px-2.5 py-0.5"
                    style={{ background: 'rgba(14,165,201,0.10)', color: '#0369A1', border: '1px solid rgba(14,165,201,0.25)' }}
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
      <div className="rounded-2xl border-2 border-dashed p-12 text-center" style={{ borderColor: 'var(--border)' }}>
        <div className="text-4xl mb-4" aria-hidden="true">🏗</div>
        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--foreground)' }}>Projects coming soon</p>
        <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Completed and ongoing project showcases will appear here.</p>
      </div>
    )}
  </div>
</section>


{/* ════════════════════════════════════════════════════════════
    §6  HSEQ  — ocean blue accent (back toward dark)
    ════════════════════════════════════════════════════════════ */}
<section
  className="py-20"
  style={{ background: 'linear-gradient(160deg, #0A3D5C 0%, #0C5272 100%)' }}
  aria-label="HSEQ Safety commitment"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div className="mb-10 text-center">
      <span className="section-label-dark mb-4 inline-flex">Our Commitment</span>
      <h2 className="text-2xl font-bold text-white sm:text-3xl">
        Health, Safety, Environment & Quality
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {[
        { value: 'HSEQ', label: 'Policy', desc: 'Health, Safety, Environment & Quality — applied to every project', color: '#22D3EE' },
        { value: 'Zero', label: 'Accident Objective', desc: 'Our stated safety commitment and goal on every project site', color: '#22D3EE' },
        { value: '100%', label: 'Safety-First Approach', desc: 'Policy commitment — safety first on every project, without exception', color: '#4ADE80' },
      ].map(({ value, label, desc, color }) => (
        <div
          key={label}
          className="feature-card rounded-2xl p-7 text-center"
        >
          <div className="text-4xl font-bold mb-2" style={{ color }}>{value}</div>
          <div className="text-sm font-semibold text-white mb-2">{label}</div>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>{desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-8 text-center">
      <Link
        href={`/${locale}/hseq`}
        className="btn-outline-white inline-flex min-h-[44px] items-center rounded-lg px-6 py-2.5 text-sm font-medium"
      >
        View HSEQ Policy →
      </Link>
    </div>
  </div>
</section>


{/* ════════════════════════════════════════════════════════════
    §7  CTA  — deep navy (mirrors hero, closes the loop)
    ════════════════════════════════════════════════════════════ */}
<section
  className="py-20"
  style={{ background: 'linear-gradient(155deg, #0B3060 0%, #0D1B3E 100%)' }}
  aria-labelledby="cta-heading"
>
  {/* Teal top edge line */}
  <div
    className="absolute top-0 left-0 right-0 h-px pointer-events-none"
    style={{ background: 'linear-gradient(90deg, transparent, #0EA5C9 30%, #22D3EE 50%, #0EA5C9 70%, transparent)' }}
    aria-hidden="true"
  />

  <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
    <h2 id="cta-heading" className="text-2xl font-bold text-white sm:text-3xl">
      {t('ctaTitle')}
    </h2>
    <p className="mt-4 text-base" style={{ color: 'rgba(255,255,255,0.70)' }}>
      {t('ctaSubtitle')}
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Link href={`/${locale}/contact`} className="btn-cta inline-flex min-h-[44px] items-center rounded-lg px-8 py-2.5 text-sm font-bold">
        {t('ctaContact')}
      </Link>
      <Link
        href={`/${locale}/services`}
        className="btn-outline-white inline-flex min-h-[44px] items-center rounded-lg px-8 py-2.5 text-sm font-semibold"
      >
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
