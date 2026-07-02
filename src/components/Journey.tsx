import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { journey } from '../data'
import { Reveal } from '../lib'

export function Journey() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start 0.7', 'end 0.55'],
  })
  const top = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="journey" className="scroll-mt-20 py-20 sm:py-28">
      <Reveal>
        <p className="mb-3 font-mono text-sm font-medium tracking-wide text-accent">
          The journey
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Stops along the way.
        </h2>
      </Reveal>

      <div ref={track} className="relative mt-12 pl-14">
        {/* base route */}
        <div className="absolute bottom-0 left-5 top-1 w-[3px] rounded bg-line" />
        {/* travelled route (fills as you scroll) */}
        <motion.div
          className="absolute left-5 top-1 w-[3px] rounded bg-[image:var(--grad)]"
          style={{ height: lineH }}
        />
        {/* the bike, riding the route */}
        <motion.div
          style={{ top }}
          className="absolute left-5 z-10 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--grad)] text-lg shadow-lg ring-4 ring-bg">
            🏍️
          </span>
        </motion.div>

        <div className="space-y-10">
          {journey.map((s) => (
            <Reveal key={s.id}>
              <div className="relative">
                <span className="absolute -left-[38px] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-semibold">{s.org}</h3>
                    {s.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-led/12 px-2.5 py-0.5 text-xs font-medium text-led">
                        <span className="led inline-block h-1.5 w-1.5 rounded-full bg-led" />
                        current
                      </span>
                    )}
                    <span className="ml-auto font-mono text-xs text-faint">{s.when}</span>
                  </div>
                  <p className="mt-0.5 font-mono text-[13px] text-accent">{s.role}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
