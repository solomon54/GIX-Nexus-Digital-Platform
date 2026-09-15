"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useContactModal } from "@/context/ContactModalContext";
import { PageHeroCarousel } from "@/components/ui/PageHeroCarousel";

const BASE_URL =
  typeof window !== "undefined" ?
    window.location.origin
  : (process.env.NEXT_PUBLIC_APP_URL ?? "https://gixnexus.net.et").replace(
      /\/$/,
      "",
    );

export function ContactPageClient() {
  const t = useTranslations("contact");
  const { open: openModal } = useContactModal();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "GIX Nexus Telecom and Power",
            telephone: "+251911509555",
            email: "gixnexustelecom@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Addis Ababa",
              addressCountry: "ET",
            },
            areaServed: { "@type": "Country", name: "Ethiopia" },
          }),
        }}
      />

      <section className="relative py-24 overflow-hidden">
        <PageHeroCarousel
          slides={[
            { src: "/images/hero/hero-1.jpeg", motion: "hero-drift-tr" },
            {
              src: "/images/capability/our-capabilities.webp",
              motion: "hero-drift-up",
            },
            {
              src: "/images/hero/services-page-hero/engineers-data-center.webp",
              motion: "hero-drift-left",
            },
          ]}
        />
        <div
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
          style={{ zIndex: 4 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
            {t("heroEyebrow")}
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-[var(--foreground-muted)] leading-relaxed">
            {t("heroDescription")}
          </p>

          <button type="button" onClick={openModal} className="btn-cta mt-8">
            ✉ Send us a Message
          </button>
        </div>
      </section>

      <section
        className="pt-20 pb-40 sm:pb-48 md:pb-56 lg:pb-64 pre-footer-wrap section-top-divide bg-section-odd"
        style={{ position: "relative" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="w-full">
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: "var(--border)" }}>
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "3/4",
                    background:
                      "linear-gradient(160deg, #0F2352 0%, #0B1834 55%, #070F26 100%)",
                  }}>
                  <Image
                    src="/assets/managing-director.webp"
                    alt="Getachew Teshome — Managing Director, GIX Nexus Telecom and Power"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-center"
                    priority
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,18,54,0.18) 0%, transparent 55%)",
                    }}
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(72, 187, 202, 0.55), transparent)",
                    }}
                  />
                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="font-semibold text-white text-base sm:text-lg">
                      {t("mdName")}
                    </p>
                    <p className="text-sm text-[var(--accent)] mt-0.5">
                      {t("mdLabel")}
                    </p>
                  </div>
                </div>

                <div
                  className="p-4 sm:p-5 space-y-3"
                  style={{ background: "#FFFFFF" }}>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--foreground-subtle)" }}>
                    {t("intro")}
                  </p>

                  <a
                    href="tel:+251911509555"
                    className="flex items-center gap-4 p-4 rounded-xl border group hover:border-[var(--border-strong)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                    style={{
                      background: "var(--background)",
                      borderColor: "var(--border)",
                    }}>
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg"
                      style={{ background: "var(--accent-light)" }}>
                      📞
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--foreground-subtle)" }}>
                        {t("phoneLabel")}
                      </p>
                      <p className="text-base font-semibold text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">
                        +251 911 509 555
                      </p>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={openModal}
                    className="flex items-center gap-4 p-4 rounded-xl border w-full text-left group hover:border-[var(--border-strong)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                    style={{
                      background: "var(--background)",
                      borderColor: "var(--border)",
                    }}>
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg"
                      style={{ background: "var(--accent-light)" }}>
                      ✉️
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--foreground-subtle)" }}>
                        {t("emailLabel")}
                      </p>
                      <p className="text-base font-semibold text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">
                        gixnexustelecom@gmail.com
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--foreground-sub)" }}>
                        Click to send a message directly →
                      </p>
                    </div>
                  </button>

                  {/* Address */}
                  <div
                    className="flex items-center gap-4 p-4 rounded-xl border"
                    style={{
                      background: "var(--background)",
                      borderColor: "var(--border)",
                    }}>
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg"
                      style={{ background: "var(--green-light)" }}>
                      📍
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--foreground-subtle)" }}>
                        {t("addressLabel")}
                      </p>
                      <p
                        className="text-base font-semibold"
                        style={{ color: "var(--foreground)" }}>
                        Addis Ababa, Ethiopia
                      </p>
                      <p className="text-xs" style={{ color: "var(--green)" }}>
                        Operating Across Ethiopia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: info + CTA */}
            <div className="space-y-5">
              <div
                className="rounded-2xl p-6 border"
                style={{ background: "#FFFFFF", borderColor: "var(--border)" }}>
                <h2
                  className="text-base font-bold mb-3"
                  style={{ color: "var(--foreground)" }}>
                  About GIX Nexus
                </h2>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--foreground-subtle)" }}>
                  An Ethiopian-owned telecommunications and power engineering
                  company delivering reliable, innovative, and cost-effective
                  infrastructure solutions across Ethiopia — from site surveys
                  and installation to commissioning, maintenance, and 24/7
                  technical support.
                </p>
                <div
                  className="pt-4 border-t space-y-2"
                  style={{ borderColor: "var(--border)" }}>
                  {[
                    ["Ownership", "Ethiopian-owned"],
                    ["Operations", "Across Ethiopia"],
                    ["Support", "24/7 Technical"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between text-sm">
                      <span style={{ color: "var(--foreground-subtle)" }}>
                        {label}
                      </span>
                      <span
                        className="font-medium"
                        style={{
                          color:
                            label === "Support" ? "var(--accent)" : (
                              "var(--foreground)"
                            ),
                        }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-xl p-4 border"
                style={{
                  background: "var(--soft-surface)",
                  borderColor: "var(--border)",
                }}>
                <p
                  className="text-sm"
                  style={{ color: "var(--foreground-subtle)" }}>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--foreground)" }}>
                    Response time:{" "}
                  </span>
                  {t("responseNote")}
                </p>
                <p
                  className="mt-1.5 text-sm"
                  style={{ color: "var(--foreground-subtle)" }}>
                  {t("operationsNote")}
                </p>
              </div>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={openModal}
                className="btn-cta w-full justify-center"
                style={{ width: "100%", justifyContent: "center" }}>
                ✉ Send us a Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
