import { profile, links, nav, interests } from '../data'
import { cn, useTheme } from '../lib'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Rail({ active }: { active: string }) {
  const [theme, toggle] = useTheme()
  return (
    <header className="flex flex-col lg:sticky lg:top-0 lg:h-screen lg:max-h-screen lg:py-16 lg:pr-10">
      <div className="flex-1">
        <p className="font-mono text-sm text-accent">Hey, I am</p>
        <h1 className="mt-1 font-display text-5xl font-semibold leading-none tracking-tight text-text sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-3 font-mono text-xs tracking-[0.18em] text-muted">
          {profile.role.toUpperCase()}
        </p>

        <p className="mt-6 max-w-md font-display text-xl leading-snug text-text">
          {profile.tagline}
        </p>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          {profile.intro}
        </p>

        {/* interest chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {interests.map((it) => (
            <span
              key={it.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/70 px-3 py-1 text-[13px] text-muted"
            >
              <span aria-hidden>{it.emoji}</span>
              {it.label}
            </span>
          ))}
        </div>

        {/* status pill */}
        <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/8 px-3.5 py-1.5">
          <span className="led inline-block h-2 w-2 rounded-full bg-led" />
          <span className="font-mono text-[11px] tracking-wide text-muted">
            {profile.status}
          </span>
        </div>

        {/* in-page nav (desktop) */}
        <nav className="mt-12 hidden lg:block" aria-label="Sections">
          <ul className="space-y-1">
            {nav.map((item) => {
              const on = active === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="group flex items-center gap-3 py-1.5 font-mono text-xs tracking-wider"
                    aria-current={on ? 'true' : undefined}
                  >
                    <span
                      className={cn(
                        'h-px transition-all duration-300',
                        on
                          ? 'w-10 bg-accent'
                          : 'w-5 bg-faint group-hover:w-8 group-hover:bg-muted',
                      )}
                    />
                    <span
                      className={cn(
                        'transition-colors',
                        on ? 'text-text' : 'text-faint group-hover:text-muted',
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* socials + theme */}
      <div className="mt-10 flex items-center gap-5 lg:mt-0">
        <a
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-muted transition-colors hover:text-accent"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>
        <a
          href={links.x}
          target="_blank"
          rel="noreferrer"
          aria-label="X"
          className="text-muted transition-colors hover:text-accent"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.48l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.4z" />
          </svg>
        </a>
        <a
          href={`mailto:${links.email}`}
          aria-label="Email"
          className="text-muted transition-colors hover:text-accent"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
            <path d="m3 6 9 6.5L21 6" />
          </svg>
        </a>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="ml-auto rounded-full border border-line p-2 text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
