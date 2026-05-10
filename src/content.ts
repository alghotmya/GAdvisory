/**
 * Mirrors your public positioning. PDF: /resume.pdf (update public/resume.pdf when the file changes).
 */

export const profile = {
  name: 'Ahmed Alghotmy',
  shortTitle: 'Senior Strategic Engagement Consultant',
  roleFocus: 'Customer Success & Cloud Transformation Advisor',
  tagline:
    'I steward strategic engagements end-to-end—aligning executives, delivery teams, and partners so cloud transformation delivers durable adoption, measurable outcomes, and trusted customer relationships.',
  location: 'Canada · Bilingual EN / FR',
  linkedinUrl: 'https://www.linkedin.com/in/ahmed-alghotmy',
  contactEmail: '',
}

/** Profile photos in /public/photos */
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
    title: 'Strategic engagement leadership',
    body:
      'Frame the charter, governance, and decision rights so complex programs stay coherent—from executive steering to working-team execution—without losing sight of customer trust and renewal.',
  },
  {
    title: 'Customer success at scale',
    body:
      'Connect adoption, value realization, and cloud roadmaps: success plans, executive business reviews, and risk signals that turn technical milestones into stories the business owns.',
  },
  {
    title: 'Cloud transformation advisory',
    body:
      'Ground recommendations in AWS Well-Architected, Cloud Adoption Framework, and pragmatic trade-offs—so architecture, security, and FinOps reinforce the outcomes customers signed up for.',
  },
]

export const domains = [
  {
    name: 'Enterprise cloud adoption & landing zones',
    detail:
      'Foundations that scale: organizations, guardrails, and operating models—with clear paths from pilot to production and accountable owners on the customer side.',
  },
  {
    name: 'Migration, modernization & program delivery',
    detail:
      'Wave planning, dependency management, and cutover discipline for business-critical workloads, with transparency for stakeholders who carry the risk.',
  },
  {
    name: 'Customer success & executive alignment',
    detail:
      'Cadence design for sponsors and delivery leads: mutual success criteria, escalation paths, and narratives that keep technical work tied to revenue, risk, and reputation.',
  },
  {
    name: 'Sensitive multi-party orchestration',
    detail:
      'Facilitation across engineering, security, finance, partners, and business owners—especially when priorities compete, timelines slip, or scrutiny is high.',
  },
]

export const engagements = [
  {
    codename: 'Atlas',
    role: 'Engagement direction',
    context: 'Multi-year enterprise cloud foundation',
    outcome:
      'Unified governance and adoption metrics across units; faster, safer paths to production with audit-ready controls and executive-ready reporting.',
    stack: ['AWS Organizations', 'Success milestones', 'Steering rhythm', 'FinOps hooks'],
  },
  {
    codename: 'Meridian',
    role: 'Program & success leadership',
    context: 'Mission-critical migration portfolio',
    outcome:
      'Sequenced waves with explicit rollback posture; dashboards tied to business KPIs, customer health, and value milestones—not just infrastructure checkpoints.',
    stack: ['Migration playbooks', 'Executive QBRs', 'Risk burn-down'],
  },
  {
    codename: 'Cipher',
    role: 'Trusted advisor',
    context: 'Regulated industry transformation',
    outcome:
      'Aligned security, compliance, and platform teams on shared patterns—shortening review cycles while strengthening evidence for auditors and customers.',
    stack: ['Control narratives', 'Architecture boards', 'Joint success plans'],
  },
  {
    codename: 'Northwind',
    role: 'Transformation governance',
    context: 'Post-merger integration & IT rationalization',
    outcome:
      'Single disposition view for applications and services; de-risked decommissioning mapped to customer-impacting dependencies and sponsor sign-off.',
    stack: ['Rationalization', 'Service mapping', 'War-room cadence'],
  },
]

export const knowledge = {
  cloud: [
    'AWS core, hybrid & edge patterns',
    'Well-Architected & operational excellence',
    'Cloud Adoption Framework (CAF)',
    'Identity, networking, observability',
    'Cost, usage & FinOps cadence',
  ],
  delivery: [
    'Large-scale program & engagement governance',
    'RAID, dependencies & executive escalation design',
    'Partner & systems integrator coordination',
    'Steering forums & decision records',
  ],
  practices: [
    'Customer success planning & value narratives',
    'Workshop & executive session facilitation (EN/FR)',
    'Technical credibility with engineering & CxO audiences',
    'Adoption health: signals, interventions, renewals mindset',
  ],
}

export const credentials = [
  'AWS certifications — per résumé (Solutions Architect, specialty, etc.)',
  'Program / engagement credentials — per résumé',
  'Executive references available under mutual NDA',
]
