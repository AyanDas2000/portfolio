import { stack } from '../data'
import { Reveal } from '../lib'
import { Chip, Glass, Section, SectionHead, accentVar } from './ui'

export function Stack() {
  return (
    <Section id="stack">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="STACK" title="The Stack" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {stack.map((group, gi) => (
            <Reveal key={group.label} delay={(gi % 2) * 0.06}>
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
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
