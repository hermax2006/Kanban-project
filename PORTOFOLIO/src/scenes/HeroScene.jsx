import { useRef } from 'react'
import { useThree, THREE } from '@hooks/useThree'
import usePortfolioMode from '@hooks/usePortfolioMode'
import styles from './HeroScene.module.css'

export default function HeroScene() {
  const canvasRef = useRef()
  const mode = usePortfolioMode((s) => s.mode)

  useThree(({ scene, camera, renderer }) => {
    camera.position.set(0, 0, 6)

    // ── Lights ─────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)

    const devLight = new THREE.PointLight(0x4af0ff, 60, 20)
    devLight.position.set(-3, 2, 4)
    scene.add(devLight)

    const tdLight = new THREE.PointLight(0xff6b4a, 60, 20)
    tdLight.position.set(3, -2, 4)
    scene.add(tdLight)

    // ── Geometries ─────────────────────────
    // Dev: wireframe torus knot (code/logic feel)
    const devGeo = new THREE.TorusKnotGeometry(1.4, 0.4, 160, 20)
    const devMat = new THREE.MeshStandardMaterial({
      color: 0x4af0ff,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    })
    const devMesh = new THREE.Mesh(devGeo, devMat)

    // 3D: icosahedron (sculptural, geometric)
    const tdGeo = new THREE.IcosahedronGeometry(1.8, 1)
    const tdMat = new THREE.MeshStandardMaterial({
      color: 0xff6b4a,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
      flatShading: true,
    })
    const tdMesh = new THREE.Mesh(tdGeo, tdMat)

    scene.add(devMesh)
    scene.add(tdMesh)

    // ── Particles background ────────────────
    const count = 1200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const ptMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x4af0ff,
      transparent: true,
      opacity: 0.5,
    })
    const particles = new THREE.Points(ptGeo, ptMat)
    scene.add(particles)

    // ── Mouse parallax ──────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // ── Animate ─────────────────────────────
    return {
      animate: ({ elapsed }) => {
        const isDevMode = document.documentElement.dataset.mode !== '3d'

        // Switch visible mesh
        devMesh.visible = isDevMode
        tdMesh.visible  = !isDevMode

        // Particle color
        ptMat.color.set(isDevMode ? 0x4af0ff : 0xff6b4a)

        const activeMesh = isDevMode ? devMesh : tdMesh
        activeMesh.rotation.x = elapsed * 0.18 + mouse.y * 0.15
        activeMesh.rotation.y = elapsed * 0.22 + mouse.x * 0.15

        // Subtle camera sway
        camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.04
        camera.position.y += (-mouse.y * 0.2 - camera.position.y) * 0.04
        camera.lookAt(scene.position)

        particles.rotation.y = elapsed * 0.02
      },

      cleanup: () => {
        window.removeEventListener('mousemove', onMouse)
        devGeo.dispose(); devMat.dispose()
        tdGeo.dispose();  tdMat.dispose()
        ptGeo.dispose();  ptMat.dispose()
      },
    }
  }, [canvasRef], canvasRef)

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  )
}
