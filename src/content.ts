/**
 * Edit this file to mirror your PDF and real engagements.
 * PDF is served at /resume.pdf (replace public/resume.pdf when you update it).
 */

export const profile = {
  name: 'Ahmed Alghotmy',
  shortTitle: 'Executive Consultant · Engagement Leadership',
  tagline:
    'I lead strategic, high-stakes cloud and transformation programs where technical depth, political sensitivity, and delivery discipline must move as one.',
  location: 'Canada · Bilingual EN / FR',
  linkedinUrl: 'https://www.linkedin.com/in/ahmed-alghotmy',
  contactEmail: '', // e.g. 'you@domain.com' — adds a mailto button when set
}

/** Profile photos in /public/photos — index of default hero + nav avatar */
export const profilePhotos = [
  {
    src: '/photos/studio.png',
    label: 'Studio',
    alt: 'Ahmed Alghotmy — professional headshot, white shirt',
  },
  {
    src: '/photos/blazer.png',
    label: 'Executive',
    alt: 'Ahmed Alghotmy — professional portrait, blazer',
  },
  {
    src: '/photos/outdoor.png',
    label: 'On location',
    alt: 'Ahmed Alghotmy — professional portrait, outdoor',
  },
] as const

export const mandate = [
  {
    title: 'Executive translation',
    body:
      'Turn board-level intent into engineering-ready mandates: scope, guardrails, and measurable outcomes—without losing nuance in regulated or politically charged contexts.',
  },
  {
    title: 'Delivery under scrutiny',
    body:
      'Stand up complex programs where failure is visible: migration waves, platform foundations, and customer-facing launches with tight governance and crisp escalation paths.',
  },
  {
    title: 'Technical credibility',
    body:
      'Earn trust with architects and CxOs alike—grounding decisions in AWS Well-Architected, Cloud Adoption Framework, and pragmatic trade-offs on security, cost, and velocity.',
  },
]

export const domains = [
  {
    name: 'Enterprise cloud adoption',
    detail:
      'Landing zones, organizational alignment, portfolio roadmaps, and operating models that stick after the consultants leave.',
  },
  {
    name: 'Large-scale migration & modernization',
    detail:
      'Wave planning, dependency mapping, cutover choreography, and risk burn-down for business-critical workloads.',
  },
  {
    name: 'Program recovery & turnaround',
    detail:
      'Re-baselining stalled initiatives, resetting stakeholder contracts, and restoring predictable execution rhythms.',
  },
  {
    name: 'Sensitive stakeholder orchestration',
    detail:
      'Facilitation across engineering, security, finance, and business owners—especially when priorities compete and timelines do not.',
  },
]

export const engagements = [
  {
    codename: 'Atlas',
    role: 'Engagement direction',
    context: 'Multi-year enterprise cloud foundation',
    outcome:
      'Unified governance model across business units; reduced time-to-production for net-new workloads while satisfying risk and audit constraints.',
    stack: ['AWS Organizations', 'Control Tower', 'Security baselines', 'FinOps hooks'],
  },
  {
    codename: 'Meridian',
    role: 'Program leadership',
    context: 'Mission-critical migration portfolio',
    outcome:
      'Sequenced migration waves with explicit rollback posture; executive dashboards tied to business KPIs, not just infrastructure milestones.',
    stack: ['Migration methodology', 'Resilience testing', 'Executive steering'],
  },
  {
    codename: 'Cipher',
    role: 'Trusted advisor',
    context: 'Regulated industry transformation',
    outcome:
      'Bridged security, compliance, and platform teams on shared patterns—reducing review cycles without weakening controls.',
    stack: ['Zero-trust patterns', 'Evidence packs', 'Architecture review boards'],
  },
  {
    codename: 'Northwind',
    role: 'Delivery governance',
    context: 'Post-merger integration & IT rationalization',
    outcome:
      'Single source of truth for application disposition; de-risked decommissioning tied to customer-impacting service maps.',
    stack: ['Application rationalization', 'CMDB alignment', 'Cutover war rooms'],
  },
]

export const knowledge = {
  cloud: [
    'AWS core & hybrid patterns',
    'Well-Architected reviews',
    'Cloud Adoption Framework (CAF)',
    'Identity, networking, observability',
    'Cost optimization & FinOps cadence',
  ],
  delivery: [
    'PMP-style program governance',
    'RAID with teeth (not shelf-ware)',
    'Steering & escalation design',
    'Vendor / SI coordination',
    'Executive communications',
  ],
  practices: [
    'Workshop facilitation',
    'Architecture decision records',
    'Technical proof points for non-technical forums',
    'Bilingual stakeholder sessions (EN/FR)',
  ],
}

export const credentials = [
  'AWS certifications — align to your PDF (e.g. Solutions Architect, Specialty)',
  'PMP / agile program credentials — as applicable',
  'Executive-facing references available under NDA',
]
