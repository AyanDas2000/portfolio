# Ayan Das — Portfolio

Personal portfolio. Vite + React + TypeScript + Tailwind v4 + Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Edit the content

All copy lives in **`src/data.ts`** (profile, links, work, approach, about). Change it there.

Still to fill in:
- `links.email` in `src/data.ts` — swap the placeholder for your real email.
- `public/ayan.jpg` — drop your headshot here (square works best). Until then the About section shows a labelled placeholder.
- Optional: uncomment `links.github` once the GitHub cleanup is done.

## Design

Instrument-panel aesthetic (warm espresso + amber). Signature "frame decoder" hero decodes a
protocol frame into the tagline (the payload bytes spell AYAN DAS in ASCII hex). Dark default with a
light toggle. Respects `prefers-reduced-motion`.

## Deploy (Vercel)

1. Push to GitHub (private repo is fine).
2. On vercel.com: New Project, import this repo.
3. Framework preset: Vite. Build: `npm run build`. Output: `dist`. Deploy.

The deployed site is public (that is the point); the repo can stay private.
