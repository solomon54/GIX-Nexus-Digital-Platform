"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useContactModal } from "@/context/ContactModalContext";
import { CONTACT } from "@/lib/constants";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const { open: openModal } = useContactModal();

  const navLinks = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/services`, label: tNav("services") },
    { href: `/${locale}/company`, label: tNav("company") },
    { href: `/${locale}/hseq`, label: tNav("hseq") },
    { href: `/${locale}/industries`, label: tNav("industries") },
    { href: `/${locale}/capabilities`, label: tNav("capabilities") },
    { href: `/${locale}/future-goals`, label: tNav("futureGoals") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="relative" style={{ background: "#091422" }}>
      {/* Gentle light→dark transition compound (20px):
            bottom of light section has its own 22px fade descending INTO dark;
            top of footer has its own 20px fade STARTING from 60% opacity navy → full navy,
            so the two fades meet in the middle and the transition is invisible / unnoticeable. */}
      <div
        aria-hidden="true"
        style={{
          height: "20px",
          width: "100%",
          pointerEvents: "none",
          position: "relative",
          zIndex: 2,
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
                rgba(34,211,238,0.06) 16%,
                rgba(34,211,238,0.18) 38%,
                rgba(34,211,238,0.30) 50%,
                rgba(34,211,238,0.18) 62%,
                rgba(34,211,238,0.06) 84%,
                transparent 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "1px",
            left: 0,
            right: 0,
            height: "19px",
            background: `linear-gradient(180deg,
                rgba(12, 30, 64, 0.56) 0%,
                rgba(12, 30, 64, 0.74) 28%,
                rgba(12, 30, 64, 0.90) 60%,
                rgba(12, 30, 64, 1.00) 100%)`,
            filter: "blur(0.3px)",
          }}
        />
      </div>

      <div
        style={{
          background:
            "linear-gradient(180deg, #0D2348 0%, #0C1E40 18%, #0A1628 68%, #091422 100%)",
          position: "relative",
          zIndex: 3,
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-16 pb-10 sm:pt-20 sm:pb-12 grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-12">
            <div className="sm:col-span-2 lg:col-span-4">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center mb-5 shrink-0">
                <Image
                  src="/assets/company-logo.png"
                  alt="GIX Nexus Telecom and Power"
                  width={140}
                  height={40}
                  style={{ height: "36px", width: "auto", maxHeight: "36px" }}
                  className="object-contain"
                />
              </Link>

              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "rgba(148,185,220,0.75)", maxWidth: "280px" }}>
                {t("tagline")}
              </p>

              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
                style={{
                  border: "1px solid rgba(0,150,255,0.28)",
                  background: "rgba(0,120,220,0.10)",
                  color: "#60B0FF",
                }}>
                <span aria-hidden="true">🇪🇹</span>
                Ethiopian-Owned Company
              </div>
            </div>

            <div className="sm:col-span-1 lg:col-span-4">
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "rgba(150,185,220,0.65)" }}>
                {t("linksTitle")}
              </h3>
              {/* Responsive 2-column grid for links */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link text-sm text-[#94A3B8]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-4" style={{ order: 3 }}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "rgba(150,185,220,0.65)" }}>
                {t("contactTitle")}
              </h3>
              <address className="not-italic">
                <ul className="flex flex-col gap-4" role="list">
                  <li>
                    <p className="text-sm font-semibold text-white">
                      {CONTACT.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(150,185,220,0.65)" }}>
                      {CONTACT.title}
                    </p>
                  </li>
                  <li>
                    <a
                      href="tel:+251911509555"
                      className="group flex items-center gap-2.5 text-sm text-[#94A3B8] hover:text-white transition-colors duration-200">
                      <span
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs"
                        style={{
                          background: "rgba(0,120,220,0.12)",
                          color: "#60B0FF",
                        }}>
                        📞
                      </span>
                      +251 911 509 555
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={openModal}
                      className="group flex items-center gap-2.5 text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 w-full text-left">
                      <span
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs"
                        style={{
                          background: "rgba(0,120,220,0.12)",
                          color: "#60B0FF",
                        }}>
                        ✉️
                      </span>
                      <span className="break-all">{CONTACT.email}</span>
                    </button>
                  </li>
                  <li
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: "rgba(148,185,220,0.75)" }}>
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs"
                      style={{
                        background: "var(--green-light)",
                        color: "var(--green)",
                      }}>
                      📍
                    </span>
                    Addis Ababa, Ethiopia
                  </li>
                </ul>
              </address>
            </div>
          </div>

          <div
            className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(14,165,201,0.12)" }}>
            <p className="text-xs" style={{ color: "rgba(148,185,220,0.50)" }}>
              &copy; 2026 {t("company")}. {t("rights")}
            </p>
            <div className="flex items-center gap-3">
              <p
                className="text-xs"
                style={{ color: "rgba(148,185,220,0.50)" }}>
                {t("legalNote")}
              </p>
              <style>{`
                .admin-dot:hover {
                  border-color: rgba(0,140,255,0.6) !important;
                  background: rgba(0,140,255,0.15) !important;
                  box-shadow: 0 0 8px rgba(0,140,255,0.3) !important;
                }
              `}</style>
              <a
                href="/admin"
                aria-label="Admin panel"
                title="Admin panel"
                className="admin-dot"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(0,140,255,0.25)",
                  background: "rgba(0,140,255,0.06)",
                  flexShrink: 0,
                  transition:
                    "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(0,140,255,0.4)",
                    display: "block",
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
