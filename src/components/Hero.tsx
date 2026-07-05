import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { hero } from '../data'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const BUILDS = ['outreach engines', 'order pipelines', 'voice assistants', 'self-tuning prompts', 'data scrapers']

function RotatingWord() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % BUILDS.length), 2300)
    return () => clearInterval(t)
  }, [reduce])
  return (
    <span className="relative inline-flex overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.34, ease: EASE }}
          className="font-semibold"
          style={{ color: 'var(--accent)' }}
        >
          {BUILDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.9 }}
      className="pointer-events-none absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
      style={{ color: 'var(--muted)' }}
    >
      <span className="font-mono text-[10px] tracking-[0.32em]">SCROLL</span>
      <motion.svg
        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </motion.div>
  )
}

// A small, clean chakra orb: baked radial halo + thin ring + a slowly rotating
// conic sheen (transform only) + a core dot with a baked glow. No animated blur.
// The rotation pauses whenever the orb is scrolled off-screen.
function ChakraOrb({ className = '', paused = false }: { className?: string; paused?: boolean }) {
  const play = paused ? 'paused' : 'running'
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      <div
        className="absolute inset-[-18%] rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, var(--halo), transparent 68%)',
        }}
      />
      <div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: 'color-mix(in srgb, var(--stroke) 55%, transparent)' }}
      />
      <div
        className="spin-slow absolute inset-[6%] rounded-full opacity-70 mix-blend-screen"
        style={{
          animationPlayState: play,
          background:
            'conic-gradient(from 0deg, transparent 0deg, var(--halo) 40deg, transparent 120deg, color-mix(in srgb, var(--c2) 60%, transparent) 210deg, transparent 300deg, var(--halo) 350deg)',
        }}
      />
      <div
        className="spin-rev absolute inset-[26%] rounded-full opacity-60 mix-blend-screen"
        style={{
          animationPlayState: play,
          background:
            'conic-gradient(from 140deg, transparent, var(--halo) 30deg, transparent 130deg, color-mix(in srgb, var(--c1) 55%, transparent) 240deg, transparent 320deg)',
        }}
      />
      <div
        className="absolute inset-[43%] rounded-full"
        style={{
          background: 'var(--core)',
          boxShadow: '0 0 18px 5px var(--halo)',
        }}
      />
    </div>
  )
}

export function Hero({ theme }: { theme: 'dark' | 'light' }) {
  const reduce = useReducedMotion()
  const orbRef = useRef<HTMLDivElement>(null)
  const orbInView = useInView(orbRef, { amount: 0.2 })
  const rise = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: d, ease: EASE },
        }

  return (
    <section className="relative flex min-h-svh items-center">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 md:grid-cols-[1.15fr_auto]">
        <div>
          <motion.p
            {...rise(0)}
            className="font-mono text-[13px] font-medium tracking-widest"
            style={{ color: 'var(--accent)' }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{
              color: 'var(--text)',
              textShadow: theme === 'dark' ? '0 0 44px rgba(120,230,255,0.16)' : 'none',
            }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            {...rise(0.18)}
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            {hero.subhead}
          </motion.p>

          <motion.p
            {...rise(0.26)}
            className="mt-6 max-w-xl border-l-2 pl-4 text-[15px] italic leading-relaxed"
            style={{ borderColor: 'var(--accent)', color: 'color-mix(in srgb, var(--text) 82%, transparent)' }}
          >
            {hero.soul}
          </motion.p>

          <motion.div
            {...rise(0.34)}
            className="mt-7 flex items-center gap-2.5 font-mono text-[13px]"
            style={{ color: 'var(--muted)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
            </span>
            <span>lately building</span>
            <RotatingWord />
          </motion.div>
        </div>

        <motion.div
          ref={orbRef}
          initial={reduce ? undefined : { opacity: 0, scale: 0.85 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="mx-auto flex items-center justify-center"
        >
          <ChakraOrb className="h-44 w-44 sm:h-56 sm:w-56 lg:h-64 lg:w-64" paused={!orbInView} />
        </motion.div>
      </div>
      <ScrollCue />
    </section>
  )
}
