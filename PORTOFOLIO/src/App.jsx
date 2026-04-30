import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import usePortfolioMode from '@hooks/usePortfolioMode'
import Navbar from '@components/Navbar'
import Loader from '@components/Loader'

import Hero    from '@pages/Hero'
import WorkDev from '@pages/WorkDev'
import Work3D  from '@pages/Work3D'
import About   from '@pages/About'
import Contact from '@pages/Contact'

import '@styles/global.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const mode = usePortfolioMode((s) => s.mode)

  // ── Lenis smooth scroll + GSAP sync ──────
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  // ── Sync mode to <html> data attr for Three.js ──
  useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])

  return (
    <BrowserRouter>
      {/* Loader — blocks until complete */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Global nav */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/"        element={<Hero />}    />
        <Route path="/dev"     element={<WorkDev />} />
        <Route path="/3d"      element={<Work3D />}  />
        <Route path="/about"   element={<About />}   />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
