'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface Slide {
  src: string
  motion: 'hero-drift-tr' | 'hero-drift-up' | 'hero-drift-left' | 'hero-drift-tl'
}

interface PageHeroCarouselProps {
  slides: readonly Slide[]
  interval?: number
  overlayGradient?: string
}

/**
 * PageHeroCarousel — reusable hero background carousel for inner pages.
 * Each slide moves in a different direction (passed via motion prop).
 * Crossfades between slides every `interval` ms.
 * Lowers background image opacity so foreground text remains 100% legible.
 */
export function PageHeroCarousel({
  slides,
  interval = 6000,
  overlayGradient = 'linear-gradient(to bottom, rgba(3,8,20,0.68) 0%, rgba(5,13,26,0.48) 55%, rgba(6,18,54,0.85) 100%)',
}: PageHeroCarouselProps) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const advance = useCallback(() => {
    setActive(prev => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    timerRef.current = setInterval(advance, interval)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [advance, interval, slides.length])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
      {/* Per-slide directional movement keyframes */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes hero-drift-tr {
            0%   { transform: scale(1.08) translate(-1.5%, -1.5%); }
            100% { transform: scale(1.15) translate(1.5%, 1.5%); }
          }
          @keyframes hero-drift-up {
            0%   { transform: scale(1.08) translateY(3%); }
            100% { transform: scale(1.14) translateY(-3%); }
          }
          @keyframes hero-drift-left {
            0%   { transform: scale(1.08) translateX(3%); }
            100% { transform: scale(1.14) translateX(-3%); }
          }
          @keyframes hero-drift-tl {
            0%   { transform: scale(1.08) translate(1.5%, -1.5%); }
            100% { transform: scale(1.14) translate(-1.5%, 1.5%); }
          }

          .hero-drift-tr { animation: hero-drift-tr 14s ease-in-out infinite alternate; }
          .hero-drift-up { animation: hero-drift-up 14s ease-in-out infinite alternate; }
          .hero-drift-left { animation: hero-drift-left 14s ease-in-out infinite alternate; }
          .hero-drift-tl { animation: hero-drift-tl 14s ease-in-out infinite alternate; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-drift-tr, .hero-drift-up, .hero-drift-left, .hero-drift-tl {
            transform: scale(1.05);
          }
        }
      `}</style>

      {/* Render slides */}
      {slides.map((slide, i) => {
        const isActive = i === active
        return (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 0.65 : 0,
              transitionProperty: 'opacity',
              transitionDuration: '1600ms',
              transitionTimingFunction: 'ease-in-out',
              zIndex: isActive ? 1 : 0,
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute inset-0 ${slide.motion}`}>
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </div>
          </div>
        )
      })}

      {/* Gradient overlay to guarantee high contrast text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: overlayGradient,
          zIndex: 2,
        }}
      />
    </div>
  )
}

