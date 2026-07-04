// All site copy, verbatim from website-copy-v4.md. Do not rewrite or embellish.
// Contains ZERO em or en dashes. Ranges use "to"; separators use commas.

export const links = {
  email: 'ayan11112000@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayan-das-ad103/',
  x: 'https://x.com/AyanDas18189209',
}

export const nav = [
  { id: 'journey', label: 'Journey' },
  { id: 'craft', label: 'Craft' },
  { id: 'about', label: 'About' },
]

// 1. Hero + 2. Soul
export const hero = {
  eyebrow: 'Self-taught AI automation engineer, two years in.',
  headline: "Give me a vague idea. I'll hand you a system that runs without me.",
  subhead:
    "Not long ago I was proving theorems. Now I build the backend behind AI products people pay to use. A lot of it runs quietly in the background. Some of it I'm not allowed to show you.",
  soul:
    "I want to build real things with AI, with people worth betting on. If that's you, you already know where to find me.",
}

// 3. Origin: Pure Mathematics
export const origin = {
  title: 'Pure Mathematics',
  body: "Before any of this, I studied pure mathematics. Group theory, topology, linear algebra, the kind of math with no obvious use until you notice it's really just a way of seeing structure everywhere. That's still how I think. I look for the shape of a problem before I touch the details, and once the structure is right, the rest tends to follow.",
}

export type Mission = {
  id: string
  title: string
  highlight: string
  debrief: string
  tech?: string[]
  status?: string // e.g. LIVE
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

// 4. The Journey
export const journey: Stop[] = [
  {
    id: 'resgov',
    org: 'ResGov',
    role: 'Project Intern',
    when: '2024',
    blurb: 'A short internship, and the place it all started.',
    missions: [
      {
        id: 'resgov-1',
        title: 'First contact with data',
        highlight: 'Scraped and structured data for 600,000+ panchayats.',
        debrief:
          "My first real job with data. I built a pipeline that scraped and organized records for over six lakh panchayats, using Python, BeautifulSoup, Selenium and Requests, and leaned on the early GPT models to make the code faster and harder to break. First time I watched a machine finish an afternoon of someone's work in seconds. I was hooked.",
        tech: ['Python', 'BeautifulSoup', 'Selenium', 'Requests', 'GPT'],
      },
    ],
  },
  {
    id: 'primeloop',
    org: 'Primeloop',
    role: 'Automation Engineer',
    when: '2024 to 2025',
    blurb:
      'Two of us. The founder brought the clients, I built the systems. This is where scripts turned into systems.',
    missions: [
      {
        id: 'primeloop-1',
        title: 'A library of 250+ workflows',
        highlight: '250+ reusable templates, plus the guides to run them.',
        debrief:
          "I built more than 250 automation templates for a US AI-agent platform, along with the written guides that made them usable by people who don't code. Working automation, straight out of the box. Which platform, and what it powers, stays with the client.",
      },
      {
        id: 'primeloop-2',
        title: 'Happy Wagon, on its own',
        highlight: 'Prices tracked automatically, nothing slipping past.',
        debrief:
          'For Happy Wagon I built the pipeline that ran their e-commerce operations, and a tracker that watched Amazon for price drift and caught a moved price before a person would have. Small edges add up when you sell online.',
        tech: ['Python', 'Selenium', 'automation'],
      },
      {
        id: 'primeloop-3',
        title: 'The plumbing',
        highlight: 'Hours quietly handed back to teams that never saw the code.',
        debrief:
          'For other clients I built the unglamorous parts. Notification handling, reply routing, and an analyzer that pulled PRDs out of Asana and turned them into structured pages in Notion. Boring to describe. It saved people real time.',
        tech: ['n8n', 'Asana', 'Notion', 'webhooks'],
      },
      {
        id: 'primeloop-4',
        title: 'The first outreach engine',
        highlight: 'The rough draft of what became my main work.',
        debrief:
          'The first time I built something that researched companies and reached out without a human driving it. It started in Make.com, moved to n8n and self-hosted infrastructure, and went through more iterations than I can count. Rough at first, but it was the seed of the platform I work on now. A partnerships agency found our two-person team on the back of it, and that turned into Outpilot.',
        tech: ['Make.com', 'n8n', 'Python'],
      },
    ],
  },
  {
    id: 'outpilot',
    org: 'Outpilot.ai',
    role: 'Senior Forward Deployed Engineer',
    when: '2025 to now',
    blurb:
      'Outpilot is a managed service that runs different kinds of outreach: sponsorship, partnership and B2B. Two halves to what I do here.',
    current: true,
    missions: [
      {
        id: 'outpilot-1',
        title: 'The engine',
        highlight: 'The scaling infrastructure the whole team runs on.',
        status: 'LIVE',
        debrief:
          'This one I built hand in hand with our founder. He set the vision and the direction, and I designed and built the architecture that makes it real, the infrastructure, the workflows, the way it holds together at scale. It is the framework a set of deployed engineers, me included, use to run personalized outreach with precision. How it works inside stays with the company. That it works is the part I can show you.',
      },
      {
        id: 'outpilot-2',
        title: 'The campaigns',
        highlight: 'Live campaigns for real partners, booking real meetings.',
        status: 'LIVE',
        debrief:
          'On top of that framework I build and run campaigns for specific partners, including Brooklyn Pickleball and Brasil Rugby. A campaign that used to take a month to stand up now ships in a few days, and a good one can book several meetings in a week. The rest of the roster stays off the page.',
      },
    ],
  },
]

// 5. How I build (Craft)
export const craft = {
  title: 'How I build',
  points: [
    'I self-host my automation stacks on headless servers and keep them lean and redundant. Redis to queue work across multiple workers, Docker to keep it reproducible, backups in more than one place so nothing has a single point of failure. When the big cloud bill stopped making sense, I moved to leaner infrastructure.',
    'I work in agentic workflows natively, single-agent and multi-agent, on the cloud and increasingly from my own terminal. I build my own tooling, including a library of skills that let me run large systems from the command line.',
    "I built a prompt loop that tunes itself. It runs, checks whether the output holds, rewrites the prompt when it doesn't, and repeats until it stops failing. How it decides what is good enough is the interesting part.",
  ],
}

// 6. The Stack
export const stack: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Python', 'JavaScript'] },
  {
    label: 'Automation (no-code / low-code)',
    items: ['n8n', 'Make.com', 'Zapier', 'Lindy'],
  },
  {
    label: 'APIs & data',
    items: ['REST', 'SOAP', 'webhooks', 'FastAPI', 'RapidAPI', 'Apify', 'Serper.dev', 'Parallel.ai'],
  },
  {
    label: 'AI / LLMs',
    items: [
      'multi-provider via OpenRouter (Gemini, Claude, GPT, Mistral, DeepSeek, Grok)',
      'single and multi-agent pipelines',
      'self-tuning prompt loops',
      'custom Claude Code skills',
    ],
  },
  {
    label: 'Backend & infra',
    items: [
      'self-hosted servers (AWS, Hetzner)',
      'Redis',
      'Docker',
      'serverless edge functions',
      'Supabase',
      'PostgreSQL',
      'Airtable',
    ],
  },
  { label: 'Scraping', items: ['BeautifulSoup', 'Selenium', 'anti-bot handling'] },
]

