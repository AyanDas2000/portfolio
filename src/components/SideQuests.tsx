import { sideQuests, sideQuestsIntro } from '../data'
import { Reveal } from '../lib'
import { Glass, Section, SectionHead, accentVar } from './ui'

export function SideQuests() {
  return (
    <Section id="beyond">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="BEYOND" title="Side Quests" intro={sideQuestsIntro} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sideQuests.map((q, i) => (
            <Reveal key={q.title} delay={(i % 3) * 0.06}>
              <Glass className="h-full p-6">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: accentVar(i), boxShadow: `0 0 8px 0 ${accentVar(i)}` }}
                />
                <h3 className="mt-4 text-lg font-semibold leading-tight" style={{ color: 'var(--text)' }}>
                  {q.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {q.body}
                </p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
