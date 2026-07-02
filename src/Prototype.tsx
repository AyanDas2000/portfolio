import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'motion/react'

// Two aesthetic variants of the same "hero + one flowing node" so we can compare.
type Kind = 'dark' | 'light'

const VARS: Record<Kind, CSSProperties> = {
  dark: {
    ['--bg' as string]: '#0A0D12',
    ['--surface' as string]: '#121722',
    ['--surface2' as string]: '#0E1420',
    ['--text' as string]: '#E6EDF3',
    ['--muted' as string]: '#8A97A8',
    ['--line' as string]: '#20293833',
    ['--accent' as string]: '#37C6E0',
    ['--stroke' as string]: 'rgba(255,255,255,0.55)',
    ['--core' as string]: '#FFFFFF',
    ['--halo' as string]: 'rgba(120,230,255,0.9)',
  },
  light: {
    ['--bg' as string]: '#F5F2EA',
    ['--surface' as string]: '#FFFFFF',
    ['--surface2' as string]: '#EFEBE1',
    ['--text' as string]: '#1B1A17',
    ['--muted' as string]: '#6B6456',
    ['--line' as string]: '#E1D9C9',
    ['--accent' as string]: '#27406B',
    ['--stroke' as string]: 'rgba(30,30,30,0.5)',
    ['--core' as string]: '#1B1A17',
    ['--halo' as string]: 'rgba(39,64,107,0.4)',
  },
}

function ChakraEdge({ kind }: { kind: Kind }) {
  const reduce = useReducedMotion()
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)
  const p = useMotionValue(0)

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength())
  }, [])

  useEffect(() => {
    if (reduce || !len) return
    const controls = animate(p, 1, {
      duration: 3.4,
      ease: 'linear',
      repeat: Infinity,
    })
    return () => controls.stop()
  }, [len, reduce, p])

  const cx = useTransform(p, (v) =>
    pathRef.current ? pathRef.current.getPointAtLength(v * len).x : 100,
  )
  const cy = useTransform(p, (v) =>
    pathRef.current ? pathRef.current.getPointAtLength(v * len).y : 0,
  )

  const d = 'M100 6 C 34 80, 168 150, 100 226 C 52 286, 150 320, 100 354'
  const core = kind === 'dark' ? '#FFFFFF' : '#1B1A17'

  return (
    <svg
      viewBox="0 0 200 360"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id={`halo-${kind}`}>
          <stop offset="0%" stopColor="var(--halo)" stopOpacity="0.95" />
          <stop offset="60%" stopColor="var(--halo)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--halo)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* faint full track */}
      <path d={d} stroke="var(--stroke)" strokeWidth="1" strokeOpacity="0.25" strokeLinecap="round" />
      {/* drawn energy line */}
      <motion.path
        ref={pathRef}
        d={d}
        stroke="var(--stroke)"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {!reduce && len > 0 && (
        <>
          <motion.circle cx={cx} cy={cy} r="16" fill={`url(#halo-${kind})`} />
          <motion.circle cx={cx} cy={cy} r="3.2" fill={core} />
        </>
      )}
    </svg>
  )
}

function NodeCard({ kind }: { kind: Kind }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-72 rounded-2xl border p-6 backdrop-blur-md"
      style={{
        borderColor: 'var(--line)',
        background:
          kind === 'dark' ? 'rgba(18,23,34,0.6)' : 'rgba(255,255,255,0.7)',
        boxShadow:
          kind === 'dark'
            ? '0 30px 80px -40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 30px 60px -40px rgba(40,30,10,0.4)',
      }}
    >
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider" style={{ color: 'var(--muted)' }}>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: kind === 'dark' ? '#5BD98A' : '#2E9E5B' }} />
          LIVE
        </span>
        <span>OUTPILOT.AI</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold" style={{ color: 'var(--text)' }}>
        AI Outreach Platform
      </h3>
      <p className="mt-1 font-mono text-[12px]" style={{ color: 'var(--accent)' }}>
        campaign prep: 2 weeks to minutes
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {['n8n', 'Python', 'AWS', 'LLMs'].map((s) => (
          <span
            key={s}
            className="rounded-md px-2 py-0.5 font-mono text-[11px]"
            style={{ background: 'var(--surface2)', color: 'var(--muted)' }}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 font-mono text-[11px]" style={{ color: 'var(--accent)' }}>
        open file →
      </div>
    </motion.div>
  )
}

function Variant({ kind }: { kind: Kind }) {
  const ref = useRef<HTMLDivElement>(null)
  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      style={VARS[kind]}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{
          background:
            kind === 'dark'
              ? 'radial-gradient(circle, rgba(55,198,224,0.22), transparent 70%)'
              : 'radial-gradient(circle, rgba(39,64,107,0.14), transparent 70%)',
        }}
      />
      {/* cursor-bound glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            kind === 'dark'
              ? 'radial-gradient(300px circle at var(--mx,50%) var(--my,0), rgba(120,230,255,0.10), transparent 70%)'
              : 'radial-gradient(320px circle at var(--mx,50%) var(--my,0), rgba(39,64,107,0.07), transparent 70%)',
        }}
      />

      {/* label */}
      <div className="absolute left-6 top-6 z-20 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider"
        style={{ borderColor: 'var(--line)', color: 'var(--muted)', background: 'var(--surface)' }}>
        {kind === 'dark' ? 'DARK · white chakra' : 'LIGHT · ink flow'}
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-5xl grid-cols-1 items-center gap-8 px-6 py-24 md:grid-cols-[1.1fr_180px_auto]">
        {/* hero */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm" style={{ color: 'var(--muted)' }}
          >
            Hey, I'm Ayan 👋
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
            style={{
              color: 'var(--text)',
              textShadow: kind === 'dark' ? '0 0 40px rgba(120,230,255,0.15)' : 'none',
            }}
          >
            I build working systems, fast.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: 'var(--muted)' }}
          >
            AI-automation engineer with a pure-math brain. I turn messy problems into
            things that actually run.
          </motion.p>
        </div>

        {/* the chakra edge */}
        <div className="hidden h-80 md:block">
          <ChakraEdge kind={kind} />
        </div>

        {/* node */}
        <div className="flex justify-center md:justify-end">
          <NodeCard kind={kind} />
        </div>
      </div>
    </section>
  )
}

export function Prototype() {
  return (
    <div>
      <div className="fixed left-1/2 top-3 z-50 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 font-mono text-[11px] tracking-wider text-white backdrop-blur">
        PROTOTYPE · scroll to compare Dark ↕ Light
      </div>
      <Variant kind="dark" />
      <Variant kind="light" />
    </div>
  )
}
