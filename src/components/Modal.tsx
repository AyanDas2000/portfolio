import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Mission } from '../data'
import { Chip, LiveDot, accentVar } from './ui'

export function Modal({ mission, onClose }: { mission: Mission | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!mission) return
    lastFocused.current = document.activeElement as HTMLElement
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => closeRef.current?.focus(), 30)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.clearTimeout(t)
      lastFocused.current?.focus?.()
    }
  }, [mission, onClose])

  return (
    <AnimatePresence>
      {mission && (
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
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border backdrop-blur-md"
            style={{
              borderColor: 'var(--line)',
              background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
              boxShadow: '0 40px 100px -40px rgba(0,0,0,0.7)',
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg, var(--c1), var(--c2), var(--c3))' }}
            />
            <div
              className="flex items-center justify-between border-b px-6 py-4"
              style={{ borderColor: 'var(--line)' }}
            >
              {mission.status === 'LIVE' ? (
                <LiveDot />
              ) : (
                <span className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--muted)' }}>
                  DEBRIEF
                </span>
              )}
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <h3 id="modal-title" className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                {mission.title}
              </h3>
              <p className="mt-2 text-[13px] font-medium" style={{ color: 'var(--accent)' }}>
                {mission.highlight}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                {mission.debrief}
              </p>
              {mission.tech && mission.tech.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {mission.tech.map((t, i) => (
                    <Chip key={t} label={t} color={accentVar(i)} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
