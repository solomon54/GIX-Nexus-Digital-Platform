'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/images/hero/hero-1.jpeg', alt: 'GIX Nexus telecommunications field operations' },
  { src: '/images/hero/telecom-towers-night.jpg', alt: 'Telecom tower infrastructure at night' },
  { src: '/images/hero/datacenter-solution.jpg', alt: 'Data center and network infrastructure' },
  { src: '/images/hero/ups-for-telecom-base-station-power-backup.webp', alt: 'Telecom power backup systems' },
]

const INTERVAL = 5000 // 5s per slide

interface HeroCarouselProps {
  className?: string
}

export function HeroCarousel({ className = '' }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (transitioning || index === current) return
    setPrev(current)
    setTransitioning(true)
    setCurrent(index)
    // Clean up prev after transition
    setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
    }, 900)
  }, [current, transitioning])

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Previous slide — fades out */}
      {prev !== null && (
        <div
          className="absolute inset-0"
          style={{ opacity: 0, transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)' }}
        >
          <Image
            src={SLIDES[prev].src}
            alt=""
            fill
            className="object-cover"
            priority={false}
          />
        </div>
      )}

      {/* Current slide — fades in */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: i === current ? 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)' : 'none',
            zIndex: i === current ? 1 : 0,
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
      ))}

      {/* Consistent dark overlay on all slides */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(7,17,28,0.92) 0%, rgba(11,23,38,0.80) 60%, rgba(7,17,28,0.70) 100%)',
          zIndex: 2,
        }}
      />

      {/* Slide indicators — minimal dots */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ zIndex: 3 }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '24px' : '6px',
              height: '6px',
              borderRadius: '99px',
              background: i === current ? '#008CFF' : 'rgba(255,255,255,0.35)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              minHeight: 0,
              minWidth: 0,
              transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
