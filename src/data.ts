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
  eyebrow: 'Forward deployed AI engineer. Self-taught, two years in.',
  headline: "Give me a business problem. I'll ship the AI system that runs it.",
  subhead:
    "I am an AI native builder. I live inside Claude Code, Codex and the agent stack, and I use them to get from a fuzzy problem to something running in production, fast. Two years ago I was proving theorems. Today I build and run the systems that AI products depend on, and I work directly with the people who use them.",
  soul:
    "I want to build real things with AI, with people worth betting on. If that's you, you already know where to find me.",
  achievements: [
    "Built a platform's core engine, hand in hand with its founder",
    'Agentic systems running in production, not demos',
    'Order pipelines and internal tools that teams run on daily',
    'Pure math to production in two years, self-taught',
  ],
}

// 3. Origin: Pure Mathematics
export const origin = {
  title: 'Pure Mathematics',
  body: "Before any of this I studied pure mathematics. It taught me to find the shape of a problem before touching the details. Once the structure is right, the rest tends to follow.",
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
          "My first real job with data. I built a pipeline that scraped and organized records for over six lakh panchayats, using Python, BeautifulSoup, Selenium and Requests, and leaned on ChatGPT to make the code faster and harder to break. First time I watched a machine finish an afternoon of someone's work in seconds. I was hooked.",
        tech: ['Python', 'BeautifulSoup', 'Selenium', 'Requests', 'ChatGPT'],
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
          "I built more than 250 automation templates for a client's own platform, along with the written guides that made them usable by people who don't code. Working automation, straight out of the box. Which platform, and what it powers, stays with the client.",
      },
      {
        id: 'primeloop-2',
        title: 'Happy Wagon, on its own',
        highlight: 'Prices tracked automatically, nothing slipping past.',
        debrief:
          'For Happy Wagon I built the pipeline that ran their e-commerce operations, and a tracker that watched Amazon for price drift and caught a moved price before a person would have. Small edges add up when you sell online.',
        tech: ['n8n', 'ScrapingBee', 'AWS Lambda', 'Airtable', 'JavaScript'],
      },
      {
        id: 'primeloop-5',
        title: 'Every order, tracked to the door',
        highlight: 'End to end tracking across three Shopify stores, with an AI that answers for it.',
        debrief:
          'A layered system for Happy Wagon that followed every order across three Shopify stores, from the moment it was placed all the way to delivered, and through returns when it came to that. Not one workflow but a set of them, some live and some sequential, kept deduplicated so the picture was always whole and always current, and mapped back to Airtable. On top of that I built an assistant that read the Airtable base and answered "where is my order" in a clean, consistent format, and a private helpdesk extension that drafted customer replies from the order data and the team\'s guidance, with the option to tune a reply by hand or hand it back to the model. Big and layered. It joined more moving parts than most things ever need to.',
        tech: ['Shopify', 'n8n', 'Airtable', 'webhooks', 'LLM', 'JavaScript'],
      },
      {
        id: 'primeloop-3',
        title: 'The plumbing',
        highlight: 'Hours quietly handed back to teams that never saw the code.',
        debrief:
          'For other clients I built the unglamorous parts. Notification handling, reply routing, and an analyzer that pulled PRDs out of Asana and turned them into structured pages in Notion. Boring to describe. It saved people real time.',
        tech: ['n8n', 'Asana', 'Notion', 'webhooks', 'JavaScript'],
      },
      {
        id: 'primeloop-4',
        title: 'The first outreach engine',
        highlight: 'The rough draft of what became my main work.',
        debrief:
          'The first time I built something that researched companies and reached out without a human driving it. It started in Make.com, moved to n8n and self-hosted infrastructure, and went through more iterations than I can count. I ran early campaigns on it too, internal and external, including one for Premier Intros. Rough at first, but it was the seed of the platform I work on now. A partnerships agency found our two-person team on the back of it, and that turned into Outpilot.',
        tech: ['Make.com', 'n8n', 'Gemini', 'Serper.dev', 'Firecrawl', 'Apify', 'AWS', 'RapidAPI', 'JavaScript'],
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
        highlight: 'Well over a dozen live campaigns, booking real meetings.',
        status: 'LIVE',
        debrief:
          'This is the half of the job people see. I run outreach campaigns end to end: the lead generation and company prospecting are mine, and I tune the prompts and the email engineering so the whole thing holds up at scale. The words come from people who write for a living; I make the machine deliver them right. Well over a dozen campaigns have gone out now, across sponsorship, partnership and B2B, for partners including Brooklyn Pickleball, Brasil Rugby, Tomorrow City and The Sponsorship Guy, alongside a run of others I cannot name and demos that some of the biggest names in sport asked us to build. A campaign that used to take a month to stand up now ships in days, and a good one books several meetings in a week. Most of the roster stays off the page.',
      },
      {
        id: 'outpilot-3',
        title: 'The control room',
        highlight: 'The admin panel, dashboards and internal tools the deployed engineers run on.',
        status: 'LIVE',
        debrief:
          'The engine runs, but people still have to drive it, so I built the layer they drive it from. A role-based admin panel where each deployed engineer sees and runs only the campaigns they should. An operations UI that turns a pile of moving parts into a few clear controls. Monitoring views in Grafana that show how resources are being spent in real time, and backups running quietly underneath so nothing is ever a single mistake away from gone. There are also a few cost-saving internals I built that quietly keep real money off the bill. The outbound mechanics stay behind the curtain. This is the room you would actually sit in to run it.',
      },
    ],
  },
]

