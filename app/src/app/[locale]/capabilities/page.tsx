import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { InquiryForm } from '@/components/ui/InquiryForm'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'capabilities' })
  return { title: t('pageTitle'), description: t('heroDescription') }
}

// ── Team data ─────────────────────────────────────────────────
// Source: Company Profile PDF, Page 8 — documented role types and functions
// Photos: placeholder SVG avatars until real photos are provided
// Replace photo field with /assets/ path when photos are available

const TEAM = [
  {
    name: 'Getachew Teshome',
    role: 'Managing Director',
    qualification: 'SATCOM Specialist — RF Systems & VSAT Technology',
    bio: 'Brings practical experience in satellite communications including installation, operation, and preventive/corrective maintenance of SATCOM systems. Deep understanding of telecommunications engineering, RF systems, and VSAT technology.',
    // Source: Company Profile PDF, Page 2
    skills: ['Satellite Communications (SATCOM)', 'RF Engineering', 'VSAT Technology', 'Project Coordination', 'Telecommunications Infrastructure'],
    photo: '/assets/leader-prof-img.png',
    initials: 'GT',
    featured: true,
  },
  {
    name: 'Telecommunications Engineer',
    role: 'Telecommunications Engineer',
    qualification: 'Professional Engineering Qualification',
    bio: 'Responsible for planning, supervising, installing, testing, commissioning, and maintaining telecommunications infrastructure and network systems across project sites.',
    skills: ['Network Planning', 'Infrastructure Installation', 'System Commissioning', 'Testing & Certification', 'Maintenance'],
    photo: null,
    initials: 'TE',
    featured: false,
  },
  {
    name: 'Network Professional',
    role: 'Cisco Certified Network Professional',
    qualification: 'Cisco Certified Network Professional (CCNP)',
    bio: 'Provides expertise in network installation, configuration, troubleshooting, routing, switching, and network security to ensure reliable communication systems.',
    skills: ['Cisco Networking', 'LAN/WAN Configuration', 'Network Security', 'Routing & Switching', 'Troubleshooting'],
    photo: null,
    initials: 'NP',
    featured: false,
  },
  {
    name: 'Fiber Optic Technician',
    role: 'Fiber Optic Technician',
    qualification: 'Fiber Optic Specialist',
    bio: 'Specialises in fiber optic cable installation, splicing, termination, testing, fault diagnosis, and maintenance across indoor and outdoor deployments.',
    skills: ['Fiber Splicing', 'OTDR Testing', 'Cable Installation', 'Fault Diagnosis', 'Fluke Certification'],
    photo: null,
    initials: 'FT',
    featured: false,
  },
  {
    name: 'OSP Technician',
    role: 'OSP (Outside Plant) Technician',
    qualification: 'Outside Plant Specialist',
    bio: 'Performs installation and maintenance of outdoor telecommunications infrastructure including cable routing, equipment installation, tower work, and preventive maintenance.',
    skills: ['Outdoor Cable Routing', 'Tower & Antenna Work', 'Equipment Installation', 'Preventive Maintenance', 'Safety Compliance'],
    photo: null,
    initials: 'OS',
    featured: false,
  },
  {
    name: 'Telecommunications Technician',
    role: 'Telecommunications Technician',
    qualification: 'Telecom Field Technician',
    bio: 'Supports the installation, testing, commissioning, and maintenance of indoor and outdoor telecommunications equipment and communication networks.',
    skills: ['Equipment Installation', 'System Testing', 'Network Commissioning', 'Indoor Deployments', 'Technical Support'],
    photo: null,
    initials: 'TT',
    featured: false,
  },
  {
    name: 'HSEQ Representative',
    role: 'HSEQ Representative',
    qualification: 'Health, Safety, Environment & Quality Specialist',
    bio: 'Promotes compliance with health, safety, environmental, and quality requirements by implementing safe work practices and supporting continuous improvement across all projects.',
    skills: ['HSEQ Compliance', 'Safe Work Procedures', 'PPE Compliance', 'Safety Training', 'Environmental Protection'],
    photo: null,
    initials: 'HR',
    featured: false,
  },
]

