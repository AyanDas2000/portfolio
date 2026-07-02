// All site copy. Style: bright, punchy, few words. NO em or en dashes anywhere.
// Theme: Naruto (orange energy) + Jiraiya (white / grey calm). Work = missions nested under journey stops.

export const profile = {
  name: 'Ayan Das',
  role: 'Automation & AI Engineer',
  hi: "Hey, I'm Ayan",
  tagline: 'I build working systems, fast.',
  taglineAccent: 'Whatever the stack.',
  intro:
    'Self taught engineer who turns messy problems into things that actually run. I use AI heavily to build fast, and I travel to see the world.',
  soul:
    'I build for a living, and I travel to feel alive. If that sounds like your kind of person, we will get along.',
  status: 'Open to remote roles',
  location: 'India, IST, happy on EU hours',
}

export const interests = [
  { emoji: '🏍️', label: 'Riding' },
  { emoji: '🧭', label: 'Travel' },
  { emoji: '📷', label: 'Photography' },
  { emoji: '🍥', label: 'Naruto' },
]

export const links = {
  email: 'hello@example.com', // TODO: real email
  linkedin: 'https://www.linkedin.com/in/ayan-das-ad103/',
  x: 'https://x.com/AyanDas18189209',
}

export const nav = [
  { id: 'journey', label: 'Journey' },
  { id: 'about', label: 'About' },
  { id: 'beyond', label: 'Beyond' },
]

export type Mission = {
  id: string
  title: string
  status: string // LIVE / SHIPPED / PERSONAL
  client: string
  classified?: boolean
  highlight: string
  summary: string
  detail: string
  stack: string[]
  image?: string // drop a file at public/work/<id>.png later
}

export type Stop = {
  id: string
  org: string
  role: string
  when: string
  blurb: string
  current?: boolean
  missions: Mission[]
}

export const journey: Stop[] = [
  {
    id: 'resgov',
    org: 'ResGov',
    role: 'Data & Automation Intern',
    when: '2024',
    blurb: 'The starting point. A short paid internship where I first caught the automation bug.',
    missions: [
      {
        id: 'm-resgov-1',
        title: 'Government Data Scraping',
        status: 'SHIPPED',
        client: 'ResGov',
        highlight: 'Where it all started',
        summary: 'Pulled and cleaned structured data from official government sites.',
        detail:
          'My first real automation work. Scraped official government sources with Python, BeautifulSoup and Selenium for the JavaScript heavy pages, and iterated with early GPT (3.5 and 4) to shape and clean the output. Short internship, but it is where I learned to make computers do the boring parts.',
        stack: ['Python', 'BeautifulSoup', 'Selenium', 'GPT-4'],
      },
    ],
  },
  {
    id: 'primeloop',
    org: 'Primeloop',
    role: 'Automation Engineer',
    when: '2024 to 2025',
    blurb: 'Built the automation backbone alongside founder Tanmay. This is where I went deep.',
    missions: [
      {
        id: 'm-pl-1',
        title: 'Amazon Price Tracker',
        status: 'SHIPPED',
        client: 'Happy Wagon',
        highlight: '3 to 4 hrs down to ~20 min',
        summary: 'A Lambda scraper that catches Amazon price drift and reports it daily.',
        detail:
          'Their listings kept drifting out of sync with Seller Central pricing, so someone checked hundreds of products by hand every day. I replaced that with an AWS Lambda scraper that got past Amazon bot checks, cross checked live listings against Seller Central data, and emailed a full discrepancy report every morning. Parallelized it from three to four hours down to about twenty minutes.',
        stack: ['AWS Lambda', 'Python', 'anti-bot APIs'],
      },
      {
        id: 'm-pl-2',
        title: 'E-commerce Ops Automation',
        status: 'SHIPPED',
        client: 'Happy Wagon',
        highlight: '3 storefronts, 1 source of truth',
        summary: 'One pipeline unifying Shopify, Flipkart and Amazon orders into Airtable.',
        detail:
          'Every order across three storefronts flowed into Airtable as the single source of truth, then into a customer intelligence agent sitting on top of their support tool. I also built a chat extension UI and an early internal tool that ingested customer conversations to surface business insight.',
        stack: ['Airtable', 'Python', 'AWS', 'Supabase'],
      },
    ],
  },
  {
    id: 'outpilot',
    org: 'Outpilot.ai',
    role: 'Automation & AI Engineer', // TODO: confirm your exact title
    when: '2025 to now',
    blurb: 'Where the outreach work grew into a real product.',
    current: true,
    missions: [
      {
        id: 'm-op-1',
        title: 'AI Outreach Platform',
        status: 'LIVE',
        client: 'Partners incl. Brooklyn Pickleball, Brasil Rugby',
        highlight: 'Campaign prep cut from ~2 weeks to minutes',
        summary: 'The automation backend of a productized cold-outreach SaaS.',
        detail:
          'Took it from a Make.com prototype to a live product on self hosted n8n. Built a multi agent research engine (Gemini plus search APIs) at roughly a tenth the cost of ChatGPT research, a Redis queue and Docker parallelism for throughput, and an automated prompt tuning loop that tests and rewrites its own prompts until they hold up. Reply handling across many inboxes and domains. Some specifics stay under NDA.',
        stack: ['n8n', 'Python', 'AWS', 'Redis', 'LLMs'],
      },
    ],
  },
]

