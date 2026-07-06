import { motion } from 'motion/react'
import { stack } from '../data'
import { Chip, Glass, Section, SectionHead, accentVar } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const VIEW = { once: false, margin: '-8%' } as const

export function Stack() {
  const primary = stack.find((g) => g.primary)
  const small = stack.find((g) => g.small)
  const rest = stack.filter((g) => !g.primary && !g.small)

  return (
    <Section id="stack">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="STACK" title="The Stack" intro="A big kit, but this is where I actually live." />

        {primary && (
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-10"
          >
            <Glass bar glow className="p-6 sm:p-7">
              <div className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-widest" style={{ color: 'var(--accent)' }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                {primary.label.toUpperCase()}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {primary.items.map((item, ii) => (
                  <span
                    key={item}
                    className="rounded-lg px-3 py-1.5 text-[14px] font-semibold"
                    style={{
                      color: accentVar(ii),
                      background: `color-mix(in srgb, ${accentVar(ii)} 14%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${accentVar(ii)} 32%, transparent)`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Glass>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-9 font-mono text-[11px] tracking-widest"
          style={{ color: 'var(--faint)' }}
        >
          AND THE TOOLS I REACH FOR
        </motion.p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {rest.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, x: -44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: EASE }}
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

        {small && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px]"
            style={{ color: 'var(--faint)' }}
          >
            <span className="tracking-widest">{small.label.toUpperCase()}:</span>
            <span style={{ color: 'var(--muted)' }}>{small.items.join('  ·  ')}</span>
          </motion.div>
        )}
      </div>
    </Section>
  )
}