// 7. Side Quests
export const sideQuestsIntro =
  'Things I built off the main path. Some useful, some just to prove I could.'

export const sideQuests: { title: string; body: string }[] = [
  {
    title: 'Teaching',
    body: "I've tutored on the side for years, teaching people the things I once had to teach myself. Winding it down now, but it taught me that if you can't explain a thing simply, you don't really have it.",
  },
  {
    title: 'A companion app for my motorcycle',
    body: 'My bike ships with a companion app from the manufacturer, but it is laggy and half-broken. I reverse-engineered it, stripped it to the frame, and rebuilt it sleek, the app it should have shipped with. Now my phone talks to my motorcycle properly.',
  },
  {
    title: 'JARVIS',
    body: 'A voice assistant built from scratch. Yes, named after that one. I wanted to see how far I could get building my own from nothing.',
  },
  {
    title: 'AI Analyst',
    body: 'An older build that reads a dataset and tells you what is actually going on in it, so analysis starts from questions instead of spreadsheets.',
  },
  {
    title: 'Support tooling',
    body: 'A ticket viewer and an auth bridge I built to make messy support queues legible.',
  },
  {
    title: 'The experiments',
    body: 'Machine-learning notebooks, data-analysis projects, scrapers, a drawer of half-built ideas from the years before the real work.',
  },
]

// 8. About / How I operate
export const about = {
  body: "Here is how I actually work. Hand me a stack I've never touched and I'll ship something that runs on it before the week is out. I don't get attached to tools. I care whether the thing works, and whether it keeps working after I walk away. I use AI heavily and I've gotten good at getting it to do what I mean. Most of what I do is take an idea that's still fuzzy and turn it into something you can rely on. Away from the screen I ride motorcycles on long routes with no real plan, I travel slowly, and I usually have a camera on me. I want the things I build to be worth building, which more and more means putting weight behind sustainability.",
  creed:
    "There's a character I've followed since I was a kid whose whole thing was staying curious, never sitting still, and putting everything behind the people he believed in. I've quietly built my life around that.",
}

