import { motion, useReducedMotion } from 'framer-motion'
import {
  aboutHighlights,
  achievements,
  certifications,
  communityLeadership,
  finalImpression,
  projects,
  quickFacts,
  scrollSpyIds,
  site,
  skillCategories,
} from './data/content.js'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import {
  AccessibilityIcon,
  CodeBracketsIcon,
  ExternalIcon,
  GitHubIcon,
  LayersIcon,
  LinkedInIcon,
  MailIcon,
} from './components/icons.jsx'
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
      className="relative flex min-h-[calc(100svh-57px)] items-center overflow-hidden border-b border-neutral-200/80 bg-[#fafaf8] px-4 py-14 dark:border-white/[0.07] dark:bg-[#0a0a0a] sm:px-6 lg:py-16"
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

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.8fr)]">
        <div className="sm:pl-5">
          <motion.p
            className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: staggerEase }}
          >
            Portfolio · Cybersecurity & software engineering
          </motion.p>

          <motion.h1
            className="font-display mt-5 text-[3.25rem] font-semibold leading-[0.98] tracking-tight text-neutral-900 sm:text-6xl md:text-[4.7rem] dark:text-neutral-50"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: staggerEase }}
          >
            {site.name}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-[15px] font-medium leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: staggerEase }}
          >
            {site.title}
          </motion.p>

          <motion.p
            className="mt-8 max-w-2xl border-l-2 border-sky-600/70 pl-5 text-[15px] leading-[1.8] text-neutral-700 dark:border-sky-500/50 dark:text-neutral-300 sm:text-[17px]"
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

          <p className="mt-10 max-w-xl font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
            Scroll for verified security work, tools, certifications, and
            milestones.
          </p>
        </div>

        <motion.aside
          className="relative mx-auto hidden w-full max-w-sm lg:block"
          initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.16, ease: staggerEase }}
          aria-label="Profile identity card"
        >
          <div
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky-500/20 via-transparent to-cyan-400/10 blur-2xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white/75 p-4 shadow-[0_32px_95px_-38px_rgb(0_0_0/0.5)] backdrop-blur-xl dark:border-white/[0.09] dark:bg-white/[0.045]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent)]"
              aria-hidden
            />
            <div className="relative aspect-[4/4.35] overflow-hidden rounded-[1.55rem] border border-white/70 bg-neutral-200 shadow-inner dark:border-white/10 dark:bg-neutral-900">
              <img
                src={site.profileImage}
                alt={`${site.name} profile`}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/72 via-black/22 to-transparent"
                aria-hidden
              />
              <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                Security Research
              </div>
            </div>
            <div className="relative mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                  {site.name}
                </p>
                <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">
                  Independent Security Researcher
                </p>
              </div>
              <span className="rounded-full border border-sky-300/50 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-800 dark:border-sky-500/30 dark:text-sky-200">
                100+ findings
              </span>
            </div>
            <div className="relative mt-5 grid grid-cols-2 gap-2">
              {['Responsible Disclosure', 'GSSoC', 'PyPI', 'Amazon AppStore'].map((item) => (

                <span
                  key={item}
                  className="rounded-xl border border-neutral-200/80 bg-white/65 px-3 py-2 text-center text-xs font-semibold text-neutral-700 dark:border-white/10 dark:bg-white/[0.055] dark:text-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

function QuickFacts() {
  return (
    <section
      aria-label="Quick facts"
      className="relative overflow-hidden border-b border-neutral-200/70 bg-white/45 px-4 py-12 dark:border-white/[0.06] dark:bg-white/[0.025] sm:px-6"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500">
              Quick facts
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Signals at a glance
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Security research, open source, publishing, and shipped software in
            one compact snapshot.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickFacts.map((fact, index) => (
            <motion.div
              key={fact}
              className={`group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-300/70 dark:border-white/10 dark:bg-white/[0.05] dark:hover:border-sky-500/35 ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{
                duration: 0.4,
                delay: index * 0.035,
                ease: staggerEase,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500 shadow-[0_0_18px_rgb(14_165_233/0.35)] dark:bg-sky-400" />
                <p className="text-sm font-semibold leading-relaxed text-neutral-800 dark:text-neutral-100">
                  {fact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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
        <QuickFacts />

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
              Security tooling, responsible disclosure work, mobile software,
              and automation projects that show the path from research to
              practical implementation.
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
          <div className="mb-8 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            A focused stack for security research, automation, open-source
            delivery, and production-minded software work.
          </div>
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {skillCategories.map((cat, idx) => (
              <MotionSection key={cat.title}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/65 p-5 shadow-[0_18px_55px_-32px_rgb(0_0_0/0.45)] backdrop-blur-md transition-colors hover:border-sky-300/60 dark:border-white/[0.08] dark:bg-white/[0.045] dark:hover:border-sky-500/30">
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative mb-5 flex items-center justify-between gap-4">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                      {cat.title}
                    </h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-200/80 bg-sky-50 font-mono text-[11px] font-semibold text-sky-800 dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-sky-200">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="relative">
                    <SkillsPills items={cat.items} delay={idx * 0.06} />
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </Section>

        <SectionDivider />

        <Section
          id="certifications"
          eyebrow="Credentials"
          title="Certifications"
        >
          <div className="grid gap-3">
            {certifications.map((item) => (
              <MotionSection key={item.title}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-md transition-colors hover:border-sky-300/70 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-sky-500/35 dark:hover:bg-white/[0.07]"
                >
                  <span>
                    <span className="block text-[15px] font-semibold text-neutral-800 dark:text-neutral-100">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-500">
                      {item.issuer} verified credential
                    </span>
                  </span>
                  <ExternalIcon className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-sky-700 dark:group-hover:text-sky-300" />
                </a>
              </MotionSection>
            ))}
          </div>
        </Section>

        <SectionDivider />

        <Section
          id="community"
          eyebrow="Community / Leadership"
          title="Community & Leadership"
        >
          <div className="grid gap-5">
            {communityLeadership.map((item) => (
              <MotionSection key={item.title}>
                <article className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-md shadow-neutral-900/[0.04] backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {item.detail}
                  </p>
                </article>
              </MotionSection>
            ))}
          </div>
        </Section>

        <SectionDivider />

        <div className="border-y border-neutral-200/60 bg-white/30 dark:border-white/[0.05] dark:bg-white/[0.02]">
          <Section id="achievements" eyebrow="Milestones" title="Achievements">
            <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              A compact record of open-source participation, shipped products,
              publishing, and developer-tool adoption.
            </p>
            <div className="relative pl-7 sm:pl-10">
              <div
                className="absolute bottom-5 left-[11px] top-5 w-px bg-gradient-to-b from-sky-400/80 via-sky-500/25 to-transparent shadow-[0_0_24px_rgb(14_165_233/0.35)] dark:from-sky-300/70 dark:via-sky-500/30 sm:left-[15px]"
                aria-hidden
              />
              <ul className="space-y-5">
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
                      className="absolute -left-7 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-sky-300/70 bg-white shadow-[0_0_0_5px_rgb(14_165_233/0.08),0_0_22px_rgb(14_165_233/0.35)] dark:border-sky-500/40 dark:bg-neutral-950 sm:-left-10"
                      aria-hidden
                    >
                      <span className="font-mono text-[10px] font-bold text-sky-700 dark:text-sky-200">
                        {i + 1}
                      </span>
                    </span>
                    <article className="group rounded-2xl border border-neutral-200/80 bg-white/65 p-5 shadow-[0_18px_55px_-36px_rgb(0_0_0/0.45)] backdrop-blur-md transition-colors hover:border-sky-300/60 dark:border-white/[0.08] dark:bg-white/[0.045] dark:hover:border-sky-500/30">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                          {a.title}
                        </p>
                        <p className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-400">
                          {a.period}
                        </p>
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {a.detail}
                      </p>
                    </article>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Section>
        </div>

        <SectionDivider />

        <Section
          id="impression"
          eyebrow="Positioning"
          title="Identity Architecture"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white/70 p-6 shadow-[0_28px_90px_-42px_rgb(0_0_0/0.55)] backdrop-blur-xl dark:border-white/[0.09] dark:bg-white/[0.045] sm:p-8">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/45 to-transparent"
              aria-hidden
            />

            <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                  Premium profile narrative
                </p>
                <p className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
                  Security research backed by products, tooling, and open-source
                  execution.
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                  The portfolio should read as one connected story: finding
                  real security issues, building practical tools, shipping
                  usable software, and contributing in public.
                </p>
              </div>

              <div className="grid gap-3">
                {finalImpression.map((item, index) => (
                  <motion.div
                    key={item}
                    className="group flex items-center gap-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/80 p-4 shadow-sm transition-colors hover:border-sky-300/70 hover:bg-white dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-sky-500/35 dark:hover:bg-white/[0.08]"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-8% 0px' }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.04,
                      ease: staggerEase,
                    }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-white font-mono text-xs font-bold text-sky-800 shadow-sm dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 rounded-2xl border border-sky-200/70 bg-sky-50/70 p-5 dark:border-sky-500/20 dark:bg-sky-950/25">
              <p className="text-sm font-semibold leading-relaxed text-neutral-800 dark:text-neutral-100">
                Final read: a cybersecurity researcher who validates risk,
                reports responsibly, builds security tooling, ships software,
                contributes to open source, and carries a published-author
                mindset into technical communication.
              </p>
            </div>
          </div>
        </Section>

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
