// Injects the server render of <App /> into dist/index.html, then drops the SSR bundle.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'

const { render } = await import('../dist-ssr/entry-server.js')
const file = 'dist/index.html'
const html = readFileSync(file, 'utf8')
const slot = '<div id="root"></div>'
if (!html.includes(slot)) throw new Error(`prerender: ${slot} not found in ${file}`)

writeFileSync(file, html.replace(slot, `<div id="root">${render()}</div>`))
rmSync('dist-ssr', { recursive: true, force: true })
console.log('prerender: dist/index.html')
