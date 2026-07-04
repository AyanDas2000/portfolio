import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { journey, branchesByStop, type Branch, type Stop } from '../data'
import { Modal, type ModalData } from './Modal'
import { cn } from '../lib'
import { Glass, LiveDot, Section, SectionHead } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const SPINE = 'M20 0 C 31 130, 9 270, 20 400 C 31 540, 9 700, 20 840 C 27 920, 15 968, 20 1000'
const VIEW = { once: false, margin: '-10%' } as const

function NodeCard({ stop, onOpen }: { stop: Stop; onOpen: (s: Stop) => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.7, ease: EASE }}
      onClick={() => onOpen(stop)}
      aria-haspopup="dialog"
      className="group w-full max-w-sm text-left"
    >
      <Glass bar glow={stop.current} className="p-5 sm:p-6">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-widest" style={{ color: 'var(--muted)' }}>
          {stop.current ? <LiveDot /> : <span>NODE</span>}
          <span>{stop.when}</span>
        </div>
        <h3 className="mt-2.5 text-2xl font-bold tracking-tight sm:text-[26px]" style={{ color: 'var(--text)' }}>
          {stop.org}
        </h3>
        <p className="mt-1 font-mono text-[12px]" style={{ color: 'var(--accent)' }}>{stop.role}</p>
        <p className="mt-2.5 text-[13.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>{stop.blurb}</p>
        <div className="mt-4 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-wider" style={{ color: 'var(--accent)' }}>
          <span className="rounded-full border px-2 py-0.5" style={{ borderColor: 'var(--line)' }}>{stop.missions.length} projects</span>
          <span className="transition-transform group-hover:translate-x-1">open →</span>
        </div>
      </Glass>
    </motion.button>
  )
}

function BranchChip({ b, onOpen, i }: { b: Branch; onOpen: (b: Branch) => void; i: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
      onClick={() => onOpen(b)}
      className="group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm transition-transform hover:-translate-y-0.5"
      style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface) 52%, transparent)' }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--c2)' }} />
      <span className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>{b.title}</span>
      <span className="font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--accent)' }}>open</span>
    </motion.button>
  )
}

function StopRow({
  stop, side, onOpenStop, onOpenBranch,
}: {
  stop: Stop
  side: 'left' | 'right'
  onOpenStop: (s: Stop) => void
  onOpenBranch: (b: Branch) => void
}) {
  const branches = branchesByStop[stop.id] ?? []
  const nodeCol = side === 'left' ? 'md:order-1 md:justify-end' : 'md:order-2 md:justify-start'
  const brCol = side === 'left' ? 'md:order-2 md:items-start' : 'md:order-1 md:items-end'

  return (
    <div className="relative grid items-center gap-8 md:grid-cols-2 md:gap-24">
      {/* anchor on the spine */}
      <motion.span
        initial={{ scale: 0.3, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute left-1/2 top-4 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 md:block"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg)', boxShadow: '0 0 16px 2px color-mix(in srgb, var(--accent) 55%, transparent)' }}
      />
      <div className={cn('flex justify-center', nodeCol)}>
        <NodeCard stop={stop} onOpen={onOpenStop} />
      </div>
      <div className={cn('flex flex-wrap justify-center gap-2.5 md:max-w-xs md:flex-col md:flex-nowrap', brCol)}>
        {branches.length > 0 && (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-1 font-mono text-[10px] tracking-[0.28em]"
            style={{ color: 'var(--faint)' }}
          >
            ◇ SIDE QUESTS
          </motion.span>
        )}
        {branches.map((b, i) => (
          <BranchChip key={b.id} b={b} onOpen={onOpenBranch} i={i} />
        ))}
      </div>
    </div>
  )
}

export function Journey() {
  const [modal, setModal] = useState<ModalData | null>(null)
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 0.8', 'end 0.55'] })
  const headTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const headOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])

  return (
    <Section id="journey">
      <div className="mx-auto max-w-3xl">
        <SectionHead
          eyebrow="THE JOURNEY"
          title="The path so far."
          intro="Scroll to follow the line. Open a node to see the projects inside it. Side quests branch off along the way."
        />
      </div>

      <div ref={track} className="relative mx-auto mt-20 max-w-5xl px-4">
        <svg className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-8 -translate-x-1/2 md:block" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden>
          <path d={SPINE} fill="none" stroke="var(--line)" strokeWidth="2" />
          <motion.path d={SPINE} fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
        </svg>
        <motion.div style={{ top: headTop, opacity: headOpacity }} className="absolute left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block" aria-hidden>
          <span className="block h-3.5 w-3.5 rounded-full" style={{ background: 'var(--core)', boxShadow: '0 0 20px 5px color-mix(in srgb, var(--accent) 75%, transparent)' }} />
        </motion.div>

        <div className="space-y-24 sm:space-y-32">
          {journey.map((stop, i) => (
            <StopRow
              key={stop.id}
              stop={stop}
              side={i % 2 === 0 ? 'left' : 'right'}
              onOpenStop={(s) => setModal({ kind: 'stop', stop: s })}
              onOpenBranch={(b) => setModal({ kind: 'item', title: b.title, body: b.body, tech: b.tech })}
            />
          ))}
        </div>
      </div>

      <Modal data={modal} onClose={() => setModal(null)} />
    </Section>
  )
}
