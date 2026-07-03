import { craft } from '../data'
import { Reveal } from '../lib'
import { Glass, Section, SectionHead } from './ui'

export function Craft() {
  return (
    <Section id="craft">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="CRAFT" title={craft.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {craft.points.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Glass className="h-full p-6">
                <span className="font-mono text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                  0{i + 1}
                </span>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {p}
                </p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
