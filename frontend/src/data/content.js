export const site = {
  name: 'A. Lohit',
  title:
    'Cybersecurity Researcher | Independent Security Researcher | Software Developer | Mobile App Developer',
  tagline:
    'Computer Science (Cybersecurity) student focused on web application security, independent vulnerability research (100+ bugs identified across NPTEL, news portals, and institutions), secure software development, and practical security tooling.',
  githubProfile: 'https://github.com/AarushLohit',
  linkedin: 'https://in.linkedin.com/in/aarush-lohit-273877380',
  email: 'mailto:aarushlohit.developer@gmail.com',
  profileImage: 'https://avatars.githubusercontent.com/u/141929019?v=4',
}

export const quickFacts = [
  '100+ Bugs Identified (Standalone Research)',
  '17+ Critical Bugs: Full DB Takeover & 10K+ Employee PII Leak Disclosed',
  'Full Editorial / CMS Access Takeover Disclosed (News Channel)',
  'Responsible Disclosure: NPTEL (IIT / MoE)',
  '2,500+ PyPI Downloads',
  '5 Published Books',
  'Amazon App Store Published Developer',
  'Independent Security Researcher',
  'IEEE Computer Society Member',
  'GSSoC Contributor - Open Source Track',
]

export const projects = [
  {
    title: 'Log Analyzer for Intrusion Detection',
    subtitle: 'Python · Security monitoring',
    description:
      'Developed a Python-based security monitoring tool for analyzing system and network logs. Implemented detection for brute-force attacks, suspicious authentication attempts, and anomalous access patterns. Generated structured alerts and threat summaries to support incident investigation and security monitoring.',
    tech: ['Python', 'Log Analysis', 'Intrusion Detection'],
    links: [],
  },
  {
    title: 'Network Scanner & Service Analyzer',
    subtitle: 'Python · Attack surface mapping',
    description:
      'Built a multi-threaded Python network scanner for host discovery and port enumeration. Implemented banner grabbing and service fingerprinting to identify running services and potential security risks. Generated structured outputs to assist in attack surface mapping and security assessments.',
    tech: ['Python', 'Networking', 'Service Fingerprinting'],
    links: [],
  },
  {
    title: 'Responsible Vulnerability Disclosure Research',
    subtitle: '100+ findings · Standalone Security Research',
    description:
      'Conducted independent, standalone security research on public-facing web applications, educational platforms, and digital news portals outside bug bounty programs. Disclosed 17+ critical vulnerabilities in a major news media network leading to full database takeover and 10,000+ employee PII records exposure (including photos, precise GPS locations, phone numbers, and emails), uncovered full editor/CMS takeover access on a broadcast news channel portal, and performed coordinated disclosures for NPTEL (IIT/MoE) and state education portals.',
    tech: [
      'Independent Research',
      'Database Takeover',
      'PII Exposure Analysis',
      'CMS Privilege Escalation',
      'Responsible Disclosure',
    ],
    disclosures: [
      {
        program: 'Major Digital News Media Network',
        impact:
          '17+ Critical Vulnerabilities · Full Database Takeover & 10,000+ employee PII records exposed (identity photos, precise GPS coordinates, phone numbers, email addresses)',
        certIn: 'Responsible Disclosure',
      },
      {
        program: 'Broadcast News Channel Web Portal',
        impact:
          'Full Administrative / Editor CMS Access Takeover (arbitrary content publishing & editorial hijack risk)',
        certIn: 'Responsible Disclosure',
      },
      {
        program: 'NPTEL Portal (IIT / MoE)',
        impact:
          'Security assessment and coordinated vulnerability disclosure on official academic course infrastructure',
        certIn: 'Responsible Disclosure',
      },
      {
        program: 'Tamilnadu SSLC Vulnerability',
        certIn: 'CERTIn-63432926',
      },
      {
        program: 'KNRUH Portal',
        certIn: 'CERTIn-26441226',
      },
      {
        program: 'BPUT Portal',
        certIn: 'CERTIn-19131826',
      },
    ],
    links: [],
  },


  {
    title: 'Python CLI Automation Tool',
    subtitle: 'PyPI · 2,500+ downloads',
    description:
      'Developed and published a Python automation package on PyPI, simplifying development workflows and Git operations. 2,500+ downloads demonstrate real-world adoption and practical utility.',
    tech: ['Python', 'CLI', 'PyPI', 'Git Automation'],
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
    title: 'Security',
    items: [
      'Web Application Security',
      'Responsible Disclosure',
      'Reconnaissance',
      'Vulnerability Validation',
      'Impact Assessment',
    ],
  },
  {
    title: 'Languages',
    items: ['Python', 'C', 'Dart', 'JavaScript'],
  },
  {
    title: 'Technologies',
    items: ['Linux', 'Networking', 'Flutter', 'MERN Stack'],
  },
  {
    title: 'Tools',
    items: [
      'Git',
      'CLI',
      'PyPI Packaging',
      'Security Tool Development',
      'Open Source Contribution',
    ],
  },
]

