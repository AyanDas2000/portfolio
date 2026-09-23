import { useState } from 'react'
import { motion } from 'motion/react'
import { about, quotes } from '../data'
import { Reveal } from '../lib'
import { Glass, Section, SectionHead } from './ui'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const VIEW = { once: false, margin: '-10%' } as const

function Photo() {
  const [broken, setBroken] = useState(false)
  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
    >
      <div
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[26px] opacity-60 blur-2xl"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--c1) 34%, transparent), color-mix(in srgb, var(--c2) 30%, transparent))',
        }}
        aria-hidden
      />
      {!broken ? (
        <img
          src="/ayan.webp"
          alt="Ayan Das"
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          className="h-44 w-44 rounded-2xl border-4 object-cover sm:h-52 sm:w-52"
          style={{ borderColor: 'var(--surface)', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.6)' }}
        />
      ) : (
        <div
          className="flex h-44 w-44 items-center justify-center rounded-2xl border text-center font-mono text-[11px] sm:h-52 sm:w-52"
          style={{ borderColor: 'var(--line)', background: 'var(--surface2)', color: 'var(--faint)' }}
        >
          ayan.png
        </div>
      )}
    </motion.div>
  )
}

function PullQuote({ text, author }: { text: string; author: string }) {
  return (
    <Reveal>
      <figure className="mx-auto mt-16 max-w-3xl text-center">
        <blockquote
          className="text-2xl font-medium italic leading-snug tracking-tight sm:text-3xl"
          style={{ color: 'var(--text)' }}
        >
          {text}
        </blockquote>
        <figcaption className="mt-5 flex items-center justify-center gap-3 font-mono text-[12px] tracking-widest" style={{ color: 'var(--muted)' }}>
          <span className="h-px w-8" style={{ background: 'var(--line)' }} aria-hidden />
          {author}
        </figcaption>
      </figure>
    </Reveal>
  )
}

export function About() {
  return (
    <Section id="about">
      <div className="mx-auto max-w-4xl">
        <SectionHead eyebrow="ABOUT" title="How I operate" />
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Glass bar className="mt-10 flex flex-col items-center gap-8 p-7 sm:flex-row sm:items-start sm:p-9">
            <Photo />
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              <p className="text-[15px] leading-relaxed sm:text-base" style={{ color: 'var(--muted)' }}>
                {about.body}
              </p>
              <p
                className="mt-5 border-l-2 pl-4 text-[15px] italic leading-relaxed"
                style={{ borderColor: 'var(--accent)', color: 'color-mix(in srgb, var(--text) 82%, transparent)' }}
              >
                {about.creed}
              </p>
            </motion.div>
          </Glass>
        </motion.div>
      </div>

      <PullQuote text={quotes.main.text} author={quotes.main.author} />
    </Section>
  )
}
