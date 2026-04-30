import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Loader.module.css'

export default function Loader({ onComplete }) {
  const ref       = useRef()
  const counterRef = useRef()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    // Count up 0→100
    const obj = { val: 0 }
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.floor(obj.val)),
    })

    // Reveal lines
    tl.from(`.${styles.line}`, {
      scaleX: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      transformOrigin: 'left center',
    }, '-=0.4')

    // Exit
    tl.to(ref.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.3,
      onComplete: () => onComplete?.(),
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={ref} className={styles.loader} aria-hidden="true">
      <div className={styles.content}>
        {/* Counter */}
        <span ref={counterRef} className={styles.counter}>
          {String(count).padStart(3, '0')}
        </span>

        {/* Lines */}
        <div className={styles.lines}>
          <div className={`${styles.line} ${styles.dev}`} />
          <div className={`${styles.line} ${styles.both}`} />
          <div className={`${styles.line} ${styles.three}`} />
        </div>

        {/* Label */}
        <div className={styles.label}>
          <span className={styles.labelDev}>DEV</span>
          <span className={styles.separator}> × </span>
          <span className={styles.label3d}>3D</span>
        </div>
      </div>
    </div>
  )
}
