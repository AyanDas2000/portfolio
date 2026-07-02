// All site copy lives here. Style: bright, punchy, few words, no em dashes.
// Theme: subtle Naruto / journey. Work framed as redacted "mission files" (NDA).

export const profile = {
  name: 'Ayan Das',
  role: 'Automation & AI Engineer',
  hi: "Hey, I'm Ayan",
  tagline: 'I build working systems, fast.',
  taglineAccent: 'Whatever the stack.',
  intro:
    'Self taught engineer who turns messy problems into things that actually run. I use AI heavily to build fast, and I ride to see the world.',
  soul:
    'I build for a living, and I travel to feel alive. If that sounds like your kind of person, we will get along.',
  status: 'Open to remote roles',
  location: 'India · IST · happy on EU hours',
}

export const interests = [
  { emoji: '🏍️', label: 'Bike tours' },
  { emoji: '🚆', label: 'Train travel' },
  { emoji: '📷', label: 'Photography' },
  { emoji: '🍥', label: 'Naruto' },
]

export const techMarquee = [
  'n8n', 'Python', 'AWS', 'Docker', 'Redis', 'FastAPI', 'Airtable',
  'Supabase', 'LLMs', 'Kotlin', 'JavaScript', 'Webhooks', 'Multi-agent',
]

export const links = {
  email: 'hello@example.com', // TODO: real email
  linkedin: 'https://www.linkedin.com/in/ayan-das-ad103/',
  x: 'https://x.com/AyanDas18189209',
}

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'about', label: 'About' },
  { id: 'beyond', label: 'Beyond' },
]

// ---- Work: redacted "mission files" ----
export type Work = {
  id: string
  code: string // mission code, e.g. "01"
  title: string
  status: string // LIVE / SHIPPED / PERSONAL
  client: string // shown; use [CLASSIFIED] where NDA
  summary: string
  highlight: string
  detail: string
  stack: string[]
  classified?: boolean
  image?: string // drop a file at public/work/<id>.png later
}

export const work: Work[] = [
  {
    id: 'w1',
    code: '01',
    title: 'AI Outreach Platform',
    status: 'LIVE',
    client: 'Partners incl. Brooklyn Pickleball, Brasil Rugby',
    summary:
      'The automation backend of a productized cold-outreach SaaS, prototype to live revenue.',
    highlight: 'Campaign prep: 2 weeks → minutes',
    detail:
      'Took it from a Make.com prototype to a live product on self-hosted n8n. Built a multi-agent research engine (Gemini plus search APIs) at roughly a tenth the cost of ChatGPT research, a Redis queue and Docker parallelism for throughput, and an automated prompt-tuning loop that tests and rewrites its own prompts until they hold up. Reply handling across many inboxes and domains. Some specifics stay under NDA.',
    stack: ['n8n', 'Python', 'AWS', 'Redis', 'LLMs'],
  },
  {
    id: 'w2',
    code: '02',
    title: 'E-commerce Ops Automation',
    status: 'SHIPPED',
    client: 'Happy Wagon',
    summary:
      'One pipeline unifying Shopify, Flipkart and Amazon orders, feeding a customer-intelligence agent.',
    highlight: '3 storefronts, 1 source of truth',
    detail:
      'Every order flowed into Airtable as the single source of truth, then into a customer-intelligence agent sitting on top of their support tool. Also built a chat extension UI and an early internal tool that ingested customer conversations to surface business insight.',
    stack: ['Airtable', 'Python', 'AWS', 'Supabase'],
  },
  {
    id: 'w3',
    code: '03',
    title: 'Amazon Price Tracker',
    status: 'SHIPPED',
    client: '[CLASSIFIED]',
    classified: true,
    summary:
      'A Lambda scraper that catches Amazon price drift and reports it every morning.',
    highlight: '3-4 hrs → ~20 min',
    detail:
      'Their listings kept drifting out of sync with Seller Central pricing, so someone checked hundreds of products by hand daily. I replaced that with an AWS Lambda scraper that got past Amazon bot checks, cross-checked live listings against Seller Central data, and emailed a full discrepancy report every morning. Parallelized it from three to four hours to about twenty minutes.',
    stack: ['AWS Lambda', 'Python', 'anti-bot'],
  },
  {
    id: 'w4',
    code: '04',
    title: 'Motorcycle Companion App',
    status: 'PERSONAL',
    client: 'For my own bike',
    summary:
      "Reverse-engineered my bike's Bluetooth dashboard and built an Android app for it.",
    highlight: 'Weekend curiosity → real project',
    detail:
      'Decompiled the stock app, mapped the BLE protocol (frames, opcodes, checksums), then built an Android companion that pushes navigation and music to the cluster and lets me control music from the bike own buttons. This one is entirely mine and open to show.',
    stack: ['Kotlin', 'Android', 'BLE'],
  },
  {
    id: 'w5',
    code: '05',
    title: 'JARVIS Voice Assistant',
    status: 'PERSONAL',
    client: 'For myself',
    summary:
      'My own voice assistant with wake-word, speech-to-text and text-to-speech.',
    highlight: '10 iterations to get it right',
    detail:
      'Built from scratch with wake-word detection (Porcupine), speech-to-text (Whisper / Vosk) and text-to-speech (edge-tts). Iterated across ten versions to get the response time and reliability where I wanted them.',
    stack: ['Python', 'Whisper', 'Porcupine'],
  },
]

// ---- Journey: the route the bike travels ----
export const journey = [
  {
    id: 'j1',
    org: 'ResGov',
    role: 'Data & Automation Intern',
    when: '2024', // TODO confirm
    body: 'Where I first learned to scrape and automate. Government data pipelines in Python, iterating with early LLMs to clean and structure the mess.',
  },
  {
    id: 'j2',
    org: 'Primeloop',
    role: 'Automation Engineer',
    when: '2024 — 2025', // TODO confirm
    body: 'Built the automation backbone alongside founder Tanmay: client workflow systems, an e-commerce ops pipeline, and the research and outreach engine that later grew into a product.',
  },
  {
    id: 'j3',
    org: 'Outpilot.ai',
    role: 'Automation & AI Engineer',
    when: '2025 — now', // TODO confirm
    body: 'Architect the backend of a productized AI outreach platform. Multi-agent research, self-hosted n8n, prompt-tuning loops, and an admin console to run it all.',
    current: true,
  },
]

// ---- What I'm about (the soul / life vision) ----
export const values = [
  { emoji: '🛠️', title: 'Build with AI', body: 'Use every tool I can, AI heavily, to make real things fast and well.' },
  { emoji: '🌏', title: 'See the world', body: 'Long bike tours and slow train journeys. New places keep me curious.' },
  { emoji: '🌱', title: 'Leave it better', body: 'Do genuinely good work for my people, and put weight behind sustainability.' },
]

export const jiraiya =
  'A bit guided by Jiraiya: stay curious, keep moving, and back the people you believe in.'

export const about =
  'I taught myself to build a little under two years ago and have not stopped since. I am happiest with a hard problem, a blank page, and people who care about shipping something real.'

export const beyond = [
  { emoji: '🏍️', title: 'Riding', body: 'Weekends and long tours on the bike.' },
  { emoji: '🚆', title: 'Trains', body: 'Slow journeys, window seat, no rush.' },
  { emoji: '📷', title: 'Photography', body: 'Holding on to the road and the trips.' },
  { emoji: '🍥', title: 'Naruto', body: 'Jiraiya guy at heart. Itachi and Kakashi are cool.' },
]

// Testimonials: fill in AFTER Tanmay / Richard approve the wording.
export const testimonials: { quote: string; name: string; role: string }[] = []
