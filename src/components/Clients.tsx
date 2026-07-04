import { motion } from 'motion/react'
import { clients, recognition } from '../data'
import { Glass, Section, SectionHead } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const VIEW = { once: false, margin: '-10%' } as const

export function Clients() {
  return (
    <Section id="proof">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          eyebrow="WORKED WITH"
          title="Who the work reached."
          intro="The systems and campaigns I built ran for real teams."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {clients.map((c, i) => (
            <motion.div
              key={c.via}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <Glass bar className="h-full p-6">
                <p className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--accent)' }}>
                  VIA {c.via.toUpperCase()}
                </p>
                <p className="mt-1.5 text-[13px]" style={{ color: 'var(--muted)' }}>{c.note}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.names.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border px-3 py-1 text-[13px] font-medium"
                      style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface2) 50%, transparent)', color: 'var(--text)' }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <Glass glow className="p-7 text-center sm:p-9">
            <blockquote className="text-xl font-medium italic leading-snug sm:text-2xl" style={{ color: 'var(--text)' }}>
              "{recognition.quote}"
            </blockquote>
            <figcaption className="mt-5 font-mono text-[12px] tracking-wide" style={{ color: 'var(--muted)' }}>
              {recognition.author} · {recognition.authorRole}
            </figcaption>
            <p className="mx-auto mt-4 max-w-md text-[12.5px] leading-relaxed" style={{ color: 'var(--faint)' }}>
              {recognition.note}
            </p>
          </Glass>
        </motion.figure>
      </div>
    </Section>
  )
}
