// All site copy lives here so it is easy to edit in one place.
// Style: plain, first person, no em dashes.

export const profile = {
  name: 'Ayan Das',
  role: 'Automation & AI Engineer',
  tagline: 'I build working systems fast, whatever the stack.',
  intro:
    'I take messy problems and turn them into systems that actually run. Over the last two years I built the backend of a productized AI outreach platform from scratch, reverse engineered my motorcycle dashboard, and built my own voice assistant.',
  status: 'Open to remote roles (EU / global)',
  location: 'India (IST), comfortable working European hours',
}

export const links = {
  // TODO: swap in the email you want shown publicly
  email: 'hello@example.com',
  linkedin: 'https://www.linkedin.com/in/ayan-das-ad103/',
  x: 'https://x.com/AyanDas18189209',
  // github: 'https://github.com/AyanDas2000', // enable after the cleanup pass
}

export const nav = [
  { id: 'work', label: 'Selected work' },
  { id: 'approach', label: 'How I work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export type Work = {
  id: string
  index: string
  title: string
  meta: string
  year: string
  body: string
  stack: string[]
  personal?: boolean
}

export const work: Work[] = [
  {
    id: 'w1',
    index: '01',
    title: 'AI Outreach Platform',
    meta: 'Backend & automation architect',
    year: '2025 — now',
    body: 'Built the automation and backend of a productized cold outreach platform, taking it from a Make.com prototype to a live, revenue generating product on self hosted n8n. Designed a multi agent research engine (Gemini plus search APIs) that gathered company revenue, sponsor and news data in parallel, at roughly a tenth the cost of ChatGPT research. Added a Redis queue and Docker parallelism for throughput, an automated prompt tuning loop that tests and rewrites its own prompts until they hold up, and reply handling across many inboxes and domains. Cut campaign prep from about two weeks to near instant. Clients included publicly named partners like Brooklyn Pickleball and Brasil Rugby.',
    stack: ['n8n', 'Python', 'AWS', 'Redis', 'Docker', 'Airtable', 'FastAPI', 'LLMs'],
  },
  {
    id: 'w2',
    index: '02',
    title: 'E-commerce Operations Automation',
    meta: 'Multi store D2C retailer (Happy Wagon)',
    year: '2025',
    body: 'Built an end to end order pipeline for a brand selling across Shopify, Flipkart and Amazon. Every order flowed into Airtable as the single source of truth, then into a customer intelligence agent sitting on top of their support tool. Also built a chat extension UI and an early internal tool that ingested customer conversations to surface business insight.',
    stack: ['Airtable', 'Python', 'AWS', 'Supabase', 'REST / middleware APIs'],
  },
  {
    id: 'w3',
    index: '03',
    title: 'Amazon Price Discrepancy Tracker',
    meta: 'Replaced a manual daily task',
    year: '2025',
    body: 'Their Amazon listings kept drifting out of sync with Seller Central pricing, so someone was checking hundreds of products by hand every day. I replaced that with an AWS Lambda scraper that got past Amazon bot checks, cross checked live listings against Seller Central data, and emailed a full discrepancy report every morning. Parallelized it from three to four hours down to about twenty minutes.',
    stack: ['AWS Lambda', 'Python', 'anti-bot APIs', 'Airtable'],
  },
  {
    id: 'w4',
    index: '04',
    title: 'Motorcycle Dashboard Companion App',
    meta: 'Personal build',
    year: '2026',
    body: 'Reverse engineered the Bluetooth protocol of my motorcycle dashboard from the decompiled app, then built an Android companion that pushes navigation and music to the cluster and lets me control music from the bike own buttons.',
    stack: ['Kotlin', 'Android', 'BLE'],
    personal: true,
  },
  {
    id: 'w5',
    index: '05',
    title: 'JARVIS Voice Assistant',
    meta: 'Personal build',
    year: '2026',
    body: 'Built my own voice assistant from scratch, with wake word detection, speech to text and text to speech. Iterated it through ten versions to get the response time and reliability where I wanted them.',
    stack: ['Python', 'Porcupine', 'Whisper / Vosk', 'edge-tts'],
    personal: true,
  },
]

export const alsoBuilt =
  '400+ workflow templates for a US automation platform store, custom sales-ops flows (reply routing into Slack, an Asana PRD to Notion project analyzer), and early government-data scrapers during an internship at RESGOV.'

export const approach = {
  lead: 'I care about one thing: does it actually work. I would rather ship a rough system that runs than a perfect plan that does not, and I use every tool I can, including AI heavily, to get there fast.',
  groups: [
    {
      title: 'Agentic systems',
      body: 'Multi agent research and drafting pipelines, automated prompt tuning, and LLM orchestration across Gemini, Claude and GPT.',
    },
    {
      title: 'Automation & integrations',
      body: 'n8n, webhooks, APIs and middleware, self hosted infrastructure with Redis queues and Docker.',
    },
    {
      title: 'Ships across unknown stacks',
      body: 'I learn what a problem needs and build it, whether that is AWS infra, a scraper, a mobile app or a voice assistant.',
    },
  ],
}

export const about = [
  'I am Ayan, an automation and AI engineer based in India. I started a little under two years ago writing guides on business tools, and taught myself to build from there. Since then I have built the backend of a productized AI outreach platform, automated operations for e-commerce brands, and a handful of things just because I wanted to see if I could, like reverse engineering my motorcycle dashboard and building my own voice assistant.',
  'Most of what I know is self taught and picked up on the job. I work fastest when I am handed a messy problem and a blank page.',
]
