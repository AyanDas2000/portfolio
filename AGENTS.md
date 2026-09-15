# AGENTS.md

Rules for AI agents working in this repository. Read this file before doing anything else.

## What this is

Ayan's portfolio site. React, TypeScript, Vite. Package manager is npm. Deployed as static assets on Cloudflare Workers. This repository is private and stays private.

## Git

- All work happens in the WSL checkout: `/home/ayan/projects/portfolio` in Ubuntu. Git runs inside WSL, where `gh` is authenticated as AyanDas2000.
- The branch is `master`, not `main`.
- `core.autocrlf=true` keeps line endings consistent. Do not disable it.
- Never push without explicit approval from Ayan in the current session. Pushing to `master` triggers a Cloudflare Workers Builds production deploy, and Vercel still mirrors `master` during the fallback period.
- No Co-Authored-By trailers in commits.

## Before calling work done

`npm run check` must pass, run under Node 22 (`nvm use 22`). It runs the typecheck, lint, and build.

## Deploy and infrastructure

- Deploys happen through Cloudflare Workers Builds, which is connected to the GitHub repository. No agent holds a Cloudflare deploy credential. Do not create one.
- `wrangler.jsonc` is the deploy config: static assets from `./dist`, SPA fallback for deep links, preview URLs on. Custom domain routes for `ayandas.dev` and `www` are added at the cutover step, with approval.
- Vercel remains the production host during the agreed fallback week. Do not change Vercel project settings or remove the Vercel DNS setup until the cutover is explicitly approved.
- Analytics: Vercel Analytics is being replaced by Cloudflare Web Analytics. Do not re-add `@vercel/analytics`.

## DNS

- The zone `ayandas.dev` lives in Ayan's personal Cloudflare account, delegated from Spaceship, DNSSEC signed at Cloudflare with the DS at the registrar.
- Never change DNS records without Ayan's explicit approval. Mail for the domain runs on Google Workspace; the MX, SPF, DKIM, and DMARC records are load-bearing.
