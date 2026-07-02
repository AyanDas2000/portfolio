import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  work, values, jiraiya, beyond, about, links, profile, techMarquee, testimonials,
  type Work,
} from '../data'
import { Reveal } from '../lib'
import { Journey } from './Journey'

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="mb-3 font-mono text-sm font-medium tracking-wide text-accent">{children}</p>
  )
}
function H2({ children }: { children: string }) {
  return (
    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{children}</h2>
  )
}

const STATUS: Record<string, string> = {
  LIVE: 'text-led bg-led/12',
  SHIPPED: 'text-accent bg-accent/12',
  PERSONAL: 'text-muted bg-surface2',
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

function MissionCard({ item }: { item: Work }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm transition-colors hover:border-accent/40 sm:p-7">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-faint">
        <span>MISSION {item.code}</span>
        <span className={`rounded-full px-2.5 py-0.5 font-medium ${STATUS[item.status] ?? ''}`}>
          {item.status}
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>

      <span className="mt-3 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-medium text-accent">
        {item.highlight}
      </span>

      <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.summary}</p>

      <p className="mt-3 font-mono text-xs text-faint">
        client:{' '}
        {item.classified ? (
          <span className="select-none rounded bg-text px-2 py-0.5 tracking-widest text-bg">
            CLASSIFIED
          </span>
        ) : (
          <span className="text-muted">{item.client}</span>
        )}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.stack.map((s) => (
          <span key={s} className="rounded-md bg-surface2 px-2.5 py-1 font-mono text-[11px] text-muted">
            {s}
          </span>
        ))}
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-5 font-mono text-xs font-medium text-accent transition-opacity hover:opacity-70"
      >
        {open ? '▾ hide debrief' : '▸ read debrief'}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-line pt-4 text-[14px] leading-relaxed text-muted">
              {item.detail}
            </p>
            <div className="mt-4 flex h-32 items-center justify-center rounded-lg border border-dashed border-line bg-surface2/50 font-mono text-[11px] text-faint">
              {item.image ? (
                <img src={item.image} alt={item.title} className="h-full w-full rounded-lg object-cover" />
              ) : (
                'workflow preview // partially redacted (NDA)'
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
            <H2>Mission files.</H2>
            <p className="mt-3 max-w-xl text-[15px] text-muted">
              Most of these are private, revenue-making tools, so the details stay light. Open a
              debrief for the sanitized version.
            </p>
          </Reveal>
          <div className="mt-10 space-y-5">
            {work.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <MissionCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* JOURNEY (timeline with the bike) */}
        <Journey />

        {/* ABOUT + values */}
        <section id="about" className="scroll-mt-20 py-20 sm:py-28">
          <Reveal>
            <div className="flex flex-col items-center gap-8 rounded-3xl border border-line bg-surface p-8 shadow-sm sm:flex-row sm:p-10">
              <Photo />
              <div>
                <Eyebrow>About</Eyebrow>
                <p className="font-display text-xl leading-relaxed sm:text-2xl">{about}</p>
                <p className="mt-4 text-[15px] italic leading-relaxed text-muted">{jiraiya}</p>
                <p className="mt-4 font-mono text-sm text-faint">{profile.location}</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-sm">
                  <div className="text-3xl">{v.emoji}</div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{v.body}</p>
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
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {beyond.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="text-4xl">{it.emoji}</div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS (only renders once you add approved quotes) */}
        {testimonials.length > 0 && (
          <section className="py-20 sm:py-28">
            <Reveal>
              <Eyebrow>Kind words</Eyebrow>
              <H2>From people I built with.</H2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {testimonials.map((t) => (
                <Reveal key={t.name}>
                  <figure className="h-full rounded-2xl border border-line bg-surface p-7 shadow-sm">
                    <blockquote className="text-[15px] leading-relaxed">"{t.quote}"</blockquote>
                    <figcaption className="mt-4 font-mono text-xs text-muted">
                      {t.name} · {t.role}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}

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
            © {new Date().getFullYear()} Ayan Das · built from scratch, no template · 🍥
          </footer>
        </section>
      </div>
    </main>
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
