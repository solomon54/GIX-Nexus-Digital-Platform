import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'capabilities' })
  return { title: t('pageTitle'), description: t('pageSubtitle') }
}

// Source: Company Profile PDF, Page 8 — personnel roles and their functions
const ROLE_DETAILS = [
  { key: 'Managing Director', detail: 'Practical experience in SATCOM, RF systems, VSAT technology and project coordination' },
  { key: 'Telecommunications Engineer', detail: 'Planning, supervising, installing, testing, commissioning telecommunications infrastructure' },
  { key: 'Cisco Certified Network Professional', detail: 'Network installation, configuration, troubleshooting, routing, switching, network security' },
  { key: 'Fiber Optic Technician', detail: 'Fiber optic cable installation, splicing, termination, testing, fault diagnosis and maintenance' },
  { key: 'OSP (Outside Plant) Technician', detail: 'Installation and maintenance of outdoor telecommunications infrastructure' },
  { key: 'Telecommunications Technician', detail: 'Installation, testing, commissioning and maintenance of indoor and outdoor telecom equipment' },
  { key: 'HSEQ Representative', detail: 'Promoting compliance with health, safety, environmental and quality requirements' },
] as const

function CapabilitiesPage() {
  const t = useTranslations('capabilities')
  const roles = t.raw('personnelRoles') as string[]
  const testItems = (t.raw('equipmentCategories') as any).testInstruments.items as string[]
  const installItems = (t.raw('equipmentCategories') as any).installationTools.items as string[]
  const safetyItems = (t.raw('equipmentCategories') as any).safetyEquipment.items as string[]

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* Background: our capabilities */}
          <Image
            src="/images/capability/our-capabilities.webp"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.94), rgba(11,23,38,0.88))' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-3">Our Team & Tools</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t('pageTitle')}</h1>
          <p className="mt-4 text-lg text-[#B9C6D3]">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Personnel — Source: Company Profile PDF, Page 8 */}
      <section className="py-20 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Our People</p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>{t('personnelTitle')}</h2>
              <div className="space-y-3">
                {ROLE_DETAILS.map((role, i) => (
                  <div key={i} className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <p className="font-semibold text-sm text-[#008CFF]">{role.key}</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{role.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs italic" style={{ color: 'var(--foreground-subtle)' }}>
                Technical personnel participate in ongoing training to maintain current technologies and industry standards.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Test instruments image — from capability folder */}
              <Image
                src="/images/capability/test-instruments.jpg"
                alt="GIX Nexus technical instruments and measurement equipment"
                width={600}
                height={500}
                className="w-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,23,38,0.6), transparent 60%)' }} />
            </div>
          </div>

          {/* Equipment — Source: Company Profile PDF, Page 9 */}
          <div>
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Our Equipment</p>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{t('equipmentTitle')}</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Test Instruments */}
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                <div className="relative h-40">
                  <Image src="/images/capability/test-instruments.jpg" alt="Test instruments and measurement equipment" fill className="object-cover" />
                  <div className="absolute inset-0" style={{ background: 'rgba(11,23,38,0.6)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-bold text-white text-lg">Test Instruments</p>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'var(--surface)' }}>
                  <ul className="space-y-1.5">
                    {testItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--foreground)' }}>
                        <span className="h-1 w-1 rounded-full bg-[#008CFF] flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Installation Tools */}
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                <div className="relative h-40">
                  <Image src="/images/services/telecom-infrastructure.jpg" alt="Installation tools for telecom work" fill className="object-cover" />
                  <div className="absolute inset-0" style={{ background: 'rgba(11,23,38,0.6)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-bold text-white text-lg">Installation Tools</p>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'var(--surface)' }}>
                  <ul className="space-y-1.5">
                    {installItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--foreground)' }}>
                        <span className="h-1 w-1 rounded-full bg-[#008CFF] flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Safety Equipment */}
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                <div className="relative h-40">
                  <Image src="/images/hseq/hseq-policy.jpeg" alt="Safety equipment and PPE" fill className="object-cover" />
                  <div className="absolute inset-0" style={{ background: 'rgba(11,23,38,0.6)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-bold text-white text-lg">Safety Equipment</p>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'var(--surface)' }}>
                  <ul className="space-y-1.5">
                    {safetyItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--foreground)' }}>
                        <span className="h-1 w-1 rounded-full bg-[#65D51A] flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <CapabilitiesPage />
}
