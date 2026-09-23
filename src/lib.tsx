import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/** Fade + rise on scroll into view. Respects reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-10%' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Tracks which section is currently in view for nav highlighting. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [ids])
  return active
}

type Theme = 'dark' | 'light'

export function useTheme(): [Theme, () => void] {
  // Start as 'light' on both server and client so hydration matches the prerendered
  // HTML, then adopt the theme the inline script in index.html already applied.
  const [theme, setTheme] = useState<Theme>('light')
  const [synced, setSynced] = useState(false)
  useLayoutEffect(() => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') setTheme('dark')
    setSynced(true)
  }, [])
  useEffect(() => {
    if (!synced) return
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.setProperty('color-scheme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme, synced])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}
