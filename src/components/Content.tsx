import { useState } from 'react'
import { work, approach, beyond, about, links, profile, techMarquee } from '../data'
import { Reveal } from '../lib'

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="mb-3 font-mono text-sm font-medium tracking-wide text-accent">
      {children}
    </p>
  )
}

function H2({ children }: { children: string }) {
  return (
    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
      {children}
    </h2>
  )
}

function TechStrip() {
  const row = [...techMarquee, ...techMarquee]
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-line bg-surface2/60 py-4">
      <div className="marquee-track gap-8">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-sm text-muted">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Photo() {
  const [broken, setBroken] = useState(false)
  return !broken ? (
    <img
      src="/ayan.jpg"
      alt="Ayan Das"
      width={320}
      height={320}
      onError={() => setBroken(true)}
      className="h-40 w-40 shrink-0 rounded-2xl border-4 border-surface object-cover shadow-lg sm:h-48 sm:w-48"
    />
  ) : (
    <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface2 text-center font-mono text-[11px] text-faint sm:h-48 sm:w-48">
      add public/ayan.jpg
    </div>
  )
}

export function Content() {
  return (
    <main>
      <TechStrip />

      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* WORK */}
        <section id="work" className="scroll-mt-20 py-20 sm:py-28">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            <H2>Things I have built.</H2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {work.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-line bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                    {item.personal && (
                      <span className="rounded-full bg-surface2 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-muted">
                        PERSONAL
                      </span>
                    )}
                  </div>
                  <span className="mt-3 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-medium text-accent">
                    {item.highlight}
                  </span>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-surface2 px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW I WORK */}
        <section id="approach" className="scroll-mt-20 py-20 sm:py-28">
          <Reveal>
            <Eyebrow>How I work</Eyebrow>
            <H2>Pragmatic, not precious.</H2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {approach.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-surface p-7 shadow-sm">
                  <div className="text-3xl">{g.emoji}</div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{g.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* BEYOND */}
        <section id="beyond" className="scroll-mt-20 py-20 sm:py-28">
          <Reveal>
            <Eyebrow>Beyond work</Eyebrow>
            <H2>I have a life too.</H2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {beyond.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="text-4xl">{it.emoji}</div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-20 py-20 sm:py-28">
          <Reveal>
            <div className="flex flex-col items-center gap-8 rounded-3xl border border-line bg-surface p-8 shadow-sm sm:flex-row sm:p-12">
              <Photo />
              <div>
                <Eyebrow>About</Eyebrow>
                <p className="font-display text-xl leading-relaxed sm:text-2xl">{about}</p>
                <p className="mt-4 font-mono text-sm text-muted">{profile.location}</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-20 pb-24 pt-4 text-center">
          <Reveal>
            <H2>Let's build something.</H2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted">
              Open to remote roles across EU and global teams. Email is the fastest way to reach me.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${links.email}`}
                className="rounded-full bg-[image:var(--grad)] px-7 py-3.5 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                {links.email}
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-muted transition-colors hover:text-accent">
                LinkedIn
              </a>
              <a href={links.x} target="_blank" rel="noreferrer" className="font-semibold text-muted transition-colors hover:text-accent">
                X
              </a>
            </div>
          </Reveal>
          <footer className="mt-20 border-t border-line pt-6 font-mono text-xs text-faint">
            © {new Date().getFullYear()} Ayan Das · built from scratch, no template
          </footer>
        </section>
      </div>
    </main>
  )
}
