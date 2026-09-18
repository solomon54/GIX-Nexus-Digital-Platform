import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Testimonial, News, Project, Media } from "@/payload-types";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("heroTitle"),
    description: t("heroSubtitle"),
  };
}

const SERVICES_DATA = [
  {
    slug: "telecommunications-infrastructure",
    nameKey: "telecomInfrastructure",
    image: "/images/services/telecom-infrastructure.jpg",
    imageAlt: "Telecommunications infrastructure installation",
  },
  {
    slug: "fiber-optic-solutions",
    nameKey: "fiberOptic",
    image: "/images/services/fiber-optic-cables.jpg",
    imageAlt: "Fiber optic cable installation",
  },
  {
    slug: "satellite-wireless-communications",
    nameKey: "satelliteWireless",
    image: "/images/services/satellite-dish.jpg",
    imageAlt: "Satellite dish and wireless systems",
  },
  {
    slug: "rf-engineering",
    nameKey: "rfEngineering",
    image: "/images/services/rf-engineering.jpg",
    imageAlt: "RF engineering and antenna systems",
  },
  {
    slug: "network-infrastructure",
    nameKey: "networkInfrastructure",
    image: "/images/services/network-infrastructure.jpg",
    imageAlt: "Network infrastructure and cabling",
  },
  {
    slug: "telecom-power-systems",
    nameKey: "telecomPower",
    image: "/images/services/telecom-power-systems-dc-power-systems.png",
    imageAlt: "Telecom power systems",
  },
  {
    slug: "smatv-matv-solutions",
    nameKey: "smatvMatv",
    image: "/images/services/smatv-matv.jpg",
    imageAlt: "SMATV/MATV satellite TV distribution systems",
  },
  {
    slug: "maintenance-technical-support",
    nameKey: "maintenance",
    image: "/images/services/maintenance-and-technical-support.webp",
    imageAlt: "Field maintenance and technical support",
  },
] as const;

const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  "telecom-infrastructure": "Telecommunications Infrastructure",
  "fiber-optic": "Fiber Optic Solutions",
  "satellite-wireless": "Satellite & Wireless",
  "network-infrastructure": "Network Infrastructure",
  "telecom-power": "Telecom Power Systems",
  maintenance: "Maintenance & Support",
};

const NEWS_CATEGORY_LABELS: Record<string, string> = {
  announcement: "Announcement",
  "project-update": "Project Update",
  "company-news": "Company News",
  partnership: "Partnership",
};

