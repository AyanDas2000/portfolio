import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Content } from './components/Content'
import { useActiveSection } from './lib'
import { nav } from './data'

const NAV_IDS = nav.map((n) => n.id)

function App() {
  const active = useActiveSection(NAV_IDS)
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-3 focus:py-1.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Nav active={active} />
      <Hero />
      <Content />
    </>
  )
}

export default App
