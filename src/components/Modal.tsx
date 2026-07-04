import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Mission, Stop } from '../data'
import { Chip, LiveDot, accentVar } from './ui'

export type ModalData =
  | { kind: 'stop'; stop: Stop }
  | { kind: 'item'; title: string; body: string; tech?: string[] }

function IconBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="transition-opacity hover:opacity-70" style={{ color: 'var(--muted)' }}>
      {children}
    </button>
  )
}

export function Modal({ data, onClose }: { data: ModalData | null; onClose: () => void }) {
  const [sel, setSel] = useState<Mission | null>(null)

  useEffect(() => {
    setSel(null)
  }, [data])

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
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border backdrop-blur-md"
            style={{
              borderColor: 'var(--line)',
              background: 'color-mix(in srgb, var(--surface) 94%, transparent)',
              boxShadow: '0 40px 100px -40px rgba(0,0,0,0.7)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, var(--c1), var(--c2), var(--c3))' }} />

            {/* header */}
            <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--line)' }}>
              {data.kind === 'stop' && sel ? (
                <button onClick={() => setSel(null)} className="font-mono text-[11px] tracking-widest transition-opacity hover:opacity-70" style={{ color: 'var(--accent)' }}>
                  ← back
                </button>
              ) : (
                <span className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--muted)' }}>
                  {data.kind === 'stop' ? data.stop.org.toUpperCase() : 'SIDE QUEST'}
                </span>
              )}
              <IconBtn onClick={onClose} label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </IconBtn>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              {data.kind === 'item' ? (
                <>
                  <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{data.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>{data.body}</p>
                  {data.tech && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {data.tech.map((t, i) => <Chip key={t} label={t} color={accentVar(i)} />)}
                    </div>
                  )}
                </>
              ) : sel ? (
                <>
                  {sel.status === 'LIVE' && <div className="mb-3"><LiveDot /></div>}
                  <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{sel.title}</h3>
                  <p className="mt-2 text-[13px] font-medium" style={{ color: 'var(--accent)' }}>{sel.highlight}</p>
                  <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>{sel.debrief}</p>
                  {sel.tech && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {sel.tech.map((t, i) => <Chip key={t} label={t} color={accentVar(i)} />)}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-[13px]" style={{ color: 'var(--muted)' }}>{data.stop.role} · {data.stop.when}</p>
                  <p className="mt-2 text-[14px] italic leading-relaxed" style={{ color: 'var(--muted)' }}>{data.stop.blurb}</p>
                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {data.stop.missions.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSel(m)}
                        className="group rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5"
                        style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface2) 55%, transparent)' }}
                      >
                        <div className="flex items-center justify-between font-mono text-[10px] tracking-widest" style={{ color: 'var(--faint)' }}>
                          <span>{m.status === 'LIVE' ? 'LIVE' : 'PROJECT'}</span>
                          <span className="opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--accent)' }}>open →</span>
                        </div>
                        <h4 className="mt-2 text-[15px] font-semibold leading-tight" style={{ color: 'var(--text)' }}>{m.title}</h4>
                        <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>{m.highlight}</p>
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
