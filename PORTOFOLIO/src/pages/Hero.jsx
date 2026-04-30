import { useRef } from 'react'
import { useGSAP } from '@hooks/useGSAP'
import usePortfolioMode from '@hooks/usePortfolioMode'
import styles from './Hero.module.css'

export default function Hero() {
  const ref  = useRef()
  const { mode, toggle } = usePortfolioMode()
  const isDev = mode === 'dev'

  // ── Entrance (runs once after loader) ────
  useGSAP(({ gsap }) => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.from(`.${styles.eyebrow}`, {
      opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
    })
    tl.from(`.${styles.titleLine}`, {
      opacity: 0, y: 60, duration: 0.9, stagger: 0.12, ease: 'power4.out',
    }, '-=0.3')
    tl.from(`.${styles.sub}`, {
      opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
    }, '-=0.4')
    tl.from(`.${styles.cta}`, {
      opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
    }, '-=0.3')
  }, [], { scope: ref })

  return (
    <section ref={ref} className={styles.hero}>
      {/* Eyebrow */}
      <p className={`${styles.eyebrow} t-label`}>
        <span className={isDev ? 'accent-dev' : 'accent-3d'}>
          {isDev ? '// Dev Web' : '// 3D Motion'}
        </span>
        {' '}— Portfolio
      </p>

      {/* Title */}
      <h1 className={styles.title}>
        <span className={styles.titleLine}>
          {isDev ? 'Building' : 'Sculpting'}
        </span>
        <span className={`${styles.titleLine} ${styles.titleAccent} ${isDev ? styles.dev : styles.three}`}>
          {isDev ? 'Interfaces' : 'Worlds'}
        </span>
        <span className={styles.titleLine}>
          {isDev ? 'that scale.' : 'in 3D.'}
        </span>
      </h1>

      {/* Sub */}
      <p className={`${styles.sub} t-body`}>
        {isDev
          ? 'HTML · CSS · JavaScript · React · PHP · Laravel · API REST'
          : 'Three.js · GSAP · GLSL · Blender · ScrollTrigger · Montage'}
      </p>

      {/* CTAs */}
      <div className={styles.cta}>
        <a
          href={isDev ? '/dev' : '/3d'}
          className={`${styles.btnPrimary} ${isDev ? styles.dev : styles.three}`}
         
        >
          {isDev ? 'See Dev Work' : 'See 3D Work'}
        </a>
        <button
          onClick={toggle}
          className={styles.btnGhost}
         
        >
          Switch to {isDev ? '3D →' : 'Dev →'}
        </button>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
        <span className="t-label">Scroll</span>
      </div>
    </section>
  )
}
