import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { journey, type Mission, type Stop } from '../data'
import { Modal } from './Modal'
import { Glass, LiveDot, Section, SectionHead } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const SPINE = 'M20 0 C 32 130, 8 270, 20 400 C 32 540, 8 700, 20 840 C 27 920, 15 968, 20 1000'

function MissionTile({ m, onOpen, i }: { m: Mission; onOpen: (m: Mission) => void; i: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
      onClick={() => onOpen(m)}
      aria-haspopup="dialog"
      className="group w-full rounded-xl border p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: 'var(--line)',
        background: 'color-mix(in srgb, var(--surface) 62%, transparent)',
      }}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest" style={{ color: 'var(--faint)' }}>
        {m.status === 'LIVE' ? <LiveDot /> : <span>DEBRIEF</span>}
        <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--accent)' }}>
          open →
        </span>
      </div>
      <h4 className="mt-2 text-base font-semibold leading-tight" style={{ color: 'var(--text)' }}>
        {m.title}
      </h4>
      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>
        {m.highlight}
      </p>
    </motion.button>
  )
}

function StopBlock({ stop, index, onOpen }: { stop: Stop; index: number; onOpen: (m: Mission) => void }) {
  return (
    <div className="relative">
      {/* anchor dot on the spine */}
      <motion.span
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute -left-[31px] top-4 h-4 w-4 rounded-full border-2 sm:-left-[47px]"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg)', boxShadow: '0 0 14px 1px color-mix(in srgb, var(--accent) 50%, transparent)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 34, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-14%' }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <Glass bar glow={stop.current} className="p-6 sm:p-7">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-widest" style={{ color: 'var(--muted)' }}>
            {stop.current ? <LiveDot /> : <span>NODE 0{index + 1}</span>}
            <span>{stop.when}</span>
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--text)' }}>
            {stop.org}
          </h3>
          <p className="mt-1 font-mono text-[12px]" style={{ color: 'var(--accent)' }}>
            {stop.role}
          </p>
          <p className="mt-3 text-[14px] italic leading-relaxed" style={{ color: 'var(--muted)' }}>
            {stop.blurb}
          </p>
        </Glass>
      </motion.div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {stop.missions.map((m, i) => (
          <MissionTile key={m.id} m={m} onOpen={onOpen} i={i} />
        ))}
      </div>
    </div>
  )
}

export function Journey() {
  const [active, setActive] = useState<Mission | null>(null)
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 0.75', 'end 0.6'] })
  const headTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const headOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])

  return (
    <Section id="journey">
      <div className="mx-auto max-w-3xl">
        <SectionHead
          eyebrow="THE JOURNEY"
          title="The path so far."
          intro="Scroll to follow the line. Each stop opens, tap any mission to read the debrief. Most of it is private work, so the details stay light."
        />
      </div>

      <div ref={track} className="relative mx-auto mt-16 max-w-3xl pl-10 sm:pl-14">
        {/* the chakra spine, draws as you scroll */}
        <svg className="absolute left-3 top-2 h-[calc(100%-1rem)] w-8" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden>
          <path d={SPINE} fill="none" stroke="var(--line)" strokeWidth="1.4" />
          <motion.path
            d={SPINE}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* glowing head that travels the line */}
        <motion.div
          style={{ top: headTop, opacity: headOpacity }}
          className="absolute left-3 z-10 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <span
            className="block h-3 w-3 rounded-full"
            style={{ background: 'var(--core)', boxShadow: '0 0 16px 4px color-mix(in srgb, var(--accent) 70%, transparent)' }}
          />
        </motion.div>

        <div className="space-y-16 sm:space-y-24">
          {journey.map((stop, i) => (
            <StopBlock key={stop.id} stop={stop} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <Modal mission={active} onClose={() => setActive(null)} />
    </Section>
  )
}
