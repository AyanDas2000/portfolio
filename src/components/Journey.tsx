import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { journey, sideQuests, type Mission } from '../data'
import { Reveal } from '../lib'
import { Modal } from './Modal'

const STATUS_DOT: Record<string, string> = {
  LIVE: 'bg-led',
  SHIPPED: 'bg-accent',
  PERSONAL: 'bg-blue-400',
}

function MissionTile({ m, onOpen }: { m: Mission; onOpen: (m: Mission) => void }) {
  return (
    <button
      onClick={() => onOpen(m)}
      className="group w-full rounded-xl border border-line bg-surface p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
    >
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-faint">
        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[m.status] ?? 'bg-muted'}`} />
        {m.status}
        <span className="ml-auto text-accent opacity-0 transition-opacity group-hover:opacity-100">open →</span>
      </div>
      <h4 className="mt-2 font-display text-base font-semibold leading-tight">{m.title}</h4>
      <p className="mt-1 font-mono text-[11px] text-accent">{m.highlight}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{m.summary}</p>
    </button>
  )
}

export function Journey() {
  const [active, setActive] = useState<Mission | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.35'],
  })
  const markerTop = useTransform(scrollYProgress, [0, 1], ['1%', '99%'])
  const markerX = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 9, -9, 5])

  return (
    <section id="journey" className="scroll-mt-20 py-20 sm:py-28">
      <Reveal>
        <p className="mb-3 font-mono text-sm font-medium tracking-wide text-accent">The journey</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          The path so far.
        </h2>
        <p className="mt-3 max-w-xl text-[15px] text-muted">
          A few stops, a lot of learning in between. Tap any mission to open its file. Most are private
          tools, so the details stay light.
        </p>
      </Reveal>

      <div ref={ref} className="relative mt-14 pl-12 sm:pl-16">
        {/* curved chakra spine */}
        <svg
          className="absolute left-2 top-0 h-full w-10"
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M20 0 C 30 12, 10 28, 20 40 C 30 52, 10 68, 20 80 C 26 90, 16 96, 20 100"
            fill="none"
            stroke="var(--line)"
            strokeWidth="1.4"
          />
          <motion.path
            d="M20 0 C 30 12, 10 28, 20 40 C 30 52, 10 68, 20 80 C 26 90, 16 96, 20 100"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* traveling chakra marker */}
        <motion.div
          style={{ top: markerTop, x: markerX }}
          className="absolute left-[10px] z-10 -translate-y-1/2 sm:left-[18px]"
          aria-hidden
        >
          <span className="relative block h-5 w-5">
            <span className="absolute inset-[-4px] rounded-full bg-accent/40 blur-md" />
            <span className="relative block h-5 w-5 rounded-full bg-[image:var(--grad)] shadow-[0_0_12px_2px] shadow-accent/50 ring-2 ring-bg" />
          </span>
        </motion.div>

        {/* stops */}
        <div className="space-y-14">
          {journey.map((stop) => (
            <Reveal key={stop.id}>
              <div className="relative">
                <span className="absolute -left-[38px] top-1.5 h-4 w-4 rounded-full border-[3px] border-accent bg-bg sm:-left-[54px]" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-2xl font-bold">{stop.org}</h3>
                  {stop.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-led/12 px-2.5 py-0.5 text-xs font-medium text-led">
                      <span className="led inline-block h-1.5 w-1.5 rounded-full bg-led" />
                      current
                    </span>
                  )}
                  <span className="ml-auto font-mono text-xs text-faint">{stop.when}</span>
                </div>
                <p className="mt-0.5 font-mono text-[13px] text-accent">{stop.role}</p>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted">{stop.blurb}</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {stop.missions.map((m) => (
                    <MissionTile key={m.id} m={m} onOpen={setActive} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* side quests, branched off */}
          <Reveal>
            <div className="relative">
              <span className="absolute -left-[38px] top-1.5 h-4 w-4 rounded-full border-[3px] border-blue-400 bg-bg sm:-left-[54px]" />
              <div className="flex flex-wrap items-center gap-x-3">
                <h3 className="font-display text-2xl font-bold">Side quests</h3>
                <span className="font-mono text-xs text-faint">for the fun of it</span>
              </div>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted">
                Personal builds off the main path. Where a lot of the range comes from.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sideQuests.map((m) => (
                  <MissionTile key={m.id} m={m} onOpen={setActive} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Modal mission={active} onClose={() => setActive(null)} />
    </section>
  )
}
