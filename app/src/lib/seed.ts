/**
 * GIX Nexus Digital Platform — Database Seed Script
 *
 * Populates:
 * - 6 services (Source: Company Profile PDF, Page 5)
 * - 14 sectors (Source: Company Profile PDF, Page 9)
 * - 8 future objectives (Source: Company Profile PDF, Page 10)
 *
 * GOVERNANCE NOTES:
 * - Service slugs are frozen — do not add a 7th service
 * - Sectors are TARGET sectors, never label as "clients"
 * - Future objectives are PLANNED — never current achievements
 * - All Amharic content marked [AM TRANSLATION PENDING] requires
 *   review by a qualified Amharic speaker before production
 *
 * Usage:
 *   npx payload run src/lib/seed.ts
 */

import type { Payload } from 'payload'

// ── Services Data ────────────────────────────────────────────────
// Source: Company Profile PDF, Page 5 — exactly 6 groupings
const SERVICES_SEED = [
  {
    slug: 'telecommunications-infrastructure',
    order: 1,
    icon: 'Tower',
    _status: 'published' as const,
    en: {
      name: 'Telecommunications Infrastructure',
      description:
        'Comprehensive installation and maintenance of outdoor and indoor telecommunications facilities, equipment, and site support services.',
      capabilities: [
        { capability: 'Outdoor & Indoor Facilities Installation and Maintenance' },
        { capability: 'Telecom Equipment Installation and Commissioning' },
        { capability: 'Site Survey and Technical Support' },
      ],
    },
    am: {
      name: '[AM TRANSLATION PENDING] Telecommunications Infrastructure',
      description: '[AM TRANSLATION PENDING]',
      capabilities: [
        { capability: '[AM TRANSLATION PENDING] Outdoor & Indoor Facilities Installation and Maintenance' },
        { capability: '[AM TRANSLATION PENDING] Telecom Equipment Installation and Commissioning' },
        { capability: '[AM TRANSLATION PENDING] Site Survey and Technical Support' },
      ],
    },
  },
  {
    slug: 'fiber-optic-solutions',
    order: 2,
    icon: 'Cable',
    _status: 'published' as const,
    en: {
      name: 'Fiber Optic Solutions',
      description:
        'End-to-end fiber optic services from cable installation to testing and preventive maintenance.',
      capabilities: [
        { capability: 'Fiber Optic Cable Installation' },
        { capability: 'Fiber Optic Splicing and Termination' },
        { capability: 'Fiber Optic Testing and Troubleshooting' },
        { capability: 'Preventive and Corrective Maintenance' },
      ],
    },
    am: {
      name: '[AM TRANSLATION PENDING] Fiber Optic Solutions',
      description: '[AM TRANSLATION PENDING]',
      capabilities: [
        { capability: '[AM TRANSLATION PENDING] Fiber Optic Cable Installation' },
        { capability: '[AM TRANSLATION PENDING] Fiber Optic Splicing and Termination' },
        { capability: '[AM TRANSLATION PENDING] Fiber Optic Testing and Troubleshooting' },
        { capability: '[AM TRANSLATION PENDING] Preventive and Corrective Maintenance' },
      ],
    },
  },
  {
    slug: 'satellite-wireless-communications',
    order: 3,
    icon: 'Radio',
    _status: 'published' as const,
    en: {
      name: 'Satellite & Wireless Communications',
      description:
        'Installation, alignment, and maintenance of VSAT, satellite, microwave, and RF communication systems.',
      capabilities: [
        { capability: 'VSAT Installation and Maintenance' },
        { capability: 'Satellite Communication Systems' },
        { capability: 'Microwave Radio Installation and Alignment' },
        { capability: 'RF Equipment Installation and Maintenance' },
      ],
    },
    am: {
      name: '[AM TRANSLATION PENDING] Satellite & Wireless Communications',
      description: '[AM TRANSLATION PENDING]',
      capabilities: [
        { capability: '[AM TRANSLATION PENDING] VSAT Installation and Maintenance' },
        { capability: '[AM TRANSLATION PENDING] Satellite Communication Systems' },
        { capability: '[AM TRANSLATION PENDING] Microwave Radio Installation and Alignment' },
        { capability: '[AM TRANSLATION PENDING] RF Equipment Installation and Maintenance' },
      ],
    },
  },
  {
    slug: 'network-infrastructure',
    order: 4,
    icon: 'Network',
    _status: 'published' as const,
    en: {
      name: 'Network Infrastructure',
      description:
        'Structured cabling, LAN/WAN infrastructure, network rack installation, and commissioning services.',
      capabilities: [
        { capability: 'Structured Cabling Systems' },
        { capability: 'LAN and WAN Infrastructure Installation' },
        { capability: 'Network Rack Installation and Cable Management' },
        { capability: 'Network Testing and Commissioning' },
      ],
    },
    am: {
      name: '[AM TRANSLATION PENDING] Network Infrastructure',
      description: '[AM TRANSLATION PENDING]',
      capabilities: [
        { capability: '[AM TRANSLATION PENDING] Structured Cabling Systems' },
        { capability: '[AM TRANSLATION PENDING] LAN and WAN Infrastructure Installation' },
        { capability: '[AM TRANSLATION PENDING] Network Rack Installation and Cable Management' },
        { capability: '[AM TRANSLATION PENDING] Network Testing and Commissioning' },
      ],
    },
  },
  {
    slug: 'telecom-power-systems',
    order: 5,
    icon: 'Zap',
    _status: 'published' as const,
    en: {
      name: 'Telecom Power Systems',
      description:
        'DC power systems, rectifiers, UPS, battery banks, and earthing and lightning protection for telecom sites.',
      capabilities: [
        { capability: 'DC Power System Installation' },
        { capability: 'Rectifier and UPS Installation' },
        { capability: 'Battery Bank Installation and Replacement' },
        { capability: 'Earthing and Lightning Protection Systems' },
      ],
    },
    am: {
      name: '[AM TRANSLATION PENDING] Telecom Power Systems',
      description: '[AM TRANSLATION PENDING]',
      capabilities: [
        { capability: '[AM TRANSLATION PENDING] DC Power System Installation' },
        { capability: '[AM TRANSLATION PENDING] Rectifier and UPS Installation' },
        { capability: '[AM TRANSLATION PENDING] Battery Bank Installation and Replacement' },
        { capability: '[AM TRANSLATION PENDING] Earthing and Lightning Protection Systems' },
      ],
    },
  },
  {
    slug: 'maintenance-technical-support',
    order: 6,
    icon: 'Wrench',
    _status: 'published' as const,
    en: {
      name: 'Maintenance & Technical Support',
      description:
        'Preventive and corrective maintenance, emergency fault response, and technical inspection services.',
      capabilities: [
        { capability: 'Preventive and Corrective Maintenance' },
        { capability: 'Emergency Fault Response' },
        { capability: 'Equipment Replacement and Upgrades' },
        { capability: 'Technical Inspection and Performance Testing' },
      ],
    },
    am: {
      name: '[AM TRANSLATION PENDING] Maintenance & Technical Support',
      description: '[AM TRANSLATION PENDING]',
      capabilities: [
        { capability: '[AM TRANSLATION PENDING] Preventive and Corrective Maintenance' },
        { capability: '[AM TRANSLATION PENDING] Emergency Fault Response' },
        { capability: '[AM TRANSLATION PENDING] Equipment Replacement and Upgrades' },
        { capability: '[AM TRANSLATION PENDING] Technical Inspection and Performance Testing' },
      ],
    },
  },
]

