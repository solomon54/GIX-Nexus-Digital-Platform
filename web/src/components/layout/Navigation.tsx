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
        background: scrolled
          ? 'rgba(10, 22, 50, 0.96)'
          : 'linear-gradient(180deg, #0D1B3E 0%, #0A2244 100%)',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.6)' : 'none',
        borderBottom: '1px solid rgba(14,165,201,0.14)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(0,0,0,0.28), 0 1px 0 rgba(14,165,201,0.10)'
          : '0 2px 12px rgba(0,0,0,0.18)',
        transition: 'box-shadow 300ms ease, background 300ms ease',
      }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
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

        {/* ── Desktop nav links ── */}
        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`nav-link relative inline-flex items-center px-3 py-2 text-[13.5px] rounded-lg transition-colors ${
                  isActive(link.href) ? 'nav-link-active' : ''
                }`}
                style={{
                  color: isActive(link.href) ? '#22D3EE' : 'rgba(255,255,255,0.78)',
                  background: isActive(link.href) ? 'rgba(14,165,201,0.14)' : 'transparent',
                  fontWeight: isActive(link.href) ? 600 : 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Controls ── */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <Link
            href={getLocaleSwitchHref()}
            hrefLang={otherLocale}
            aria-label={`Switch to ${otherLocale === 'am' ? 'Amharic' : 'English'}`}
            className="hidden sm:inline-flex items-center justify-center rounded-lg nav-control whitespace-nowrap"
            style={{
              border: '1px solid rgba(14,165,201,0.35)',
              color: 'rgba(255,255,255,0.70)',
              fontSize: '12px',
              padding: '6px 10px',
              minHeight: '32px',
            }}
          >
            {locale === 'en' ? tCommon('languageToggle') : 'EN'}
          </Link>

          {/* Contact CTA — teal gradient button */}
          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex items-center rounded-lg font-semibold whitespace-nowrap transition-all"
            style={{
              background: 'linear-gradient(135deg, #0EA5C9 0%, #22D3EE 100%)',
              color: '#0D1B3E',
              fontSize: '13px',
              padding: '7px 16px',
              minHeight: '32px',
              boxShadow: '0 2px 12px rgba(14,165,201,0.35)',
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
            className="inline-flex lg:hidden min-h-[36px] min-w-[36px] items-center justify-center rounded-lg nav-control"
            style={{
              border: '1px solid rgba(14,165,201,0.35)',
              color: 'rgba(255,255,255,0.80)',
            }}
          >
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

      {/* ── Scoped nav styles ── */}
      <style>{`
        /* Hover state */
        .nav-link:hover {
          color: #22D3EE !important;
          background: rgba(14,165,201,0.10) !important;
        }

        /* Animated teal underline — grows left → right on hover */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 12px;
          width: 0;
          height: 1.5px;
          border-radius: 99px;
          background: linear-gradient(90deg, #0EA5C9 0%, #22D3EE 100%);
          box-shadow: 0 0 8px rgba(34,211,238,0.60);
          transition: width 600ms cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .nav-link:hover::after {
          width: calc(100% - 24px);
        }

        /* Active — full underline, stays put */
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 12px;
          width: calc(100% - 24px);
          height: 1.5px;
          border-radius: 99px;
          background: linear-gradient(90deg, #0EA5C9 0%, #22D3EE 100%);
          box-shadow: 0 0 12px rgba(34,211,238,0.80), 0 0 24px rgba(34,211,238,0.25);
        }

        /* Controls hover */
        .nav-control:hover {
          background: rgba(14,165,201,0.12) !important;
          color: #22D3EE !important;
          border-color: rgba(14,165,201,0.55) !important;
        }
      `}</style>

      {/* ── Mobile drawer — dark navy, same palette ── */}
      <div
        id="mobile-nav"
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? '600px' : '0',
          opacity: mobileOpen ? 1 : 0,
          transition: 'max-height 300ms ease, opacity 200ms ease',
          borderTop: mobileOpen ? '1px solid rgba(14,165,201,0.18)' : 'none',
          background: '#0A2444',
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
                  className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{
                    color: isActive(link.href) ? '#22D3EE' : 'rgba(255,255,255,0.78)',
                    background: isActive(link.href) ? 'rgba(14,165,201,0.14)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="mt-3 pt-3 flex flex-col gap-2"
            style={{ borderTop: '1px solid rgba(14,165,201,0.15)' }}
          >
            <Link
              href={getLocaleSwitchHref()}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.60)' }}
              hrefLang={otherLocale}
            >
              {locale === 'en' ? tCommon('languageToggle') : 'English'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="flex justify-center min-h-[44px] items-center rounded-lg font-semibold text-sm"
              style={{
                background: 'linear-gradient(135deg, #0EA5C9 0%, #22D3EE 100%)',
                color: '#0D1B3E',
              }}
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
