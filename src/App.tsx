import { Rail } from './components/Rail'
import { FrameDecoder } from './components/FrameDecoder'
import { Content } from './components/Content'
import { useActiveSection } from './lib'
import { nav } from './data'

const NAV_IDS = nav.map((n) => n.id)

function App() {
  const active = useActiveSection(NAV_IDS)

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-1.5 focus:font-mono focus:text-xs focus:text-bg"
      >
        Skip to content
      </a>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="pt-14 lg:col-span-5 lg:pt-0">
          <Rail active={active} />
        </div>

        <div className="lg:col-span-7">
          <div className="pt-10 lg:pt-16">
            <FrameDecoder />
          </div>
          <Content />
        </div>
      </div>
    </div>
  )
}

export default App
