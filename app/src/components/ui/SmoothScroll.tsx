'use client'

import { useEffect } from 'react'

/**
 * SmoothScroll — velocity-based inertia scrolling
 * §51: "The interface is unfolding." — consistent feel at any speed.
 *
 * Architecture:
 * - Each wheel event adds to a VELOCITY (not directly to a target position)
 * - Every RAF frame: velocity decays by FRICTION, position moves by velocity
 * - Fast or slow scrolling = same feel. No accumulation = no jerk, no jumps.
 *
 * Respects prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // ── Tuning ────────────────────────────────────────────────
    const WHEEL_MULTIPLIER = 0.55  // input sensitivity
    const FRICTION = 0.88           // decay per frame — lower = slower/heavier
    const STOP_THRESHOLD = 0.15     // px/frame below which we stop RAF
    // ─────────────────────────────────────────────────────────

    let velocity = 0
    let current = window.scrollY
    let rafId: number
    let running = false

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight

    const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()))

    const step = () => {
      velocity *= FRICTION
      current = clamp(current + velocity)
      window.scrollTo(0, current)

      if (Math.abs(velocity) > STOP_THRESHOLD) {
        rafId = requestAnimationFrame(step)
      } else {
        velocity = 0
        running = false
      }
    }

    const onWheel = (e: WheelEvent) => {
      // Let browser handle pinch-zoom and horizontal scroll naturally
      if (e.ctrlKey || e.shiftKey) return
      e.preventDefault()

      // Normalise across deltaMode (pixel / line / page)
      const raw =
        e.deltaMode === 1 ? e.deltaY * 24
        : e.deltaMode === 2 ? e.deltaY * window.innerHeight
        : e.deltaY

      // Add to velocity — no hard cap, friction controls the feel
      velocity += raw * WHEEL_MULTIPLIER

      // Re-sync position to avoid drift if user reached boundary
      current = window.scrollY

      if (!running) {
        running = true
        rafId = requestAnimationFrame(step)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
