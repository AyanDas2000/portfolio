import { motion } from 'motion/react'
import { craft } from '../data'
import { Glass, Section, SectionHead } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Craft() {
  return (
    <Section id="craft">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="CRAFT" title={craft.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {craft.points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -52 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-8%' }}
              transition={{ duration: 0.85, delay: i * 0.2, ease: EASE }}
            >
              <Glass className="h-full p-6">
                <span className="font-mono text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                  0{i + 1}
                </span>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {p}
                </p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
