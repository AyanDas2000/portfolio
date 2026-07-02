import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../data'

// Payload bytes 41 59 41 4E 44 41 53 spell "AYANDAS" in ASCII hex.
const BYTES = ['A1', '0C', '2F', '41', '59', '41', '4E', '44', '41', '53', 'C7']
const OPCODE = 2
const PAYLOAD_START = 3
const PAYLOAD_END = 9

export function FrameDecoder() {
  const reduce = useReducedMotion()
  const full = profile.tagline
  const [typed, setTyped] = useState(reduce ? full : '')
  const [done, setDone] = useState(reduce)

  useEffect(() => {
    if (reduce) return
    let i = 0
    let timer = window.setTimeout(function tick() {
      i += 1
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        setDone(true)
        return
      }
      timer = window.setTimeout(tick, 24)
    }, 950)
    return () => window.clearTimeout(timer)
  }, [full, reduce])

  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-surface/70 backdrop-blur-sm shadow-[0_24px_50px_-32px_rgba(120,80,20,0.45)]">
      {/* header bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] tracking-wider text-muted">
        <span>
          FRAME <span className="text-faint">·</span> CLUSTER{' '}
          <span className="text-accent">0xA1</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="led inline-block h-1.5 w-1.5 rounded-full bg-led" />
          LINK
        </span>
      </div>

      <div className="relative px-4 py-5 sm:px-5">
        {/* scan line */}
        {!reduce && (
          <div
            className="scanline pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-accent/25 to-transparent"
            style={{ animation: 'scan 1.9s cubic-bezier(.4,0,.2,1) .15s 1 both' }}
          />
        )}

        {/* byte offsets */}
        <div className="mb-2 grid grid-cols-6 gap-1.5 font-mono text-[10px] text-faint sm:gap-2">
          {['00', '01', '02', '03', '04', '05'].map((o) => (
            <span key={o} className="text-center">
              {o}
            </span>
          ))}
        </div>

        {/* bytes */}
        <div className="grid grid-cols-6 gap-1.5 font-mono text-sm sm:gap-2">
          {BYTES.map((b, i) => {
            const isOpcode = i === OPCODE
            const isPayload = i >= PAYLOAD_START && i <= PAYLOAD_END
            const cls =
              'flex items-center justify-center rounded-sm border py-2 ' +
              (isOpcode
                ? 'border-accent/60 bg-accent/10 text-accent'
                : isPayload
                  ? 'border-line bg-surface2 text-text'
                  : 'border-line bg-surface2/60 text-muted')
            if (reduce) {
              return (
                <div key={i} className={cls}>
                  {b}
                </div>
              )
            }
            return (
              <motion.div
                key={i}
                className={cls}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.045, duration: 0.32 }}
              >
                {b}
              </motion.div>
            )
          })}
        </div>

        {/* decode output */}
        <div className="mt-5 border-t border-line pt-4">
          <div className="flex items-baseline gap-2 font-mono text-[11px] text-faint">
            <span className="text-accent">decode</span>
            <span aria-hidden>▸</span>
          </div>
          <p className="mt-1.5 font-display text-lg leading-snug text-text sm:text-xl">
            {typed}
            {!done && <span className="caret ml-0.5 text-accent">▏</span>}
          </p>
          <p className="mt-3 font-mono text-[10.5px] text-faint">
            checksum ok <span className="text-line">·</span> payload{' '}
            <span className="text-muted">"AYAN DAS"</span>
          </p>
        </div>
      </div>
    </div>
  )
}
