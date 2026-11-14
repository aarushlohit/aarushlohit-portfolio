import { motion, useReducedMotion } from 'framer-motion'
import { ExternalIcon, GitHubIcon, GlobeIcon } from './icons.jsx'

function LinkIcon({ kind, className }) {
  if (kind === 'github') {
    return <GitHubIcon className={className} />
  }
  if (kind === 'site') {
    return <GlobeIcon className={className} />
  }
  return <ExternalIcon className={className} />
}

export function ProjectCard({
  title,
  subtitle,
  description,
  tech,
  links,
  disclosures,
}) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white/75 p-6 shadow-[0_1px_0_rgb(0_0_0/0.04),0_12px_32px_-8px_rgb(0_0_0/0.08)] backdrop-blur-xl transition-[box-shadow,transform,border-color] duration-300 ease-out dark:border-white/[0.09] dark:bg-[rgb(18_18_18/0.65)] dark:shadow-[0_1px_0_rgb(255_255_255/0.04),0_16px_48px_-12px_rgb(0_0_0/0.5)]"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px', amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -5,
              scale: 1.008,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-sky-500/[0.08] via-transparent to-slate-500/[0.06] dark:from-sky-400/10 dark:to-slate-400/5" />
      </div>
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-400/0 blur-2xl transition-all duration-500 group-hover:bg-sky-400/[0.12] dark:group-hover:bg-sky-500/10"
        aria-hidden
      />
      <div className="relative">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-display text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
        {tech?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-neutral-200/90 bg-neutral-50/90 px-2.5 py-0.5 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        {disclosures?.length > 0 && (
          <details className="group/details mt-5 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/70 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.035]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-white/55 dark:hover:bg-white/[0.045]">
              <span>
                <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
                  Disclosure register
                </span>
                <span className="mt-1 block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  CERT-In coordinated references
                </span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-all group-open/details:rotate-180 group-open/details:border-sky-300 group-open/details:text-sky-700 dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-400 dark:group-open/details:border-sky-500/35 dark:group-open/details:text-sky-300">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-neutral-200/80 px-4 py-1 dark:border-white/10">
              <ul className="divide-y divide-neutral-200/80 dark:divide-white/10">
                {disclosures.map((item, idx) => (
                  <li
                    key={`${item.program}-${idx}`}
                    className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                        {item.program}
                      </span>
                      {item.impact && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {item.impact}
                        </p>
                      )}
                    </div>
                    <span className="mt-1 sm:mt-0 shrink-0 font-mono text-xs font-semibold tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
                      {item.certIn}
                    </span>
                  </li>
                ))}

              </ul>
            </div>
          </details>
        )}
        {links?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {links.map((link) => (
              <motion.a
                key={`${link.label}-${link.href}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200/90 bg-white/95 px-3.5 py-2 text-sm font-medium text-neutral-800 shadow-sm transition-colors hover:border-sky-400/40 hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-100 dark:hover:border-sky-400/35 dark:hover:bg-white/[0.1]"
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <LinkIcon
                  kind={link.kind}
                  className="h-4 w-4 shrink-0 text-neutral-600 dark:text-neutral-300"
                />
                {link.label}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
