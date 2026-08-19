import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

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
// Images from Unsplash (free license) — replace with real GIX field photos when available
const SERVICES_DATA = [
  {
    slug: 'telecommunications-infrastructure',
    nameKey: 'telecomInfrastructure',
    // Telecom tower installation work — relevant to outdoor/indoor facilities
    image: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=600&q=80',
    imageAlt: 'Telecom tower installation and maintenance',
  },
  {
    slug: 'fiber-optic-solutions',
    nameKey: 'fiberOptic',
    // Fiber optic cables with light — exactly what the service describes
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
    imageAlt: 'Fiber optic cable installation and splicing',
  },
  {
    slug: 'satellite-wireless-communications',
    nameKey: 'satelliteWireless',
    // Satellite dish — VSAT and satellite communication systems
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&q=80',
    imageAlt: 'Satellite dish and wireless communication systems',
  },
  {
    slug: 'network-infrastructure',
    nameKey: 'networkInfrastructure',
    // Server rack / network cables — structured cabling, LAN/WAN
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    imageAlt: 'Network infrastructure and structured cabling',
  },
  {
    slug: 'telecom-power-systems',
    nameKey: 'telecomPower',
    // Power infrastructure — DC systems, rectifiers, battery banks
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
    imageAlt: 'Telecom power systems and electrical infrastructure',
  },
  {
    slug: 'maintenance-technical-support',
    nameKey: 'maintenance',
    // Field engineer doing maintenance work
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
    imageAlt: 'Field maintenance and technical support operations',
  },
] as const

