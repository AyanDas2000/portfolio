import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Mission, Stop } from '../data'
import { Chip, LiveDot, accentVar } from './ui'

export type ModalData =
  | { kind: 'stop'; stop: Stop }
  | { kind: 'item'; title: string; body: string; tech?: string[] }

/** A constructed "workflow" graphic. Placeholder art until real screenshots go in. */
function WorkflowArt({ seed = 0, className = '' }: { seed?: number; className?: string }) {
  const s = seed % 3
  const paths = [
    'M34 36 C 110 36, 110 96, 186 96 M34 36 C 130 66, 170 40, 250 52 M186 96 C 224 96, 242 66, 262 58',
    'M40 90 C 110 90, 110 40, 180 40 M180 40 C 230 40, 240 80, 268 84 M40 90 C 120 110, 200 100, 258 96',
    'M36 60 C 120 40, 150 96, 240 84 M36 60 C 110 80, 150 40, 250 48 M120 55 C 160 60, 180 80, 236 82',
  ]
  const nodes = [
    [24, 26], [178, 86], [252, 44], [24, 80],
  ] as const
  return (
    <svg viewBox="0 0 300 128" className={className} fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
      <path d={paths[s]} stroke="color-mix(in srgb, var(--accent) 55%, transparent)" strokeWidth="1.5" strokeLinecap="round" />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="52" height="26" rx="6" fill="color-mix(in srgb, var(--surface2) 90%, transparent)" stroke="color-mix(in srgb, var(--accent) 40%, transparent)" strokeWidth="1" />
          <circle cx={x + 8} cy={y + 8} r="2.5" fill={`var(--c${(i % 3) + 1})`} />
          <rect x={x + 14} y={y + 6} width="30" height="3" rx="1.5" fill="color-mix(in srgb, var(--muted) 60%, transparent)" />
          <rect x={x + 14} y={y + 14} width="20" height="3" rx="1.5" fill="color-mix(in srgb, var(--muted) 35%, transparent)" />
        </g>
      ))}
    </svg>
  )
}

const ArtPanel = ({ seed, tall = false }: { seed: number; tall?: boolean }) => (
  <div className={`relative overflow-hidden rounded-lg border ${tall ? 'h-40' : 'h-24'}`} style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface2) 45%, transparent)' }}>
    <WorkflowArt seed={seed} className="h-full w-full opacity-90" />
    <span className="absolute bottom-1.5 right-2 font-mono text-[8px] tracking-widest" style={{ color: 'var(--faint)' }}>SCHEMATIC</span>
  </div>
)

export function Modal({ data, onClose }: { data: ModalData | null; onClose: () => void }) {
  const [sel, setSel] = useState<Mission | null>(null)

  useEffect(() => setSel(null), [data])
  useEffect(() => {
    if (!data) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') sel ? setSel(null) : onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [data, sel, onClose])

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border backdrop-blur-md"
            style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface) 95%, transparent)', boxShadow: '0 40px 120px -40px rgba(0,0,0,0.75)' }}
          >
            <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, var(--c1), var(--c2), var(--c3))' }} />

            <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--line)' }}>
              {data.kind === 'stop' && sel ? (
                <button onClick={() => setSel(null)} className="font-mono text-[11px] tracking-widest transition-opacity hover:opacity-70" style={{ color: 'var(--accent)' }}>
                  ← back to projects
                </button>
              ) : (
                <span className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--muted)' }}>
                  {data.kind === 'stop' ? data.stop.org.toUpperCase() : 'SIDE QUEST'}
                </span>
              )}
              <button onClick={onClose} aria-label="Close" className="transition-opacity hover:opacity-70" style={{ color: 'var(--muted)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div className="max-h-[76vh] overflow-y-auto px-6 py-6">
              {data.kind === 'item' ? (
                <>
                  <ArtPanel seed={data.title.length} tall />
                  <h3 className="mt-5 text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{data.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>{data.body}</p>
                  {data.tech && <div className="mt-5 flex flex-wrap gap-1.5">{data.tech.map((t, i) => <Chip key={t} label={t} color={accentVar(i)} />)}</div>}
                </>
              ) : sel ? (
                <>
                  <ArtPanel seed={sel.title.length} tall />
                  {sel.status === 'LIVE' && <div className="mt-4"><LiveDot /></div>}
                  <h3 className="mt-3 text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{sel.title}</h3>
                  <p className="mt-2 text-[13px] font-medium" style={{ color: 'var(--accent)' }}>{sel.highlight}</p>
                  <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>{sel.debrief}</p>
                  {sel.tech && <div className="mt-5 flex flex-wrap gap-1.5">{sel.tech.map((t, i) => <Chip key={t} label={t} color={accentVar(i)} />)}</div>}
                </>
              ) : (
                <>
                  <p className="text-[13px]" style={{ color: 'var(--muted)' }}>{data.stop.role} · {data.stop.when}</p>
                  <p className="mt-2 text-[14px] italic leading-relaxed" style={{ color: 'var(--muted)' }}>{data.stop.blurb}</p>
                  <p className="mt-6 font-mono text-[11px] tracking-widest" style={{ color: 'var(--faint)' }}>{data.stop.missions.length} PROJECTS</p>
                  <div className="-mx-1 mt-3 flex snap-x gap-4 overflow-x-auto px-1 pb-3">
                    {data.stop.missions.map((m, i) => (
                      <button
                        key={m.id}
                        onClick={() => setSel(m)}
                        className="group flex w-[240px] shrink-0 snap-start flex-col rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-1"
                        style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface2) 45%, transparent)' }}
                      >
                        <ArtPanel seed={i + m.title.length} />
                        <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-widest" style={{ color: 'var(--faint)' }}>
                          <span>{m.status === 'LIVE' ? 'LIVE' : 'PROJECT'}</span>
                          <span className="opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--accent)' }}>open →</span>
                        </div>
                        <h4 className="mt-1.5 text-[15px] font-semibold leading-tight" style={{ color: 'var(--text)' }}>{m.title}</h4>
                        <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>{m.highlight}</p>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
