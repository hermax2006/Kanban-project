import { useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import usePortfolioMode from '@hooks/usePortfolioMode'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/dev',     label: 'Dev'  },
  { to: '/3d',      label: '3D'   },
  { to: '/about',   label: 'About'},
  { to: '/contact', label: 'Contact'},
]

export default function Navbar() {
  const ref      = useRef()
  const location = useLocation()
  const { mode, toggle } = usePortfolioMode()

  // ── Entrance animation ────────────────────
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.2 }
    )
  }, [])

  // ── Hide/show on scroll ───────────────────
  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastY && y > 80) {
        gsap.to(ref.current, { y: -80, duration: 0.4, ease: 'power2.in' })
      } else {
        gsap.to(ref.current, { y: 0, duration: 0.5, ease: 'power2.out' })
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={ref} className={styles.nav} data-mode={mode}>
      {/* Logo */}
      <NavLink to="/" className={styles.logo}>
        <span className={styles.logoText}>PORTFOLIO</span>
        <span className={`${styles.logoDot} ${mode === 'dev' ? styles.dev : styles.three}`} />
      </NavLink>

      {/* Links */}
      <ul className={styles.links}>
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mode toggle */}
      <button
        className={styles.toggle}
        onClick={toggle}
        aria-label={`Switch to ${mode === 'dev' ? '3D' : 'Dev'} mode`}
       
      >
        <span className={`${styles.toggleLabel} ${mode === 'dev' ? styles.dev : styles.three}`}>
          {mode === 'dev' ? 'DEV' : '3D'}
        </span>
        <span className={styles.toggleTrack}>
          <span className={`${styles.toggleThumb} ${mode === '3d' ? styles.on : ''}`} />
        </span>
        <span className={`${styles.toggleLabel} ${mode === '3d' ? styles.three : styles.inactive}`}>
          3D
        </span>
      </button>
    </nav>
  )
}
