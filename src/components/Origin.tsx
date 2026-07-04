import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { origin } from '../data'
import { Glass, Section } from './ui'

export function Origin() {
  const ref = useRef<HTMLDivElement>(null)
  // Scroll-linked reveal: the block animates continuously as it moves through the
  // viewport, and reverses when you scroll back up. This is deliberately NOT a
  // whileInView entrance, because Origin sits high on the page and a one-shot
  // reveal would fire on load before the reader ever scrolls to it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'center 0.58'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [64, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.955, 1])

  return (
    <Section className="pt-4!">
      <div className="mx-auto max-w-3xl">
        <motion.div ref={ref} style={{ opacity, y, scale }}>
          <Glass bar glow className="p-7 sm:p-9">
            <p className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--muted)' }}>
              ORIGIN
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--text)' }}>
              {origin.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed sm:text-base" style={{ color: 'var(--muted)' }}>
              {origin.body}
            </p>
          </Glass>
        </motion.div>
      </div>
    </Section>
  )
}
