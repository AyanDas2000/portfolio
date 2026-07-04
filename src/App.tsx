import { useEffect, type MouseEvent } from 'react'
import Lenis from 'lenis'
import { Ambient } from './components/Ambient'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Origin } from './components/Origin'
import { Journey } from './components/Journey'
import { Craft } from './components/Craft'
import { Stack } from './components/Stack'
import { Clients } from './components/Clients'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { consoleLines, nav } from './data'
import { useActiveSection, useTheme } from './lib'

const NAV_IDS = nav.map((n) => n.id)

function App() {
  const [theme, toggle] = useTheme()
  const active = useActiveSection(NAV_IDS)

  // 11. Console easter egg
  useEffect(() => {
    const style = 'color:#37C6E0;font-family:monospace;font-size:12px'
    consoleLines.forEach((line) => console.log(`%c${line}`, style))
  }, [])

  // Weighted smooth scroll (Lenis). Skipped for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, wheelMultiplier: 0.9 })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const root = document.documentElement
    root.style.setProperty('--mx', `${e.clientX}px`)
    root.style.setProperty('--my', `${e.clientY}px`)
  }

  return (
    <div onMouseMove={onMove}>
      <Ambient theme={theme} />

      <a
        href="#journey"
        className="sr-only rounded px-3 py-1.5 text-sm font-semibold focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90]"
        style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
      >
        Skip to content
      </a>

      <Nav active={active} theme={theme} onToggle={toggle} />

      <main className="relative">
        <Hero theme={theme} />
        <Origin />
        <Journey />
        <Craft />
        <Stack />
        <Clients />
        <About />
        <Contact />
      </main>
    </div>
  )
}

export default App
