import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHeroCarousel } from "@/components/ui/PageHeroCarousel";

export const revalidate = 3600;

const BASE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://gixnexus.net.et"
).replace(/\/$/, "");

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  const title = t("pageTitle");
  const description =
    "GIX Nexus Telecom and Power — Ethiopian-owned telecommunications and power engineering company. GVF-certified with 20+ years of SATCOM and RF experience. Headquartered in Addis Ababa, operating across Ethiopia.";
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/company`,
      languages: { en: `${BASE_URL}/en/company`, am: `${BASE_URL}/am/company` },
    },
    openGraph: {
      title: `${title} | GIX Nexus Telecom and Power`,
      description,
      url: `${BASE_URL}/${locale}/company`,
    },
  };
}

const CORE_VALUES = [
  { key: "timeToMarket", icon: "⏱" },
  { key: "qualityWorkmanship", icon: "🔩" },
  { key: "safetyFirst", icon: "🛡" },
  { key: "customerFocused", icon: "🤝" },
  { key: "integrity", icon: "⚖" },
  { key: "continuousImprovement", icon: "📈" },
] as const;

function CompanyPage({ locale }: { locale: string }) {
  const t = useTranslations("company");

  const COMPANY_SLIDES = [
    {
      src: "/images/hero/company-page-hero/satellite-station-orbit.jpg",
      motion: "hero-drift-tr",
    },
    {
      src: "/images/hero/company-page-hero/nasa-satellite-fleet.jpg",
      motion: "hero-drift-up",
    },
    {
      src: "/images/hero/company-page-hero/satellite-earth-blue.jpg",
      motion: "hero-drift-left",
    },
    {
      src: "/images/hero/company-page-hero/satellite-in-orbit.jpg",
      motion: "hero-drift-tl",
    },
  ] as const;

  return (
    <>
      <section
        className="relative py-24 overflow-hidden"
        aria-labelledby="company-heading">
        <PageHeroCarousel slides={COMPANY_SLIDES} />
        <div
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
          style={{ zIndex: 4 }}>
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}>
            About Us
          </p>
          <h1
            id="company-heading"
            className="text-4xl font-bold sm:text-5xl"
            style={{ color: "var(--foreground)" }}>
            {t("pageTitle")}
          </h1>
          <p
            className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed"
            style={{ color: "var(--foreground-muted)" }}>
            {t("overviewText")}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5">
            <span className="text-sm font-medium text-[var(--accent)]">
              GVF-Certified · 20+ Years SATCOM Experience
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: "var(--border)" }}>
              <div className="relative h-48">
                <Image
                  src="/images/company/vission-logo.jpeg"
                  alt="GIX Nexus — company vision"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hero-pan"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,18,54,0.62), rgba(6,18,54,0.10))",
                  }}
                />
                <div className="absolute bottom-4 left-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                    Our Vision
                  </p>
                </div>
              </div>
              <div className="p-6" style={{ background: "#FFFFFF" }}>
                <blockquote
                  className="text-base font-medium leading-relaxed"
                  style={{ color: "var(--foreground)" }}>
                  &ldquo;{t("vision")}&rdquo;
                </blockquote>
                <p className="mt-3 text-xs text-[var(--foreground-sub)]">
                  — Company Vision Statement
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 border"
              style={{ background: "#FFFFFF", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
                Our Mission
              </p>
              <h2
                className="text-xl font-bold mb-6"
                style={{ color: "var(--foreground)" }}>
                {t("missionTitle")}
              </h2>

              <ul className="space-y-3">
                {(t.raw("missionPoints") as string[]).map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: "var(--accent)" }}>
                      {i + 1}
                    </span>
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--foreground)" }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 section-top-divide bg-section-even">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
              What Guides Us
            </p>
            <h2
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--foreground)" }}>
              {t("valuesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map(({ key, icon }) => (
              <div
                key={key}
                className="flex gap-4 p-5 sm:p-6 rounded-xl border"
                style={{
                  background: "var(--background)",
                  borderColor: "var(--border)",
                }}>
                <div className="text-2xl flex-shrink-0">{icon}</div>
                <div>
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "var(--foreground)" }}>
                    {t(`values.${key}.name`)}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: "var(--foreground-subtle)" }}>
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="pt-20 pb-40 sm:pb-48 md:pb-56 lg:pb-64 pre-footer-wrap section-top-divide bg-section-odd"
        style={{ position: "relative" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
              Leadership
            </p>
            <h2
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--foreground)" }}>
              {t("leadershipTitle")}
            </h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-2">
                <div
                  className="relative rounded-2xl overflow-hidden mx-auto"
                  style={{
                    maxWidth: "340px",
                    aspectRatio: "3/4",
                    background:
                      "linear-gradient(160deg, #0F2352 0%, #0B1834 55%, #070F26 100%)",
                    border: "1px solid rgba(72, 187, 202, 0.18)",
                    boxShadow:
                      "0 30px 60px -20px rgba(5, 13, 38, 0.55), 0 0 0 1px rgba(72, 187, 202, 0.06) inset",
                  }}>
                  <Image
                    src="/assets/managing-director.webp"
                    alt="Getachew Teshome — Managing Director, GIX Nexus Telecom and Power"
                    fill
                    sizes="(max-width: 1024px) 320px, 340px"
                    className="object-contain object-center"
                    priority
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(5,13,26,0.18) 0%, transparent 55%)",
                    }}
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(72, 187, 202, 0.55), transparent)",
                    }}
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="space-y-5">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "var(--accent)" }}>
                      {t("mdTitle")}
                    </p>
                    <h3
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: "var(--foreground)" }}>
                      {t("mdName")}
                    </h3>
                    <div
                      className="flex flex-wrap items-center gap-3 mt-3 text-sm"
                      style={{ color: "var(--foreground-muted)" }}>
                      <span>📍 {t("hqValue")}</span>
                      <span className="opacity-40 hidden sm:inline">·</span>
                      <span>🌍 {t("operationsValue")}</span>
                    </div>
                  </div>

                  <div
                    className="h-px w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(72, 187, 202, 0.35), transparent)",
                    }}
                  />

                  <blockquote
                    className="text-base sm:text-lg leading-relaxed border-l-2 pl-5"
                    style={{
                      color: "var(--foreground)",
                      borderColor: "var(--accent)",
                      background: "var(--background)",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                      paddingRight: "1.25rem",
                      borderRadius: "0 0.75rem 0.75rem 0",
                    }}>
                    {t("mdMessage")}
                  </blockquote>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: "var(--accent)" }}>
                        GT
                      </div>
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--foreground)" }}>
                          GIX Nexus Telecom and Power
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--foreground-subtle)" }}>
                          Managing Director · Office of the Director
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors shadow-md"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 10px 24px -12px rgba(72, 187, 202, 0.55)",
                      }}>
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <CompanyPage locale={locale} />;
}
