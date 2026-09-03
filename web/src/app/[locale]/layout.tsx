import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { PwaInstallPrompt } from '@/components/ui/PwaInstallPrompt'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://gixnexustelecom.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'GIX Nexus Telecom and Power — Reliable Telecommunications & Engineering Solutions',
    am: 'GIX Nexus Telecom and Power — አስተማማኝ የቴሌኮሙኒኬሽን እና የምህንድስና መፍትሄዎች',
  }
  const descriptions: Record<string, string> = {
    en: 'GIX Nexus Telecom and Power — Ethiopian-owned SATCOM, VSAT, RF, fiber optic, network infrastructure, SMATV/MATV, and telecom power engineering company. GVF-certified. 20+ years experience. Serving operators, government, NGOs, and enterprise clients across Ethiopia.',
    am: 'GIX Nexus Telecom and Power — ኢትዮጵያዊ ባለቤትነት ያለው SATCOM፣ VSAT፣ RF፣ ፋይበር ኦፕቲክ፣ SMATV/MATV እና የቴሌኮሙኒኬሽን የኃይል ምህንድስና ኩባንያ። GVF-ተረጋግጧል። 20+ ዓመት ልምድ።',
  }

  return {
    title: {
      default: titles[locale] ?? titles.en,
      template: '%s | GIX Nexus Telecom and Power',
    },
    description: descriptions[locale] ?? descriptions.en,
    metadataBase: new URL(BASE_URL),
    keywords: [
      'SATCOM Ethiopia', 'VSAT installation Ethiopia', 'telecom engineering Ethiopia',
      'fiber optic Ethiopia', 'RF engineering Ethiopia', 'SMATV MATV Ethiopia',
      'network infrastructure Ethiopia', 'telecom power systems Ethiopia',
      'GIX Nexus', 'GVF certified', 'Addis Ababa telecom',
    ],
    authors: [{ name: 'GIX Nexus Telecom and Power' }],
    creator: 'GIX Nexus Telecom and Power',
    publisher: 'GIX Nexus Telecom and Power',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'en': `${BASE_URL}/en`,
        'am': `${BASE_URL}/am`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'am' ? 'am_ET' : 'en_US',
      alternateLocale: locale === 'am' ? 'en_US' : 'am_ET',
      url: `${BASE_URL}/${locale}`,
      siteName: 'GIX Nexus Telecom and Power',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      images: [
        {
          url: `${BASE_URL}/assets/gix-home-page.png`,
          width: 1200,
          height: 630,
          alt: 'GIX Nexus Telecom and Power — Telecommunications & Engineering Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
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
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: '32x32' },
      ],
      apple: '/icon.svg',
    },
    manifest: '/manifest.json',
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'am')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#F9FAFB" />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .catch(function(err) { console.warn('SW registration failed:', err); });
            });
          }
        ` }} />
      </head>
      <body className={`${locale === 'am' ? 'font-ethiopic' : 'font-sans'} antialiased`}>
        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': `${BASE_URL}/#organization`,
                name: 'GIX Nexus Telecom and Power',
                url: BASE_URL,
                logo: `${BASE_URL}/assets/company-logo.png`,
                image: `${BASE_URL}/assets/gix-home-page.png`,
                description: 'Ethiopian-owned telecommunications and power engineering company. Specializing in SATCOM, VSAT, RF, fiber optic, network infrastructure, SMATV/MATV, and telecom power solutions across Ethiopia.',
                foundingLocation: { '@type': 'Place', name: 'Addis Ababa, Ethiopia' },
                areaServed: { '@type': 'Country', name: 'Ethiopia' },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+251911509555',
                  email: 'gixnexustelecom@gmail.com',
                  contactType: 'customer service',
                  availableLanguage: ['English', 'Amharic'],
                },
                sameAs: [],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${BASE_URL}/#website`,
                url: BASE_URL,
                name: 'GIX Nexus Telecom and Power',
                publisher: { '@id': `${BASE_URL}/#organization` },
                inLanguage: ['en', 'am'],
              },
            ]),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Navigation locale={locale} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
            <PwaInstallPrompt />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
