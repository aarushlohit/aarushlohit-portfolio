import { useState } from 'react'
import { navLinks, site } from '../data/content.js'
import { GitHubIcon } from './icons.jsx'
import { ThemeToggle } from './ThemeToggle.jsx'

export function Navbar({ activeSectionId = '' }) {
  const [open, setOpen] = useState(false)

  const linkClass = (href) => {
    const id = href.replace('#', '')
    const active = activeSectionId === id
    return [
      'rounded-full px-3 py-1.5 text-sm transition-colors duration-300 ease-out',
      active
        ? 'bg-sky-900 text-white shadow-sm dark:bg-sky-950/90 dark:text-sky-50'
        : 'text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/[0.07] dark:hover:text-neutral-100',
    ].join(' ')
  }

  return (
    <header className="sticky top-0 z-[100] border-b border-neutral-200/80 bg-[#f7f7f5]/85 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0c0c0c]/85">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight text-neutral-900 transition-colors hover:text-sky-900 dark:text-neutral-100 dark:hover:text-sky-300"
        >
          {site.name}
        </a>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </a>
          ))}
          <a
            href={site.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-white/50 px-3 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
            aria-label="GitHub profile"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <div className="ml-2 pl-2">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <a
            href={site.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full p-2 text-neutral-800 hover:bg-neutral-200/50 dark:text-neutral-200 dark:hover:bg-white/10"
            aria-label="GitHub profile"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="inline-flex rounded-full border border-neutral-200/80 bg-white/60 px-3 py-1.5 text-sm font-medium text-neutral-800 backdrop-blur-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-neutral-200/70 bg-neutral-50/95 px-4 py-3 backdrop-blur-xl dark:border-white/[0.07] dark:bg-neutral-950/95 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-xl px-3 py-2.5 text-sm ${
                  activeSectionId === l.href.replace('#', '')
                    ? 'bg-sky-900 text-white dark:bg-sky-950/90 dark:text-sky-50'
                    : 'text-neutral-700 hover:bg-neutral-200/40 dark:text-neutral-300 dark:hover:bg-white/10'
                }`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
