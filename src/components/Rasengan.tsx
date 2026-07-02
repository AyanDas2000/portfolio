// Rasengan: a white-to-blue swirling chakra sphere (a typhoon in a ball).
// Pure CSS, GPU-friendly, reduced-motion safe. Reads on a light background via a blue glow + rim.
export function Rasengan({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      {/* outer chakra glow */}
      <div
        className="absolute inset-[-14%] rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(96,165,250,0.55), rgba(59,130,246,0.15) 55%, transparent 72%)',
        }}
      />
      {/* sphere body: white core to blue edge, with a defining rim */}
      <div
        className="absolute inset-0 rounded-full ring-1 ring-blue-300/50"
        style={{
          background:
            'radial-gradient(circle at 38% 34%, #ffffff 0%, #eff6ff 26%, #bfdbfe 58%, #60a5fa 88%, #3b82f6 100%)',
          boxShadow: 'inset 0 0 30px rgba(255,255,255,0.7), inset 0 0 50px rgba(59,130,246,0.35)',
        }}
      />
      {/* swirling vortex (typhoon) */}
      <div
        className="spin-slow absolute inset-[6%] rounded-full opacity-80 mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, #ffffff 40deg, transparent 90deg, #dbeafe 150deg, transparent 200deg, #ffffff 260deg, transparent 320deg)',
        }}
      />
      {/* counter-swirl */}
      <div
        className="spin-rev absolute inset-[20%] rounded-full opacity-70 mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 120deg, transparent, #ffffff 30deg, transparent 120deg, #93c5fd 220deg, transparent 300deg)',
        }}
      />
      {/* containment shell rings */}
      <div className="spin-rev absolute inset-0 rounded-full border border-white/50" />
      <div className="spin-slow absolute inset-[13%] rounded-full border border-blue-200/50" />
      {/* hot white core */}
      <div className="absolute inset-[40%] rounded-full bg-white blur-[1px] shadow-[0_0_18px_6px_rgba(255,255,255,0.9)]" />
      {/* orbiting spark */}
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5">
        <span className="orbit block h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_3px_rgba(147,197,253,0.9)]" />
      </div>
    </div>
  )
}
