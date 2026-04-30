import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * useThree
 * Bootstraps a Three.js scene attached to a <canvas> ref.
 * Handles resize, RAF loop, and cleanup.
 *
 * @param {Function} init  - Receives { scene, camera, renderer, canvas, THREE }
 *                           Must return { animate, cleanup? }
 * @param {Array}    deps  - Re-init when deps change
 *
 * Usage:
 *   const canvasRef = useRef()
 *   useThree(({ scene, camera, renderer }) => {
 *     const mesh = new THREE.Mesh(...)
 *     scene.add(mesh)
 *     return {
 *       animate: () => { mesh.rotation.y += 0.01 },
 *       cleanup: () => mesh.geometry.dispose()
 *     }
 *   }, [], canvasRef)
 */
export function useThree(init, deps = [], canvasRef) {
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef?.current
    if (!canvas) return

    // ── Renderer ──────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // ── Camera ────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // ── Scene ─────────────────────────────────
    const scene = new THREE.Scene()

    // ── Init callback ─────────────────────────
    const result = init({ scene, camera, renderer, canvas, THREE })
    const { animate, cleanup } = result ?? {}

    // ── RAF loop ──────────────────────────────
    const clock = new THREE.Clock()
    const tick = () => {
      frameRef.current = requestAnimationFrame(tick)
      const elapsed = clock.getElapsedTime()
      animate?.({ elapsed, clock })
      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ───────────────────────────────
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      cleanup?.()
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material))
            obj.material.forEach((m) => m.dispose())
          else
            obj.material.dispose()
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { THREE }
