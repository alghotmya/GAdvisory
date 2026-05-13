/** Inline SVG diagrams for the system design blueprint (no external chart libs). */

export function HighLevelArchitectureSvg() {
  return (
    <svg
      viewBox="0 0 920 420"
      className="blueprint-svg"
      role="img"
      aria-labelledby="arch-title arch-desc"
    >
      <title id="arch-title">High-level deployment architecture</title>
      <desc id="arch-desc">
        Users, browser SPA on Amplify, Cognito authentication, API Gateway and
        Lambda, DynamoDB and private S3 for attachments.
      </desc>
      <defs>
        <linearGradient id="bp-arch-box" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(120,170,255,0.25)" />
          <stop offset="100%" stopColor="rgba(40,60,120,0.35)" />
        </linearGradient>
        <marker id="bp-arch-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <path d="M0,0 L10,3 L0,6 Z" fill="rgba(200,210,255,0.85)" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.2)" rx="12" />
      <text x="460" y="36" textAnchor="middle" fill="#e8ecff" fontSize="20" fontWeight="700">
        Target production architecture
      </text>
      <text x="460" y="58" textAnchor="middle" fill="rgba(230,235,255,0.65)" fontSize="12">
        Phase 1 today: static SPA + bundled seed · Phase 2: shaded components go live
      </text>

      <rect x="40" y="100" width="120" height="56" rx="8" fill="url(#bp-arch-box)" stroke="rgba(255,255,255,0.35)" />
      <text x="100" y="128" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        Users
      </text>
      <text x="100" y="146" textAnchor="middle" fill="rgba(230,235,255,0.7)" fontSize="10">
        Web browser
      </text>

      <rect x="200" y="92" width="140" height="72" rx="8" fill="url(#bp-arch-box)" stroke="rgba(255,255,255,0.35)" />
      <text x="270" y="120" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        React SPA
      </text>
      <text x="270" y="138" textAnchor="middle" fill="rgba(230,235,255,0.75)" fontSize="10">
        EP Navigator
      </text>
      <text x="270" y="154" textAnchor="middle" fill="rgba(230,235,255,0.55)" fontSize="9">
        Vite + TypeScript
      </text>

      <rect x="380" y="92" width="160" height="72" rx="8" fill="url(#bp-arch-box)" stroke="rgba(120,200,255,0.5)" />
      <text x="460" y="118" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        AWS Amplify Hosting
      </text>
      <text x="460" y="136" textAnchor="middle" fill="rgba(230,235,255,0.75)" fontSize="10">
        CloudFront + S3 static
      </text>
      <text x="460" y="152" textAnchor="middle" fill="rgba(230,235,255,0.55)" fontSize="9">
        CI build from Git
      </text>

      <rect x="580" y="92" width="150" height="72" rx="8" fill="url(#bp-arch-box)" stroke="rgba(255,255,255,0.35)" />
      <text x="655" y="118" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        Amazon Cognito
      </text>
      <text x="655" y="136" textAnchor="middle" fill="rgba(230,235,255,0.75)" fontSize="10">
        User pool + JWT
      </text>
      <text x="655" y="152" textAnchor="middle" fill="rgba(230,235,255,0.55)" fontSize="9">
        Hosted UI (optional)
      </text>

      <rect x="760" y="92" width="120" height="72" rx="8" fill="url(#bp-arch-box)" stroke="rgba(255,255,255,0.35)" />
      <text x="820" y="118" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        IdP / SSO
      </text>
      <text x="820" y="138" textAnchor="middle" fill="rgba(230,235,255,0.65)" fontSize="10">
        SAML / OIDC
      </text>
      <text x="820" y="154" textAnchor="middle" fill="rgba(230,235,255,0.5)" fontSize="9">
        Future
      </text>

      <line
        x1="160"
        y1="128"
        x2="198"
        y2="128"
        stroke="rgba(200,210,255,0.7)"
        strokeWidth="2"
        markerEnd="url(#bp-arch-arrow)"
      />
      <line
        x1="340"
        y1="128"
        x2="378"
        y2="128"
        stroke="rgba(200,210,255,0.7)"
        strokeWidth="2"
        markerEnd="url(#bp-arch-arrow)"
      />
      <path
        d="M 460 164 L 460 200 L 655 200 L 655 164"
        fill="none"
        stroke="rgba(200,210,255,0.45)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <text x="560" y="192" textAnchor="middle" fill="rgba(230,235,255,0.5)" fontSize="9">
        sign-in / token refresh
      </text>

      <rect x="220" y="230" width="200" height="68" rx="8" fill="url(#bp-arch-box)" stroke="rgba(255,200,120,0.45)" />
      <text x="320" y="258" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        Amazon API Gateway
      </text>
      <text x="320" y="278" textAnchor="middle" fill="rgba(230,235,255,0.7)" fontSize="10">
        REST + usage plans
      </text>

      <rect x="460" y="230" width="200" height="68" rx="8" fill="url(#bp-arch-box)" stroke="rgba(255,200,120,0.45)" />
      <text x="560" y="258" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        AWS Lambda
      </text>
      <text x="560" y="278" textAnchor="middle" fill="rgba(230,235,255,0.7)" fontSize="10">
        Domain handlers + RBAC
      </text>

      <rect x="120" y="330" width="200" height="68" rx="8" fill="url(#bp-arch-box)" stroke="rgba(100,255,180,0.4)" />
      <text x="220" y="358" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        DynamoDB
      </text>
      <text x="220" y="378" textAnchor="middle" fill="rgba(230,235,255,0.7)" fontSize="10">
        GoOControlTower (single table)
      </text>

      <rect x="360" y="330" width="200" height="68" rx="8" fill="url(#bp-arch-box)" stroke="rgba(100,255,180,0.4)" />
      <text x="460" y="358" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        Amazon S3
      </text>
      <text x="460" y="378" textAnchor="middle" fill="rgba(230,235,255,0.7)" fontSize="10">
        Private attachments bucket
      </text>

      <rect x="600" y="330" width="200" height="68" rx="8" fill="url(#bp-arch-box)" stroke="rgba(100,255,180,0.4)" />
      <text x="700" y="358" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        CloudWatch
      </text>
      <text x="700" y="378" textAnchor="middle" fill="rgba(230,235,255,0.7)" fontSize="10">
        Logs + alarms
      </text>

      <line
        x1="320"
        y1="298"
        x2="320"
        y2="328"
        stroke="rgba(200,210,255,0.7)"
        strokeWidth="2"
        markerEnd="url(#bp-arch-arrow)"
      />
      <line
        x1="560"
        y1="298"
        x2="560"
        y2="328"
        stroke="rgba(200,210,255,0.7)"
        strokeWidth="2"
        markerEnd="url(#bp-arch-arrow)"
      />
      <line
        x1="520"
        y1="264"
        x2="458"
        y2="264"
        stroke="rgba(200,210,255,0.7)"
        strokeWidth="2"
        markerEnd="url(#bp-arch-arrow)"
      />
      <path
        d="M 560 298 L 560 310 L 220 310 L 220 328 M 560 310 L 460 310 L 460 328 M 560 310 L 700 310 L 700 328"
        fill="none"
        stroke="rgba(200,210,255,0.45)"
        strokeWidth="1.5"
      />

      <line
        x1="460"
        y1="164"
        x2="460"
        y2="228"
        stroke="rgba(200,210,255,0.55)"
        strokeWidth="2"
        markerEnd="url(#bp-arch-arrow)"
      />
      <text x="475" y="200" fill="rgba(230,235,255,0.55)" fontSize="10">
        HTTPS API calls (Phase 2)
      </text>
    </svg>
  );
}

