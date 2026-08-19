import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
// Source: Company Profile PDF, Page 10
import { CONTACT } from '@/lib/constants'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  const navLinks = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/services`, label: tNav('services') },
    { href: `/${locale}/company`, label: tNav('company') },
    { href: `/${locale}/hseq`, label: tNav('hseq') },
    { href: `/${locale}/industries`, label: tNav('industries') },
    { href: `/${locale}/capabilities`, label: tNav('capabilities') },
    { href: `/${locale}/future-goals`, label: tNav('futureGoals') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ]

  return (
    <footer>
      {/* ── Top boundary — gradient separator, highly visible ─── */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(63,171,255,0.4) 30%, rgba(0,128,240,0.6) 50%, rgba(63,171,255,0.4) 70%, transparent 100%)',
      }} />

      {/* ── Main footer body ─────────────────────────────────── */}
      <div style={{ background: '#07111C' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Top section — logo + tagline + links */}
          <div className="py-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">

            {/* Brand — spans 4 columns on large screens */}
            <div className="lg:col-span-4">
              <Link href={`/${locale}`} className="inline-flex items-center mb-5">
                <Image
                  src="/assets/company-logo.png"
                  alt="GIX Nexus Telecom and Power"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#94A3B8', maxWidth: '280px' }}>
                {t('tagline')}
              </p>

              {/* Ethiopian-owned badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
                style={{
                  border: '1px solid rgba(63,171,255,0.25)',
                  background: 'rgba(0,128,240,0.08)',
                  color: '#60A5FA',
                }}
              >
                <span aria-hidden="true">🇪🇹</span>
                Ethiopian-Owned Company
              </div>
            </div>

            {/* Quick Links — 2 columns on large screens */}
            <div className="lg:col-span-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#64748B' }}>
                {t('linksTitle')}
              </h3>
              {/* Responsive 2-column grid for links */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — 4 columns on large screens */}
            {/* Source: Company Profile PDF, Page 10 */}
            <div className="lg:col-span-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#64748B' }}>
                {t('contactTitle')}
              </h3>
              <address className="not-italic">
                <ul className="flex flex-col gap-4" role="list">
                  <li>
                    <p className="text-sm font-semibold text-white">{CONTACT.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{CONTACT.title}</p>
                  </li>
                  <li>
                    <a
                      href="tel:+251911509555"
                      className="group flex items-center gap-2.5 text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
                    >
                      <span
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs"
                        style={{ background: 'rgba(0,128,240,0.12)', color: '#60A5FA' }}
                      >
                        📞
                      </span>
                      +251 911 509 555
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:gixnexustelecom@gmail.com"
                      className="group flex items-center gap-2.5 text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 break-all"
                    >
                      <span
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs"
                        style={{ background: 'rgba(0,128,240,0.12)', color: '#60A5FA' }}
                      >
                        ✉️
                      </span>
                      gixnexustelecom@gmail.com
                    </a>
                  </li>
                  <li
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: '#94A3B8' }}
                  >
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs"
                      style={{ background: 'rgba(101,213,26,0.10)', color: '#4ADE80' }}
                    >
                      📍
                    </span>
                    Addis Ababa, Ethiopia
                  </li>
                </ul>
              </address>
            </div>
          </div>

          {/* Bottom bar — copyright */}
          <div
            className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs" style={{ color: '#475569' }}>
              &copy; 2026 {t('company')}. {t('rights')}
            </p>
            <p className="text-xs" style={{ color: '#334155' }}>
              {t('legalNote')}
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
