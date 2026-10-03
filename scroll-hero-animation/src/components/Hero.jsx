import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import carImage from '../assets/car.png'
import StatCard from './StatCard'

gsap.registerPlugin(ScrollTrigger)

const letters = 'WELCOME ITZFIZZ'.split('')
const stats = [
  { id: 'one', value: '58%', description: 'Increase in pick up point use', tone: 'lime' },
  { id: 'two', value: '27%', description: 'Increase in pick up point use', tone: 'dark' },
  { id: 'three', value: '23%', description: 'Decreased in customer phone calls', tone: 'blue' },
  { id: 'four', value: '40%', description: 'Decreased in customer phone calls', tone: 'orange' },
]

function Hero() {
  const sectionRef = useRef(null)
  const carRef = useRef(null)
  const trailRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const car = carRef.current
    const trail = trailRef.current
    if (!section || !car || !trail) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      const headlineLetters = gsap.utils.toArray('[data-letter]')
      const cards = gsap.utils.toArray('[data-stat]')
      const finishX = () => Math.max(0, window.innerWidth - car.offsetWidth * 0.2)
      gsap.set(car, { rotate: 180, transformOrigin: 'center center' })

      if (reducedMotion) {
        gsap.set([...headlineLetters, ...cards], { autoAlpha: 1, y: 0 })
        gsap.set(car, { x: finishX })
        gsap.set(trail, { width: '100%' })
        return
      }

      gsap.set(headlineLetters, { autoAlpha: 0 })
      gsap.set(cards, { autoAlpha: 0, y: 18 })

      const drive = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.9,
          pin: '.scroll-track',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      drive
        .to(car, { x: finishX, duration: 1 }, 0)
        .to(trail, { width: '100%', duration: 1 }, 0)
        .to(headlineLetters, { autoAlpha: 1, duration: 0.14, stagger: 0.045 }, 0.12)
        .to(cards[0], { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power1.out' }, 0.2)
        .to(cards[1], { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power1.out' }, 0.35)
        .to(cards[2], { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power1.out' }, 0.5)
        .to(cards[3], { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power1.out' }, 0.66)
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section className="scroll-section" ref={sectionRef} aria-label="Itzfizz scroll animation">
      <div className="scroll-track">
        <div className="road" aria-hidden="true">
          <div className="road__trail" ref={trailRef} />
          <div className="headline" aria-label="Welcome Itzfizz">
            {letters.map((letter, index) => (
              <span className="headline__letter" data-letter key={`${letter}-${index}`}>
                {letter === ' ' ? '\u00a0' : letter}
              </span>
            ))}
          </div>
          <img className="car" ref={carRef} src={carImage} alt="" />
        </div>

        <div className="stat-grid" aria-label="Impact statistics">
          {stats.map((stat) => <StatCard {...stat} key={stat.id} />)}
        </div>
      </div>
    </section>
  )
}

export default Hero