function HomePage({
  locale,
  news,
  projects,
}: {
  locale: string;
  news: News[];
  projects: Project[];
  testimonials: Testimonial[];
}) {
  const t = useTranslations("home");
  const tServices = useTranslations("services");

  return (
    <>
      <style>{`
  /* ── Service cards — on light sky section bg ── */
  .svc-card {
    background: #FFFFFF;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    transition:
      box-shadow 250ms cubic-bezier(0.16,1,0.3,1),
      transform 250ms cubic-bezier(0.16,1,0.3,1),
      border-color 250ms,
      background 250ms;
  }
  .svc-card:hover {
    background: #FFFFFF;
    border-color: var(--accent);
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-4px);
  }

  /* ── News cards — teal-tinted surface ── */
  .news-card {
    background: #FFFFFF;
    border: 1px solid rgba(14,165,201,0.22);
    box-shadow: var(--shadow-card);
    transition:
      box-shadow 250ms cubic-bezier(0.16,1,0.3,1),
      transform 250ms,
      border-color 250ms;
  }
  .news-card:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: var(--accent);
    transform: translateY(-3px);
  }

  /* ── Outline buttons — on light bg ── */
  .btn-outline-teal {
    border: 1.5px solid var(--accent);
    color: var(--accent);
    background: transparent;
    transition: background 200ms, color 200ms, transform 200ms;
  }
  .btn-outline-teal:hover {
    background: var(--accent);
    color: #fff;
    transform: translateY(-1px);
  }

  /* ── Hero stat & glass surfaces (light palette) ── */
  .hero-glass {
    background: linear-gradient(180deg, rgba(244,250,255,0.90) 0%, rgba(226,242,253,0.84) 60%, rgba(214,234,248,0.80) 100%);
    border: 1px solid rgba(14,165,201,0.18);
    box-shadow: var(--shadow-lg),
      inset 0 1px 0 rgba(255,255,255,0.36);
    backdrop-filter: blur(14px) saturate(1.6);
    -webkit-backdrop-filter: blur(14px) saturate(1.6);
  }

  .hero-stat {
    background: linear-gradient(180deg, rgba(244,250,255,0.64) 0%, rgba(224,240,250,0.48) 100%);
    transition: background 200ms, transform 200ms;
  }
  .hero-stat:hover {
    background: linear-gradient(180deg, rgba(232,246,255,0.82) 0%, rgba(212,232,248,0.62) 100%);
    transform: translateY(-2px);
  }

  /* ── Feature cards — on light sky bg ── */
  .feature-card {
    background: #FFFFFF;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    transition:
      background 250ms,
      border-color 250ms,
      transform 250ms,
      box-shadow 250ms;
  }
  .feature-card:hover {
    background: #FFFFFF;
    border-color: var(--accent);
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
  }

  /* ── Project cards — teal-tinted surface ── */
  .project-card {
    background: #FFFFFF;
    border: 1px solid rgba(14,165,201,0.22);
    box-shadow: var(--shadow-card);
    transition:
      box-shadow 250ms,
      border-color 250ms,
      transform 250ms;
  }
  .project-card:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: var(--accent);
    transform: translateY(-3px);
  }

  /* ── Section label pill — light bg ── */
  .section-label-dark,
  .section-label-light {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(14,165,201,0.10);
    border: 1px solid rgba(14,165,201,0.22);
    border-radius: 99px;
    padding: 3px 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
  }

  /* ── chip vars for light sections (news, projects) ── */
  .news-card .chip-light,
  .project-card .chip-light {
    background: rgba(14,165,201,0.10);
    color: #0369A1;
    border: 1px solid rgba(14,165,201,0.25);
  }

  /* ── Antenna panel — subtle near-black stage ── */
  .antenna-stage {
    background:
      radial-gradient(ellipse at 50% 34%,
        rgba(30,58,85,0.70) 0%,
        rgba(18,40,66,0.78) 28%,
        rgba(10,26,48,0.90) 60%,
        rgba(06,18,36,0.95) 100%),
      linear-gradient(180deg,
        #0C1830 0%,
        #0A1428 55%,
        #070F22 100%);
    position: relative;
    overflow: hidden;
  }
  .antenna-stage::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 22% 76%, rgba(34,211,238,0.14) 0%, transparent 52%),
      radial-gradient(circle at 78% 22%, rgba(14,165,201,0.22) 0%, transparent 48%);
    pointer-events: none;
  }
  .antenna-stage::after {
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 38%;
    background:
      linear-gradient(180deg, transparent 0%,
        rgba(14,165,201,0.10) 55%,
        rgba(14,165,201,0.20) 100%);
    pointer-events: none;
  }
  .antenna-video {
    position: relative;
    z-index: 2;
  }

  /* ── Service marquee — rotate hero subtitle area ── */
  .service-rotate {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    vertical-align: baseline;
    position: relative;
  }
  .service-rotate .rotator {
    display: inline-block;
    position: relative;
    height: 1.35em;
    line-height: 1.35;
    min-width: 0;
    vertical-align: baseline;
  }
  .service-rotate .rotator > span {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    line-height: 1.35;
    width: max-content;
    opacity: 0;
    transform: translateY(55%);
    filter: blur(4px);
  }
  @keyframes serviceCycle {
    0%    { opacity: 0; transform: translateY(55%);  filter: blur(5px); }
    5.5%  { opacity: 1; transform: translateY(0%);   filter: blur(0);   }
    15.5% { opacity: 1; transform: translateY(0%);   filter: blur(0);   }
    19.5% { opacity: 0; transform: translateY(-40%); filter: blur(4px); }
    100%  { opacity: 0; transform: translateY(-40%); filter: blur(4px); }
  }
  .service-rotate .rotator > span:nth-child(1) { animation: serviceCycle 13.5s cubic-bezier(0.65,0.05,0.36,1) 0.00s   infinite; }
  .service-rotate .rotator > span:nth-child(2) { animation: serviceCycle 13.5s cubic-bezier(0.65,0.05,0.36,1) 2.25s   infinite; }
  .service-rotate .rotator > span:nth-child(3) { animation: serviceCycle 13.5s cubic-bezier(0.65,0.05,0.36,1) 4.50s   infinite; }
  .service-rotate .rotator > span:nth-child(4) { animation: serviceCycle 13.5s cubic-bezier(0.65,0.05,0.36,1) 6.75s   infinite; }
  .service-rotate .rotator > span:nth-child(5) { animation: serviceCycle 13.5s cubic-bezier(0.65,0.05,0.36,1) 9.00s   infinite; }
  .service-rotate .rotator > span:nth-child(6) { animation: serviceCycle 13.5s cubic-bezier(0.65,0.05,0.36,1) 11.25s  infinite; }

  .service-dot {
    width: 7px;
    height: 7px;
    border-radius: 99px;
    background: var(--accent);
    box-shadow: 0 0 0 4px rgba(14,165,201,0.18);
    flex-shrink: 0;
  }
`}</style>
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        aria-labelledby="hero-heading"
        style={{
          background: `linear-gradient(180deg,
              #CBE8F8    0%,
              #D0E9F9   25%,
              #D4EBFA   50%,
              #D8EEFB   85%,
              #D8EEFB  100%)`,
        }}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-3 rounded-full px-4 py-2 mb-8"
                style={{
                  background: "rgba(14,165,201,0.10)",
                  border: "1px solid rgba(14,165,201,0.25)",
                }}>
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ background: "var(--accent)" }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                </span>
                <span
                  className="text-sm font-medium tracking-wide"
                  style={{ color: "var(--accent)" }}>
                  Across Ethiopia
                </span>
                <span
                  className="h-4 w-px"
                  style={{ background: "rgba(14,165,201,0.30)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--foreground-subtle)" }}>
                  Telecom & Power
                </span>
              </div>

              <h1
                id="hero-heading"
                className="font-bold"
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.03em",
                  color: "var(--foreground)",
                }}>
                {t("heroTitle")}
              </h1>

              <div className="mt-6 flex items-center gap-3">
                <span
                  className="h-[3px] w-16 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--accent), rgba(14,165,201,0))",
                  }}
                />
                <span
                  className="text-xs uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)" }}>
                  Satellite Services
                </span>
              </div>

              <p
                className="mt-6 max-w-xl leading-relaxed"
                style={{
                  fontSize: "clamp(14px,1.5vw,17px)",
                  color: "var(--foreground-muted)",
                }}>
                {t("heroSubtitle")}
              </p>

              <div
                className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
                aria-label="Our services: SATCOM, VSAT, RF, Fiber Optic, Networking, Power.">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                  aria-hidden="true"
                />
                <ul
                  className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] font-medium"
                  style={{ color: "var(--foreground-subtle)" }}>
                  <li
                    className="svc-pill"
                    style={{
                      background: "var(--accent-light)",
                      border: "1px solid var(--accent-mid)",
                      color: "var(--accent)",
                    }}>
                    SATCOM & VSAT
                  </li>
                  <li className="svc-pill">RF Engineering</li>
                  <li className="svc-pill">Fiber Optic</li>
                  <li className="svc-pill">Networking</li>
                  <li className="svc-pill">Power Systems</li>
                  <li className="svc-pill">24/7 Field Support</li>
                </ul>
              </div>

              <style>{`
                .svc-pill {
                  display: inline-flex;
                  align-items: center;
                  padding: 3px 11px;
                  border-radius: 99px;
                  background: var(--soft-surface);
                  border: 1px solid var(--border-subtle);
                  opacity: 0;
                  transform: translateY(6px);
                  animation: svcPillIn 680ms cubic-bezier(0.22,1,0.36,1) forwards,
                             svcPillPulse 4.6s ease-in-out infinite;
                }
                @keyframes svcPillIn {
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes svcPillPulse {
                  0%, 100%  { box-shadow: 0 0 0 0 rgba(14,165,201,0.00); }
                  52%       { box-shadow: 0 0 0 5px rgba(14,165,201,0.08); }
                }
                .svc-pill:nth-child(1) { animation-delay: 120ms,  0.00s; }
                .svc-pill:nth-child(2) { animation-delay: 240ms,  0.70s; }
                .svc-pill:nth-child(3) { animation-delay: 360ms,  1.40s; }
                .svc-pill:nth-child(4) { animation-delay: 480ms,  2.10s; }
                .svc-pill:nth-child(5) { animation-delay: 600ms,  2.80s; }
                .svc-pill:nth-child(6) { animation-delay: 720ms,  3.50s; }
              `}</style>

              <div className="mt-8 max-w-xl">
                <div
                  className="grid grid-cols-3 overflow-hidden rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(244,250,255,0.92) 0%, rgba(224,240,250,0.86) 100%)",
                    border: "1px solid rgba(14,165,201,0.18)",
                    boxShadow: "0 6px 22px rgba(14,120,170,0.10)",
                    backdropFilter: "blur(10px) saturate(1.5)",
                    WebkitBackdropFilter: "blur(10px) saturate(1.5)",
                  }}>
                  {[
                    { value: "8+", label: t("stats.serviceDomainsLabel") },
                    { value: "24/7", label: t("stats.supportLabel") },
                    { value: "100%", label: t("stats.safetyLabel") },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="hero-stat text-center px-4 py-4"
                      style={
                        i === 1 ?
                          {
                            borderLeft: "1px solid var(--border-subtle)",
                            borderRight: "1px solid var(--border-subtle)",
                          }
                        : {}
                      }>
                      <div
                        className="text-2xl sm:text-3xl font-bold"
                        style={{ color: "var(--accent)" }}>
                        {stat.value}
                      </div>
                      <div
                        className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.14em]"
                        style={{ color: "var(--foreground-subtle)" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}/services`}
                  className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, #0EA5C9 0%, #22D3EE 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 8px 28px rgba(14,165,201,0.35)",
                  }}>
                  {t("ctaServices")}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href={`/${locale}/company`}
                  className="btn-outline-teal inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium">
                  {t("ctaProfile")}
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="relative w-full max-w-[420px]">
                <div
                  className="absolute inset-8 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(14,165,201,0.22) 0%, transparent 70%)",
                    filter: "blur(32px)",
                  }}
                />

                <div className="hero-glass relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: "var(--foreground-faint)" }}>
                        Technology
                      </p>
                      <p
                        className="mt-0.5 text-sm font-semibold"
                        style={{ color: "var(--foreground)" }}>
                        Connected Infrastructure
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 rounded-full px-3 py-1.5"
                      style={{
                        background: "var(--accent-light)",
                        border: "1px solid var(--accent-mid)",
                      }}>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--accent)" }}>
                        24/7
                      </span>
                    </div>
                  </div>

                  <div
                    className="antenna-stage relative mx-auto w-full flex justify-center items-center"
                    style={{
                      height: "clamp(260px, 32vw, 320px)",
                      maxWidth: "400px",
                      borderRadius: "1.25rem",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.40)",
                    }}>
                    <div
                      aria-hidden="true"
                      className="absolute z-0"
                      style={{
                        top: "14%",
                        left: "50%",
                        width: "72%",
                        height: "62%",
                        transform: "translateX(-50%)",
                        background:
                          "radial-gradient(circle, rgba(14,165,201,0.22) 0%, rgba(14,165,201,0.00) 70%)",
                        filter: "blur(14px)",
                      }}
                    />
                    <video
                      src="/assets/antenna-compressed.gif.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="GIX Nexus antenna — telecom and satellite services"
                      className="antenna-video h-full w-full object-contain"
                      style={{
                        mixBlendMode: "screen",
                        opacity: 0.98,
                        filter:
                          "brightness(1.08) contrast(1.04) saturate(1.06)",
                      }}
                    />
                  </div>

                  <div
                    className="pt-4 mt-1 text-center"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}>
                      Telecom & Satellite Services
                    </p>
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "var(--foreground-faint)" }}>
                      SATCOM · Fiber · RF · Network · Power
                    </p>
                  </div>

                  <div
                    className="absolute left-5 top-24 h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <div
                    className="absolute right-6 bottom-16 h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--border-strong)" }}
                  />
                </div>

                <div
                  className="absolute -bottom-4 -left-6 rounded-2xl px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(246,251,255,0.92) 0%, rgba(228,242,252,0.86) 100%)",
                    border: "1px solid rgba(14,165,201,0.18)",
                    boxShadow: "0 6px 20px rgba(14,120,170,0.14)",
                    backdropFilter: "blur(10px) saturate(1.5)",
                    WebkitBackdropFilter: "blur(10px) saturate(1.5)",
                  }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{ background: "var(--accent-light)" }}>
                      <span
                        className="text-base"
                        style={{ color: "var(--accent)" }}>
                        ⌁
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-[9px] uppercase tracking-wider"
                        style={{ color: "var(--foreground-faint)" }}>
                        Network
                      </p>
                      <p
                        className="text-xs font-semibold"
                        style={{ color: "var(--foreground)" }}>
                        Reliable Infrastructure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-24 lg:py-28 relative overflow-hidden"
        aria-labelledby="services-heading"
        style={{
          background: `linear-gradient(180deg,
              #D8EEFB    0%,
              #D2E9F8   20%,
              #CCE5F5   50%,
              #CDE7F6   85%,
              #CDE7F6  100%)`,
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="section-label-light mb-4 inline-flex">
              What We Do
            </span>
            <h2
              id="services-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--foreground)" }}>
              {t("servicesTitle")}
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--foreground-muted)" }}>
              {t("servicesSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES_DATA.map((service, index) => {
              const capabilities = tServices.raw(
                `groups.${service.nameKey}.capabilities`,
              ) as string[];
              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/services/${service.slug}`}
                  className="svc-card group relative overflow-hidden rounded-2xl">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10,30,60,0.85), rgba(10,30,60,0.10) 65%)",
                      }}
                    />

                    <div
                      className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold"
                      style={{
                        background: "var(--accent-light)",
                        border: "1px solid var(--accent-mid)",
                        color: "var(--accent)",
                      }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {tServices(`groups.${service.nameKey}.name`)}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <p
                      className="line-clamp-2 text-xs leading-relaxed"
                      style={{ color: "var(--foreground-subtle)" }}>
                      {tServices(`groups.${service.nameKey}.description`)}
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {capabilities.slice(0, 2).map((cap, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-[11px]"
                          style={{ color: "var(--foreground-muted)" }}>
                          <span
                            className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full text-[8px]"
                            style={{
                              background: "var(--accent-light)",
                              color: "var(--accent)",
                            }}>
                            ✓
                          </span>
                          {cap}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold"
                      style={{ color: "var(--accent)" }}>
                      Explore
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/services`}
              className="btn-outline-teal inline-flex min-h-[44px] items-center rounded-lg px-7 py-2.5 text-sm font-semibold">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-24 relative overflow-hidden"
        aria-labelledby="features-heading"
        style={{
          background: `linear-gradient(180deg,
              #CDE7F6    0%,
              #D0E9F7   20%,
              #D5ECF9   50%,
              #D8EEFB   85%,
              #D8EEFB  100%)`,
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="section-label-light mb-4 inline-flex">
              Why Partner with Us
            </span>
            <h2
              id="features-heading"
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--foreground)" }}>
              {t("featureTitle")}
            </h2>
            <p
              className="mt-3 max-w-xl mx-auto text-sm"
              style={{ color: "var(--foreground-muted)" }}>
              {t("featureSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                {
                  key: "qualifiedTeam",
                  icon: (
                    <>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </>
                  ),
                },
                {
                  key: "reliableDelivery",
                  icon: (
                    <>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </>
                  ),
                },
                {
                  key: "safetyCommitment",
                  icon: (
                    <>
                      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
                      <path d="M10 10V5a2 2 0 0 1 4 0v5" />
                      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
                    </>
                  ),
                },
                {
                  key: "ethiopianOwned",
                  icon: (
                    <>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </>
                  ),
                },
              ] as const
            ).map(({ key, icon }) => (
              <div key={key} className="feature-card rounded-2xl p-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent)",
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
                    {icon}
                  </svg>
                </div>
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: "var(--foreground)" }}>
                  {t(`features.${key}.title`)}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--foreground-subtle)" }}>
                  {t(`features.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/company`}
              className="btn-outline-teal inline-flex min-h-[44px] items-center rounded-lg px-6 py-2.5 text-sm font-medium">
              About GIX Nexus →
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-24 relative overflow-hidden"
        aria-labelledby="news-heading"
        style={{
          background: `linear-gradient(180deg,
              #D8EEFB    0%,
              #DDF1FC   25%,
              #E3F4FF   55%,
              #E8F6FF   85%,
              #E8F6FF  100%)`,
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="section-label-light mb-3 inline-flex">
                Latest
              </span>
              <h2
                id="news-heading"
                className="text-3xl font-bold sm:text-4xl"
                style={{ color: "var(--foreground)" }}>
                News & Announcements
              </h2>
            </div>
          </div>

          {news.length > 0 ?
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => {
                const coverUrl =
                  item.coverImage && typeof item.coverImage === "object" ?
                    ((item.coverImage as Media).url ?? null)
                  : null;
                const dateLabel =
                  item.publishedAt ?
                    new Date(item.publishedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                    })
                  : "";
                const categoryLabel =
                  NEWS_CATEGORY_LABELS[item.category ?? ""] ?? "News";
                return (
                  <article
                    key={item.id}
                    className="news-card rounded-2xl overflow-hidden group">
                    {coverUrl && (
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={coverUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3"
                        style={{
                          background: "rgba(14,165,201,0.10)",
                          color: "#0369A1",
                          border: "1px solid rgba(14,165,201,0.25)",
                        }}>
                        {categoryLabel}
                      </div>
                      <h3
                        className="font-semibold text-base leading-snug mb-3"
                        style={{ color: "var(--foreground)" }}>
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p
                          className="text-sm leading-relaxed line-clamp-3"
                          style={{ color: "var(--foreground-muted)" }}>
                          {item.excerpt}
                        </p>
                      )}
                      <div className="mt-4">
                        <span
                          className="text-xs"
                          style={{ color: "var(--foreground-faint)" }}>
                          {dateLabel}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          : <div
              className="rounded-2xl border-2 border-dashed p-12 text-center"
              style={{ borderColor: "var(--border)" }}>
              <div className="text-4xl mb-4" aria-hidden="true">
                📰
              </div>
              <p
                className="font-semibold text-sm mb-2"
                style={{ color: "var(--foreground)" }}>
                News & announcements coming soon
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}>
                Published news will appear here. Add articles via the admin
                panel.
              </p>
            </div>
          }
        </div>
      </section>

      <section
        className="py-24 relative overflow-hidden"
        aria-labelledby="projects-heading"
        style={{
          background: `linear-gradient(180deg,
              #E8F6FF    0%,
              #EAF7FF   25%,
              #EDF8FF   55%,
              #EBF7FF   85%,
              #E8F6FF  100%)`,
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="section-label-light mb-3 inline-flex">
                Our Work
              </span>
              <h2
                id="projects-heading"
                className="text-3xl font-bold sm:text-4xl"
                style={{ color: "var(--foreground)" }}>
                Projects & Experience
              </h2>
              <p
                className="mt-2 text-sm max-w-xl"
                style={{ color: "var(--foreground-muted)" }}>
                Delivering telecommunications and power engineering projects
                across Ethiopia with careful planning and quality standards.
              </p>
            </div>
            {projects.length > 0 && (
              <Link
                href={`/${locale}/projects`}
                className="hidden sm:inline-flex min-h-[44px] items-center text-sm font-semibold flex-shrink-0 transition-colors btn-outline-teal rounded-lg px-5 py-2">
                All Projects →
              </Link>
            )}
          </div>

          {projects.length > 0 ?
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const coverUrl =
                  project.coverImage && typeof project.coverImage === "object" ?
                    ((project.coverImage as Media).url ?? null)
                  : null;
                const categoryLabel =
                  PROJECT_CATEGORY_LABELS[project.serviceCategory] ??
                  project.serviceCategory;
                return (
                  <div
                    key={project.id}
                    className="project-card rounded-2xl overflow-hidden group">
                    <div
                      className="relative h-48 overflow-hidden"
                      style={{ background: "var(--soft-surface)" }}>
                      {coverUrl ?
                        <Image
                          src={coverUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      : <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl opacity-20">🏗</span>
                        </div>
                      }
                      <div className="absolute bottom-3 left-4">
                        <span
                          className="text-xs font-medium rounded-full px-2.5 py-0.5"
                          style={{
                            background: "rgba(14,165,201,0.10)",
                            color: "#0369A1",
                            border: "1px solid rgba(14,165,201,0.25)",
                          }}>
                          {categoryLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3
                        className="font-semibold text-sm mb-1"
                        style={{ color: "var(--foreground)" }}>
                        {project.title}
                      </h3>
                      {project.location && (
                        <p
                          className="text-xs mb-2 flex items-center gap-1"
                          style={{ color: "var(--accent)" }}>
                          <span>📍</span>
                          {project.location}
                        </p>
                      )}
                      {project.excerpt && (
                        <p
                          className="text-xs leading-relaxed line-clamp-3"
                          style={{ color: "var(--foreground-muted)" }}>
                          {project.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          : <div
              className="rounded-2xl border-2 border-dashed p-12 text-center"
              style={{ borderColor: "var(--border)" }}>
              <div className="text-4xl mb-4" aria-hidden="true">
                🏗
              </div>
              <p
                className="font-semibold text-sm mb-2"
                style={{ color: "var(--foreground)" }}>
                Projects coming soon
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}>
                Completed and ongoing project showcases will appear here.
              </p>
            </div>
          }
        </div>
      </section>

      <section
        className="py-20 relative overflow-hidden"
        aria-label="HSEQ Safety commitment"
        style={{
          background: `linear-gradient(180deg,
              #E8F6FF    0%,
              #E5F3FB   20%,
              #D8EEFB   50%,
              #D2E9F8   85%,
              #CDE7F6  100%)`,
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="section-label-light mb-4 inline-flex">
              Our Commitment
            </span>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: "var(--foreground)" }}>
              Health, Safety, Environment & Quality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              {
                value: "HSEQ",
                label: "Policy",
                desc: "Health, Safety, Environment & Quality — applied to every project",
                color: "var(--accent)",
              },
              {
                value: "Zero",
                label: "Accident Objective",
                desc: "Our stated safety commitment and goal on every project site",
                color: "var(--accent)",
              },
              {
                value: "100%",
                label: "Safety-First Approach",
                desc: "Policy commitment — safety first on every project, without exception",
                color: "var(--green)",
              },
            ].map(({ value, label, desc, color }) => (
              <div
                key={label}
                className="feature-card rounded-2xl p-7 text-center">
                <div className="text-4xl font-bold mb-2" style={{ color }}>
                  {value}
                </div>
                <div
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}>
                  {label}
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--foreground-subtle)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/hseq`}
              className="btn-outline-teal inline-flex min-h-[44px] items-center rounded-lg px-6 py-2.5 text-sm font-medium">
              View HSEQ Policy →
            </Link>
          </div>
        </div>
      </section>

      <section
        className="pt-20 sm:pt-24 pb-36 sm:pb-44 relative overflow-hidden pre-footer-wrap section-top-divide"
        aria-labelledby="cta-heading"
        style={{
          background: `linear-gradient(180deg,
              #CDE7F6    0%,
              #D0E9F7   20%,
              #D5ECF9   48%,
              #CFE6F5   72%,
              #C2DAEC   88%,
              #B3CCE1  100%)`,
          position: "relative",
        }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--pre-footer-blend)" }}
        />
        <div
          className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
          style={{ position: "relative" }}>
          <h2
            id="cta-heading"
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--foreground)" }}>
            {t("ctaTitle")}
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--foreground-muted)" }}>
            {t("ctaSubtitle")}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="btn-cta inline-flex min-h-[44px] items-center rounded-lg px-8 py-2.5 text-sm font-bold">
              {t("ctaContact")}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="btn-outline-teal inline-flex min-h-[44px] items-center rounded-lg px-8 py-2.5 text-sm font-semibold">
              {t("ctaServices")}
            </Link>
          </div>
        </div>

        {/* gentle section boundary compound — soft 7-stop bell + 22px vertical fade
             sits at the very bottom of the light section so handoff to dark navy is invisible. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "22px",
            pointerEvents: "none",
            zIndex: 4,
          }}>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: `linear-gradient(90deg,
                  transparent 0%,
                  rgba(34,211,238,0.08) 16%,
                  rgba(34,211,238,0.20) 38%,
                  rgba(34,211,238,0.30) 50%,
                  rgba(34,211,238,0.20) 62%,
                  rgba(34,211,238,0.08) 84%,
                  transparent 100%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "1px",
              left: 0,
              right: 0,
              height: "21px",
              background: `linear-gradient(180deg,
                  rgba(186, 214, 238, 0.00) 0%,
                  rgba(44, 82, 130, 0.10) 32%,
                  rgba(24, 62, 108, 0.20) 60%,
                  rgba(14, 46, 90, 0.32) 82%,
                  rgba(12, 38, 80, 0.44) 100%)`,
              filter: "blur(0.4px)",
            }}
          />
        </div>
      </section>
    </>
  );
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params;
  const loc = locale as "en" | "am";

  const payload = await getPayload({ config: configPromise });

  const [testimonialsResult, newsResult, projectsResult] = await Promise.all([
    payload.find({
      collection: "testimonials",
      where: { _status: { equals: "published" } },
      locale: loc,
      fallbackLocale: "en",
      limit: 6,
      sort: "-createdAt",
    }),
    payload.find({
      collection: "news",
      where: { _status: { equals: "published" } },
      locale: loc,
      fallbackLocale: "en",
      limit: 3,
      sort: "-publishedAt",
    }),
    payload.find({
      collection: "projects",
      where: { _status: { equals: "published" } },
      locale: loc,
      fallbackLocale: "en",
      limit: 3,
      sort: "-createdAt",
    }),
  ]);

  return (
    <HomePage
      locale={locale}
      testimonials={testimonialsResult.docs as Testimonial[]}
      news={newsResult.docs as News[]}
      projects={projectsResult.docs as Project[]}
    />
  );
}
