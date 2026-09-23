// Build-time render of the whole page, so crawlers that do not run JavaScript
// still get the copy. scripts/prerender.mjs injects this into dist/index.html
// and main.tsx hydrates it.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MotionConfig } from 'motion/react'
import App from './App.tsx'

export function render() {
  return renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </StrictMode>,
  )
}