// Personal builds, off the main path.
export const sideQuests: Mission[] = [
  {
    id: 'sq-1',
    title: 'Motorcycle Companion App',
    status: 'PERSONAL',
    client: 'For my own bike',
    highlight: 'Weekend curiosity, real project',
    summary: "Reverse-engineered my bike's Bluetooth dashboard and built an Android app for it.",
    detail:
      'Decompiled the stock app, mapped the BLE protocol (frames, opcodes, checksums), then built an Android companion that pushes navigation and music to the cluster and lets me control music from the bike own buttons. Entirely mine, and open to show.',
    stack: ['Kotlin', 'Android', 'BLE'],
  },
  {
    id: 'sq-2',
    title: 'JARVIS Voice Assistant',
    status: 'PERSONAL',
    client: 'For myself',
    highlight: '10 iterations',
    summary: 'My own voice assistant with wake-word, speech-to-text and text-to-speech.',
    detail:
      'Built from scratch with wake-word detection (Porcupine), speech-to-text (Whisper and Vosk) and text-to-speech. Iterated across ten versions to get the response time and reliability where I wanted them.',
    stack: ['Python', 'Whisper', 'Porcupine'],
  },
  {
    id: 'sq-3',
    title: 'Early experiments',
    status: 'PERSONAL',
    client: 'Learning by building',
    highlight: 'Side quests',
    summary: 'An AI data analyst, scraping tools, and other things I built to learn.',
    detail:
      'Before the bigger work, a pile of small builds: an AI data analyst, various scrapers, and half-finished ideas I chased just to see if I could. This is where a lot of the muscle came from.',
    stack: ['Python', 'LLMs', 'APIs'],
  },
]

export const values = [
  { emoji: '🛠️', title: 'Build with AI', body: 'Use every tool I can, AI heavily, to make real things fast and well.' },
  { emoji: '🌏', title: 'See the world', body: 'Long bike tours and slow travel. New places keep me curious.' },
  { emoji: '🌱', title: 'Leave it better', body: 'Do genuinely good work for my people, and put weight behind sustainability.' },
]

export const jiraiya =
  'A bit guided by Jiraiya: stay curious, keep moving, and back the people you believe in.'

export const about =
  'I taught myself to build a little under two years ago and have not stopped since. I am happiest with a hard problem, a blank page, and people who care about shipping something real.'

export const beyond = [
  { emoji: '🏍️', title: 'Riding', body: 'Weekends and long tours on the bike.' },
  { emoji: '🧭', title: 'Travel', body: 'New places, slow trips, no rush.' },
  { emoji: '📷', title: 'Photography', body: 'Holding on to the road and the trips.' },
  { emoji: '🍥', title: 'Naruto', body: 'Jiraiya guy at heart. Itachi and Kakashi are cool.' },
]

// Fill in AFTER Tanmay / Richard approve the wording.
export const testimonials: { quote: string; name: string; role: string }[] = []
