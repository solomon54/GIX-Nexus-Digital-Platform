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

  const currentYear = new Date().getFullYear()

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
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="text-xl font-bold text-[var(--brand-blue)]">GIX Nexus</p>
            <p className="text-sm font-medium text-[var(--foreground)]">Telecom and Power</p>
            <p className="mt-3 max-w-sm text-sm text-[var(--muted-foreground)]">
              {t('tagline')}
            </p>
            {/* Legal note */}
            <p className="mt-3 text-xs text-[var(--muted-foreground)]">{t('legalNote')}</p>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">{t('linksTitle')}</h3>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-blue)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--brand-blue)] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">{t('contactTitle')}</h3>
            {/* Source: Company Profile PDF, Page 10 */}
            <address className="mt-4 not-italic">
              <ul className="flex flex-col gap-2" role="list">
                <li className="text-sm text-[var(--muted-foreground)]">
                  <span className="font-medium text-[var(--foreground)]">{CONTACT.name}</span>
                  <br />
                  {CONTACT.title}
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-blue)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--brand-blue)] rounded"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-blue)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--brand-blue)] rounded break-all"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li className="text-sm text-[var(--muted-foreground)]">
                  {CONTACT.address}
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-[var(--border)] pt-6">
          <p className="text-center text-xs text-[var(--muted-foreground)]">
            &copy; {currentYear} {t('company')}. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
