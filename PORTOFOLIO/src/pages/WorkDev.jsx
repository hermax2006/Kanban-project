import { useRef } from 'react'
import { useGSAP } from '@hooks/useGSAP'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Work.module.css'

const PROJECTS_DEV = [
  {
    id: 1,
    title: 'Design System',
    stack: ['React', 'TypeScript', 'Storybook'],
    desc: 'Système de composants scalable avec tokens de design et documentation interactive.',
    year: '2024',
    link: '#',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    stack: ['Next.js', 'Node', 'PostgreSQL'],
    desc: 'Plateforme full-stack avec panier temps réel, paiement Stripe et dashboard admin.',
    year: '2024',
    link: '#',
  },
  {
    id: 3,
    title: 'Dashboard Analytics',
    stack: ['React', 'D3.js', 'REST API'],
    desc: 'Tableau de bord de données avec visualisations interactives et exports PDF.',
    year: '2023',
    link: '#',
  },
  {
    id: 4,
    title: 'Motion CMS',
    stack: ['Svelte', 'GraphQL', 'Sanity'],
    desc: 'CMS headless avec prévisualisation live et édition drag-and-drop.',
    year: '2023',
    link: '#',
  },
]

export default function WorkDev() {
  const ref = useRef()

  useGSAP(({ gsap }) => {
    // Header
    gsap.from(`.${styles.header} > *`, {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.header}`, start: 'top 85%' },
    })

    // Cards stagger
    gsap.from(`.${styles.card}`, {
      y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%' },
    })
  }, [], { scope: ref })

  return (
    <section ref={ref} className={`${styles.work} page`}>
      <div className={styles.header}>
        <p className="t-label">
          <span className="accent-dev">// 01</span> — Dev Web
        </p>
        <h2 className="t-heading">Projets Web</h2>
        <p className="t-body" style={{ maxWidth: '460px' }}>
          Interfaces, systèmes et applications construites avec des technos modernes.
        </p>
      </div>

      <div className={styles.grid}>
        {PROJECTS_DEV.map((p) => (
          <a
            key={p.id}
            href={p.link}
            className={`${styles.card} ${styles.devCard}`}
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
                <span key={s} className={`${styles.tag} ${styles.tagDev}`}>{s}</span>
              ))}
            </div>
            <span className={styles.cardArrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
