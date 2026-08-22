'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/images/hero/hero-1.jpeg', alt: 'GIX Nexus telecommunications field operations' },
  { src: '/images/hero/telecom-towers-night.jpg', alt: 'Telecom tower infrastructure at night' },
  { src: '/images/hero/datacenter-solution.jpg', alt: 'Data center and network infrastructure' },
  { src: '/images/hero/ups-for-telecom-base-station-power-backup.webp', alt: 'Telecom power backup systems' },
]

const INTERVAL = 6000   // ms per slide
const FADE_MS   = 1600  // crossfade duration

export function HeroCarousel({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => {
    setActive(index)
  }, [])

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

      {/* All slides — always mounted, opacity drives visibility */}
      {SLIDES.map((slide, i) => {
        const isActive = i === active
        return (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              /* Use ONLY longhand transition properties — no shorthand mixing */
              opacity: isActive ? 1 : 0,
              transitionProperty: 'opacity, transform',
              transitionDuration: `${FADE_MS}ms, ${FADE_MS * 5}ms`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1)',
              /* Subtle Ken Burns — active slide very slowly grows */
              transform: isActive ? 'scale(1.04)' : 'scale(1)',
              zIndex: isActive ? 1 : 0,
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        )
      })}

      {/* Overlay — constant, above all slides */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(7,17,28,0.93) 0%, rgba(11,23,38,0.82) 55%, rgba(7,17,28,0.72) 100%)',
          zIndex: 2,
        }}
      />

      {/* Indicators — thin lines, very subtle, editorial */}
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
              /* Longhand only — no shorthand */
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
