import { useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { hero } from '../data'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function ScrollCue() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 160], [1, 0])
  return (
    <motion.div
      className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
      style={{ opacity, color: 'var(--muted)' }}
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

function HeroPhoto() {
  const [broken, setBroken] = useState(false)
  return (
    <div className="relative shrink-0">
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[34px] opacity-70 blur-2xl"
        style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--c1) 36%, transparent), color-mix(in srgb, var(--c2) 30%, transparent))' }}
        aria-hidden
      />
      {!broken ? (
        <img
          src="/ayan.png"
          alt="Ayan Das"
          width={360}
          height={440}
          decoding="async"
          onError={() => setBroken(true)}
          className="h-56 w-48 rounded-3xl border-4 object-cover object-top sm:h-80 sm:w-64 lg:h-96 lg:w-80"
          style={{ borderColor: 'var(--surface)', boxShadow: '0 40px 80px -40px rgba(0,0,0,0.6)' }}
        />
      ) : (
        <div
          className="flex h-56 w-48 items-center justify-center rounded-3xl border font-mono text-[11px] sm:h-80 sm:w-64"
          style={{ borderColor: 'var(--line)', background: 'var(--surface2)', color: 'var(--faint)' }}
        >
          ayan.png
        </div>
      )}
    </div>
  )
}

export function Hero({ theme }: { theme: 'dark' | 'light' }) {
  const reduce = useReducedMotion()
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
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-8 px-6 pb-16 pt-20 sm:px-8 sm:gap-10 sm:pb-20 sm:pt-24 md:grid-cols-[1.2fr_auto]">
        <div className="order-2 md:order-1">
          <motion.p {...rise(0)} className="font-mono text-[12px] font-medium tracking-widest sm:text-[13px]" style={{ color: 'var(--accent)' }}>
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:mt-5 sm:text-5xl sm:leading-[1.08] lg:text-[3.35rem]"
            style={{ color: 'var(--text)', textShadow: theme === 'dark' ? '0 0 44px rgba(120,230,255,0.16)' : 'none' }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p {...rise(0.18)} className="mt-5 max-w-xl text-[15px] leading-relaxed sm:mt-6 sm:text-[17px]" style={{ color: 'var(--muted)' }}>
            {hero.subhead}
          </motion.p>

          <motion.ul {...rise(0.26)} className="mt-6 grid max-w-xl gap-2.5 sm:mt-7">
            {hero.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2.5 text-[13.5px] sm:text-[14.5px]" style={{ color: 'color-mix(in srgb, var(--text) 80%, transparent)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0" aria-hidden>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{a}</span>
              </li>
            ))}
          </motion.ul>

          <motion.p
            {...rise(0.34)}
            className="mt-7 max-w-xl border-l-2 pl-4 text-[15px] italic leading-relaxed"
            style={{ borderColor: 'var(--accent)', color: 'color-mix(in srgb, var(--text) 78%, transparent)' }}
          >
            {hero.soul}
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.92, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="order-1 mx-auto md:order-2"
        >
          <HeroPhoto />
        </motion.div>
      </div>
      <ScrollCue />
    </section>
  )
}
