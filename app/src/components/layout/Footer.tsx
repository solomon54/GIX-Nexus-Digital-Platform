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
    <footer className="mt-auto" style={{ background: '#07111C', borderTop: '1px solid #0B1726' }}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Company logo — placeholder: replace with actual GIX Nexus logo file */}
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/assets/company-logo.png"
                  alt="GIX Nexus Telecom and Power logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-base font-bold leading-tight" style={{ color: '#008CFF' }}>GIX Nexus</p>
                <p className="text-xs font-medium" style={{ color: '#B9C6D3' }}>Telecom and Power</p>
              </div>
            </Link>

            {/* Tagline — from footer.tagline translation */}
            <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: '#B9C6D3' }}>
              {t('tagline')}
            </p>

            {/* Ethiopian-owned badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              style={{ borderColor: 'rgba(0,140,255,0.3)', background: 'rgba(0,140,255,0.08)' }}>
              <span className="text-base" aria-hidden="true">🇪🇹</span>
              <span className="text-xs font-semibold" style={{ color: '#008CFF' }}>Ethiopian-Owned Company</span>
            </div>

            {/* Legal note */}
            <p className="mt-4 text-xs" style={{ color: 'rgba(185,198,211,0.6)' }}>{t('legalNote')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#FFFFFF' }}>{t('linksTitle')}</h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors focus:outline-none focus:ring-1 rounded"
                    style={{ color: '#B9C6D3' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#008CFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#B9C6D3')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — Source: Company Profile PDF, Page 10 */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#FFFFFF' }}>{t('contactTitle')}</h3>
            <address className="not-italic">
              <ul className="flex flex-col gap-3" role="list">
                {/* Name & title — Source: Company Profile PDF, Page 10 */}
                <li>
                  <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>{CONTACT.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#B9C6D3' }}>{CONTACT.title}</p>
                </li>

                {/* Phone — Source: Company Profile PDF, Page 10 */}
                <li>
                  <a
                    href="tel:+251911509555"
                    className="text-sm transition-colors"
                    style={{ color: '#B9C6D3' }}
                  >
                    +251 911 509 555
                  </a>
                </li>

                {/* Email — Source: Company Profile PDF, Page 10 */}
                <li>
                  <a
                    href="mailto:gixnexustelecom@gmail.com"
                    className="text-sm transition-colors break-all"
                    style={{ color: '#B9C6D3' }}
                  >
                    gixnexustelecom@gmail.com
                  </a>
                </li>

                {/* Address — Source: Company Profile PDF, Page 10 */}
                <li className="text-sm" style={{ color: '#B9C6D3' }}>
                  Addis Ababa, Ethiopia
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: 'rgba(185,198,211,0.6)' }}>
              &copy; 2026 {t('company')}. {t('rights')}
            </p>
            <p className="text-xs" style={{ color: 'rgba(185,198,211,0.4)' }}>
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
