/**
 * GIX Nexus — Tailwind CSS v4 configuration
 * Design direction: GIX NEXUS — MASTER PRODUCT & DESIGN DIRECTION
 *
 * Colors: §15 — LOCKED v1
 * Typography: §18–19 — LOCKED
 * Spacing: §21 — LOCKED
 * Grid: §22 — LOCKED
 * Radius: §23 — LOCKED
 */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Brand colors — §15 ───────────────────────────────────────
      colors: {
        gix: {
          blue:  '#008CFF',
          cyan:  '#12C8FF',
          green: '#65D51A',
        },
        // Dark foundation
        midnight:  '#07111C',
        'deep-navy': '#0B1726',
        graphite:  '#111C27',
        elevated:  '#172331',
        // Light foundation
        canvas:     '#F7F9FB',
        surface:    '#FFFFFF',
        'soft-surface': '#EEF3F7',
        // Semantic
        success: '#16A34A',
        warning: '#D99A00',
        danger:  '#D83A3A',
        info:    '#1687D9',
      },

      // ── Typography — §18–19 ──────────────────────────────────────
      fontFamily: {
        sans:     ['Noto Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'Ethiopic', 'serif'],
      },
      fontSize: {
        // Desktop scale — exact measurements, not utility aliases
        'display': ['52px', { lineHeight: '60px', fontWeight: '650' }],
        'h1':      ['44px', { lineHeight: '52px', fontWeight: '650' }],
        'h2':      ['36px', { lineHeight: '44px', fontWeight: '650' }],
        'h3':      ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'h4':      ['22px', { lineHeight: '30px', fontWeight: '600' }],
        'lead':    ['19px', { lineHeight: '30px', fontWeight: '400' }],
        'body':    ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'small':   ['14px', { lineHeight: '21px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        // Mobile scale
        'display-mobile': ['38px', { lineHeight: '46px' }],
        'h1-mobile': ['34px', { lineHeight: '42px' }],
        'h2-mobile': ['30px', { lineHeight: '38px' }],
        'h3-mobile': ['24px', { lineHeight: '32px' }],
        'h4-mobile': ['20px', { lineHeight: '28px' }],
      },

      // ── Spacing — §21 ────────────────────────────────────────────
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '30': '120px',
        '40': '160px',
      },

      // ── Grid & container — §22 ───────────────────────────────────
      maxWidth: {
        container: '1280px',
      },

      // ── Border radius — §23 ──────────────────────────────────────
      // Technical geometry + controlled curvature
      borderRadius: {
        sm:          '4px',
        DEFAULT:     '8px',
        lg:          '12px',
        xl:          '16px',
        expressive:  '24px',  // reserved for specific expressive surfaces
        full:        '9999px',
      },

      // ── Gradients — §16 ──────────────────────────────────────────
      backgroundImage: {
        'gradient-connectivity':  'linear-gradient(135deg, #008CFF, #12C8FF)',
        'gradient-telecom-power': 'linear-gradient(135deg, #008CFF, #65D51A)',
        'gradient-metallic':      'linear-gradient(135deg, #D9E1E8, #708090)',
      },
    },
  },
  plugins: [],
}

export default config
