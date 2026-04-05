import { motion, useReducedMotion } from 'framer-motion'
import {
  aboutHighlights,
  achievements,
  navLinks,
  projects,
  scrollSpyIds,
  site,
  skillCategories,
} from './data/content.js'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import { GitHubIcon, LayersIcon, CodeBracketsIcon, AccessibilityIcon, LinkedInIcon, MailIcon } from './components/icons.jsx'
import { MotionSection } from './components/MotionSection.jsx'
import { Navbar } from './components/Navbar.jsx'
import { ProjectCard } from './components/ProjectCard.jsx'
import { Section } from './components/Section.jsx'

const iconByKey = {
  layers: LayersIcon,
  code: CodeBracketsIcon,
  a11y: AccessibilityIcon,
}

const staggerEase = [0.22, 1, 0.36, 1]

function SectionDivider() {
  return (
    <div
      className="mx-auto flex max-w-3xl items-center gap-4 px-4 sm:px-6"
      aria-hidden
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neutral-300/80 dark:to-white/10" />
      <span className="font-mono text-[10px] font-medium tabular-nums text-neutral-400 dark:text-neutral-600">
        ···
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neutral-300/80 dark:to-white/10" />
    </div>
  )
}

function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-neutral-200/80 bg-[#fafaf8] px-4 pb-24 pt-20 dark:border-white/[0.07] dark:bg-[#0a0a0a] sm:px-6 sm:pb-28 sm:pt-24"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-px bg-gradient-to-b from-sky-600 via-sky-500/40 to-transparent sm:block dark:from-sky-400 dark:via-sky-400/30"
        aria-hidden
      />
      <div
        className="bg-grid-hero pointer-events-none absolute inset-0 opacity-50 dark:opacity-35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-900/25"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl sm:pl-5">
        <motion.p
          className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: staggerEase }}
        >
          Portfolio · CS & engineering
        </motion.p>

        <motion.h1
          className="font-display mt-5 text-[2.65rem] font-semibold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl md:text-[3.35rem] dark:text-neutral-50"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: staggerEase }}
        >
          {site.name}
        </motion.h1>

        <motion.p
          className="mt-3 max-w-lg text-[15px] font-medium text-neutral-600 dark:text-neutral-400 sm:text-base"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: staggerEase }}
        >
          {site.title}
        </motion.p>

        <motion.p
          className="mt-8 max-w-2xl border-l-2 border-sky-600/70 pl-5 text-[15px] leading-[1.75] text-neutral-700 dark:border-sky-500/50 dark:text-neutral-300 sm:text-[17px]"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: staggerEase }}
        >
          {site.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: staggerEase }}
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center justify-center rounded-2xl bg-sky-900 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-900/20 transition-colors hover:bg-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600"
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            View projects
          </motion.a>
          <motion.a
            href={site.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-300/90 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-white/12 dark:bg-white/[0.04] dark:text-neutral-100 dark:hover:bg-white/[0.08]"
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </motion.a>
        </motion.div>

        <p className="mt-14 font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
          {navLinks.map((l, i) => (
            <span key={l.href}>
              {i > 0 && <span className="mx-2 text-neutral-300 dark:text-neutral-700">/</span>}
              <a
                className="transition-colors hover:text-sky-800 dark:hover:text-sky-300"
                href={l.href}
              >
                {l.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

function SkillsPills({ items, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.ul
      className="flex flex-wrap gap-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : 0.05,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {items.map((s) => (
        <motion.li
          key={s}
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.35, ease: staggerEase },
            },
          }}
          className="rounded-full border border-neutral-200/80 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-300/60 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-100 dark:hover:border-sky-500/30"
        >
          {s}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default function App() {
  const activeSectionId = useScrollSpy(scrollSpyIds, 130)

  return (
    <div className="relative z-10 min-h-screen">
      <Navbar activeSectionId={activeSectionId} />
      <main>
        <Hero />

        <SectionDivider />

        <Section id="about" eyebrow="About" title="Introduction">
          <div className="rounded-2xl border border-neutral-200/90 bg-white/70 p-6 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.08)] backdrop-blur-xl dark:border-white/[0.09] dark:bg-[rgb(20_20_20/0.55)] dark:shadow-black/40 sm:p-8">
            <div className="space-y-7">
              {aboutHighlights.map((h, i) => {
                const Icon = iconByKey[h.icon] ?? LayersIcon
                return (
                  <motion.div
                    key={h.text}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      ease: staggerEase,
                    }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-200/70 bg-sky-50 text-sky-800 dark:border-sky-800/50 dark:bg-sky-950/40 dark:text-sky-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {h.text}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Section>

        <div className="border-y border-neutral-200/70 bg-gradient-to-b from-neutral-100/50 to-transparent dark:border-white/[0.06] dark:from-white/[0.04] dark:to-transparent">
          <Section
            id="projects"
            eyebrow="Selected work"
            title="Projects"
            className="!py-20"
          >
            <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              A few things I’ve taken from idea to something people can install,
              download, or click through—no mockups-only slides.
            </p>
            <div className="flex flex-col gap-8">
              {projects.map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>
          </Section>
        </div>

        <SectionDivider />

        <Section id="skills" eyebrow="Capabilities" title="Skills">
          <div className="grid gap-8 sm:grid-cols-2">
            {skillCategories.map((cat, idx) => (
              <MotionSection key={cat.title}>
                <div className="rounded-2xl border border-neutral-200/80 bg-white/60 p-5 shadow-md shadow-neutral-900/[0.04] backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    {cat.title}
                  </h3>
                  <SkillsPills items={cat.items} delay={idx * 0.06} />
                </div>
              </MotionSection>
            ))}
          </div>
        </Section>

        <SectionDivider />

        <div className="border-y border-neutral-200/60 bg-white/30 dark:border-white/[0.05] dark:bg-white/[0.02]">
          <Section id="achievements" eyebrow="Milestones" title="Achievements">
            <div className="relative pl-6 sm:pl-8">
              <div
                className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-sky-500/50 via-neutral-200/80 to-transparent dark:from-sky-500/40 dark:via-white/12 sm:left-[9px]"
                aria-hidden
              />
              <ul className="space-y-10">
                {achievements.map((a, i) => (
                  <motion.li
                    key={a.title}
                    className="relative"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.06,
                      ease: staggerEase,
                    }}
                  >
                    <span
                      className="absolute -left-6 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm dark:border-white/20 dark:bg-neutral-900 sm:-left-7"
                      aria-hidden
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-sky-500 to-slate-500 dark:from-sky-400 dark:to-slate-400" />
                    </span>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                      {a.title}
                    </p>
                    <p className="mt-1 text-[15px] text-neutral-600 dark:text-neutral-300">
                      {a.detail}
                    </p>
                    <p className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-500">
                      {a.period}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Section>
        </div>

        <SectionDivider />

        <Section id="contact" eyebrow="Let’s talk" title="Contact">
          <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            Email is best for anything longer than a paragraph. LinkedIn works
            too if you prefer it.
          </p>
          <motion.ul
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.07 },
              },
            }}
          >
            {[
              {
                href: site.email,
                label: 'Email',
                icon: MailIcon,
                external: false,
              },
              {
                href: site.linkedin,
                label: 'LinkedIn',
                icon: LinkedInIcon,
                external: true,
              },
              {
                href: site.githubProfile,
                label: 'GitHub',
                icon: GitHubIcon,
                external: true,
              },
            ].map(({ href, label, icon: ContactIcon, external }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: staggerEase },
                  },
                }}
              >
                <motion.a
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="group inline-flex items-center gap-2.5 rounded-2xl border border-neutral-200/80 bg-white/80 px-5 py-3.5 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-400/45 hover:shadow-md dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-100 dark:hover:border-sky-500/35"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <ContactIcon className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-100" />
                  {label}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </Section>
      </main>

      <footer className="border-t border-neutral-200/80 bg-[#f7f7f5]/90 py-10 dark:border-white/[0.07] dark:bg-[#0c0c0c]/90">
        <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href={site.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
