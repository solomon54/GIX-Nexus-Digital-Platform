'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface NavigationProps {
  locale: string
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
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
    { href: `/${locale}`,              label: t('home') },
    { href: `/${locale}/services`,     label: t('services') },
    { href: `/${locale}/company`,      label: t('company') },
    { href: `/${locale}/hseq`,         label: t('hseq') },
    { href: `/${locale}/industries`,   label: t('industries') },
    { href: `/${locale}/capabilities`, label: t('capabilities') },
    { href: `/${locale}/future-goals`, label: t('futureGoals') },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`
    return pathname.startsWith(href)
  }

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        /* Always deep navy — brand identity, logo visibility */
        background: scrolled ? 'rgba(3,8,16,0.92)' : '#050D1A',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,212,255,0.10)' : '1px solid rgba(0,212,255,0.06)',
        boxShadow: scrolled ? '0 1px 0 rgba(0,212,255,0.06), 0 4px 20px rgba(0,0,0,0.5)' : 'none',
        transition: 'box-shadow 300ms ease, backdrop-filter 300ms ease',
      }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          aria-label="GIX Nexus Telecom and Power — Home"
          className="flex min-h-[44px] items-center shrink-0"
        >
          <Image
            src="/assets/company-logo.png"
            alt="GIX Nexus Telecom and Power"
            width={170}
            height={48}
            style={{ height: '46px', width: 'auto', maxHeight: '46px' }}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav links — tight spacing to fit 8 links */}
        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`nav-link relative inline-flex items-center px-3 py-2 text-[14px] rounded-lg ${isActive(link.href) ? 'nav-link-active' : ''}`}
                style={{
                  color: isActive(link.href) ? '#FFFFFF' : 'rgba(180,210,230,0.85)',
                  background: isActive(link.href) ? 'rgba(0,212,255,0.09)' : 'transparent',
                  fontWeight: isActive(link.href) ? 600 : 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <Link
            href={getLocaleSwitchHref()}
            hrefLang={otherLocale}
            aria-label={`Switch to ${otherLocale === 'am' ? 'Amharic' : 'English'}`}
            className="hidden sm:inline-flex items-center justify-center rounded-lg border nav-control whitespace-nowrap"
            style={{
              borderColor: 'rgba(0,212,255,0.18)',
              color: 'rgba(180,210,230,0.75)',
              fontSize: '12px',
              padding: '6px 10px',
              minHeight: '32px',
            }}
          >
            {locale === 'en' ? tCommon('languageToggle') : 'EN'}
          </Link>

          {/* Contact CTA — gradient button, desktop only */}
          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex items-center rounded-lg text-white font-semibold whitespace-nowrap"
            style={{
              background: 'var(--btn-primary-bg)',
              fontSize: '13px',
              padding: '7px 14px',
              minHeight: '32px',
            }}
          >
            {t('contact')}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? tCommon('closeMenu') : tCommon('openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="inline-flex lg:hidden min-h-[36px] min-w-[36px] items-center justify-center rounded-lg border nav-control"
            style={{ borderColor: 'rgba(0,212,255,0.18)', color: 'rgba(180,210,230,0.75)' }}
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

      {/* Scoped nav hover styles — left-to-right underline animation */}
      <style>{`
        /* Base state — underline starts at left edge, width 0 */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 12px;        /* aligns with text padding */
          right: auto;
          width: 0;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, #00D4FF 0%, #6600FF 100%);
          box-shadow: 0 0 6px rgba(0,212,255,0.55);
          transition: width 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        /* Hover — grows left → right smoothly */
        .nav-link:hover::after {
          width: calc(100% - 24px);   /* match padding */
        }
        .nav-link:hover {
          color: #FFFFFF !important;
          background: rgba(0,212,255,0.05) !important;
        }
        /* Active — full width, brighter glow, stays put */
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 12px;
          width: calc(100% - 24px);
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, #00D4FF 0%, #6600FF 100%);
          box-shadow: 0 0 10px rgba(0,212,255,0.80), 0 0 22px rgba(0,212,255,0.25);
          /* No transition — active state is instant */
        }
        .nav-control:hover {
          background: rgba(0,212,255,0.08);
          color: #00D4FF;
          border-color: rgba(0,212,255,0.35) !important;
        }
      `}</style>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? '600px' : '0',
          opacity: mobileOpen ? 1 : 0,
          transition: 'max-height 300ms ease, opacity 200ms ease',
          borderTop: mobileOpen ? '1px solid rgba(0,212,255,0.10)' : 'none',
          background: '#050D1A',
        }}
      >
        <div className="px-4 pb-5 pt-3">
          <ul className="flex flex-col gap-0.5" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium"
                  style={{
                    color: isActive(link.href) ? '#00D4FF' : 'rgba(180,210,230,0.75)',
                    background: isActive(link.href) ? 'rgba(0,212,255,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}>
            <Link
              href={getLocaleSwitchHref()}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{ color: 'rgba(180,200,220,0.75)' }}
              hrefLang={otherLocale}
            >
              {locale === 'en' ? tCommon('languageToggle') : 'English'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="btn-primary flex justify-center text-sm"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
