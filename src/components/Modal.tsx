import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { artById, type Mission, type Stop } from '../data'
import { Chip, LiveDot, accentVar } from './ui'

const SLIDE = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

export type ModalData =
  | { kind: 'stop'; stop: Stop }
  | { kind: 'item'; id?: string; title: string; body: string; tech?: string[] }

const C = { line: 'var(--line)', s2: 'color-mix(in srgb, var(--surface2) 88%, transparent)', mut: 'color-mix(in srgb, var(--muted) 55%, transparent)', a: 'var(--accent)', c1: 'var(--c1)', c2: 'var(--c2)', c3: 'var(--c3)' }

function Art({ kind }: { kind: string }) {
  let body: React.ReactNode = null
  switch (kind) {
    case 'scrape':
      body = (
        <>
          <rect x="26" y="24" width="150" height="86" rx="8" fill={C.s2} stroke={C.line} />
          <line x1="26" y1="42" x2="176" y2="42" stroke={C.line} />
          <circle cx="36" cy="33" r="2.4" fill={C.c3} /><circle cx="45" cy="33" r="2.4" fill={C.mut} />
          {[52, 62, 72, 82, 92].map((y, i) => <rect key={y} x="38" y={y} width={110 - i * 14} height="4" rx="2" fill={C.mut} />)}
          <path d="M176 68 C 200 68, 214 68, 236 68" stroke={C.a} strokeWidth="1.6" markerEnd="" />
          <path d="M230 63 L 238 68 L 230 73" stroke={C.a} strokeWidth="1.6" fill="none" />
          <rect x="244" y="56" width="42" height="9" rx="3" fill={C.c1} opacity="0.8" />
          <rect x="244" y="70" width="30" height="7" rx="3" fill={C.c1} opacity="0.4" />
        </>
      )
      break
    case 'data':
      body = (
        <>
          <line x1="40" y1="102" x2="266" y2="102" stroke={C.line} />
          {[[60, 44, C.c1], [96, 70, C.c2], [132, 34, C.c3], [168, 58, C.c1], [204, 80, C.c2], [240, 50, C.c3]].map(([x, h, c], i) => (
            <rect key={i} x={x as number} y={102 - (h as number)} width="22" height={h as number} rx="3" fill={c as string} opacity="0.8" />
          ))}
        </>
      )
      break
    case 'ai':
      body = (
        <>
          {[[54, 34], [50, 96], [110, 26], [116, 104], [232, 40], [246, 92]].map(([x, y], i) => (
            <g key={i}>
              <line x1={x as number} y1={y as number} x2="150" y2="64" stroke={C.line} />
              <circle cx={x as number} cy={y as number} r="4" fill={`var(--c${(i % 3) + 1})`} />
            </g>
          ))}
          <circle cx="150" cy="64" r="20" fill="color-mix(in srgb, var(--accent) 14%, transparent)" stroke={C.a} />
          <circle cx="150" cy="64" r="6" fill={C.a} />
          <path d="M188 30 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill={C.c1} opacity="0.8" />
        </>
      )
      break
    case 'voice':
      body = (
        <g>
          {Array.from({ length: 22 }, (_, i) => {
            const h = 8 + Math.abs(Math.sin(i * 0.7)) * 44
            return <rect key={i} x={40 + i * 10} y={64 - h / 2} width="4" height={h} rx="2" fill={i % 3 === 0 ? C.a : C.c1} opacity="0.85" />
          })}
        </g>
      )
      break
    case 'mobile':
      body = (
        <>
          <rect x="116" y="18" width="56" height="92" rx="11" fill={C.s2} stroke={C.line} />
          <rect x="124" y="28" width="40" height="62" rx="4" fill="color-mix(in srgb, var(--c1) 12%, transparent)" />
          <circle cx="144" cy="100" r="3" fill={C.mut} />
          {[16, 26, 36].map((r, i) => <path key={r} d={`M188 64 a ${r} ${r} 0 0 1 ${r * 0.7} -${r * 0.7}`} stroke={C.c1} strokeWidth="1.6" fill="none" opacity={0.8 - i * 0.2} transform={`rotate(-30 188 64)`} />)}
          <circle cx="188" cy="64" r="3" fill={C.a} />
        </>
      )
      break
    case 'infra':
      body = (
        <>
          {[34, 58, 82].map((y, i) => (
            <g key={y}>
              <rect x="40" y={y} width="220" height="18" rx="5" fill={C.s2} stroke={C.line} />
              <circle cx="52" cy={y + 9} r="3" fill={`var(--c${(i % 3) + 1})`} />
              {[70, 90, 110].map((x) => <rect key={x} x={x} y={y + 7} width="14" height="4" rx="2" fill={C.mut} />)}
              <rect x="230" y={y + 6} width="20" height="6" rx="3" fill="color-mix(in srgb, var(--accent) 45%, transparent)" />
            </g>
          ))}
        </>
      )
      break
    case 'ecommerce':
      body = (
        <>
          {[[54, 54], [116, 54], [178, 54]].map(([x, y], i) => (
            <rect key={i} x={x as number} y={y as number} width="46" height="46" rx="6" fill={C.s2} stroke={C.line} />
          ))}
          {[54, 116, 178].map((x, i) => <rect key={x} x={x + 8} y="62" width="30" height="4" rx="2" fill={`var(--c${(i % 3) + 1})`} />)}
          <path d="M236 40 l26 10 -10 26 -20 -8 -6 -18z" fill="color-mix(in srgb, var(--accent) 16%, transparent)" stroke={C.a} />
          <circle cx="244" cy="52" r="3" fill={C.a} />
        </>
      )
      break
    case 'teach':
      body = (
        <>
          <rect x="52" y="26" width="150" height="82" rx="6" fill={C.s2} stroke={C.line} />
          {[42, 56, 70, 84].map((y, i) => <rect key={y} x="64" y={y} width={120 - i * 18} height="4" rx="2" fill={i === 0 ? C.a : C.mut} opacity={i === 0 ? 0.9 : 0.5} />)}
          <circle cx="228" cy="66" r="9" fill="none" stroke={C.c2} strokeWidth="2" />
          <path d="M218 108 q10 -20 20 0" stroke={C.c2} strokeWidth="2" fill="none" />
        </>
      )
      break
    default: // flow
      body = (
        <>
          <path d="M40 40 C 110 40, 110 96, 180 96 M40 40 C 130 66, 170 40, 250 52 M180 96 C 224 96, 242 66, 262 58" stroke="color-mix(in srgb, var(--accent) 55%, transparent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {[[24, 26], [176, 84], [250, 42], [24, 80]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x as number} y={y as number} width="52" height="26" rx="6" fill={C.s2} stroke="color-mix(in srgb, var(--accent) 40%, transparent)" />
              <circle cx={(x as number) + 8} cy={(y as number) + 8} r="2.5" fill={`var(--c${(i % 3) + 1})`} />
              <rect x={(x as number) + 14} y={(y as number) + 6} width="30" height="3" rx="1.5" fill={C.mut} />
              <rect x={(x as number) + 14} y={(y as number) + 14} width="20" height="3" rx="1.5" fill="color-mix(in srgb, var(--muted) 35%, transparent)" />
            </g>
          ))}
        </>
      )
  }
  return <svg viewBox="0 0 300 128" className="h-full w-full" fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">{body}</svg>
}

