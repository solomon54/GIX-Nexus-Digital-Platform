import type { Metadata } from 'next'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ServiceCard } from '@/components/ui/ServiceCard'

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

// Source: Company Profile PDF, Page 5 — exactly 6 service groupings
const SERVICES_DATA = [
  { slug: 'telecommunications-infrastructure', icon: 'Tower', nameKey: 'telecomInfrastructure' },
  { slug: 'fiber-optic-solutions', icon: 'Cable', nameKey: 'fiberOptic' },
  { slug: 'satellite-wireless-communications', icon: 'Radio', nameKey: 'satelliteWireless' },
  { slug: 'network-infrastructure', icon: 'Network', nameKey: 'networkInfrastructure' },
  { slug: 'telecom-power-systems', icon: 'Zap', nameKey: 'telecomPower' },
  { slug: 'maintenance-technical-support', icon: 'Wrench', nameKey: 'maintenance' },
] as const

function ServicesPage({ locale }: { locale: string }) {
  const t = useTranslations('services')

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-4 text-lg text-[var(--foreground-subtle)]">{t('pageDescription')}</p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((service) => {
            const capabilities = t.raw(
              `groups.${service.nameKey}.capabilities`,
            ) as string[]
            return (
              <ServiceCard
                key={service.slug}
                name={t(`groups.${service.nameKey}.name`)}
                description={t(`groups.${service.nameKey}.description`)}
                capabilities={capabilities}
                icon={service.icon}
                slug={service.slug}
                locale={locale}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default async function Page({ params }: ServicesPageProps) {
  const { locale } = await params
  return <ServicesPage locale={locale} />
}
