/**
 * PageHeroCarousel — replaced with pure-CSS gradient hero banner.
 * No background images, no decorative shapes.
 * Receives a title + optional subtitle and renders a vivid
 * sky-to-teal gradient section consistent with the site theme.
 */

interface Slide {
  src?: string
  alt?: string
  motion?: string
}

interface PageHeroBannerProps {
  /** Legacy slides prop — ignored, kept for API compatibility */
  slides?: Slide[]
  title?: string
  subtitle?: string
  /** Extra className on the outer section */
  className?: string
}

export function PageHeroCarousel({
  title,
  subtitle,
  className = '',
}: PageHeroBannerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(155deg, #C8EEFF 0%, #9DD8F5 40%, #7ECFEF 70%, #A8E4F8 100%)',
        minHeight: '0',
      }}
      aria-hidden="true"
    >
      {/* Subtle teal shimmer band — purely CSS, no image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(14,165,201,0.08) 0%, rgba(34,211,238,0.14) 50%, rgba(14,165,201,0.06) 100%)',
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(200,238,255,0.60), transparent)' }}
      />

      {title && (
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1
            className="font-bold"
            style={{ color: '#0A2540', fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base max-w-xl" style={{ color: '#1A4A6E' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
