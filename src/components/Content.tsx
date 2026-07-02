import { useState } from 'react'
import { work, approach, beyond, about, alsoBuilt, links, profile } from '../data'
import { Reveal } from '../lib'

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="font-mono text-xs tracking-[0.2em] text-accent">
        {children.toUpperCase()}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-sm border border-line bg-surface/50 px-2 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  )
}

function WorkRow({ item }: { item: (typeof work)[number] }) {
  return (
    <Reveal className="group border-t border-line py-7 first:border-t-0">
      <div className="flex gap-4 sm:gap-6">
        {/* accent spine + index */}
        <div className="flex flex-col items-center pt-1">
          <span className="font-mono text-xs text-faint transition-colors group-hover:text-accent">
            {item.index}
          </span>
          <span className="mt-2 w-px flex-1 bg-line transition-colors group-hover:bg-accent/50" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl font-medium text-text sm:text-2xl">
              {item.title}
              {item.personal && (
                <span className="ml-2 align-middle font-mono text-[10px] tracking-wider text-faint">
                  PERSONAL
                </span>
              )}
            </h3>
            <span className="font-mono text-xs text-faint">{item.year}</span>
          </div>
          <p className="mt-0.5 font-mono text-[12px] text-muted">{item.meta}</p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {item.body}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Photo() {
  const [broken, setBroken] = useState(false)
  return (
    <div className="relative w-full max-w-[220px]">
      <div className="pointer-events-none absolute -inset-2 -z-10 rounded-md border border-line" />
      {!broken ? (
        <img
          src="/ayan.jpg"
          alt="Ayan Das"
          width={440}
          height={440}
          onError={() => setBroken(true)}
          className="w-full rounded-md border border-line object-cover grayscale-[0.15] [filter:sepia(0.12)_saturate(1.05)]"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-md border border-line bg-surface font-mono text-[11px] text-faint">
          PORTRAIT // add public/ayan.jpg
        </div>
      )}
      <span className="mt-2 block text-center font-mono text-[10px] text-faint">
        {profile.location.split('(')[0].trim()}
      </span>
    </div>
  )
}

export function Content() {
  return (
    <main className="lg:py-16">
      {/* SELECTED WORK */}
      <section id="work" className="scroll-mt-8 pt-4">
        <SectionLabel>Selected work</SectionLabel>
        <div>
          {work.map((item) => (
            <WorkRow key={item.id} item={item} />
          ))}
        </div>
        <Reveal className="mt-7 border-t border-line pt-6">
          <p className="max-w-2xl text-[14px] leading-relaxed text-faint">
            <span className="font-mono text-[11px] tracking-wider text-muted">
              ALSO BUILT&nbsp;&nbsp;
            </span>
            {alsoBuilt}
          </p>
        </Reveal>
      </section>

      {/* HOW I WORK */}
      <section id="approach" className="mt-24 scroll-mt-8">
        <SectionLabel>How I work</SectionLabel>
        <Reveal>
          <p className="max-w-2xl font-display text-xl leading-relaxed text-text/90">
            {approach.lead}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {approach.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <div className="h-full rounded-md border border-line bg-surface/40 p-5">
                <h3 className="font-mono text-sm text-accent">{g.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEYOND WORK */}
      <section id="beyond" className="mt-24 scroll-mt-8">
        <SectionLabel>Beyond work</SectionLabel>
        <Reveal>
          <p className="max-w-2xl font-display text-xl leading-relaxed text-text">
            {beyond.lead}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {beyond.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07}>
              <div className="flex h-full gap-4 rounded-lg border border-line bg-surface/50 p-5 transition-colors hover:border-accent/40">
                <span className="text-2xl leading-none" aria-hidden>
                  {it.emoji}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-text">{it.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{it.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mt-24 scroll-mt-8">
        <SectionLabel>About</SectionLabel>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
          <Reveal className="order-2 flex-1 sm:order-1">
            <div className="space-y-4 max-w-2xl">
              {about.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-muted">
                  {p}
                </p>
              ))}
              <p className="pt-2 font-mono text-[12px] text-faint">
                {profile.location}
              </p>
            </div>
          </Reveal>
          <Reveal className="order-1 sm:order-2">
            <Photo />
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-24 scroll-mt-8 pb-20">
        <SectionLabel>Contact</SectionLabel>
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Let's build something.
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
            I am open to remote roles across EU and global teams. The fastest way to
            reach me is email.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${links.email}`}
              className="rounded-md border border-accent/60 bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
            >
              {links.email}
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={links.x}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
            >
              X
            </a>
          </div>
        </Reveal>
        <footer className="mt-20 flex items-center justify-between border-t border-line pt-6 font-mono text-[11px] text-faint">
          <span>© {new Date().getFullYear()} Ayan Das</span>
          <span>Built from scratch · no template</span>
        </footer>
      </section>
    </main>
  )
}
