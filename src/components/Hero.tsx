import { motion, useReducedMotion } from 'motion/react'
import { profile, interests, links } from '../data'

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: d, ease: EASE },
        }

  return (
    <header className="relative overflow-hidden">
      {/* animated color blobs */}
      <div
        className="blob float-a -left-20 -top-24 h-80 w-80"
        style={{ background: 'var(--grad)' }}
        aria-hidden
      />
      <div
        className="blob float-b right-0 top-10 h-72 w-72"
        style={{ background: 'var(--grad2)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
        <motion.p {...rise(0)} className="font-mono text-base text-muted">
          {profile.hi} <span className="inline-block">👋</span>
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
        >
          {profile.tagline}{' '}
          <span className="grad-text">{profile.taglineAccent}</span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          {profile.intro}
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => go('work')}
            className="rounded-full bg-[image:var(--grad)] px-6 py-3 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            See my work
          </button>
          <a
            href={`mailto:${links.email}`}
            className="rounded-full border border-line bg-surface px-6 py-3 font-semibold text-text transition-colors hover:border-accent/50"
          >
            Get in touch
          </a>
          <span className="ml-1 inline-flex items-center gap-2 text-sm text-muted">
            <span className="led inline-block h-2.5 w-2.5 rounded-full bg-led" />
            {profile.status}
          </span>
        </motion.div>

        <motion.div {...rise(0.32)} className="mt-10 flex flex-wrap gap-2.5">
          {interests.map((it) => (
            <span
              key={it.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium"
            >
              <span aria-hidden>{it.emoji}</span>
              {it.label}
            </span>
          ))}
        </motion.div>
      </div>
    </header>
  )
}
