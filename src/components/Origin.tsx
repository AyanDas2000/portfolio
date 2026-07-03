import { origin } from '../data'
import { Reveal } from '../lib'
import { Glass, Section } from './ui'

export function Origin() {
  return (
    <Section className="pt-4!">
      <div className="mx-auto max-w-3xl">
        <Reveal>
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
        </Reveal>
      </div>
    </Section>
  )
}
