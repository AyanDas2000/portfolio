import { contact, links, quotes } from '../data'
import { Reveal } from '../lib'
import { Section } from './ui'

export function Contact() {
  return (
    <Section id="contact" className="pb-0! text-center">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-mono text-[13px] font-medium tracking-widest" style={{ color: 'var(--accent)' }}>
            CONTACT
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl" style={{ color: 'var(--text)' }}>
            {contact.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
            {contact.line}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${links.email}`}
              className="rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              {links.email}
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold transition-colors"
              style={{ color: 'var(--muted)' }}
            >
              LinkedIn
            </a>
            <a
              href={links.x}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold transition-colors"
              style={{ color: 'var(--muted)' }}
            >
              X
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <figure className="mx-auto mt-20 max-w-2xl">
          <blockquote className="text-lg italic leading-relaxed" style={{ color: 'var(--muted)' }}>
            {quotes.second.text}
          </blockquote>
          <figcaption className="mt-4 flex items-center justify-center gap-3 font-mono text-[12px] tracking-widest" style={{ color: 'var(--faint)' }}>
            <span className="h-px w-8" style={{ background: 'var(--line)' }} aria-hidden />
            {quotes.second.author}
          </figcaption>
        </figure>
      </Reveal>

      <footer
        className="mx-auto mt-20 max-w-5xl border-t px-6 py-8 font-mono text-[11px] tracking-widest sm:px-8"
        style={{ borderColor: 'var(--line)', color: 'var(--faint)' }}
      >
        © {new Date().getFullYear()} AYAN DAS
      </footer>
    </Section>
  )
}
