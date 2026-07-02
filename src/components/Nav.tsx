import { nav, links } from '../data'
import { cn, useTheme } from '../lib'

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Nav({ active }: { active: string }) {
  const [theme, toggle] = useTheme()
  return (
    <div className="sticky top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-lg font-bold tracking-tight"
        >
          Ayan<span className="text-accent">.</span>
        </button>

        <div className="hidden items-center gap-7 sm:flex">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={cn(
                'text-sm font-medium transition-colors',
                active === item.id ? 'text-accent' : 'text-muted hover:text-text',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full border border-line p-2 text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <a
            href={`mailto:${links.email}`}
            className="rounded-full bg-[image:var(--grad)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Contact
          </a>
        </div>
      </nav>
    </div>
  )
}