export function EntityRelationshipSvg() {
  return (
    <svg
      viewBox="0 0 960 520"
      className="blueprint-svg"
      role="img"
      aria-labelledby="er-title er-desc"
    >
      <defs>
        <marker id="bp-er-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="rgba(200,210,255,0.85)" />
        </marker>
      </defs>
      <title id="er-title">Domain entity relationships</title>
      <desc id="er-desc">
        Logical ER model: LOB owns outcomes; outcomes drive requirements, KPIs,
        and training; requirements surface gaps; gaps drive actions; actions tie
        to risks and meetings; artifacts attach to outcomes or actions.
      </desc>
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.2)" rx="12" />
      <text x="480" y="34" textAnchor="middle" fill="#e8ecff" fontSize="20" fontWeight="700">
        Logical data model (Control Tower lists)
      </text>
      <text x="480" y="54" textAnchor="middle" fill="rgba(230,235,255,0.6)" fontSize="11">
        Physical mapping: single-table sort keys under pk = ORG#org#LOB#lobId
      </text>

      <line x1="480" y1="95" x2="480" y2="118" stroke="rgba(200,210,255,0.6)" strokeWidth="2" markerEnd="url(#bp-er-arrow)" />
      <line x1="480" y1="178" x2="200" y2="220" stroke="rgba(200,210,255,0.45)" strokeWidth="1.5" />
      <line x1="480" y1="178" x2="480" y2="220" stroke="rgba(200,210,255,0.45)" strokeWidth="1.5" />
      <line x1="480" y1="178" x2="760" y2="220" stroke="rgba(200,210,255,0.45)" strokeWidth="1.5" />
      <line x1="200" y1="276" x2="200" y2="318" stroke="rgba(200,210,255,0.45)" strokeWidth="1.5" markerEnd="url(#bp-er-arrow)" />
      <line x1="200" y1="374" x2="200" y2="418" stroke="rgba(200,210,255,0.45)" strokeWidth="1.5" markerEnd="url(#bp-er-arrow)" />
      <line x1="200" y1="474" x2="400" y2="386" stroke="rgba(200,210,255,0.35)" strokeWidth="1.5" />
      <line x1="480" y1="276" x2="480" y2="318" stroke="rgba(200,210,255,0.35)" strokeWidth="1.5" markerEnd="url(#bp-er-arrow)" />
      <line x1="480" y1="414" x2="480" y2="438" stroke="rgba(200,210,255,0.35)" strokeWidth="1.5" markerEnd="url(#bp-er-arrow)" />
      <line x1="760" y1="276" x2="760" y2="318" stroke="rgba(200,210,255,0.35)" strokeWidth="1.5" markerEnd="url(#bp-er-arrow)" />

      <rect x="380" y="60" width="200" height="56" rx="8" fill="rgba(80,130,220,0.35)" stroke="rgba(255,255,255,0.4)" />
      <text x="480" y="88" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">
        LOB Profile
      </text>
      <text x="480" y="104" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">
        PK root · sk PROFILE
      </text>

      <rect x="380" y="130" width="200" height="48" rx="8" fill="rgba(60,100,180,0.35)" stroke="rgba(255,255,255,0.3)" />
      <text x="480" y="158" textAnchor="middle" fill="#eef1ff" fontSize="13" fontWeight="600">
        Outcomes
      </text>

      <rect x="120" y="220" width="160" height="56" rx="8" fill="rgba(50,90,160,0.4)" stroke="rgba(255,255,255,0.3)" />
      <text x="200" y="248" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        Capabilities / Requirements
      </text>

      <rect x="400" y="220" width="160" height="56" rx="8" fill="rgba(50,90,160,0.4)" stroke="rgba(255,255,255,0.3)" />
      <text x="480" y="248" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        KPI Measurement
      </text>

      <rect x="680" y="220" width="160" height="56" rx="8" fill="rgba(50,90,160,0.4)" stroke="rgba(255,255,255,0.3)" />
      <text x="760" y="248" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        Training &amp; Adoption
      </text>

      <rect x="120" y="318" width="160" height="56" rx="8" fill="rgba(40,80,140,0.45)" stroke="rgba(255,255,255,0.3)" />
      <text x="200" y="346" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        Gap / Findings
      </text>

      <rect x="120" y="418" width="160" height="56" rx="8" fill="rgba(120,80,40,0.45)" stroke="rgba(255,200,120,0.4)" />
      <text x="200" y="446" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        Action Backlog
      </text>

      <rect x="400" y="318" width="160" height="56" rx="8" fill="rgba(90,50,120,0.45)" stroke="rgba(255,255,255,0.3)" />
      <text x="480" y="346" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        Risks / Decisions
      </text>

      <rect x="400" y="418" width="160" height="56" rx="8" fill="rgba(50,120,100,0.45)" stroke="rgba(255,255,255,0.3)" />
      <text x="480" y="446" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        Meeting log
      </text>

      <rect x="680" y="378" width="160" height="56" rx="8" fill="rgba(60,60,100,0.45)" stroke="rgba(255,255,255,0.3)" />
      <text x="760" y="406" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        Artifacts ( + S3 )
      </text>

      <rect x="680" y="318" width="160" height="56" rx="8" fill="rgba(35,70,90,0.45)" stroke="rgba(180,220,255,0.35)" />
      <text x="760" y="346" textAnchor="middle" fill="#eef1ff" fontSize="12" fontWeight="600">
        Lookup values
      </text>
      <text x="760" y="362" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
        reference data
      </text>

      <text x="24" y="508" fill="rgba(230,235,255,0.45)" fontSize="10">
        Cardinalities: 1 LOB → many outcomes → many requirements / KPIs / training; 1 requirement → many gaps; 1 gap
        → many actions; 1 action → many risks.
      </text>
    </svg>
  );
}

