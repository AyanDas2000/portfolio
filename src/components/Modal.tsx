import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Mission } from '../data'

const STATUS: Record<string, string> = {
  LIVE: 'text-led bg-led/12',
  SHIPPED: 'text-accent bg-accent/12',
  PERSONAL: 'text-muted bg-surface2',
}

export function Modal({ mission, onClose }: { mission: Mission | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (mission) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mission, onClose])

  return (
    <AnimatePresence>
      {mission && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={mission.title}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${STATUS[mission.status] ?? ''}`}>
                {mission.status}
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-muted transition-colors hover:text-accent"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <h3 className="font-display text-2xl font-bold">{mission.title}</h3>
              <span className="mt-3 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-medium text-accent">
                {mission.highlight}
              </span>
              <p className="mt-2 font-mono text-xs text-faint">
                client:{' '}
                {mission.classified ? (
                  <span className="select-none rounded bg-text px-2 py-0.5 tracking-widest text-bg">CLASSIFIED</span>
                ) : (
                  <span className="text-muted">{mission.client}</span>
                )}
              </p>

              <p className="mt-4 text-[15px] leading-relaxed text-muted">{mission.detail}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {mission.stack.map((s) => (
                  <span key={s} className="rounded-md bg-surface2 px-2.5 py-1 font-mono text-[11px] text-muted">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex h-36 items-center justify-center rounded-lg border border-dashed border-line bg-surface2/50 font-mono text-[11px] text-faint">
                {mission.image ? (
                  <img src={mission.image} alt={mission.title} className="h-full w-full rounded-lg object-cover" />
                ) : (
                  'workflow preview, partially redacted (NDA)'
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
