// Swirling energy orb (Rasengan nod). Pure CSS, GPU-friendly, reduced-motion safe.
export function Rasengan({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      {/* soft glow */}
      <div
        className="absolute inset-0 rounded-full opacity-60 blur-2xl"
        style={{ background: 'var(--grad)' }}
      />
      {/* swirling core */}
      <div
        className="spin-slow absolute inset-[8%] rounded-full opacity-90"
        style={{
          background:
            'conic-gradient(from 0deg, var(--accent2), var(--accent3), var(--accent), var(--accent2))',
        }}
      />
      {/* inner counter-swirl */}
      <div
        className="spin-rev absolute inset-[26%] rounded-full opacity-80 mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 180deg, transparent, var(--accent3), transparent, var(--accent), transparent)',
        }}
      />
      {/* bright center */}
      <div className="absolute inset-[42%] rounded-full bg-white/80 blur-[2px]" />
      {/* containment rings */}
      <div className="spin-rev absolute inset-0 rounded-full border border-white/20" />
      <div className="spin-slow absolute inset-[16%] rounded-full border border-white/15" />
      {/* orbiting spark */}
      <div className="absolute left-1/2 top-1/2 h-2 w-2">
        <span className="orbit block h-2 w-2 rounded-full bg-white shadow-[0_0_12px_var(--accent3)]" />
      </div>
    </div>
  )
}
