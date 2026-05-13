import { Link } from "react-router-dom";
import {
  AdvisoryWorkflowSvg,
  DynamoKeysSvg,
  EntityRelationshipSvg,
  HighLevelArchitectureSvg,
} from "./systemDesign/BlueprintsDiagrams";

const toc = [
  { id: "overview", label: "Overview & phases" },
  { id: "architecture", label: "High-level architecture" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & APIs" },
  { id: "database", label: "Database & entities" },
  { id: "auth", label: "Authentication & authorization" },
  { id: "integrations", label: "Integrations" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "roles", label: "User roles" },
  { id: "workflows", label: "Key workflows" },
  { id: "deployment", label: "Deployment model" },
] as const;

export function SystemDesignBlueprintPage() {
  return (
    <article className="blueprint-page panel panel-wide">
      <header className="blueprint-header">
        <p className="blueprint-kicker">Technical blueprint</p>
        <h1>EP Navigator — system design</h1>
        <p className="lede">
          This page describes how the GoO EP Advisory Control Tower application is
          structured today (Phase 1) and how it is intended to evolve on AWS
          (Phase 2): user-facing SPA, REST APIs, single-table DynamoDB, private S3
          attachments, Cognito identity, and Amplify delivery.
        </p>
        <p className="lede subtle">
          <Link to="/">← Home</Link>
          {" · "}
          Diagrams are inline SVG so they render as vector graphics in the browser
          (suitable for print or export to PDF via the browser).
        </p>
      </header>

      <nav className="blueprint-toc" aria-label="Page sections">
        {toc.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>

      <section id="overview" className="blueprint-section">
        <h2>Overview and phases</h2>
        <div className="blueprint-two">
          <div>
            <h3>Phase 1 (current)</h3>
            <ul>
              <li>React 18 SPA (Vite + TypeScript) with client-side routing.</li>
              <li>
                Read model from <code className="inline-code">normalizedSeed.json</code>{" "}
                generated from the Excel control tower workbook.
              </li>
              <li>No remote API or login in the bundle; suitable for static hosting.</li>
            </ul>
          </div>
          <div>
            <h3>Phase 2 (target)</h3>
            <ul>
              <li>Same SPA, data from REST API (API Gateway + Lambda).</li>
              <li>Amazon Cognito for sign-in; JWT validated on each protected route.</li>
              <li>DynamoDB single table <code className="inline-code">GoOControlTower</code>{" "}
                with GSIs for org portfolio and due-date radar.</li>
              <li>Private S3 bucket; presigned PUT/GET for evidence and artifacts.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="architecture" className="blueprint-section">
        <h2>High-level architecture</h2>
        <p className="lede subtle">
          Users interact only with the SPA over HTTPS. Static assets are served from
          Amplify (CloudFront + S3). Authenticated calls reach a regional REST API that
          executes least-privilege Lambdas and reads/writes DynamoDB and S3.
        </p>
        <figure className="blueprint-figure">
          <HighLevelArchitectureSvg />
          <figcaption>
            Logical view: shaded Phase 2 components integrate with the existing static
            host path for the SPA.
          </figcaption>
        </figure>
      </section>

      <section id="frontend" className="blueprint-section">
        <h2>Frontend</h2>
        <table className="blueprint-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Technology</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UI</td>
              <td>React 18, JSX</td>
              <td>LOB 360, dashboard, lookups, relationship map, field dictionary.</td>
            </tr>
            <tr>
              <td>Routing</td>
              <td>React Router v6</td>
              <td>Declarative routes; LOB detail uses URL param <code className="inline-code">:id</code>.</td>
            </tr>
            <tr>
              <td>State / data</td>
              <td>Module store + JSON seed</td>
              <td>
                Phase 1: <code className="inline-code">controlTowerStore</code>. Phase 2:
                replace with <code className="inline-code">fetch</code> + React Query or
                equivalent.
              </td>
            </tr>
            <tr>
              <td>Styling</td>
              <td>CSS (App.css)</td>
              <td>Responsive layout, tables, tabs, blueprint figures.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="backend" className="blueprint-section">
        <h2>Backend and APIs</h2>
        <p className="lede subtle">
          REST only (no GraphQL in this design). Example resource layout grouped by
          organization and LOB; adjust prefixes to match your API standards.
        </p>
        <table className="blueprint-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Example path</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET</td>
              <td><code className="inline-code">/v1/orgs/{"{orgId}"}/lobs</code></td>
              <td>List LOB profiles (GSI1-backed org view or scan of PROFILE rows).</td>
            </tr>
            <tr>
              <td>GET</td>
              <td><code className="inline-code">/v1/orgs/{"{orgId}"}/lobs/{"{lobId}"}</code></td>
              <td>LOB profile + optional expand query for child collections.</td>
            </tr>
            <tr>
              <td>GET/POST/PUT</td>
              <td>
                <code className="inline-code">/v1/orgs/{"{orgId}"}/lobs/{"{lobId}"}/outcomes</code>{" "}
                (and parallel paths for requirements, gaps, actions, …)
              </td>
              <td>CRUD on child entities; writes set pk/sk and denormalized fields.</td>
            </tr>
            <tr>
              <td>POST</td>
              <td><code className="inline-code">/v1/orgs/{"{orgId}"}/lobs/{"{lobId}"}/attachments/presign</code></td>
              <td>Return S3 presigned URL for evidence or artifact upload.</td>
            </tr>
            <tr>
              <td>GET</td>
              <td><code className="inline-code">/v1/orgs/{"{orgId}"}/lookups</code></td>
              <td>Reference values (cacheable, low rate of change).</td>
            </tr>
            <tr>
              <td>GET</td>
              <td><code className="inline-code">/v1/orgs/{"{orgId}"}/due-radar?from=&amp;to=</code></td>
              <td>Query GSI2 for actions, meetings, and risks in a date window.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="database" className="blueprint-section">
        <h2>Database and entity model</h2>
        <p className="lede subtle">
          All operational entities for a LOB share one partition key so a single{" "}
          <code className="inline-code">Query</code> returns the whole workspace. Lookup
          values can live in the same table (dedicated pk prefix) or a small side table;
          the app currently ships them embedded in the SPA seed.
        </p>
        <figure className="blueprint-figure">
          <EntityRelationshipSvg />
          <figcaption>
            Logical relationships aligned with the Excel workbook and{" "}
            <Link to="/relationships">Relationship map</Link> screen.
          </figcaption>
        </figure>
        <figure className="blueprint-figure">
          <DynamoKeysSvg />
          <figcaption>
            Physical access pattern: one partition per LOB; sort key discriminates entity
            type and business id.
          </figcaption>
        </figure>
      </section>

      <section id="auth" className="blueprint-section">
        <h2>Authentication and authorization</h2>
        <table className="blueprint-table">
          <thead>
            <tr>
              <th>Concern</th>
              <th>Approach</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td>
                Amazon Cognito user pool; app client for SPA (PKCE). Optional federation
                to enterprise IdP (SAML/OIDC).
              </td>
            </tr>
            <tr>
              <td>Transport</td>
              <td>HTTPS only; API Gateway mutual TLS optional for B2B callers.</td>
            </tr>
            <tr>
              <td>Authorization</td>
              <td>
                JWT authorizer on API Gateway <em>or</em> shared middleware in Lambda that
                validates claims, resolves <code className="inline-code">orgId</code>, and
                enforces role + tenant isolation on every handler.
              </td>
            </tr>
            <tr>
              <td>Session in SPA</td>
              <td>
                Store tokens in memory or secure cookie; attach{" "}
                <code className="inline-code">Authorization: Bearer</code> to API calls.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="integrations" className="blueprint-section">
        <h2>Integrations</h2>
        <ul className="blueprint-list">
          <li>
            <strong>SharePoint / M365:</strong> today many fields are “paste link”
            placeholders; Phase 2 can store canonical URLs and optionally use Graph API
            read-only where policy allows.
          </li>
          <li>
            <strong>ITSM / Jira:</strong> optional outbound webhooks or sync tasks from
            Lambda for enhancement backlog items.
          </li>
          <li>
            <strong>Contact centre / reporting:</strong> KPI rows reference measurement
            sources (for example ODP, Amazon Connect); integrations are read-only pulls
            or scheduled ETL, not in the Phase 1 bundle.
          </li>
          <li>
            <strong>Email / Teams:</strong> optional SNS or Amazon Pinpoint for meeting
            reminders and escalation notices triggered from scheduled Lambdas.
          </li>
        </ul>
      </section>

      <section id="infrastructure" className="blueprint-section">
        <h2>Infrastructure (AWS)</h2>
        <table className="blueprint-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Service</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Static UI</td>
              <td>Amplify Hosting</td>
              <td>Build from Git; environment variables per branch (dev / stage / prod).</td>
            </tr>
            <tr>
              <td>API</td>
              <td>API Gateway (REST)</td>
              <td>Usage plans + API keys or Cognito-only; WAF optional at edge.</td>
            </tr>
            <tr>
              <td>Compute</td>
              <td>AWS Lambda (Node.js 20)</td>
              <td>One function per bounded context or a thin router with shared middleware.</td>
            </tr>
            <tr>
              <td>Primary datastore</td>
              <td>DynamoDB</td>
              <td>On-demand capacity for MVP; PITR enabled; least-privilege IAM per function.</td>
            </tr>
            <tr>
              <td>Binary objects</td>
              <td>S3 + KMS</td>
              <td>Block public access; SSE-KMS; lifecycle rules for old evidence.</td>
            </tr>
            <tr>
              <td>Observability</td>
              <td>CloudWatch Logs / Metrics / Alarms</td>
              <td>Lambda error rate, API 5xx, DynamoDB throttles (if provisioned later).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="roles" className="blueprint-section">
        <h2>User roles (recommended)</h2>
        <table className="blueprint-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Typical persona</th>
              <th>Capabilities</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PortfolioReader</td>
              <td>Executive, PMO</td>
              <td>Read all LOBs and dashboards in an org; export summaries.</td>
            </tr>
            <tr>
              <td>LobOwner</td>
              <td>Ministry business owner</td>
              <td>Read/write own LOB profile, outcomes, and priorities.</td>
            </tr>
            <tr>
              <td>TechnicalOwner</td>
              <td>IT / platform lead</td>
              <td>Update technical fields, dependencies, integration notes.</td>
            </tr>
            <tr>
              <td>AdvisoryLead</td>
              <td>Bell CSM / advisor</td>
              <td>Full advisory objects: gaps, recommendations, backlog, risks.</td>
            </tr>
            <tr>
              <td>ProgramAdmin</td>
              <td>Control tower operator</td>
              <td>Manage lookup values, org-wide settings, user invites.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="workflows" className="blueprint-section">
        <h2>Key workflows</h2>
        <figure className="blueprint-figure blueprint-figure--compact">
          <AdvisoryWorkflowSvg />
          <figcaption>Traceability chain from business outcome to measurable value.</figcaption>
        </figure>
        <ol className="blueprint-ordered">
          <li>
            <strong>Monthly advisory cadence:</strong> dashboard highlights open
            high-priority actions and risks; meeting log captures decisions; statuses
            flow back to outcomes and KPIs.
          </li>
          <li>
            <strong>Discovery to backlog:</strong> outcome agreed → requirements captured →
            gap findings recorded → enhancement actions prioritized with owners and dates.
          </li>
          <li>
            <strong>Evidence handling:</strong> user requests presigned upload URL → uploads
            file to S3 → API stores object key on action or artifact row → download uses
            short-lived presigned GET.
          </li>
          <li>
            <strong>Quarterly portfolio review:</strong> aggregate across LOBs using GSI1
            and materialized metrics (optional batch job writing summary items).
          </li>
        </ol>
        <pre className="blueprint-pre" aria-label="Sequence outline">
{`Browser          Cognito          API GW           Lambda           DynamoDB / S3
   | sign-in -------->|                |                  |                  |
   |<------ tokens ---|                |                  |                  |
   | REST + JWT ---------------------->|----------------->| Query(pk, sk)  |
   |<--------------------- JSON -------|<-----------------|                  |
   | presign POST -------------------->|----------------->| PutObject URL  |
   | PUT file ---------------------------------------------------------> S3`}
        </pre>
      </section>

      <section id="deployment" className="blueprint-section">
        <h2>Deployment model</h2>
        <ul className="blueprint-list">
          <li>
            <strong>Repositories:</strong> mono-repo (current) or split{" "}
            <code className="inline-code">web</code> / <code className="inline-code">api</code>{" "}
            with shared OpenAPI or TypeScript types package.
          </li>
          <li>
            <strong>CI/CD:</strong> Git push triggers Amplify build for the SPA; separate
            pipeline (GitHub Actions + CDK deploy) for API, table, and bucket per
            environment.
          </li>
          <li>
            <strong>Configuration:</strong> non-secret values in Amplify environment
            variables; secrets in AWS Secrets Manager or SSM Parameter Store; Lambdas read
            at cold start with cache.
          </li>
          <li>
            <strong>Data migration:</strong> import workbook-derived rows via one-off
            script (batch <code className="inline-code">TransactWrite</code>) until APIs
            own ongoing edits.
          </li>
        </ul>
        <p className="notice blueprint-notice">
          This blueprint is descriptive documentation shipped with the app. When you
          implement Phase 2, keep the diagrams in sync with the actual CDK stack and API
          OpenAPI specification.
        </p>
      </section>
    </article>
  );
}