export const achievements = [
  {
    title: '100+ Vulnerabilities Identified (Standalone Research)',
    detail:
      'Identified and responsibly disclosed 100+ vulnerabilities standalone: uncovered 17+ critical bugs including full database takeover exposing 10k+ employee PII records with GPS coordinates & photos on a major news network, full editorial CMS takeover access on a broadcast news channel, and disclosures for NPTEL (IIT / MoE).',
    period: 'Security Research',
  },

  {
    title: 'GSSoC Contributor - Open Source Track',
    detail:
      'Contributing to open-source projects through GirlScript Summer of Code with a focus on practical engineering, collaboration, and maintainable improvements.',
    period: 'GirlScript Summer of Code',
  },

  {
    title: 'Zairok (Amazon App Store)',
    detail: 'Published mobile app developer with Zairok live on Amazon Appstore.',
    period: 'Mobile app',
  },
  {
    title: 'Top Author',
    detail: 'BriBooks Young Author Fair',
    period: '2024-2025',
  },
  {
    title: '5 Published Science Fiction Books',
    detail: 'Published author alongside software and security work.',
    period: 'Author',
  },
  {
    title: 'Python Package',
    detail: 'Published Python CLI automation package on PyPI.',
    period: 'PyPI',
  },
  {
    title: 'GitHub Projects',
    detail: 'Open-source projects covering automation, mobile apps, and security tooling.',
    period: 'Open source',
  },
]

export const certifications = [
  {
    title: 'Introduction to Cybersecurity by Cisco',
    issuer: 'Cisco',
    href: 'https://www.credly.com/badges/b5d7f108-e2bb-4914-b6f7-2945a4e5f7df/public_url',
  },
  {
    title: 'Red Hat System Administration I (RH124 - RHA) - Ver. 10',
    issuer: 'Red Hat',
    href: 'https://www.credly.com/badges/b7364375-9b80-4836-b11f-4d5e2af508a8/public_url',
  },
  {
    title: 'Google Cloud Digital Leader',
    issuer: 'Google Cloud',
    href: 'https://www.skills.google/public_profiles/43109f47-8b9a-4610-93b4-39c49dea8653',
  },
]

export const communityLeadership = [
  {
    title: 'GSSoC Contributor - Open Source Track',
    detail:
      'Participates in GirlScript Summer of Code as an open-source contributor, working on real project improvements while collaborating with maintainers and the developer community.',
  },
  {
    title: 'IEEE Computer Society',
    detail:
      'Active member participating in cybersecurity workshops, technical events, Capture The Flag (CTF) competitions, and peer knowledge-sharing initiatives.',
  },
  {
    title: 'Team Lead - IT Training Hub',
    detail:
      'Led student technical teams, provided mentorship, coordinated projects, and supported collaborative problem-solving.',
  },
]

export const finalImpression = [
  'Cybersecurity Researcher',
  'Responsible Disclosure',
  'Security Tool Builder',
  'Software Developer',
  'Mobile App Developer',
  'Published Author',
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#community', label: 'Community' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
]

export const scrollSpyIds = navLinks.map((l) => l.href.replace('#', ''))

export const aboutHighlights = [
  {
    icon: 'layers',
    text: 'Computer Science (Cybersecurity) student passionate about web application security, responsible vulnerability disclosure, secure software development, and cybersecurity research.',
  },
  {
    icon: 'code',
    text: 'Experienced in Python, Linux, networking, mobile application development, and security tool development.',
  },
  {
    icon: 'a11y',
    text: 'Actively participates in responsible disclosure programs and cybersecurity communities while building practical security-focused solutions.',
  },
]
