/**
 * GIX Nexus Design System — Typography Tokens
 * Source: GIX NEXUS — MASTER PRODUCT & DESIGN DIRECTION, §18–19
 * Status: LOCKED
 *
 * Fonts: Noto Sans (English) + Noto Sans Ethiopic (Amharic)
 * Rule: Use exact px measurements. sm/md/lg/xl are implementation aliases only.
 */

export const fontFamily = {
  sans:    ['Noto Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  ethiopic: ['Noto Sans Ethiopic', 'Ethiopic', 'serif'],
} as const

/** Desktop type scale — Source: §19 */
export const typeScaleDesktop = {
  display: { size: '52px', lineHeight: '60px', weight: 650 },
  h1:      { size: '44px', lineHeight: '52px', weight: 650 },
  h2:      { size: '36px', lineHeight: '44px', weight: 650 },
  h3:      { size: '28px', lineHeight: '36px', weight: 600 },
  h4:      { size: '22px', lineHeight: '30px', weight: 600 },
  lead:    { size: '19px', lineHeight: '30px', weight: 400 },
  body:    { size: '16px', lineHeight: '26px', weight: 400 },
  bodyStrong: { size: '16px', lineHeight: '26px', weight: 600 },
  small:   { size: '14px', lineHeight: '21px', weight: 400 },
  caption: { size: '12px', lineHeight: '18px', weight: 500 },
} as const

/** Mobile type scale — Source: §19 */
export const typeScaleMobile = {
  display: { size: '38px', lineHeight: '46px' },
  h1:      { size: '34px', lineHeight: '42px' },
  h2:      { size: '30px', lineHeight: '38px' },
  h3:      { size: '24px', lineHeight: '32px' },
  h4:      { size: '20px', lineHeight: '28px' },
  lead:    { size: '18px', lineHeight: '28px' },
  body:    { size: '16px', lineHeight: '25px' },
  small:   { size: '14px', lineHeight: '21px' },
  caption: { size: '12px', lineHeight: '18px' },
} as const
