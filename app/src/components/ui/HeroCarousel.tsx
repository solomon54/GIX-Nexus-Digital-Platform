'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/images/hero/hero-1.jpeg', alt: 'GIX Nexus telecommunications field operations' },
  { src: '/images/hero/telecom-towers-night.jpg', alt: 'Telecom tower infrastructure at night' },
  { src: '/images/hero/datacenter-solution.jpg', alt: 'Data center and network infrastructure' },
  { src: '/images/hero/ups-for-telecom-base-station-power-backup.webp', alt: 'Telecom power backup systems' },
]

// How long each slide stays visible (ms)
const INTERVAL = 6000
// How long the crossfade lasts (ms) — slower = more cinematic
const FADE_DURATION = 1800

export function HeroCarousel({ className = '' }: { className?: string }) {
  const [current, setCurrent] = useState(0)
  const [target, setTarget] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => {
    if (index === current) return
    setTarget(index)
    // After fade completes, commit current so next transition is clean
    setTimeout(() => setCurrent(index), FADE_DURATION)
  }, [current])

  const advance = useCallback(() => {
    setTarget(prev => {
      const next = (prev + 1) % SLIDES.length
      setTimeout(() => setCurrent(next), FADE_DURATION)
      return next
    })
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(advance, INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [advance])

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(advance, INTERVAL)
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* All slides rendered simultaneously — opacity crossfade between them */}
      {SLIDES.map((slide, i) => {
        // Active = the target we're fading TO
        const isTarget = i === target
        // Previous = the one we just came from (still fading out)
        const isCurrent = i === current && i !== target

        return (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              opacity: isTarget ? 1 : 0,
              // Both directions transition — ensures overlap and no black frame
              transition: (isTarget || isCurrent)
                ? `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : 'none',
              zIndex: isTarget ? 1 : 0,
              // Subtle slow scale — creates a gentle Ken Burns effect, never distracting
              transform: isTarget ? 'scale(1.03)' : 'scale(1)',
              transitionProperty: isTarget || isCurrent ? 'opacity, transform' : 'none',
              transitionDuration: `${FADE_DURATION}ms, ${FADE_DURATION * 4}ms`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
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

      {/* Dark overlay — always on top of images, always the same */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(7,17,28,0.92) 0%, rgba(11,23,38,0.80) 60%, rgba(7,17,28,0.70) 100%)',
          zIndex: 2,
        }}
      />

      {/* Indicators — very subtle, bottom center.
          Kept visible: they tell the user the hero is interactive and show progress.
          Minimal: thin lines (not dots) — more editorial, less playful */}
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
              // Active: wider pill; inactive: short line
              width: i === target ? '28px' : '8px',
              height: '2px',
              borderRadius: '99px',
              background: i === target
                ? 'rgba(255,255,255,0.85)'
                : 'rgba(255,255,255,0.22)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              minHeight: 0,
              minWidth: 0,
              transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
