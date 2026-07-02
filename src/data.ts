// All site copy lives here. Style: bright, punchy, few words, no em dashes.

export const profile = {
  name: 'Ayan Das',
  role: 'Automation & AI Engineer',
  hi: "Hey, I'm Ayan",
  tagline: 'I build working systems, fast.',
  taglineAccent: 'Whatever the stack.',
  intro:
    'Self taught engineer who turns messy problems into things that actually run. From AI outreach platforms to a companion app for my motorcycle.',
  status: 'Open to remote roles',
  location: 'India · IST · happy on EU hours',
}

export const interests = [
  { emoji: '🏍️', label: 'Riding' },
  { emoji: '✈️', label: 'Travel' },
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
  { id: 'approach', label: 'How I work' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'about', label: 'About' },
]

export type Work = {
  id: string
  title: string
  body: string
  highlight: string
  stack: string[]
  personal?: boolean
}

export const work: Work[] = [
  {
    id: 'w1',
    title: 'AI Outreach Platform',
    body: 'Architected the automation backend of a productized cold-outreach SaaS, from a Make.com prototype to a live product on self-hosted n8n. A multi-agent research engine and a prompt-tuning loop that repairs its own prompts.',
    highlight: 'Campaign prep: 2 weeks → minutes',
    stack: ['n8n', 'Python', 'AWS', 'Redis', 'LLMs'],
  },
  {
    id: 'w2',
    title: 'E-commerce Ops Automation',
    body: 'One pipeline unifying Shopify, Flipkart and Amazon orders into Airtable, feeding a customer-intelligence agent. Built for Happy Wagon.',
    highlight: '3 storefronts, 1 source of truth',
    stack: ['Airtable', 'Python', 'AWS', 'Supabase'],
  },
  {
    id: 'w3',
    title: 'Amazon Price Tracker',
    body: 'A Lambda scraper that catches Amazon price drift and emails a report every morning. Replaced a daily manual check.',
    highlight: '3-4 hrs → ~20 min',
    stack: ['AWS Lambda', 'Python', 'anti-bot'],
  },
  {
    id: 'w4',
    title: 'Motorcycle Companion App',
    body: 'Reverse-engineered my bike\'s Bluetooth dashboard and built an Android app for nav, music and controls.',
    highlight: 'Weekend curiosity → real project',
    stack: ['Kotlin', 'Android', 'BLE'],
    personal: true,
  },
  {
    id: 'w5',
    title: 'JARVIS Voice Assistant',
    body: 'My own voice assistant with wake-word, speech-to-text and text-to-speech, iterated across ten versions.',
    highlight: '10 iterations to get it right',
    stack: ['Python', 'Whisper', 'Porcupine'],
    personal: true,
  },
]

export const approach = [
  { emoji: '🤖', title: 'Agentic systems', body: 'Multi-agent research and drafting pipelines, prompt tuning, LLM orchestration.' },
  { emoji: '🔗', title: 'Automation & APIs', body: 'n8n, webhooks and middleware on self-hosted infra with queues and Docker.' },
  { emoji: '⚡', title: 'Ships fast, any stack', body: 'Hand me a messy problem and a blank page. I learn what it needs and build it.' },
]

export const beyond = [
  { emoji: '🏍️', title: 'Riding', body: 'Weekends mean my bike and an open road.' },
  { emoji: '✈️', title: 'Travel', body: 'New places, slow trips, no checklists.' },
  { emoji: '📷', title: 'Photography', body: 'Shooting the road and the trips on my phone.' },
  { emoji: '🍥', title: 'Naruto', body: 'Long-time fan. Good company while a build runs.' },
]

export const about =
  'I taught myself to build a little under two years ago and have not stopped since. I am happiest with a hard problem, a blank page, and people who care about shipping something real.'
