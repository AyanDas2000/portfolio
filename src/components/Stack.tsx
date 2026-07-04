import { motion } from 'motion/react'
import { stack } from '../data'
import { Chip, Glass, Section, SectionHead, accentVar } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Stack() {
  return (
    <Section id="stack">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="STACK" title="The Stack" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {stack.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, x: -44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-8%' }}
              transition={{ duration: 0.6, delay: gi * 0.12, ease: EASE }}
            >
              <Glass className="h-full p-6">
                <p className="font-mono text-[11px] font-medium tracking-widest" style={{ color: 'var(--muted)' }}>
                  {group.label.toUpperCase()}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Chip key={item} label={item} color={accentVar(gi)} />
                  ))}
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
