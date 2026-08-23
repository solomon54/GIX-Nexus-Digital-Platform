import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'GIX Nexus Telecom and Power — Telecommunications & Power Engineering',
    am: 'GIX Nexus Telecom and Power — የቴሌኮሙኒኬሽን እና የኃይል ምህንድስና',
  }
  const descriptions: Record<string, string> = {
    en: 'Ethiopian-owned telecommunications and power engineering company. Delivering reliable, innovative, and cost-effective infrastructure solutions across Ethiopia.',
    am: 'ኢትዮጵያዊ ባለቤትነት ያለው የቴሌኮሙኒኬሽን እና የኃይል ምህንድስና ኩባንያ። በመላው ኢትዮጵያ አስተማማኝ፣ ፈጠራ-ተኮር እና ወጪ-ቆጣቢ የመሠረተ ልማት መፍትሄዎችን ያቀርባል።',
  }

  return {
    title: {
      default: titles[locale] ?? titles.en,
      template: '%s | GIX Nexus Telecom and Power',
    },
    description: descriptions[locale] ?? descriptions.en,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
    alternates: {
      languages: {
        en: '/en',
        am: '/am',
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
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#07111C" />
        {/* Register service worker — only in production to avoid dev caching issues */}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .catch(function(err) { console.warn('SW registration failed:', err); });
            });
          }
        ` }} />
      </head>
      <body className={`${locale === 'am' ? 'font-ethiopic' : 'font-sans'} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
              <Navigation locale={locale} />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer locale={locale} />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
