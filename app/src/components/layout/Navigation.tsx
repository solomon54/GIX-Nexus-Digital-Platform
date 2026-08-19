'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

interface NavigationProps {
  locale: string
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const otherLocale = locale === 'en' ? 'am' : 'en'

  const getLocaleSwitchHref = () => {
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
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        /* Theme-aware frosted glass:
           - Light: white/94 with blur — clean, Apple.com style
           - Dark: midnight/88 with blur — Linear/Vercel style
           Both use the same blur + border — consistent, elegant */
        background: scrolled
          ? 'color-mix(in srgb, var(--background) 92%, transparent)'
          : 'var(--background)',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        transition: 'box-shadow 0.3s ease, background 0.3s ease',
      }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo — transparent, no box, no border */}
        <Link
          href={`/${locale}`}
          aria-label="GIX Nexus Telecom and Power — Home"
          className="flex min-h-[44px] items-center"
        >
          {/* Source: company-logo.png — transparent background, full visibility */}
          <Image
            src="/assets/company-logo.png"
            alt="GIX Nexus Telecom and Power"
            width={180}
            height={52}
            className="h-11 w-auto object-contain"
            style={{
              filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.25))',
              imageRendering: 'auto',
            }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="relative inline-flex items-center px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  color: isActive(link.href) ? 'var(--gix-blue)' : 'var(--foreground-muted)',
                  background: isActive(link.href) ? 'rgba(0,128,240,0.08)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (!isActive(link.href)) {
                    el.style.background = 'var(--soft-surface)'
                    el.style.color = 'var(--foreground)'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  if (!isActive(link.href)) {
                    el.style.background = 'transparent'
                    el.style.color = 'var(--foreground-muted)'
                  }
                }}
              >
                {link.label}
                {/* Active indicator — thin bottom line */}
                {isActive(link.href) && (
                  <span
                    className="absolute bottom-1 left-1/2 h-0.5 w-4 rounded-full -translate-x-1/2"
                    style={{ background: 'var(--gix-blue)' }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {/* Language toggle */}
          <Link
            href={getLocaleSwitchHref()}
            hrefLang={otherLocale}
            aria-label={`Switch to ${otherLocale === 'am' ? 'Amharic' : 'English'}`}
            className="hidden sm:inline-flex min-h-[36px] items-center justify-center rounded-lg px-3 text-sm font-medium border transition-all duration-200"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--foreground-muted)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--soft-surface)'
              el.style.color = 'var(--foreground)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.color = 'var(--foreground-muted)'
            }}
          >
            {locale === 'en' ? tCommon('languageToggle') : 'EN'}
          </Link>

          {/* Theme toggle */}
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={tCommon('toggleTheme')}
              className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg border transition-all duration-200"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground-muted)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--soft-surface)'
                el.style.color = 'var(--foreground)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
                el.style.color = 'var(--foreground-muted)'
              }}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-[17px] w-[17px]" aria-hidden="true">
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-[17px] w-[17px]" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? tCommon('closeMenu') : tCommon('openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="inline-flex lg:hidden min-h-[36px] min-w-[36px] items-center justify-center rounded-lg border transition-all duration-200"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground-muted)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--soft-surface)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="h-5 w-5" aria-hidden="true">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer — slides down smoothly */}
      <div
        id="mobile-nav"
        className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: mobileOpen ? '600px' : '0',
          opacity: mobileOpen ? 1 : 0,
          borderTop: mobileOpen ? '1px solid var(--border)' : 'none',
          background: 'var(--background)',
        }}
      >
        <div className="px-4 pb-5 pt-3">
          <ul className="flex flex-col" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
                  style={{
                    color: isActive(link.href) ? 'var(--gix-blue)' : 'var(--foreground)',
                    background: isActive(link.href) ? 'rgba(0,128,240,0.06)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href={getLocaleSwitchHref()}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
              style={{ color: 'var(--foreground-muted)' }}
              hrefLang={otherLocale}
            >
              {locale === 'en' ? tCommon('languageToggle') : 'English'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
