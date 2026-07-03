import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { hero } from '../data'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
    <section className="relative">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 md:grid-cols-[1.15fr_auto]">
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
    </section>
  )
}
