import { useRef } from 'react'
import { useGSAP } from '@hooks/useGSAP'
import usePortfolioMode from '@hooks/usePortfolioMode'
import styles from './Contact.module.css'

const CONTACTS = [
  { label: 'Email principal', value: 'hermannkumedzro@gmail.com', href: 'mailto:hermannkumedzro@gmail.com' },
  { label: 'Email alternatif', value: 'inconnuxmen@gmail.com',    href: 'mailto:inconnuxmen@gmail.com' },
  { label: 'Téléphone',        value: '+228 71 87 32 66',         href: 'tel:+22871873266' },
  { label: 'WhatsApp',         value: '+228 98 20 05 79',         href: 'https://wa.me/22898200579' },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/hermax2006/' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
]

export default function Contact() {
  const ref  = useRef()
  const mode = usePortfolioMode((s) => s.mode)
  const isDev = mode === 'dev'

  useGSAP(({ gsap }) => {
    gsap.from(`.${styles.top} > *`, {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.top}`, start: 'top 85%' },
    })
    gsap.from(`.${styles.contactItem}`, {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 85%' },
    })
  }, [], { scope: ref })

  return (
    <section ref={ref} className={`${styles.contact} page`}>

      {/* Header */}
      <div className={styles.top}>
        <p className="t-label">
          <span className={isDev ? 'accent-dev' : 'accent-3d'}>// 04</span> — Contact
        </p>
        <h2 className={styles.cta}>
          Parlons de ton<br />
          <span className={isDev ? 'accent-dev' : 'accent-3d'}>prochain projet.</span>
        </h2>
        <p className="t-body" style={{ maxWidth: '440px' }}>
          Disponible pour des missions freelance, des collaborations
          et des projets ambitieux. N'hésite pas à me contacter.
        </p>
      </div>

      {/* Contact grid */}
      <div className={styles.grid}>
        {CONTACTS.map(({ label, value, href }) => (
          <a key={href} href={href} className={styles.contactItem} target="_blank" rel="noreferrer">
            <span className={`t-label ${styles.contactLabel}`}>{label}</span>
            <span className={`${styles.contactValue} ${isDev ? styles.dev : styles.three}`}>
              {value}
              <span className={styles.arrow}>↗</span>
            </span>
          </a>
        ))}
      </div>

      {/* Socials */}
      <div className={styles.socials}>
        {SOCIALS.map(({ label, href }) => (
          <a key={label} href={href} className={styles.social} target="_blank" rel="noreferrer">
            {label}
          </a>
        ))}
      </div>

    </section>
  )
}