// 5. How I build (Craft)
export const craft = {
  title: 'How I work',
  points: [
    {
      head: 'Start with the problem, not the tool',
      body: 'I sit with the actual business problem first. What needs to happen, what is in the way, and the ways it could be solved. The stack is a choice I make later, based on the need, not the other way around.',
    },
    {
      head: 'Build fast, then test it hard',
      body: 'I get to a working version quickly, then test it against the real use case again and again until it holds. What breaks tells me what to fix. AI lets me move through this loop faster than most.',
    },
    {
      head: 'Deploy it tuned, for real use',
      body: 'Then I ship it tuned for production and the people who depend on it. Self hosting, agents, whatever it takes is just the means. The point is something that keeps working after I walk away.',
    },
  ],
}

// 6. The Stack. `primary` = my headline AI-native stack (rendered large). `small` = a low-key strip.
export const stack: { label: string; items: string[]; primary?: boolean; small?: boolean }[] = [
  {
    label: 'My primary stack',
    primary: true,
    items: ['Claude Code', 'Codex', 'ChatGPT', 'Factory Droid', 'custom skills', 'agentic / multi-agent systems', 'prompt engineering', 'n8n (expert)'],
  },
  { label: 'Languages', items: ['Python', 'JavaScript', 'R'] },
  { label: 'Automation & integration', items: ['Make.com', 'Zapier', 'webhooks'] },
  {
    label: 'APIs & data',
    items: ['REST', 'SOAP', 'FastAPI', 'RapidAPI', 'Apify', 'Firecrawl', 'Serper.dev', 'Parallel.ai'],
  },
  {
    label: 'Data & notebooks',
    items: ['Jupyter', 'Google Colab', 'Anaconda', 'pandas', 'NumPy', 'scikit-learn', 'Excel', 'Tableau', 'Power BI'],
  },
  {
    label: 'Backend & infra',
    items: [
      'self-hosted servers (AWS, Hetzner)',
      'AWS Lambda',
      'Redis',
      'Docker',
      'serverless edge functions',
      'Supabase',
      'PostgreSQL',
      'Airtable',
      'Shopify',
      'Grafana',
    ],
  },
  { label: 'Scraping', items: ['BeautifulSoup', 'Selenium', 'Requests', 'ScrapingBee'] },
  { label: 'Models I reach for', small: true, items: ['Claude', 'GPT', 'Gemini', 'plus more via OpenRouter'] },
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
    { id: 'b-ml', title: 'ML notebooks', body: 'Notebooks where I first pushed on machine learning, the place the math started meeting code. Python and R, run in Jupyter and Colab.', tech: ['Python', 'R', 'Jupyter', 'scikit-learn', 'pandas', 'NumPy'] },
    { id: 'b-data', title: 'Data analysis', body: 'Pulling datasets apart to find what they were actually saying, before the answer was obvious. Whatever tool fit the question, from a spreadsheet to a notebook to a dashboard.', tech: ['Excel', 'Python', 'R', 'Tableau', 'Power BI', 'Jupyter'] },
    { id: 'b-scrape', title: 'Scraping experiments', body: 'Early scrapers and small automations. Rough, but the muscle that led to everything after.', tech: ['Python', 'Selenium', 'BeautifulSoup', 'Requests', 'ScrapingBee'] },
  ],
  primeloop: [
    { id: 'b-analyst', title: 'AI Analyst', body: 'An older build, and an idea I had before I had a name for it. I would show a model a small slice of a dataset, let it see the shape and the claims, and it would call for a tool by name. The tool ran, handed its result back, and the model decided what came next: clean this, run a regression, try a random forest. Standard data cleaning and machine-learning steps, driven by the model instead of by me. Tool use before I knew the word for it.', tech: ['Python', 'Gemini Flash', 'scikit-learn'] },
    { id: 'b-exp', title: 'The experiments', body: 'Machine-learning notebooks, data-analysis projects, scrapers, a drawer of half-built ideas from the years before the real work.', tech: ['Python', 'R', 'scikit-learn', 'Selenium', 'ScrapingBee', 'Jupyter'] },
  ],
  outpilot: [
    { id: 'b-moto', title: 'Bike dashboard hack', body: 'My bike ships with a companion app from the manufacturer, but it is laggy and half-broken. I reverse-engineered its Bluetooth, stripped it to the frame, and rebuilt it sleek. Now my phone talks to my motorcycle properly.', tech: ['Kotlin', 'BLE'] },
    { id: 'b-jarvis', title: 'JARVIS', body: 'A voice assistant built from scratch with a friend, running on a Raspberry Pi. Everything local: it listened, transcribed, and answered on the device, so nothing left the room. I went through a handful of local models to get it there. Not the slickest thing I have made, but the one I learned the most from. This is the version I ran while at Outpilot.', tech: ['Raspberry Pi', 'faster-whisper', 'Porcupine', 'Piper'] },
  ],
}

// Who the work reached, grouped by where I built it.
export const clients: { via: string; note: string; names: string[] }[] = [
  { via: 'Primeloop', note: 'Systems and automation for real businesses.', names: ['Happy Wagon', 'Premier Intros'] },
  {
    via: 'Outpilot.ai',
    note: 'Live outreach campaigns I built and run.',
    names: ['Brooklyn Pickleball', 'Brasil Rugby', 'Tomorrow City', 'The Sponsorship Guy'],
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
  'primeloop-5': 'multiflow',
  'primeloop-3': 'infra',
  'primeloop-4': 'ai',
  'outpilot-1': 'infra',
  'outpilot-2': 'ai',
  'outpilot-3': 'dashboard',
  'b-teach': 'teach',
  'b-ml': 'data',
  'b-data': 'data',
  'b-scrape': 'scrape',
  'b-analyst': 'ai',
  'b-jarvis': 'voice',
  'b-exp': 'data',
  'b-moto': 'mobile',
}
