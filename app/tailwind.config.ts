/**
 * GIX Nexus Digital Platform — Tailwind CSS v4 Configuration
 *
 * NOTE ON BRAND COLORS:
 * All color values below are PLACEHOLDERS pending official brand palette approval.
 * OPEN QUESTION: Official brand colors not yet confirmed.
 * Update `brand-blue` and `brand-green` when the approved hex values are provided.
 *
 * NOTE ON FONTS:
 * Font families listed here match what is imported via Google Fonts in locale layout.tsx.
 * Update if self-hosting fonts or changing font choices.
 */
import type { Config } from 'tailwindcss'

const config: Config = {
  // Tailwind v4 uses CSS-first configuration; this file provides
  // optional JS-side overrides and plugin configuration.
  content: [
    './src/**/*.{ts,tsx}',
    './messages/**/*.json',
  ],
  darkMode: 'class', // next-themes uses class strategy
  theme: {
    extend: {
      colors: {
        // PLACEHOLDER — awaiting official brand palette approval
        'brand-blue': {
          DEFAULT: '#0066CC', // Placeholder — NOT confirmed official color
          dark: '#004fa3',    // Placeholder
          light: '#3388dd',   // Placeholder
        },
        // PLACEHOLDER — awaiting official brand palette approval
        'brand-green': {
          DEFAULT: '#2D7D46', // Placeholder — NOT confirmed official color
          dark: '#236138',    // Placeholder
          light: '#3da05e',   // Placeholder
        },
      },
      fontFamily: {
        // English — Inter via Google Fonts
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        // Amharic (Ethiopic script) — Noto Sans Ethiopic via Google Fonts
        amharic: ['Noto Sans Ethiopic', 'Ethiopic', 'serif'],
      },
      spacing: {
        // Minimum touch target (spec requirement D-08)
        'touch': '44px',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            a: {
              color: 'var(--brand-blue)',
              '&:hover': {
                color: 'var(--brand-blue-dark)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
