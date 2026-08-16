'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

interface NavigationProps {
  locale: string
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const otherLocale = locale === 'en' ? 'am' : 'en'

  // Swap the locale prefix in the current pathname
  const getLocaleSwitchHref = () => {
    // pathname is like /en/services or /am/company
    const segments = pathname.split('/')
    segments[1] = otherLocale
    return segments.join('/')
  }

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/company`, label: t('company') },
    { href: `/${locale}/hseq`, label: t('hseq') },
    { href: `/${locale}/industries`, label: t('industries') },
    { href: `/${locale}/capabilities`, label: t('capabilities') },
    { href: `/${locale}/future-goals`, label: t('futureGoals') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex min-h-[44px] items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-2 rounded"
          aria-label="GIX Nexus Telecom and Power — Home"
        >
          {/* Fallback text logo if image not yet available */}
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-[var(--brand-blue)]">
              GIX Nexus
            </span>
            <span className="text-xs text-[var(--muted-foreground)] leading-tight">
              Telecom and Power
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  'inline-flex min-h-[44px] items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-1',
                  isActive(link.href)
                    ? 'bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]'
                    : 'text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--brand-blue)]',
                ].join(' ')}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls: locale + theme + mobile */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <Link
            href={getLocaleSwitchHref()}
            className={[
              'hidden sm:inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3',
              'border border-[var(--border)] text-sm font-medium',
              'text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-1',
            ].join(' ')}
            aria-label={`Switch to ${otherLocale === 'am' ? 'Amharic' : 'English'}`}
            hrefLang={otherLocale}
          >
            {locale === 'en' ? tCommon('languageToggle') : 'English'}
          </Link>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={[
              'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md',
              'border border-[var(--border)] text-[var(--foreground)]',
              'hover:bg-[var(--muted)] transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-1',
            ].join(' ')}
            aria-label={tCommon('toggleTheme')}
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={[
              'inline-flex lg:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-md',
              'border border-[var(--border)] text-[var(--foreground)]',
              'hover:bg-[var(--muted)] transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-1',
            ].join(' ')}
            aria-label={mobileOpen ? tCommon('closeMenu') : tCommon('openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-[var(--border)] bg-[var(--background)] px-4 pb-4 pt-2"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-1',
                    isActive(link.href)
                      ? 'bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]'
                      : 'text-[var(--foreground)] hover:bg-[var(--muted)]',
                  ].join(' ')}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile locale toggle */}
          <div className="mt-3 border-t border-[var(--border)] pt-3">
            <Link
              href={getLocaleSwitchHref()}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              hrefLang={otherLocale}
            >
              {locale === 'en' ? tCommon('languageToggle') : 'English'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
