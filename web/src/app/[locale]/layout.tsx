import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PwaInstallPrompt } from "@/components/ui/PwaInstallPrompt";
import { QuickContactModal } from "@/components/ui/QuickContactModal";
import { ContactModalProvider } from "@/context/ContactModalContext";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://gixnexus.net.et"
).replace(/\/$/, "");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "GIX Nexus Telecom and Power — Reliable Telecommunications & Engineering Solutions",
    am: "GIX Nexus Telecom and Power — አስተማማኝ የቴሌኮሙኒኬሽን እና የምህንድስና መፍትሄዎች",
  };
  const descriptions: Record<string, string> = {
    en: "GIX Nexus Telecom and Power — Ethiopian-owned SATCOM, VSAT, RF, fiber optic, network infrastructure, SMATV/MATV, and telecom power engineering company. GVF-certified. 20+ years experience. Serving operators, government, NGOs, and enterprise clients across Ethiopia.",
    am: "GIX Nexus Telecom and Power — ኢትዮጵያዊ ባለቤትነት ያለው SATCOM፣ VSAT፣ RF፣ ፋይበር ኦፕቲክ፣ SMATV/MATV እና የቴሌኮሙኒኬሽን የኃይል ምህንድስና ኩባንያ። GVF-ተረጋግጧል። 20+ ዓመት ልምድ።",
  };

  return {
    title: {
      default: titles[locale] ?? titles.en,
      template: "%s | GIX Nexus Telecom and Power",
    },
    description: descriptions[locale] ?? descriptions.en,
    metadataBase: new URL(BASE_URL),
    keywords: [
      "SATCOM Ethiopia",
      "VSAT installation Ethiopia",
      "telecom engineering Ethiopia",
      "fiber optic Ethiopia",
      "RF engineering Ethiopia",
      "SMATV MATV Ethiopia",
      "network infrastructure Ethiopia",
      "telecom power systems Ethiopia",
      "GIX Nexus",
      "GVF certified",
      "Addis Ababa telecom",
    ],
    authors: [{ name: "GIX Nexus Telecom and Power" }],
    creator: "GIX Nexus Telecom and Power",
    publisher: "GIX Nexus Telecom and Power",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        am: `${BASE_URL}/am`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "am" ? "am_ET" : "en_US",
      alternateLocale: locale === "am" ? "en_US" : "am_ET",
      url: `${BASE_URL}/${locale}`,
      siteName: "GIX Nexus Telecom and Power",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      images: [
        {
          url: `${BASE_URL}/assets/gix-home-page.png`,
          width: 1200,
          height: 630,
          alt: "GIX Nexus Telecom and Power — Telecommunications & Engineering Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      images: [`${BASE_URL}/assets/gix-home-page.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      apple: "/icon.svg",
    },
    manifest: "/manifest.json",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "am")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#050D1A" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function () {
            try {
              if (!('serviceWorker' in navigator)) return;
              if (location.hostname === 'localhost') return;
              if (location.protocol !== 'https:' && location.hostname !== '127.0.0.1') return;
            } catch (_) { return; }

            function registerSW() {
              try {
                var p = navigator.serviceWorker.register('/sw.js', { scope: '/' });
                if (p && typeof p.catch === 'function') {
                  p.catch(function () {
                    // Silently swallow — no crash bubble to Next.js error boundary
                    try { window.__gixSWFailed = true; } catch (_) {}
                  });
                }
              } catch (_) {
                // Silently swallow — registration failure is non-fatal
              }
            }

            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              setTimeout(registerSW, 1500);
            } else {
              window.addEventListener('load', function () {
                setTimeout(registerSW, 1500);
              });
            }

            // Global unhandled promise suppression (prevents Next.js "Application Error: Unhandled Exception"
            // on SW/network failures in offline/PWA contexts. Application errors still surface in console.
            if (typeof window.addEventListener === 'function') {
              window.addEventListener('unhandledrejection', function (ev) {
                try {
                  var r = ev && ev.reason;
                  if (r) {
                    var m = r && (r.message || String(r));
                    // Network / fetch / SW / offline failures are non-fatal
                    if (
                      typeof m === 'string' && (
                        /(network|offline|fetch|service.?worker|sw\\.js|Failed to fetch|NetworkError|request failed)/i.test(m) ||
                        r.name === 'NetworkError' || r.name === 'OfflineError' || r.name === 'TypeError'
                      )
                    ) {
                      try { ev.preventDefault(); } catch (_) {}
                      return;
                    }
                    // eslint-disable-next-line no-console
                    try { console.warn('[GIX Nexus] unhandled promise:', r); } catch (_) {}
                  }
                } catch (_) { /* safety */ }
              });
              window.addEventListener('error', function (ev) {
                try {
                  var m = ev && ev.message && String(ev.message);
                  if (typeof m === 'string' && /(service.?worker|sw\\.js|network|offline|fetch)/i.test(m)) {
                    try { ev.preventDefault && ev.preventDefault(); } catch (_) {}
                  }
                } catch (_) { /* safety */ }
              });
            }
          })();
        `,
          }}
        />
      </head>
      <body
        className={`${locale === "am" ? "font-ethiopic" : "font-sans"} antialiased`}>
        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": `${BASE_URL}/#organization`,
                name: "GIX Nexus Telecom and Power",
                url: BASE_URL,
                logo: `${BASE_URL}/assets/company-logo.png`,
                image: `${BASE_URL}/assets/gix-home-page.png`,
                description:
                  "Ethiopian-owned telecommunications and power engineering company. Specializing in SATCOM, VSAT, RF, fiber optic, network infrastructure, SMATV/MATV, and telecom power solutions across Ethiopia.",
                foundingLocation: {
                  "@type": "Place",
                  name: "Addis Ababa, Ethiopia",
                },
                areaServed: { "@type": "Country", name: "Ethiopia" },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+251911509555",
                  email: "gixnexustelecom@gmail.com",
                  contactType: "customer service",
                  availableLanguage: ["English", "Amharic"],
                },
                sameAs: [],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${BASE_URL}/#website`,
                url: BASE_URL,
                name: "GIX Nexus Telecom and Power",
                publisher: { "@id": `${BASE_URL}/#organization` },
                inLanguage: ["en", "am"],
              },
            ]),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ContactModalProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation locale={locale} />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer locale={locale} />
              <PwaInstallPrompt />
            </div>
            {/* Quick contact modal — available everywhere via useContactModal() */}
            <QuickContactModal />
          </ContactModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
