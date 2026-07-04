import { motion } from 'motion/react'
import { origin } from '../data'
import { Glass, Section } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Origin() {
  return (
    <Section className="pt-4!">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 46, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: '-18%' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
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
