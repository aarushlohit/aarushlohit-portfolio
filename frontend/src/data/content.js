export const site = {
  name: 'A. Lohit',
  title: 'Software Engineering · Problem Solving',
  tagline:
    'I care about tools people actually use—clear UX, solid architecture, and accessibility baked in, not bolted on.',
  githubProfile: 'https://github.com/AarushLohit',
  linkedin: 'https://in.linkedin.com/in/aarush-lohit-273877380',
  email: 'mailto:aarushlohit.developer@gmail.com',
}

export const projects = [
  {
    title: 'AarushLohit Git',
    subtitle: 'PyPI · 100+ downloads',
    description:
      'Python package that automates Git workflows through a focused CLI—shipped to PyPI with steady adoption.',
    tech: ['Python', 'CLI', 'Packaging'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/AarushLohit/aarushlohit-git',
        kind: 'github',
      },
      {
        label: 'PyPI',
        href: 'https://pypi.org/project/aarushlohit-git/',
        kind: 'live',
      },
    ],
  },
  {
    title: 'Zairok',
    subtitle: 'Flutter · Amazon Appstore',
    description:
      'AI tool discovery on mobile: structured navigation, predictable state, and data layers that don’t fall over at scale. Live on Amazon; product story lives on the Zairok site.',
    tech: ['Flutter', 'Mobile', 'Product'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/AarushLohit/zairok',
        kind: 'github',
      },
      {
        label: 'Amazon',
        href: 'https://www.amazon.in/Zairok-Free-AI-tools-Discovery/dp/B0FMG8BFJB',
        kind: 'live',
      },
      {
        label: 'zairok.web.app',
        href: 'https://zairok.web.app',
        kind: 'site',
      },
    ],
  },
  {
    title: 'Assistive Computing Interface',
    subtitle: 'Prototype',
    description:
      'Draw-to-action interaction prototype with a path toward voice and Braille input—built to explore accessible control surfaces.',
    tech: ['Python', 'HCI'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/AarushLohit/assistive-computing-interface',
        kind: 'github',
      },
    ],
  },
]

export const skillCategories = [
  {
    title: 'Languages',
    items: ['Python', 'C', 'Dart', 'JavaScript'],
  },
  {
    title: 'Core CS',
    items: ['Data Structures & Algorithms'],
  },
  {
    title: 'Technologies',
    items: ['Flutter', 'MERN Stack'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Linux', 'CLI'],
  },
]

export const achievements = [
  {
    title: 'Top 40 Author',
    detail: 'BriBooks Young Author Fair',
    period: '2024–2025',
  },
  {
    title: 'Music release',
    detail: '“Thirumbhi Varuvayo” on Spotify',
    period: '2024',
  },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
]

export const scrollSpyIds = navLinks.map((l) => l.href.replace('#', ''))

export const aboutHighlights = [
  {
    icon: 'layers',
    text: 'CS undergrad shipping real software—not just tutorials. I like problems where the edge cases matter.',
  },
  {
    icon: 'code',
    text: 'Python and Flutter are where I’ve shipped the most; I’m comfortable across the stack when a feature needs it.',
  },
  {
    icon: 'a11y',
    text: 'Accessibility isn’t a checkbox for me. I design and build with inclusion as a constraint from day one.',
  },
]
