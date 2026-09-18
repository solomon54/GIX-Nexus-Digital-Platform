"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface NavigationProps {
  locale: string;
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "en" ? "am" : "en";

  const getLocaleSwitchHref = () => {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    return segments.join("/");
  };

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/company`, label: t("company") },
    { href: `/${locale}/hseq`, label: t("hseq") },
    { href: `/${locale}/industries`, label: t("industries") },
    { href: `/${locale}/capabilities`, label: t("capabilities") },
    { href: `/${locale}/future-goals`, label: t("futureGoals") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`)
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  return (
    <header
      className="z-[60] w-full relative overflow-visible"
      style={{
        position: "sticky",
        top: "0px",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        background:
          scrolled ?
            "linear-gradient(180deg, rgba(208,230,248,0.94) 0%, rgba(190,214,236,0.92) 100%)"
          : "linear-gradient(180deg, rgba(212,234,250,0.78) 0%, rgba(194,218,238,0.72) 52%, rgba(182,208,232,0.66) 100%)",
        backdropFilter: "blur(18px) saturate(1.70)",
        WebkitBackdropFilter: "blur(18px) saturate(1.70)",
        boxShadow:
          scrolled ?
            "0 14px 42px rgba(14,120,170,0.20), 0 2px 14px rgba(14,165,201,0.12)"
          : "0 10px 34px rgba(14,120,170,0.14), 0 1px 8px rgba(14,165,201,0.10)",
        transition:
          "box-shadow 300ms ease, background 300ms ease, background 300msms ease",
      }}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8 relative z-[2]"
        style={{ position: "relative", zIndex: 2 }}
        aria-label="Main navigation">
        <Link
          href={`/${locale}`}
          aria-label="GIX Nexus Telecom and Power — Home"
          className="flex min-h-[44px] items-center shrink-0 relative">
          <span
            aria-hidden="true"
            className="logo-sky-bloom pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "300px",
              height: "120px",
              background:
                "radial-gradient(ellipse at 50% 52%, rgba(182,218,240,0.88) 0%, rgba(196,228,246,0.56) 30%, rgba(210,236,250,0.20) 60%, rgba(224,242,252,0.00) 86%)",
              filter: "blur(6px)",
            }}
          />
          <Image
            src="/assets/company-logo.png"
            alt="GIX Nexus Telecom and Power"
            width={170}
            height={48}
            style={{
              height: "48px",
              width: "auto",
              maxHeight: "48px",
              filter:
                "drop-shadow(0 0.5px 0 rgba(13,27,62,0.46)) drop-shadow(0 1.5px 5px rgba(14,165,201,0.20)) contrast(1.07) brightness(1.02)",
            }}
            className="object-contain relative z-[1]"
            priority
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`nav-link relative inline-flex items-center px-3.5 py-2.5 text-[13.5px] rounded-lg transition-colors ${
                  isActive(link.href) ? "nav-link-active" : ""
                }`}
                style={{
                  color: isActive(link.href) ? "#055A77" : "#23395A",
                  background:
                    isActive(link.href) ?
                      "linear-gradient(180deg, rgba(222,240,252,0.86) 0%, rgba(196,220,240,0.64) 100%)"
                    : "transparent",
                  fontWeight: isActive(link.href) ? 650 : 500,
                  whiteSpace: "nowrap",
                  boxShadow:
                    isActive(link.href) ?
                      "inset 0 1px 0 rgba(255,255,255,0.34), inset 0 0 0 1px rgba(14,165,201,0.30), 0 2px 12px rgba(14,165,201,0.20)"
                    : "none",
                }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="flex items-center gap-2 relative z-[2]"
          style={{ position: "relative", zIndex: 2 }}>
          <Link
            href={getLocaleSwitchHref()}
            hrefLang={otherLocale}
            aria-label={`Switch to ${otherLocale === "am" ? "Amharic" : "English"}`}
            className="hidden sm:inline-flex items-center justify-center rounded-lg nav-control whitespace-nowrap"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.30)",
              borderBottom: "1px solid rgba(14,165,201,0.20)",
              borderLeft: "1px solid rgba(255,255,255,0.18)",
              borderRight: "1px solid rgba(14,165,201,0.14)",
              background:
                "linear-gradient(135deg, rgba(220,238,250,0.74) 0%, rgba(196,220,240,0.56) 100%)",
              color: "#23395A",
              fontSize: "12px",
              padding: "6px 11px",
              minHeight: "32px",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.30), 0 2px 10px rgba(14,120,170,0.10), inset 0 -1px 0 rgba(14,165,201,0.08)",
              backdropFilter: "blur(10px) saturate(1.5)",
              WebkitBackdropFilter: "blur(10px) saturate(1.5)",
            }}>
            {locale === "en" ? tCommon("languageToggle") : "EN"}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex items-center rounded-lg font-semibold whitespace-nowrap transition-all"
            style={{
              background: "linear-gradient(135deg, #0EA5C9 0%, #22C8E0 100%)",
              color: "#F4FBFF",
              fontSize: "13px",
              padding: "7px 17px",
              minHeight: "32px",
              borderTop: "1px solid rgba(255,255,255,0.24)",
              borderBottom: "1px solid rgba(6,116,150,0.20)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 14px rgba(14,165,201,0.24), 0 1px 3px rgba(14,120,170,0.12)",
            }}>
            {t("contact")}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? tCommon("closeMenu") : tCommon("openMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="inline-flex lg:hidden min-h-[36px] min-w-[36px] items-center justify-center rounded-lg nav-control"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.30)",
              borderBottom: "1px solid rgba(14,165,201,0.20)",
              borderLeft: "1px solid rgba(255,255,255,0.18)",
              borderRight: "1px solid rgba(14,165,201,0.14)",
              background:
                "linear-gradient(135deg, rgba(220,238,250,0.74) 0%, rgba(196,220,240,0.56) 100%)",
              color: "#23395A",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.30), 0 2px 10px rgba(14,120,170,0.10), inset 0 -1px 0 rgba(14,165,201,0.08)",
              backdropFilter: "blur(10px) saturate(1.5)",
              WebkitBackdropFilter: "blur(10px) saturate(1.5)",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true">
              {mobileOpen ?
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              : <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              }
            </svg>
          </button>
        </div>
      </nav>

      <style>{`
        .nav-link:hover {
          color: #067496 !important;
          background: linear-gradient(180deg, rgba(222,240,252,0.64) 0%, rgba(198,222,240,0.40) 100%) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.30), inset 0 0 0 1px rgba(14,165,201,0.22), 0 2px 10px rgba(14,165,201,0.12) !important;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 10px;
          width: 0;
          height: 2.5px;
          border-radius: 99px;
          background: linear-gradient(90deg, #067496 0%, #1FB8D6 55%, #22C8E0 100%);
          box-shadow: 0 0 10px rgba(14,165,201,0.44), 0 0 22px rgba(34,200,224,0.14);
          transition: width 520ms cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .nav-link:hover::after {
          width: calc(100% - 20px);
        }
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 10px;
          width: calc(100% - 20px);
          height: 2.5px;
          border-radius: 99px;
          background: linear-gradient(90deg, #067496 0%, #1FB8D6 55%, #22C8E0 100%);
          box-shadow: 0 0 12px rgba(14,165,201,0.56), 0 0 28px rgba(34,200,224,0.18);
        }
        .logo-sky-bloom {
          transition: filter 220ms ease, opacity 220ms ease;
        }
        a:hover > .logo-sky-bloom {
          opacity: 1;
          filter: blur(5px) saturate(1.1);
        }
        .nav-control:hover {
          background: linear-gradient(180deg, rgba(228,242,252,0.72) 0%, rgba(202,224,242,0.46) 100%) !important;
          color: #067496 !important;
          border-color: rgba(14,165,201,0.36) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.30), inset 0 0 0 1px rgba(14,165,201,0.22), 0 2px 10px rgba(14,165,201,0.12) !important;
        }
      `}</style>

      <div
        id="mobile-nav"
        className="lg:hidden overflow-hidden relative z-[2]"
        style={{
          position: "relative",
          zIndex: 2,
          maxHeight: mobileOpen ? "600px" : "0",
          opacity: mobileOpen ? 1 : 0,
          transition: "max-height 300ms ease, opacity 200ms ease",
          borderTop: mobileOpen ? "1px solid rgba(255,255,255,0.24)" : "none",
          borderBottom: mobileOpen ? "1px solid rgba(14,165,201,0.16)" : "none",
          background:
            "linear-gradient(180deg, rgba(214,232,248,0.86) 0%, rgba(196,218,238,0.82) 100%)",
          backdropFilter: "blur(20px) saturate(1.7)",
          WebkitBackdropFilter: "blur(20px) saturate(1.7)",
          boxShadow: "0 10px 30px rgba(14,120,170,0.12)",
        }}>
        <div className="px-4 pb-5 pt-3">
          <ul className="flex flex-col gap-0.5" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{
                    color: isActive(link.href) ? "#055A77" : "#23395A",
                    background:
                      isActive(link.href) ?
                        "linear-gradient(180deg, rgba(222,240,252,0.84) 0%, rgba(196,220,240,0.62) 100%)"
                      : "transparent",
                    fontWeight: isActive(link.href) ? 600 : 500,
                    boxShadow:
                      isActive(link.href) ?
                        "inset 0 1px 0 rgba(255,255,255,0.30), inset 0 0 0 1px rgba(14,165,201,0.28), 0 2px 10px rgba(14,165,201,0.16)"
                      : "none",
                  }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="mt-3 pt-3 flex flex-col gap-2"
            style={{ borderTop: "1px solid rgba(14,165,201,0.14)" }}>
            <Link
              href={getLocaleSwitchHref()}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{
                color: "#23395A",
                background:
                  "linear-gradient(135deg, rgba(220,238,250,0.72) 0%, rgba(196,220,240,0.52) 100%)",
                borderTop: "1px solid rgba(255,255,255,0.28)",
                borderBottom: "1px solid rgba(14,165,201,0.18)",
                borderLeft: "1px solid rgba(255,255,255,0.16)",
                borderRight: "1px solid rgba(14,165,201,0.14)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.28), 0 2px 8px rgba(14,120,170,0.10)",
              }}
              hrefLang={otherLocale}>
              {locale === "en" ? tCommon("languageToggle") : "English"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="flex justify-center min-h-[44px] items-center rounded-lg font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #0EA5C9 0%, #22C8E0 100%)",
                color: "#F4FBFF",
                borderTop: "1px solid rgba(255,255,255,0.24)",
                borderBottom: "1px solid rgba(6,116,150,0.20)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 14px rgba(14,165,201,0.22)",
              }}>
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          height: "14px",
          pointerEvents: "none",
          zIndex: 1,
        }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg,
                transparent 0%,
                rgba(14,165,201,0.12) 14%,
                rgba(14,165,201,0.26) 34%,
                rgba(20,188,220,0.40) 50%,
                rgba(34,211,238,0.26) 66%,
                rgba(14,165,201,0.12) 86%,
                transparent 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "1px",
            left: 0,
            right: 0,
            height: "13px",
            background: `linear-gradient(180deg,
                rgba(14,120,170,0.14) 0%,
                rgba(14,120,170,0.07) 40%,
                rgba(14,120,170,0.02) 75%,
                transparent 100%)`,
            filter: "blur(0.4px)",
          }}
        />
      </div>
    </header>
  );
}
