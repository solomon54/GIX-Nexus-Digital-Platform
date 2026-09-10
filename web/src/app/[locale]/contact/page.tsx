import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ContactPageClient } from './ContactPageClient'

const BASE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://gixnexustelecom.com').replace(/\/$/, '')

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  const title = t('pageTitle')
  const description = 'Contact GIX Nexus Telecom and Power — Addis Ababa, Ethiopia. Phone: +251 911 509 555. Email: gixnexustelecom@gmail.com. Professional SATCOM, VSAT, RF, fiber optic, and telecom engineering services across Ethiopia.'
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        am: `${BASE_URL}/am/contact`,
      },
    },
    openGraph: {
      title: `${title} | GIX Nexus Telecom and Power`,
      description,
      url: `${BASE_URL}/${locale}/contact`,
    },
  }
}

export default async function Page({ params }: Props) {
  // locale available for future i18n expansion
  await params
  return <ContactPageClient />
}
