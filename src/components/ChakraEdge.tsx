import { useEffect, useId, useRef, useState } from 'react'
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'

// A vertical chakra edge: a drawn energy line (pathLength) with a glowing dot
// that travels the path via getPointAtLength. Glows are baked (radial gradient);
// only the dot MOVES. The looping animation pauses whenever the edge is off-screen.
export function ChakraEdge({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)
  const inView = useInView(wrapRef, { amount: 0.15 })
  const p = useMotionValue(0)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength())
  }, [])

  useEffect(() => {
    if (reduce || !len || !inView) return
    const controls = animate(p, [0, 1], {
      duration: 3.4,
      ease: 'linear',
      repeat: Infinity,
    })
    return () => controls.stop()
  }, [len, reduce, inView, p])

  const cx = useTransform(p, (v) =>
    pathRef.current ? pathRef.current.getPointAtLength(v * len).x : 100,
  )
  const cy = useTransform(p, (v) =>
    pathRef.current ? pathRef.current.getPointAtLength(v * len).y : 0,
  )

  const d = 'M100 6 C 34 80, 168 150, 100 226 C 52 286, 150 320, 100 354'

  return (
    <div ref={wrapRef} className={className}>
      <svg
        viewBox="0 0 200 360"
        className="h-full w-full overflow-visible"
        fill="none"
        aria-hidden
      >
        <defs>
          <radialGradient id={`halo-${uid}`}>
            <stop offset="0%" stopColor="var(--halo)" stopOpacity="0.95" />
            <stop offset="60%" stopColor="var(--halo)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--halo)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint full track */}
        <path
          d={d}
          stroke="var(--stroke)"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />
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
            <motion.circle cx={cx} cy={cy} r="15" fill={`url(#halo-${uid})`} />
            <motion.circle cx={cx} cy={cy} r="3" fill="var(--core)" />
          </>
        )}
      </svg>
    </div>
  )
}
