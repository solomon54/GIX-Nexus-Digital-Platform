/**
 * GIX Nexus Design System — Spacing & Grid Tokens
 * Source: GIX NEXUS — MASTER PRODUCT & DESIGN DIRECTION, §21–23
 * Status: LOCKED
 *
 * Rule: Use only these values. Do not invent arbitrary pixel values.
 */

/** Spacing scale in px — Source: §21 */
export const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160] as const

/** Grid — Source: §22 */
export const grid = {
  desktop:   { columns: 12 },
  tablet:    { columns: 8 },
  mobile:    { columns: 4 },
  maxWidth:  '1280px',
} as const

/** Border radius — Source: §23
 * Technical geometry + controlled curvature.
 * Mirrors logo: angular infrastructure + smooth orbital paths.
 */
export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  expressive: '24px',  // reserved for specific expressive surfaces only
  full: '9999px',
} as const