// ── Equipment data ────────────────────────────────────────────
// Source: Company Profile PDF, Page 9
const EQUIPMENT = [
  {
    category: 'Test Instruments',
    image: '/images/capability/test-instruments.jpg',
    color: '#008CFF',
    icon: '🔬',
    items: ['OTDR (Optical Time-Domain Reflectometer)', 'Digital Multimeters', 'Network Cable Testers (Fluke)', 'RF Signal Analyzers', 'Power Quality Analyzers', 'Tone Generator', 'Cable Finder'],
  },
  {
    category: 'Installation Tools',
    image: '/images/industries/instalation-tools.jpg',
    color: '#12C8FF',
    icon: '🔧',
    items: ['Fiber Optic Fusion Splicer', 'Cable Pulling Equipment', 'Crimping & Termination Tools', 'Electric Hammer Drill', 'Technician Hand Tool Kits', 'Antenna Alignment Tools', 'Extension Ladders'],
  },
  {
    category: 'Safety Equipment',
    image: '/images/industries/safety-equipment.jpg',
    color: '#65D51A',
    icon: '🛡',
    items: ['Safety Helmets', 'Safety Harnesses', 'High-Visibility Vests', 'Safety Gloves', 'Safety Boots', 'Safety Glasses', 'First Aid Kit'],
  },
]

