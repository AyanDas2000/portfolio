type Theme = 'dark' | 'light'

// Full-viewport, fixed background. Two ambient color washes + a cursor-bound
// radial glow + paper grain (light only). All glows are baked/static; the cursor
// glow only repositions (it reads --mx / --my inherited from the app wrapper).
export function Ambient({ theme }: { theme: Theme }) {
  const dark = theme === 'dark'
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />

      {/* ambient color washes */}
      <div
        className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{
          background: dark
            ? 'radial-gradient(circle, rgba(55,198,224,0.22), transparent 70%)'
            : 'radial-gradient(circle, rgba(59,91,169,0.18), transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 h-[34rem] w-[34rem] rounded-full blur-[130px]"
        style={{
          background: dark
            ? 'radial-gradient(circle, rgba(139,124,246,0.18), transparent 70%)'
            : 'radial-gradient(circle, rgba(224,102,60,0.16), transparent 70%)',
        }}
      />

      {/* cursor-bound glow */}
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? 'radial-gradient(300px circle at var(--mx,50%) var(--my,30%), rgba(120,230,255,0.08), transparent 70%)'
            : 'radial-gradient(320px circle at var(--mx,50%) var(--my,30%), rgba(39,64,107,0.06), transparent 70%)',
        }}
      />

      {/* paper grain (light only) */}
      {!dark && (
        <div
          className="absolute inset-0 opacity-[0.4] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='160'%20height='160'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3CfeColorMatrix%20type='saturate'%20values='0'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'%20opacity='0.6'/%3E%3C/svg%3E\")",
            backgroundSize: '160px 160px',
          }}
        />
      )}
    </div>
  )
}
