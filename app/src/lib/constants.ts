// Source: Company Profile PDF, Page 5
// EXACTLY 6 service groupings — never add a 7th
export const SERVICE_SLUGS = [
  'telecommunications-infrastructure',
  'fiber-optic-solutions',
  'satellite-wireless-communications',
  'network-infrastructure',
  'telecom-power-systems',
  'maintenance-technical-support',
] as const

// Source: Company Profile PDF, Page 10
// 8 future objectives — always labeled "Objective / Planned"
export const FUTURE_OBJECTIVE_COUNT = 8

// Source: Company Profile PDF, Page 9
export const TARGET_SECTOR_COUNT = 14

// Source: Company Profile PDF, Page 10
export const CONTACT = {
  name: 'Getachew Teshome',
  title: 'Managing Director',
  phone: '+251 911509555',
  email: 'gixnexustelecom@gmail.com',
  address: 'Addis Ababa, Ethiopia',
} as const

export const LOCALES = ['en', 'am'] as const
export type Locale = (typeof LOCALES)[number]

// Source: Company Profile PDF, Page 5
// These 6 services with their icon names (Lucide React)
export const SERVICE_ICONS: Record<(typeof SERVICE_SLUGS)[number], string> = {
  'telecommunications-infrastructure': 'Tower',
  'fiber-optic-solutions': 'Cable',
  'satellite-wireless-communications': 'Radio',
  'network-infrastructure': 'Network',
  'telecom-power-systems': 'Zap',
  'maintenance-technical-support': 'Wrench',
}