export function DynamoKeysSvg() {
  return (
    <svg viewBox="0 0 920 200" className="blueprint-svg" role="img" aria-label="DynamoDB key pattern">
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.2)" rx="12" />
      <text x="460" y="32" textAnchor="middle" fill="#e8ecff" fontSize="17" fontWeight="700">
        Single-table key pattern (per LOB partition)
      </text>
      <rect x="40" y="60" width="840" height="44" rx="6" fill="rgba(30,50,90,0.5)" stroke="rgba(255,255,255,0.2)" />
      <text x="60" y="86" fill="#b8d4ff" fontSize="13" fontFamily="ui-monospace, monospace">
        pk = ORG#{"{orgId}"}#LOB#{"{lobId}"}
      </text>
      <rect x="40" y="118" width="840" height="62" rx="6" fill="rgba(25,45,80,0.5)" stroke="rgba(255,255,255,0.2)" />
      <text x="60" y="142" fill="#cde0ff" fontSize="11" fontFamily="ui-monospace, monospace">
        sk ∈ PROFILE | OUTCOME#… | REQ#… | GAP#… | ACTION#… | RISK#… | TRAIN#… | KPI#… | MEETING#… | ARTIFACT#…
      </text>
      <text x="60" y="162" fill="rgba(200,215,255,0.65)" fontSize="10" fontFamily="ui-monospace, monospace">
        GSI1: org portfolio · GSI2: due-date radar (actions / meetings / risks)
      </text>
    </svg>
  );
}

export function AdvisoryWorkflowSvg() {
  const steps = ["Outcome", "Capability", "Gap", "Action", "Governance", "Value / KPI"] as const;
  const w = 118;
  const gap = 24;
  const start = 32;
  return (
    <svg viewBox="0 0 900 120" className="blueprint-svg" role="img" aria-label="Advisory workflow">
      <defs>
        <marker id="bp-wf-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="rgba(255,255,255,0.7)" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.2)" rx="12" />
      <text x="450" y="28" textAnchor="middle" fill="#e8ecff" fontSize="16" fontWeight="700">
        Core advisory chain (workbook operating principle)
      </text>
      {steps.map((label, i) => {
        const x = start + i * (w + gap);
        return (
          <g key={label}>
            <rect
              x={x}
              y={52}
              width={w}
              height="44"
              rx="8"
              fill="rgba(70,110,190,0.35)"
              stroke="rgba(255,255,255,0.3)"
            />
            <text x={x + w / 2} y={78} textAnchor="middle" fill="#eef1ff" fontSize="11" fontWeight="600">
              {label}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={x + w}
                y1={74}
                x2={x + w + gap - 2}
                y2={74}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                markerEnd="url(#bp-wf-arrow)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
