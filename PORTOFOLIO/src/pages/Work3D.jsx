import { useRef } from 'react'
import { useGSAP } from '@hooks/useGSAP'
import styles from './Work.module.css'

const PROJECTS_3D = [
  {
    id: 1,
    title: 'Fluid Simulation',
    stack: ['Three.js', 'GLSL', 'WebGL'],
    desc: 'Simulation de fluides en temps réel avec shaders custom et interaction souris.',
    year: '2024',
    link: '#',
  },
  {
    id: 2,
    title: 'Product Configurator',
    stack: ['Three.js', 'GLTF', 'React'],
    desc: 'Configurateur 3D interactif avec matériaux PBR et éclairage dynamique HDR.',
    year: '2024',
    link: '#',
  },
  {
    id: 3,
    title: 'Generative Art',
    stack: ['GSAP', 'Canvas', 'Math'],
    desc: 'Série de pièces génératives avec attracteurs de Lorenz et systèmes de particules.',
    year: '2023',
    link: '#',
  },
  {
    id: 4,
    title: 'Scroll Experience',
    stack: ['Three.js', 'GSAP', 'ScrollTrigger'],
    desc: 'Expérience narrative pilotée par le scroll avec transitions de scènes 3D.',
    year: '2023',
    link: '#',
  },
]

export default function Work3D() {
  const ref = useRef()

  useGSAP(({ gsap }) => {
    gsap.from(`.${styles.header} > *`, {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.header}`, start: 'top 85%' },
    })
    gsap.from(`.${styles.card}`, {
      y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%' },
    })
  }, [], { scope: ref })

  return (
    <section ref={ref} className={`${styles.work} page`}>
      <div className={styles.header}>
        <p className="t-label">
          <span className="accent-3d">// 02</span> — 3D Motion
        </p>
        <h2 className="t-heading">Projets 3D</h2>
        <p className="t-body" style={{ maxWidth: '460px' }}>
          Scènes, expériences WebGL et motion design construits avec Three.js et GSAP.
        </p>
      </div>

      <div className={styles.grid}>
        {PROJECTS_3D.map((p) => (
          <a
            key={p.id}
            href={p.link}
            className={`${styles.card} ${styles.tdCard}`}
            data-hover
          >
            <div className={styles.cardTop}>
              <span className={styles.cardYear}>{p.year}</span>
              <span className={`${styles.cardNum} t-label`}>0{p.id}</span>
            </div>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardDesc}>{p.desc}</p>
            <div className={styles.cardStack}>
              {p.stack.map((s) => (
                <span key={s} className={`${styles.tag} ${styles.tag3d}`}>{s}</span>
              ))}
            </div>
            <span className={styles.cardArrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
