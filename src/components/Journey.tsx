import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { journey, branchesByStop, type Branch, type Stop } from '../data'
import { Modal, type ModalData } from './Modal'
import { cn } from '../lib'
import { Glass, LiveDot, Section, SectionHead } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const SPINE = 'M20 0 C 31 130, 9 270, 20 400 C 31 540, 9 700, 20 840 C 27 920, 15 968, 20 1000'
const VIEW = { once: false, margin: '-10%' } as const

function NodeCard({ stop, side, onOpen }: { stop: Stop; side: 'left' | 'right'; onOpen: (s: Stop) => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: side === 'left' ? -52 : 52 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.7, ease: EASE }}
      whileHover={{ y: -8, scale: 1.03 }}
      onClick={() => onOpen(stop)}
      aria-haspopup="dialog"
      className="group w-full max-w-sm rounded-2xl text-left"
    >
      <Glass
        bar
        glow={stop.current}
        className="p-5 ring-0 ring-[color-mix(in_srgb,var(--accent)_55%,transparent)] transition-all duration-300 group-hover:shadow-[0_30px_70px_-20px_color-mix(in_srgb,var(--accent)_68%,transparent)] group-hover:ring-2 sm:p-6"
      >
        <div className="flex items-center justify-between font-mono text-[11px] tracking-widest" style={{ color: 'var(--muted)' }}>
          {stop.current ? <LiveDot /> : <span>NODE</span>}
          <span>{stop.when}</span>
        </div>
        <h3
          className="mt-2.5 origin-left text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-[1.05] sm:text-[26px]"
          style={{ color: 'var(--text)' }}
        >
          {stop.org}
        </h3>
        <p className="mt-1 font-mono text-[12px]" style={{ color: 'var(--accent)' }}>{stop.role}</p>
        <p className="mt-2.5 text-[13.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>{stop.blurb}</p>
        <div className="mt-4 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-wider" style={{ color: 'var(--accent)' }}>
          <span className="rounded-full border px-2 py-0.5" style={{ borderColor: 'var(--line)' }}>{stop.missions.length} project{stop.missions.length === 1 ? '' : 's'}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">open &rarr;</span>
        </div>
      </Glass>
    </motion.button>
  )
}

function BranchChip({ b, side, onOpen, i }: { b: Branch; side: 'left' | 'right'; onOpen: (b: Branch) => void; i: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: side === 'left' ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
      whileHover={{ y: -3, scale: 1.07 }}
      onClick={() => onOpen(b)}
      className="group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm transition-colors hover:border-[color-mix(in_srgb,var(--accent)_55%,transparent)]"
      style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface) 55%, transparent)' }}
    >
      <span className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: 'var(--c2)' }} />
      <span className="text-[13px] font-medium transition-colors group-hover:text-[color:var(--accent)]" style={{ color: 'var(--text)' }}>{b.title}</span>
      <span className="max-w-0 overflow-hidden font-mono text-[10px] opacity-0 transition-all duration-300 group-hover:max-w-[3rem] group-hover:opacity-100" style={{ color: 'var(--accent)' }}>open</span>
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
  const branchSide = side === 'left' ? 'right' : 'left'
  const nodeCol = side === 'left' ? 'md:order-1 md:justify-end' : 'md:order-2 md:justify-start'
  const brCol = side === 'left' ? 'md:order-2 md:items-start' : 'md:order-1 md:items-end'

  return (
    <div className="relative grid items-center gap-6 md:grid-cols-2 md:gap-24">
      {/* mobile anchor on the left rail */}
      <motion.span
        initial={{ scale: 0.3, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute top-6 h-3.5 w-3.5 rounded-full border-2 md:hidden"
        style={{ left: '-31px', borderColor: 'var(--accent)', background: 'var(--bg)', boxShadow: '0 0 12px 2px color-mix(in srgb, var(--accent) 55%, transparent)' }}
      />
      {/* desktop anchor on the centered spine */}
      <motion.span
        initial={{ scale: 0.3, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute left-1/2 top-4 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 md:block"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg)', boxShadow: '0 0 16px 2px color-mix(in srgb, var(--accent) 55%, transparent)' }}
      />
      <div className={cn('flex justify-start', nodeCol)}>
        <NodeCard stop={stop} side={side} onOpen={onOpenStop} />
      </div>
      <div className={cn('flex flex-wrap justify-start gap-2.5 md:max-w-xs md:flex-col md:flex-nowrap', brCol)}>
        {branches.length > 0 && (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-1 w-full font-mono text-[10px] tracking-[0.28em]"
            style={{ color: 'var(--faint)' }}
          >
            &#9671; SIDE QUESTS
          </motion.span>
        )}
        {branches.map((b, i) => (
          <BranchChip key={b.id} b={b} side={branchSide} onOpen={onOpenBranch} i={i} />
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
          intro="Three stops in two years, newest first."
        />
      </div>

      <div ref={track} className="relative mx-auto mt-14 max-w-5xl px-4 sm:mt-20">
        {/* desktop: wavy centered spine */}
        <svg className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-8 -translate-x-1/2 md:block" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden>
          <path d={SPINE} fill="none" stroke="var(--line)" strokeWidth="2" />
          <motion.path d={SPINE} fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
        </svg>
        <motion.div style={{ top: headTop, opacity: headOpacity }} className="absolute left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block" aria-hidden>
          <span className="block h-3.5 w-3.5 rounded-full" style={{ background: 'var(--core)', boxShadow: '0 0 20px 5px color-mix(in srgb, var(--accent) 75%, transparent)' }} />
        </motion.div>

        {/* mobile: straight left rail that draws on scroll */}
        <div className="absolute left-4 top-0 h-full w-0.5 md:hidden" aria-hidden>
          <div className="absolute inset-0 rounded-full" style={{ background: 'var(--line)' }} />
          <motion.div className="absolute inset-x-0 top-0 h-full origin-top rounded-full" style={{ scaleY: scrollYProgress, background: 'var(--accent)' }} />
          <motion.span
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ top: headTop, opacity: headOpacity, background: 'var(--core)', boxShadow: '0 0 14px 4px color-mix(in srgb, var(--accent) 75%, transparent)' }}
          />
        </div>

        <div className="space-y-16 pl-10 sm:space-y-32 md:pl-0">
          {[...journey].reverse().map((stop, i) => (
            <StopRow
              key={stop.id}
              stop={stop}
              side={i % 2 === 0 ? 'left' : 'right'}
              onOpenStop={(s) => setModal({ kind: 'stop', stop: s })}
              onOpenBranch={(b) => setModal({ kind: 'item', id: b.id, title: b.title, body: b.body, tech: b.tech })}
            />
          ))}
        </div>
      </div>

      <Modal data={modal} onClose={() => setModal(null)} />
    </Section>
  )
}