function HomePage({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const tServices = useTranslations('services')
  const tIndustries = useTranslations('industries')
  const sectors = tIndustries.raw('sectors') as string[]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="hero-heading">

        {/* Background image — telecom tower at dusk */}
        {/* Image: Unsplash photo-1562408590-e32931084e23 — telecom tower infrastructure */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1562408590-e32931084e23?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          {/* Dark overlay — maintains readability, matches brand dark theme */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.95) 0%, rgba(11,23,38,0.88) 60%, rgba(7,17,28,0.75) 100%)' }} />
        </div>

        {/* Engineering grid overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(#008CFF 1px, transparent 1px), linear-gradient(90deg, #008CFF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#008CFF]/30 bg-[#008CFF]/10 px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#65D51A] animate-pulse" />
                {/* Source: Company Profile PDF, Page 1 */}
                <span className="text-sm font-medium text-[#B9C6D3]">{t('heroTagline')}</span>
              </div>

              <h1 id="hero-heading" className="font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 52px)', lineHeight: '1.15' }}>
                {t('heroTitle')}
              </h1>

              <p className="mt-6 text-lg text-[#B9C6D3] max-w-lg leading-relaxed">
                {t('heroSubtitle')}
              </p>

              {/* Key stats — Source: Company Profile PDF, Pages 1, 3 */}
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div className="text-center">
                  {/* Source: Company Profile PDF, Page 3 — "7+" is a verbatim company headline */}
                  <div className="text-4xl font-bold text-[#008CFF]">7+</div>
                  <div className="text-xs text-[#708090] mt-1 uppercase tracking-wide">{t('stats.serviceDomainsLabel')}</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-4xl font-bold text-[#008CFF]">24/7</div>
                  <div className="text-xs text-[#708090] mt-1 uppercase tracking-wide">{t('stats.supportLabel')}</div>
                </div>
                <div className="text-center">
                  {/* Source: Company Profile PDF, Page 3 — policy statement, not a metric */}
                  <div className="text-4xl font-bold text-[#65D51A]">100%</div>
                  <div className="text-xs text-[#708090] mt-1 uppercase tracking-wide">{t('stats.safetyLabel')}</div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={`/${locale}/services`}
                  className="inline-flex min-h-[44px] items-center rounded-lg bg-[#008CFF] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3FABFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2 focus:ring-offset-[#07111C]">
                  {t('ctaServices')}
                </Link>
                <Link href={`/${locale}/company`}
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-white/25 px-8 py-3 text-sm font-semibold text-white hover:bg-white/8 transition-colors">
                  {t('ctaProfile')}
                </Link>
              </div>
            </div>

            {/* Right: Logo card */}
            <div className="hidden lg:flex justify-end">
              <div className="rounded-2xl p-8 border border-white/10 w-72" style={{ background: 'rgba(11,23,38,0.85)', backdropFilter: 'blur(16px)' }}>
                {/* Source: company-logo.png — GIX Nexus brand mark */}
                <Image
                  src="/assets/company-logo.png"
                  alt="GIX Nexus Telecom and Power"
                  width={240}
                  height={120}
                  className="object-contain w-full"
                  priority
                />
                <div className="mt-5 pt-4 border-t border-white/10 space-y-1 text-center">
                  {/* Source: Company Profile PDF, Page 1 */}
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
            <h2 id="services-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
              {t('servicesTitle')}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto" style={{ color: 'var(--foreground-subtle)' }}>
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((service) => {
              const capabilities = tServices.raw(`groups.${service.nameKey}.capabilities`) as string[]
              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/services/${service.slug}`}
                  className="group rounded-xl overflow-hidden border transition-all hover:border-[#008CFF]/50 hover:shadow-lg hover:shadow-[#008CFF]/10 focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  {/* Service image — relevant to each specific service */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.7) 0%, transparent 60%)' }} />
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>
                      {tServices(`groups.${service.nameKey}.name`)}
                    </h3>
                    <p className="mt-2 text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>
                      {tServices(`groups.${service.nameKey}.description`)}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {capabilities.slice(0, 2).map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--foreground-subtle)' }}>
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#008CFF]" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs font-semibold text-[#008CFF] group-hover:text-[#12C8FF] transition-colors">
                      Learn more →
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why Partner + MD quote ───────────────────────────────── */}
      {/* Source: Company Profile PDF, Pages 2, 9 */}
      <section className="py-28 section-top-divide bg-section-even" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: MD photo card */}
            <div>
              <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background: 'linear-gradient(135deg, #0B1726, #172331)' }}>
                {/* Source: leader-prof-img.png — Getachew Teshome, Managing Director */}
                <div className="relative h-80">
                  <Image
                    src="/assets/leader-prof-img.png"
                    alt="Getachew Teshome — Managing Director, GIX Nexus Telecom and Power"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.9) 0%, transparent 50%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    {/* Source: Company Profile PDF, Page 2 — name and title */}
                    <p className="font-semibold text-white">Getachew Teshome</p>
                    <p className="text-sm text-[#708090]">Managing Director</p>
                  </div>
                </div>
                <div className="p-6">
                  {/* Source: Company Profile PDF, Page 2 — verbatim MD statement */}
                  <blockquote className="text-sm italic leading-relaxed text-[#B9C6D3]">
                    &ldquo;We are committed to delivering dependable, safe, and high-quality telecommunications and power engineering services that support the growth of Ethiopia&apos;s communications infrastructure.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Right: Features */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Why Partner with Us</p>
              <h2 id="features-heading" className="text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
                {t('featureTitle')}
              </h2>
              <div className="space-y-4">
                {(['qualifiedTeam', 'reliableDelivery', 'safetyCommitment', 'ethiopianOwned'] as const).map((key) => (
                  <div key={key} className="flex gap-4 p-5 rounded-xl border" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(0,140,255,0.12)', color: '#008CFF' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{t(`features.${key}.title`)}</h3>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{t(`features.${key}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HSEQ Banner ──────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Pages 1, 3, 8 — HSEQ policy and safety commitment */}
      <section className="relative py-20 overflow-hidden section-top-divide" aria-label="HSEQ Safety commitment">
        {/* Background: safety/field work image */}
        {/* Image: Unsplash photo-1578328819058 — worker with safety equipment in field */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
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
              {/* Source: Company Profile PDF, Page 8 — Zero Accident Objective is a goal/commitment */}
              <div className="text-4xl font-bold text-[#008CFF] mb-2">Zero</div>
              <div className="text-sm font-semibold text-white mb-1">Accident Objective</div>
              <p className="text-xs text-[#B9C6D3]">Our stated safety commitment and goal on every project site</p>
            </div>
            <div className="p-6 rounded-xl border border-white/10" style={{ background: 'rgba(11,23,38,0.6)', backdropFilter: 'blur(8px)' }}>
              {/* Source: Company Profile PDF, Page 3 — policy statement, not a performance metric */}
              <div className="text-4xl font-bold text-[#65D51A] mb-2">100%</div>
              <div className="text-sm font-semibold text-white mb-1">Safety-First Approach</div>
              <p className="text-xs text-[#B9C6D3]">Policy commitment — safety first on every project, without exception</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href={`/${locale}/hseq`}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-white/25 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/8 transition-colors">
              View HSEQ Policy →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sectors We Serve ─────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 9 — target sectors, NOT existing clients */}
      <section className="py-24 section-top-divide bg-section-accent" aria-labelledby="sectors-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Target Sectors</p>
            <h2 id="sectors-heading" className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
              {t('sectorsTitle')}
            </h2>
            {/* Disclaimer — these are prospective sectors, not confirmed clients */}
            <p className="mt-3 text-sm italic max-w-xl mx-auto" style={{ color: 'var(--foreground-subtle)' }}>
              {t('sectorsDisclaimer')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {sectors.slice(0, 8).map((sector, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border p-3 text-sm font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#008CFF]" />
                {sector}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={`/${locale}/industries`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-[#008CFF]/10"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              {t('viewAllSectors')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #07111C, #0B1726)' }} aria-labelledby="cta-heading">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">{t('ctaTitle')}</h2>
          <p className="mt-4 text-lg text-[#B9C6D3]">{t('ctaSubtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-[#008CFF] px-10 py-3 text-sm font-semibold text-white hover:bg-[#3FABFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2 focus:ring-offset-[#07111C]">
              {t('ctaContact')}
            </Link>
            <Link href={`/${locale}/services`}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-white/20 px-10 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors">
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