export default async function Page({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'capabilities' })

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/capability/our-capabilities.webp" alt="" fill className="object-cover" priority aria-hidden="true" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,17,28,0.95), rgba(11,23,38,0.88))' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-3">{t('heroEyebrow')}</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{t('pageTitle')}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-[#B9C6D3] leading-relaxed">{t('heroDescription')}</p>
          {/* Quick stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { label: 'Professional Roles', value: '7+' },
              { label: 'Service Domains', value: '6' },
              { label: 'Technical Support', value: '24/7' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[#008CFF]">{stat.value}</div>
                <div className="text-xs text-[#708090] mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Profiles ─────────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 8 — professional team structure */}
      <section className="py-24 section-top-divide bg-section-odd">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Our People</p>
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>{t('personnelTitle')}</h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: 'var(--foreground-subtle)' }}>
              A qualified team with practical field experience across telecommunications, satellite communications, network systems, and power engineering.
            </p>
          </div>

          {/* Featured: Managing Director */}
          {TEAM.filter(m => m.featured).map((member) => (
            <div key={member.name} className="mb-12 rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Photo */}
                <div className="relative lg:col-span-1" style={{ minHeight: '320px' }}>
                  <Image
                    src={member.photo!}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,17,28,0.85) 0%, transparent 60%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-2" style={{ background: 'rgba(0,140,255,0.2)', color: '#60A5FA' }}>
                      Managing Director
                    </div>
                    <p className="text-xl font-bold text-white">{member.name}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-2 p-8" style={{ background: 'var(--surface)' }}>
                  <div className="mb-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#008CFF]">{member.qualification}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--foreground-subtle)' }}>{member.bio}</p>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--foreground-subtle)' }}>Areas of Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map(skill => (
                        <span key={skill} className="rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: 'rgba(0,140,255,0.3)', color: 'var(--foreground)', background: 'rgba(0,140,255,0.05)' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 flex items-center gap-4" style={{ borderTop: '1px solid var(--border)' }}>
                    {/* Source: Company Profile PDF, Page 10 */}
                    <a href="tel:+251911509555" className="inline-flex items-center gap-1.5 text-sm text-[#008CFF] hover:text-[#12C8FF] transition-colors">
                      📞 +251 911 509 555
                    </a>
                    <a href="mailto:gixnexustelecom@gmail.com" className="inline-flex items-center gap-1.5 text-sm text-[#008CFF] hover:text-[#12C8FF] transition-colors">
                      ✉ gixnexustelecom@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Team grid — other professionals */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.filter(m => !m.featured).map((member) => (
              <div key={member.role} className="rounded-xl border overflow-hidden group transition-all hover:border-[#008CFF]/30" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                {/* Avatar */}
                <div className="relative h-48" style={{ background: 'linear-gradient(135deg, #0B1726, #172331)' }}>
                  {/* Placeholder avatar — replace when photo available */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white" style={{ background: 'rgba(0,140,255,0.15)', border: '2px solid rgba(0,140,255,0.3)' }}>
                      {member.initials}
                    </div>
                    <p className="mt-3 text-xs text-[#708090]">Photo coming soon</p>
                  </div>
                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#008CFF 1px, transparent 1px), linear-gradient(90deg, #008CFF 1px, transparent 1px)', backgroundSize: '20px 20px' }} aria-hidden="true" />
                </div>

                <div className="p-5">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3" style={{ background: 'rgba(0,140,255,0.08)', color: '#008CFF' }}>
                    {member.qualification}
                  </span>
                  <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--foreground)' }}>{member.role}</h3>
                  <p className="text-xs leading-relaxed line-clamp-3 mb-4" style={{ color: 'var(--foreground-subtle)' }}>{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="rounded-full border px-2.5 py-0.5 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--foreground-subtle)' }}>
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="rounded-full border px-2.5 py-0.5 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--foreground-subtle)' }}>
                        +{member.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs italic" style={{ color: 'var(--foreground-subtle)' }}>
            {/* Source: Company Profile PDF, Page 8 */}
            Technical personnel participate in ongoing training to maintain knowledge of current technologies, industry standards, and best practices.
          </p>
        </div>
      </section>

      {/* ── Equipment & Tools ─────────────────────────────────────── */}
      {/* Source: Company Profile PDF, Page 9 */}
      <section className="py-24 section-top-divide bg-section-even">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Our Equipment</p>
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>{t('equipmentTitle')}</h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: 'var(--foreground-subtle)' }}>
              {/* Source: Company Profile PDF, Page 9 */}
              Equipped with specialist tools and test instruments — committed to maintaining equipment and continuously investing in modern tools.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {EQUIPMENT.map((cat) => (
              <div key={cat.category} className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                {/* Category image */}
                <div className="relative h-48">
                  <Image src={cat.image} alt={cat.category} fill className="object-cover" />
                  <div className="absolute inset-0" style={{ background: 'rgba(7,17,28,0.65)' }} />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl mb-2" aria-hidden="true">{cat.icon}</span>
                    <p className="text-lg font-bold text-white">{cat.category}</p>
                  </div>
                  {/* Accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: cat.color }} />
                </div>
                {/* Items list */}
                <div className="p-5" style={{ background: 'var(--surface)' }}>
                  <ul className="space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--foreground)' }}>
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: cat.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Inquiry Form ──────────────────────────────────── */}
      <section className="py-24 section-top-divide bg-section-odd" id="inquiry">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#008CFF] mb-2">Get in Touch</p>
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>Submit a Service Inquiry</h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: 'var(--foreground-subtle)' }}>
              Whether you need telecommunications infrastructure, fiber optic deployment, power systems, or maintenance support — describe your requirements and we will respond promptly.
            </p>
          </div>
          <InquiryForm />
          {/* Direct contact note */}
          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: 'var(--foreground-subtle)' }}>
              Prefer to speak directly?{' '}
              {/* Source: Company Profile PDF, Page 10 */}
              <a href="tel:+251911509555" className="text-[#008CFF] hover:text-[#12C8FF] font-medium transition-colors">+251 911 509 555</a>
              {' · '}
              <a href="mailto:gixnexustelecom@gmail.com" className="text-[#008CFF] hover:text-[#12C8FF] font-medium transition-colors">gixnexustelecom@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
