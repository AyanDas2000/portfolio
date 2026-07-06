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
      <div className="mx-auto max-w-2xl">
        <motion.div ref={ref} style={{ opacity, y, scale }}>
          <Glass bar className="p-5 sm:p-6">
            <div className="flex items-baseline gap-3">
              <p className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--accent)' }}>
                ORIGIN
              </p>
              <h2 className="text-lg font-bold tracking-tight sm:text-xl" style={{ color: 'var(--text)' }}>
                {origin.title}
              </h2>
            </div>
            <p className="mt-2.5 text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {origin.body}
            </p>
          </Glass>
        </motion.div>
      </div>
    </Section>
  )
}
