'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

const SLIDES = [
  {
    src: '/images/hero/hero-1.jpeg',
    alt: 'GIX Nexus telecommunications field operations',
    // Moves: slow zoom + drift top-left → bottom-right
    motion: 'hero-drift-tr',
  },
  {
    src: '/images/hero/telecom-towers-night.jpg',
    alt: 'Telecom tower infrastructure at night',
    // Moves: zoom in + drift bottom → top
    motion: 'hero-drift-up',
  },
  {
    src: '/images/hero/datacenter-solution.jpg',
    alt: 'Data center and network infrastructure',
    // Moves: zoom + drift right → left
    motion: 'hero-drift-left',
  },
  {
    src: '/images/hero/ups-for-telecom-base-station-power-backup.webp',
    alt: 'Telecom power backup systems',
    // Moves: slow zoom + drift top-right → bottom-left
    motion: 'hero-drift-tl',
  },
]

const INTERVAL = 7000   // ms per slide
const FADE_MS   = 1800  // crossfade duration

export function HeroCarousel({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => { setActive(index) }, [])
  const advance = useCallback(() => {
    setActive(prev => (prev + 1) % SLIDES.length)
  }, [])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(advance, INTERVAL)
  }, [advance])

  useEffect(() => {
    timerRef.current = setInterval(advance, INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [advance])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">

      {/* Per-slide directional movement keyframes */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          /* drift top-left to bottom-right */
          @keyframes hero-drift-tr {
            0%   { transform: scale(1.08) translate(-1.5%, -1.5%); }
            100% { transform: scale(1.15) translate(1.5%, 1.5%); }
          }
          /* drift bottom to top */
          @keyframes hero-drift-up {
            0%   { transform: scale(1.08) translateY(3%); }
            100% { transform: scale(1.14) translateY(-3%); }
          }
          /* drift right to left */
          @keyframes hero-drift-left {
            0%   { transform: scale(1.08) translateX(3%); }
            100% { transform: scale(1.14) translateX(-3%); }
          }
          /* drift top-right to bottom-left */
          @keyframes hero-drift-tl {
            0%   { transform: scale(1.08) translate(1.5%, -1.5%); }
            100% { transform: scale(1.14) translate(-1.5%, 1.5%); }
          }

          .hero-drift-tr { animation: hero-drift-tr 14s ease-in-out infinite alternate; }
          .hero-drift-up { animation: hero-drift-up 14s ease-in-out infinite alternate; }
          .hero-drift-left { animation: hero-drift-left 14s ease-in-out infinite alternate; }
          .hero-drift-tl { animation: hero-drift-tl 14s ease-in-out infinite alternate; }
        }
        /* No motion: static scaled */
        @media (prefers-reduced-motion: reduce) {
          .hero-drift-tr, .hero-drift-up, .hero-drift-left, .hero-drift-tl {
            transform: scale(1.05);
          }
        }
      `}</style>

      {SLIDES.map((slide, i) => {
        const isActive = i === active
        return (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: `${FADE_MS}ms`,
              transitionTimingFunction: 'ease-in-out',
              zIndex: isActive ? 1 : 0,
            }}
          >
            {/* Wrapper clips overflow from the motion animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute inset-0 ${slide.motion}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
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

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(6,18,54,0.72) 0%, rgba(6,18,54,0.52) 55%, rgba(6,18,54,0.30) 100%)',
          zIndex: 2,
        }}
      />

      {/* Slide indicators */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
        style={{ zIndex: 3 }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { goTo(i); resetTimer() }}
            aria-label={`View slide ${i + 1} of ${SLIDES.length}`}
            style={{
              width: i === active ? '28px' : '8px',
              height: '2px',
              borderRadius: '99px',
              background: i === active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.22)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              minHeight: 0,
              minWidth: 0,
              transitionProperty: 'width, background',
              transitionDuration: '500ms, 400ms',
              transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1), ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
