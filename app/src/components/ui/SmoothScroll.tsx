'use client'

import { useEffect } from 'react'

/**
 * SmoothScroll — §51: "The interface is unfolding, not attacking."
 *
 * Intercepts wheel events and applies a momentum-based easing that makes
 * the page feel weighted and intentional. Fast scroll = gentle deceleration.
 * The user still controls speed but the feel is premium — like macOS trackpad
 * inertia on a high-quality app.
 *
 * Does NOT override scroll accessibility — respects prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Respect accessibility
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let current = window.scrollY
    let target = window.scrollY
    let rafId: number
    let isScrolling = false

    // Easing factor — lower = slower, more cinematic deceleration
    // 0.08 gives a luxurious, weighty feel without being frustrating
    const EASE = 0.072

    const tick = () => {
      const diff = target - current
      if (Math.abs(diff) < 0.5) {
        current = target
        isScrolling = false
        return
      }
      current += diff * EASE
      window.scrollTo(0, current)
      rafId = requestAnimationFrame(tick)
    }

    const onWheel = (e: WheelEvent) => {
      // Only intercept trackpad/mouse wheel — not touch or keyboard
      if (e.ctrlKey) return // let pinch-zoom work normally

      e.preventDefault()

      // Accumulate target — scale delta for natural feel
      // deltaMode 1 = line, 0 = pixel
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY

      // Clamp max jump per tick for the "suspense" effect
      const scaledDelta = Math.sign(delta) * Math.min(Math.abs(delta) * 0.9, 280)

      target = Math.max(0, Math.min(
        target + scaledDelta,
        document.documentElement.scrollHeight - window.innerHeight
      ))

      if (!isScrolling) {
        isScrolling = true
        current = window.scrollY
        rafId = requestAnimationFrame(tick)
      }
    }

    // passive: false required to preventDefault
    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
