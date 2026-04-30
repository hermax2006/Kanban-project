import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGSAP
 * Runs a GSAP callback inside a React-safe context.
 * Automatically cleans up all tweens and ScrollTriggers on unmount.
 *
 * @param {Function} callback  - Receives { gsap, ScrollTrigger } and returns cleanup or nothing
 * @param {Array}    deps      - Re-run when deps change (like useEffect)
 * @param {Object}   options   - { scope } — limits selector scope to a ref (recommended)
 *
 * Usage:
 *   const ref = useRef()
 *   useGSAP(({ gsap, ScrollTrigger }) => {
 *     gsap.from('.box', { opacity: 0, y: 40, duration: 0.8 })
 *   }, [], { scope: ref })
 */
export function useGSAP(callback, deps = [], { scope } = {}) {
  const ctx = useRef(null)

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback({ gsap, ScrollTrigger })
    }, scope?.current ?? undefined)

    return () => {
      ctx.current?.revert()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ctx
}

/**
 * useGSAPTimeline
 * Returns a mutable GSAP timeline ref. Cleaned up on unmount.
 */
export function useGSAPTimeline(options = {}) {
  const tl = useRef(null)

  useEffect(() => {
    tl.current = gsap.timeline(options)
    return () => tl.current?.kill()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return tl
}

export { gsap, ScrollTrigger }
