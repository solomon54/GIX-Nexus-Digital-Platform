/**
 * GIX Nexus Design System — Color Tokens
 * Source: GIX NEXUS — MASTER PRODUCT & DESIGN DIRECTION, §15 Color System
 * Status: LOCKED (v1)
 *
 * Rule: UI should use brand colors selectively.
 * The logo artwork itself remains authoritative.
 */

export const brand = {
  blue:  '#008CFF',  // GIX Blue
  cyan:  '#12C8FF',  // GIX Cyan
  green: '#65D51A',  // GIX Green
} as const

export const darkFoundation = {
  midnight:  '#07111C',
  deepNavy:  '#0B1726',
  graphite:  '#111C27',
  elevated:  '#172331',
} as const

export const lightFoundation = {
  canvas:     '#F7F9FB',
  surface:    '#FFFFFF',
  softSurface: '#EEF3F7',
  border:     '#D9E1E8',
} as const

export const text = {
  darkPrimary:   '#0B1720',
  darkSecondary: '#465463',
  darkMuted:     '#708090',
  lightPrimary:  '#F4F8FC',
  lightSecondary: '#B9C6D3',
} as const

export const semantic = {
  success: '#16A34A',
  warning: '#D99A00',
  danger:  '#D83A3A',
  info:    '#1687D9',
} as const

/**
 * Gradient system — every gradient must have a reason.
 * Source: §16 Gradient System
 */
export const gradients = {
  connectivity: 'linear-gradient(135deg, #008CFF, #12C8FF)',  // Blue → Cyan: connectivity
  telecomPower: 'linear-gradient(135deg, #008CFF, #65D51A)', // Blue → Green: telecom + power
  metallic:     'linear-gradient(135deg, #D9E1E8, #708090)', // Silver → Gray: engineering
} as const