// 9. Contact
export const contact = {
  headline: 'Bring me the messy version.',
  line:
    'The vaguer and more unsolved it is, the more I want to hear about it. Email is the fastest way in.',
}

// 10. Jiraiya pull-quotes (author rendered without a dash)
export const quotes = {
  // top (near the work): the never-give-up line
  main: {
    text: 'A real ninja is one who endures. All you need is the guts to never give up.',
    author: 'Jiraiya',
  },
  // bottom (the closing, deeper philosophy)
  second: {
    text:
      'When people get hurt, they learn to hate. But knowing that pain allows people to be kind.',
    author: 'Jiraiya',
  },
}

// 11. Console easter egg
export const consoleLines = [
  '> boot sequence complete. all nodes online.',
  "> you opened the console. that means you're curious, which was the whole point.",
  '> reach me: ayan11112000@gmail.com. and for the record, the toad sage had it right.',
]

// Side-quest branches that hang off the main path at each era.
export type Branch = { id: string; title: string; body: string; tech?: string[] }
export const branchesByStop: Record<string, Branch[]> = {
  resgov: [
    { id: 'b-teach', title: 'Teaching', body: "I've tutored on the side for years, teaching people the things I once had to teach myself. It taught me that if you can't explain a thing simply, you don't really have it." },
    { id: 'b-ml', title: 'ML notebooks', body: 'Notebooks where I first pushed on machine learning, the place the math started meeting code.' },
    { id: 'b-data', title: 'Data analysis', body: 'Pulling datasets apart to find what they were actually saying, before the answer was obvious.' },
    { id: 'b-scrape', title: 'Scraping experiments', body: 'Early scrapers and small automations. Rough, but the muscle that led to everything after.', tech: ['Python', 'Selenium'] },
  ],
  primeloop: [
    { id: 'b-analyst', title: 'AI Analyst', body: 'A build that reads a dataset and tells you what is actually going on in it, so analysis starts from questions instead of spreadsheets.' },
    { id: 'b-jarvis', title: 'JARVIS', body: 'A voice assistant built from scratch. Yes, named after that one. I wanted to see how far I could get building my own from nothing.', tech: ['Python', 'Whisper'] },
    { id: 'b-support', title: 'Support tooling', body: 'A ticket viewer and an auth bridge I built to make messy support queues legible.' },
    { id: 'b-exp', title: 'The experiments', body: 'Machine-learning notebooks, data-analysis projects, scrapers, a drawer of half-built ideas from the years before the real work.' },
  ],
  outpilot: [
    { id: 'b-moto', title: 'Bike dashboard hack', body: 'My bike ships with a companion app from the manufacturer, but it is laggy and half-broken. I reverse-engineered its Bluetooth, stripped it to the frame, and rebuilt it sleek. Now my phone talks to my motorcycle properly.', tech: ['Kotlin', 'BLE'] },
  ],
}

// Who the work reached, grouped by where I built it.
export const clients: { via: string; note: string; names: string[] }[] = [
  { via: 'Primeloop', note: 'Systems and automation for real businesses.', names: ['Happy Wagon'] },
  {
    via: 'Outpilot.ai',
    note: 'Live outreach campaigns I built and run.',
    names: ['Brooklyn Pickleball', 'Brasil Rugby', 'The Sponsorship Guy'],
  },
]

// Approved testimonials (fill in once Richard/Tanmay confirm the wording).
export const testimonialQuotes: { quote: string; name: string; role: string }[] = [
  // { quote: '...', name: 'Richard Cronin', role: 'The Sponsorship Guy' },
]

// Public recognition. Framed honestly: this praised the Outpilot work, and I built and ran
// the campaign behind it. Confirm wording + get Richard's nod before deploying public.
export const recognition = {
  quote: 'No slop. The kind of copy that gets the recipient to feel known.',
  author: 'Larry Weil',
  authorRole: 'President & Founder, The Sponsorship Guy',
  note: 'Public praise for the Outpilot work. I built and ran the campaign it was written about.',
  url: '', // add the LinkedIn post link if you want it clickable
}

// Which schematic art each project/side-quest shows. Keyed by mission/branch id.
export const artById: Record<string, string> = {
  'resgov-1': 'scrape',
  'primeloop-1': 'flow',
  'primeloop-2': 'ecommerce',
  'primeloop-3': 'infra',
  'primeloop-4': 'ai',
  'outpilot-1': 'infra',
  'outpilot-2': 'ai',
  'b-teach': 'teach',
  'b-ml': 'data',
  'b-data': 'data',
  'b-scrape': 'scrape',
  'b-analyst': 'ai',
  'b-jarvis': 'voice',
  'b-support': 'flow',
  'b-exp': 'data',
  'b-moto': 'mobile',
}