function ArtPanel({ id, tall = false }: { id?: string; tall?: boolean }) {
  const kind = (id && artById[id]) || 'flow'
  return (
    <div className={`relative overflow-hidden rounded-lg border ${tall ? 'h-40' : 'h-24'}`} style={{ borderColor: 'color-mix(in srgb, var(--text) 12%, transparent)', background: 'color-mix(in srgb, var(--bg) 55%, transparent)' }}>
      <Art kind={kind} />
      <span className="absolute bottom-1.5 right-2 font-mono text-[8px] tracking-widest" style={{ color: 'var(--faint)' }}>SCHEMATIC</span>
    </div>
  )
}

// Colored tool tag shown on project cards. Not rendered for Outpilot missions,
// which carry no `tech` (their internal tools stay off the page).
function ToolTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold leading-none"
      style={{
        color,
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 34%, transparent)`,
      }}
    >
      {label}
    </span>
  )
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  )
}

// Horizontal project rail with several independent ways to scroll, so it works
// regardless of browser or input device: a visible draggable scrollbar, clickable
// arrow buttons, click-and-drag panning, and (via the modal body) wheel-to-side.
function TileRow({ missions, onPick }: { missions: Mission[]; onPick: (m: Mission) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      setCanLeft(el.scrollLeft > 4)
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [missions])

  const nudge = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: 'smooth' })

  // Click-and-drag panning.
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false })
  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || !drag.current.down) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 4) drag.current.moved = true
    el.scrollLeft = drag.current.startLeft - dx
  }
  const endDrag = () => { drag.current.down = false }

  const arrowCls = 'absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur transition hover:scale-105'
  const arrowStyle = { borderColor: 'color-mix(in srgb, var(--text) 16%, transparent)', background: 'color-mix(in srgb, var(--surface) 92%, var(--text) 8%)', color: 'var(--accent)' } as const

  return (
    <div className="relative">
      <div
        ref={ref}
        data-rail
        data-lenis-prevent
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="rail-scroll -mx-1 mt-3 flex cursor-grab snap-x gap-5 overflow-x-auto overscroll-contain px-1 pb-3 active:cursor-grabbing"
      >
        {missions.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => { if (!drag.current.moved) onPick(m) }}
            className="group flex w-[248px] shrink-0 snap-start flex-col rounded-xl border p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderColor: 'color-mix(in srgb, var(--text) 15%, transparent)',
              borderLeft: `3px solid ${accentVar(idx)}`,
              background: 'color-mix(in srgb, var(--surface) 90%, var(--text) 9%)',
            }}
          >
            <ArtPanel id={m.id} />
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-widest">
              <span style={{ color: m.status === 'LIVE' ? 'var(--accent)' : 'var(--faint)' }}>{m.status === 'LIVE' ? '● LIVE' : 'PROJECT'}</span>
              <span className="opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--accent)' }}>open →</span>
            </div>
            <h4 className="mt-1.5 text-[15px] font-semibold leading-tight" style={{ color: 'var(--text)' }}>{m.title}</h4>
            <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>{m.highlight}</p>
            {m.tech && (
              <div className="mt-2.5 flex flex-wrap gap-1">
                {m.tech.slice(0, 4).map((t, ti) => (
                  <ToolTag key={t} label={t} color={accentVar(ti)} />
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {canLeft && (
        <button aria-label="Scroll left" onClick={() => nudge(-280)} className={`${arrowCls} left-1`} style={arrowStyle}>
          <Arrow dir="left" />
        </button>
      )}
      {canRight && (
        <button aria-label="Scroll right" onClick={() => nudge(280)} className={`${arrowCls} right-1`} style={arrowStyle}>
          <Arrow dir="right" />
        </button>
      )}
    </div>
  )
}

export function Modal({ data, onClose }: { data: ModalData | null; onClose: () => void }) {
  const [sel, setSel] = useState<Mission | null>(null)
  const [dir, setDir] = useState(1)
  const bodyRef = useRef<HTMLDivElement>(null)

  const pick = (m: Mission) => { setDir(1); setSel(m) }
  const back = () => { setDir(-1); setSel(null) }

  useEffect(() => { setSel(null); setDir(1) }, [data])
  useEffect(() => {
    if (!data) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') sel ? back() : onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [data, sel, onClose])

  // One wheel handler on the whole modal body picks the axis for you: if the
  // current view has a horizontal project rail, a plain scroll moves it sideways;
  // otherwise the scroll falls through to the body's own vertical scroll. This
  // fires wherever the cursor is inside the modal, so the folder rail scrolls
  // reliably instead of only when the pointer is exactly over a card.
  useEffect(() => {
    if (!data) return
    const el = bodyRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const rail = el.querySelector('[data-rail]') as HTMLElement | null
      if (!rail || rail.scrollWidth <= rail.clientWidth + 1) return // vertical view
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return // let trackpad h-swipes through
      rail.scrollLeft += e.deltaY
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [data, sel])

  const viewKey = data?.kind === 'stop' ? (sel ? `d-${sel.id}` : 'folder') : 'item'

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
                <button onClick={back} className="font-mono text-[11px] tracking-widest transition-opacity hover:opacity-70" style={{ color: 'var(--accent)' }}>
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

            <div ref={bodyRef} data-lenis-prevent className="max-h-[76vh] overflow-y-auto overscroll-contain px-6 py-6">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={viewKey}
                  initial={{ opacity: 0, x: dir * 34 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={SLIDE}
                >
                  {data.kind === 'item' ? (
                    <>
                      <ArtPanel id={data.id} tall />
                      <h3 className="mt-5 text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{data.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>{data.body}</p>
                      {data.tech && <div className="mt-5 flex flex-wrap gap-1.5">{data.tech.map((t, i) => <Chip key={t} label={t} color={accentVar(i)} />)}</div>}
                    </>
                  ) : sel ? (
                    <>
                      <ArtPanel id={sel.id} tall />
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
                      <p className="mt-6 font-mono text-[11px] tracking-widest" style={{ color: 'var(--faint)' }}>
                        {data.stop.missions.length} PROJECT{data.stop.missions.length === 1 ? '' : 'S'}
                      </p>
                      <TileRow missions={data.stop.missions} onPick={pick} />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
