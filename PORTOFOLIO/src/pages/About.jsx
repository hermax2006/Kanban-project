import { useRef } from 'react'
import { useGSAP } from '@hooks/useGSAP'
import styles from './About.module.css'

const SKILLS_DEV = ['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'Laravel', 'API REST', 'Figma']
const SKILLS_3D  = ['Three.js', 'WebGL', 'GLSL', 'GSAP', 'ScrollTrigger', 'Blender', 'Animation 3D', 'Montage']

export default function About() {
  const ref = useRef()

  useGSAP(({ gsap }) => {
    gsap.from(`.${styles.photoWrapper}`, {
      opacity: 0, scale: 0.92, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.photoSection}`, start: 'top 85%' },
    })
    gsap.from(`.${styles.bioBlock} > *`, {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.bioBlock}`, start: 'top 85%' },
    })
    gsap.from(`.${styles.pill}`, {
      scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: `.${styles.skills}`, start: 'top 80%' },
    })
  }, [], { scope: ref })

  return (
    <section ref={ref} className={`${styles.about} page`}>

      {/* ── Photo + Bio ──────────────────────── */}
      <div className={styles.photoSection}>

        <div className={styles.photoWrapper}>
          {/*
            Quand tu as ta photo, remplace le placeholder par :
            <img src="/assets/photo.jpg" alt="Hermann Kumedzro" className={styles.photo} />
          */}
          <div className={styles.photoPlaceholder}>
            <span className={styles.photoInitials}>HK</span>
            <span className={styles.photoHint}>ta photo ici</span>
          </div>
          <div className={styles.photoBorderDev} />
          <div className={styles.photoBorder3d} />
        </div>

        <div className={styles.bioBlock}>
          <p className="t-label">
            <span className="accent-dev">// 03</span> — À propos
          </p>

          <h2 className={styles.name}>
            Hermann<br />
            <span className={styles.lastName}>Kumedzro</span>
          </h2>

          <p className="t-body">
            Développeur Web &amp; Créateur 3D. Je construis des interfaces
            performantes côté web et des expériences visuelles immersives
            côté 3D. Des UIs React/Laravel aux scènes WebGL avec Three.js
            et GSAP — j'aime quand le code devient quelque chose qu'on ressent.
          </p>

          <div className={styles.badges}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} style={{ background: 'var(--c-dev)' }} />
              Dev Web
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeDot} style={{ background: 'var(--c-3d)' }} />
              3D / Motion
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeDot} style={{ background: '#a78bfa' }} />
              Blender
            </span>
          </div>
        </div>
      </div>

      {/* ── Skills ───────────────────────────── */}
      <div className={styles.skills}>
        <div className={styles.skillCol}>
          <p className={`t-label ${styles.colLabel}`}>
            <span className="accent-dev">Dev Web</span>
          </p>
          <div className={styles.pills}>
            {SKILLS_DEV.map((s) => (
              <span key={s} className={`${styles.pill} ${styles.pillDev}`}>{s}</span>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.skillCol}>
          <p className={`t-label ${styles.colLabel}`}>
            <span className="accent-3d">3D Motion</span>
          </p>
          <div className={styles.pills}>
            {SKILLS_3D.map((s) => (
              <span key={s} className={`${styles.pill} ${styles.pill3d}`}>{s}</span>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