// ── Sectors Data ─────────────────────────────────────────────────
// Source: Company Profile PDF, Page 9 — 14 target sectors
// IMPORTANT: These are TARGET SECTORS (prospective), not existing clients
const SECTORS_SEED = [
  { order: 1, en: { name: 'Telecommunications Network Operators' } },
  { order: 2, en: { name: 'Telecommunications Equipment Vendors' } },
  { order: 3, en: { name: 'Internet Service Providers (ISPs)' } },
  { order: 4, en: { name: 'Government Ministries and Public Institutions' } },
  { order: 5, en: { name: 'Utility Companies' } },
  { order: 6, en: { name: 'International Organizations and United Nations Agencies' } },
  { order: 7, en: { name: 'Embassies and Diplomatic Missions' } },
  { order: 8, en: { name: 'Non-Governmental Organizations (NGOs)' } },
  { order: 9, en: { name: 'Banks and Financial Institutions' } },
  { order: 10, en: { name: 'Data Centers' } },
  { order: 11, en: { name: 'Military (Defence)' } },
  { order: 12, en: { name: 'Universities and Educational Institutions' } },
  { order: 13, en: { name: 'Commercial and Industrial Organizations' } },
  { order: 14, en: { name: 'Engineering, Procurement, and Construction (EPC) Contractors' } },
]

