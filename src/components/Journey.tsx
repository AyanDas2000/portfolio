import { Fragment, useState } from 'react'
import { journey, type Mission, type Stop } from '../data'
import { Reveal } from '../lib'
import { ChakraEdge } from './ChakraEdge'
import { Modal } from './Modal'
import { Glass, LiveDot, Section, SectionHead } from './ui'

function MissionTile({ m, onOpen }: { m: Mission; onOpen: (m: Mission) => void }) {
  return (
    <button
      onClick={() => onOpen(m)}
      aria-haspopup="dialog"
      className="group w-full rounded-xl border p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: 'var(--line)',
        background: 'color-mix(in srgb, var(--surface) 60%, transparent)',
      }}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest" style={{ color: 'var(--faint)' }}>
        {m.status === 'LIVE' ? <LiveDot /> : <span>DEBRIEF</span>}
        <span
          className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: 'var(--accent)' }}
        >
          open
        </span>
      </div>
      <h4 className="mt-2 text-base font-semibold leading-tight" style={{ color: 'var(--text)' }}>
        {m.title}
      </h4>
      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>
        {m.highlight}
      </p>
    </button>
  )
}

function StopBlock({ stop, index, onOpen }: { stop: Stop; index: number; onOpen: (m: Mission) => void }) {
  return (
    <div className="w-full max-w-3xl">
      <Reveal>
        <Glass bar glow={stop.current} className="p-6 sm:p-7">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-widest" style={{ color: 'var(--muted)' }}>
            {stop.current ? <LiveDot /> : <span>NODE 0{index + 1}</span>}
            <span>{stop.when}</span>
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            {stop.org}
          </h3>
          <p className="mt-1 font-mono text-[12px]" style={{ color: 'var(--accent)' }}>
            {stop.role}
          </p>
          <p className="mt-3 text-[14px] italic leading-relaxed" style={{ color: 'var(--muted)' }}>
            {stop.blurb}
          </p>
        </Glass>
      </Reveal>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {stop.missions.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.05}>
            <MissionTile m={m} onOpen={onOpen} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function Journey() {
  const [active, setActive] = useState<Mission | null>(null)

  return (
    <Section id="journey">
      <div className="mx-auto max-w-3xl">
        <SectionHead eyebrow="JOURNEY" title="The Journey" />
      </div>

      <div className="mt-14 flex flex-col items-center">
        {journey.map((stop, i) => (
          <Fragment key={stop.id}>
            <StopBlock stop={stop} index={i} onOpen={setActive} />
            {i < journey.length - 1 && (
              <ChakraEdge className="hidden h-36 w-16 shrink-0 md:block" />
            )}
            {i < journey.length - 1 && <div className="h-10 md:hidden" aria-hidden />}
          </Fragment>
        ))}
      </div>

      <Modal mission={active} onClose={() => setActive(null)} />
    </Section>
  )
}
