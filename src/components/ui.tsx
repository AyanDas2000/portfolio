import type { CSSProperties, ReactNode } from 'react'
import { Reveal } from '../lib'

const ACCENT_VARS = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--accent)', 'var(--led)']

export function accentVar(i: number) {
  return ACCENT_VARS[i % ACCENT_VARS.length]
}

// Glass panel in the prototype's language: translucent surface, hairline border,
// baked drop shadow, optional gradient accent bar + soft color glow behind.
export function Glass({
  children,
  className = '',
  bar = false,
  glow = false,
  style,
}: {
  children: ReactNode
  className?: string
  bar?: boolean
  glow?: boolean
  style?: CSSProperties
}) {
  return (
    <div className="relative">
      {glow && (
        <div
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] opacity-60 blur-2xl"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--c1) 34%, transparent), color-mix(in srgb, var(--c2) 30%, transparent))',
          }}
        />
      )}
      <div
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-md ${className}`}
        style={{
          borderColor: 'var(--line)',
          background: 'color-mix(in srgb, var(--surface) 72%, transparent)',
          boxShadow:
            '0 30px 80px -48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)',
          ...style,
        }}
      >
        {bar && (
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background: 'linear-gradient(90deg, var(--c1), var(--c2), var(--c3))',
            }}
          />
        )}
        {children}
      </div>
    </div>
  )
}

// Colored chip, prototype treatment (tinted fill, tinted border, colored text).
export function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="rounded-md border px-2 py-0.5 font-mono text-[11px] leading-tight"
      style={{
        background: `color-mix(in srgb, ${color} 14%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 38%, transparent)`,
        color: `color-mix(in srgb, ${color} 88%, var(--text))`,
      }}
    >
      {label}
    </span>
  )
}

export function LiveDot({ label = 'LIVE' }: { label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider"
      style={{ color: 'var(--muted)' }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: 'var(--led)', boxShadow: '0 0 6px 0 var(--led)' }}
      />
      {label}
    </span>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-6 py-20 sm:px-8 sm:py-28 ${className}`}>
      {children}
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <Reveal>
      <p className="font-mono text-[13px] font-medium tracking-widest" style={{ color: 'var(--accent)' }}>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text)' }}>
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