// ── Future Objectives Data ───────────────────────────────────────
// Source: Company Profile PDF, Page 10 — 8 planned objectives
// CRITICAL: Always labeled "Objective / Planned", never current achievements
const FUTURE_OBJECTIVES_SEED = [
  {
    number: 1,
    en: {
      title: 'Expand Operations',
      description: 'Expand our operational footprint within Ethiopia and into the broader East African region.',
    },
    am: {
      title: '[AM TRANSLATION PENDING] Expand Operations',
      description: '[AM TRANSLATION PENDING]',
    },
  },
  {
    number: 2,
    en: {
      title: 'Build Partnerships',
      description: 'Establish strategic partnerships with leading telecom equipment vendors and EPC contractors.',
    },
    am: {
      title: '[AM TRANSLATION PENDING] Build Partnerships',
      description: '[AM TRANSLATION PENDING]',
    },
  },
  {
    number: 3,
    en: {
      title: 'Enhance Technical Capacity',
      description: 'Grow and develop our technical workforce with specialized training and certification programs.',
    },
    am: {
      title: '[AM TRANSLATION PENDING] Enhance Technical Capacity',
      description: '[AM TRANSLATION PENDING]',
    },
  },
  {
    number: 4,
    en: {
      title: 'Invest in Technology',
      description: 'Invest in advanced tools, equipment, and technology platforms to improve service delivery.',
    },
    am: {
      title: '[AM TRANSLATION PENDING] Invest in Technology',
      description: '[AM TRANSLATION PENDING]',
    },
  },
  {
    number: 5,
    en: {
      title: 'Maintain HSEQ Standards',
      description: 'Continuously strengthen our Health, Safety, Environment, and Quality management systems.',
    },
    am: {
      title: '[AM TRANSLATION PENDING] Maintain HSEQ Standards',
      description: '[AM TRANSLATION PENDING]',
    },
  },
  {
    number: 6,
    en: {
      title: 'Deliver Innovative Solutions',
      description: 'Develop and deliver innovative technical solutions that address emerging telecommunications challenges.',
    },
    am: {
      title: '[AM TRANSLATION PENDING] Deliver Innovative Solutions',
      description: '[AM TRANSLATION PENDING]',
    },
  },
  {
    number: 7,
    en: {
      title: 'Achieve Industry Certifications',
      description: 'Pursue and obtain corporate-level industry certifications to demonstrate commitment to quality and standards.',
    },
    am: {
      title: '[AM TRANSLATION PENDING] Achieve Industry Certifications',
      description: '[AM TRANSLATION PENDING]',
    },
  },
  {
    number: 8,
    en: {
      title: 'Support Digital Transformation',
      description: "Play an active role in supporting Ethiopia's national digital transformation and communications infrastructure growth.",
    },
    am: {
      title: '[AM TRANSLATION PENDING] Support Digital Transformation',
      description: '[AM TRANSLATION PENDING]',
    },
  },
]

// ── Seed function ────────────────────────────────────────────────
export async function seed(payload: Payload): Promise<void> {
  console.log('🌱 Starting GIX Nexus seed...')

  // ── Seed Services ──────────────────────────────────────────────
  console.log('\n📡 Seeding services (6 groupings)...')
  for (const service of SERVICES_SEED) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭  Skipping existing service: ${service.en.name}`)
      continue
    }

    await payload.create({
      collection: 'services',
      locale: 'en',
      data: {
        slug: service.slug,
        order: service.order,
        icon: service.icon,
        _status: service._status,
        name: service.en.name,
        description: service.en.description,
        capabilities: service.en.capabilities,
      },
    })

    // Upsert Amharic locale
    const created = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } },
      limit: 1,
    })
    if (created.docs[0]) {
      await payload.update({
        collection: 'services',
        id: created.docs[0].id,
        locale: 'am',
        data: {
          name: service.am.name,
          description: service.am.description,
          capabilities: service.am.capabilities,
        },
      })
    }

    console.log(`  ✅ Created service: ${service.en.name}`)
  }

  // ── Seed Sectors ───────────────────────────────────────────────
  console.log('\n🏢 Seeding sectors (14 target sectors)...')
  for (const sector of SECTORS_SEED) {
    const existing = await payload.find({
      collection: 'sectors',
      where: { order: { equals: sector.order } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭  Skipping existing sector: ${sector.en.name}`)
      continue
    }

    await payload.create({
      collection: 'sectors',
      locale: 'en',
      data: {
        order: sector.order,
        name: sector.en.name,
      },
    })

    console.log(`  ✅ Created sector: ${sector.en.name}`)
  }

  // ── Seed Future Objectives ─────────────────────────────────────
  console.log('\n🎯 Seeding future objectives (8 planned)...')
  for (const objective of FUTURE_OBJECTIVES_SEED) {
    const existing = await payload.find({
      collection: 'future-objectives',
      where: { number: { equals: objective.number } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭  Skipping existing objective: ${objective.en.title}`)
      continue
    }

    await payload.create({
      collection: 'future-objectives',
      locale: 'en',
      data: {
        number: objective.number,
        title: objective.en.title,
        description: objective.en.description,
      },
    })

    const created = await payload.find({
      collection: 'future-objectives',
      where: { number: { equals: objective.number } },
      limit: 1,
    })
    if (created.docs[0]) {
      await payload.update({
        collection: 'future-objectives',
        id: created.docs[0].id,
        locale: 'am',
        data: {
          title: objective.am.title,
          description: objective.am.description,
        },
      })
    }

    console.log(`  ✅ Created objective ${String(objective.number).padStart(2, '0')}: ${objective.en.title}`)
  }

  console.log('\n✅ Seed complete!')
  console.log('⚠️  Remember: All [AM TRANSLATION PENDING] entries require Amharic review.')
}
