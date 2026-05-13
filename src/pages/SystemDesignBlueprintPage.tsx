import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AdvisoryWorkflowSvg,
  DynamoKeysSvg,
  EntityRelationshipSvg,
  HighLevelArchitectureSvg,
} from "./systemDesign/BlueprintsDiagrams";

const toc = [
  { id: "overview", label: "Overview & phases" },
  { id: "lob-360", label: "What is LOB 360?" },
  { id: "architecture", label: "High-level architecture" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & APIs" },
  { id: "database", label: "Database & entities" },
  { id: "traceability-lookups", label: "Traceability & lookups" },
  { id: "auth", label: "Authentication & authorization" },
  { id: "integrations", label: "Integrations" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "roles", label: "User roles" },
  { id: "workflows", label: "Key workflows" },
  { id: "deployment", label: "Deployment model" },
] as const;

export function SystemDesignBlueprintPage() {
  const location = useLocation();
  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, location.pathname]);

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

      <section id="lob-360" className="blueprint-section">
        <h2>What is LOB 360?</h2>
        <p className="lede subtle">
          In this product, <strong>LOB</strong> means a <strong>line of business</strong>{" "}
          (or program area) under advisory—for example a ministry service such as a
          contact centre or digital channel that is being assessed for experience
          platform (EP) maturity, gaps, and follow-up actions.
        </p>
        <p className="lede subtle">
          <strong>LOB 360</strong> is the <em>360-degree workspace</em> for one LOB: a
          single place to see the profile (owners, maturity, health, review dates) and
          every linked advisory list—outcomes, capability requirements, gap findings,
          enhancement backlog, risks and decisions, training and adoption, KPIs,
          governance meetings, and document artifacts. All child rows reference the same{" "}
          <code className="inline-code">LOB ID</code> (and usually{" "}
          <code className="inline-code">LOB Name</code>) so work stays traceable from
          strategy down to evidence.
        </p>
        <ul className="blueprint-list">
          <li>
            <strong>List view</strong> (<Link to="/lobs">/lobs</Link>): pick a LOB to open
            its workspace.
          </li>
          <li>
            <strong>Detail view</strong> (<code className="inline-code">/lobs/:id</code>
            ): tabs mirror the Excel lists for that LOB only.
          </li>
          <li>
            <strong>Dashboard</strong> aggregates portfolio metrics across LOBs for
            executive review, without replacing the per-LOB 360 view.
          </li>
        </ul>
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
              <td>
                LOB 360 (per-LOB tabs), portfolio dashboard, field dictionary, and this
                blueprint.
              </td>
            </tr>
            <tr>
              <td>Routing</td>
              <td>React Router v6</td>
              <td>Declarative routes; LOB detail uses URL param <code className="inline-code">:id</code>.</td>
            </tr>
            <tr>
              <td>State / data</td>
              <td>React context + localStorage + JSON seed</td>
              <td>
                Phase 1: <code className="inline-code">ControlTowerProvider</code> /{" "}
                <code className="inline-code">useControlTower()</code> hydrate from seed
                and persist edits in the browser. Phase 2: replace with{" "}
                <code className="inline-code">fetch</code> + React Query or equivalent.
              </td>
            </tr>
            <tr>
              <td>Styling</td>
              <td>Tailwind + shadcn/ui primitives + App.css shell</td>
              <td>Console-inspired neutrals, cards, dialogs, data tables.</td>
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
            Logical relationships aligned with the Excel workbook (see also{" "}
            <a href="#traceability-lookups">Traceability and reference lookups</a>).
          </figcaption>
        </figure>
        <figure className="blueprint-figure">
          <DynamoKeysSvg />
          <figcaption>
            Physical access pattern: one partition per LOB; sort key discriminates entity
            type and business id.
          </figcaption>
        </figure>

        <h3>Logical items (single-table “entity types”)</h3>
        <p className="lede subtle">
          Each row below is one <strong>logical item type</strong> stored under the same
          LOB partition (<code className="inline-code">pk = ORG#…#LOB#…</code>). Columns
          are the application fields persisted on that item (see also the in-app{" "}
          <Link to="/field-dictionary">field dictionary</Link> for workbook column
          metadata). Foreign keys are plain string attributes referencing sibling items in
          the same partition.
        </p>

        <h4>LOB profile</h4>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code className="inline-code">orgId</code></td>
              <td>Tenant id (constant in Phase 1 seed).</td>
            </tr>
            <tr>
              <td><code className="inline-code">lobId</code></td>
              <td>Primary business id for the LOB; partition anchor.</td>
            </tr>
            <tr>
              <td><code className="inline-code">lobName</code></td>
              <td>Display name; denormalized onto child rows for readability.</td>
            </tr>
            <tr>
              <td><code className="inline-code">ministryCluster</code></td>
              <td>Program / cluster label.</td>
            </tr>
            <tr>
              <td><code className="inline-code">businessOwner</code>, <code className="inline-code">technicalOwner</code></td>
              <td>RACI-style ownership.</td>
            </tr>
            <tr>
              <td><code className="inline-code">bellAdvisorCsm</code>, <code className="inline-code">implementationPartner</code></td>
              <td>Advisory and SI contacts.</td>
            </tr>
            <tr>
              <td><code className="inline-code">supportModel</code></td>
              <td>Run / sustain model.</td>
            </tr>
            <tr>
              <td><code className="inline-code">currentEpStatus</code></td>
              <td>EP lifecycle status on the portfolio radar.</td>
            </tr>
            <tr>
              <td><code className="inline-code">capabilitiesEnabled</code></td>
              <td>Comma- or narrative list of enabled capabilities.</td>
            </tr>
            <tr>
              <td><code className="inline-code">maturityLevel</code></td>
              <td>Maturity assessment.</td>
            </tr>
            <tr>
              <td><code className="inline-code">health</code></td>
              <td>RAG health; aligns with lookup values sheet.</td>
            </tr>
            <tr>
              <td><code className="inline-code">lastReviewDate</code>, <code className="inline-code">nextReviewDate</code></td>
              <td>Governance cadence.</td>
            </tr>
            <tr>
              <td><code className="inline-code">notes</code></td>
              <td>Free text.</td>
            </tr>
          </tbody>
        </table>

        <h4>Outcome</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">lobId</code> → LOB profile. Referenced by
          requirements, gaps (optional), training, KPIs, artifacts (optional).
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code className="inline-code">outcomeId</code></td>
              <td>Primary id; referenced as <code className="inline-code">relatedOutcomeId</code>.</td>
            </tr>
            <tr>
              <td><code className="inline-code">businessOutcome</code>, narrative fields</td>
              <td>Intent, pain, future state, executive narrative.</td>
            </tr>
            <tr>
              <td><code className="inline-code">successMetricKpi</code>, <code className="inline-code">baselineValue</code>, <code className="inline-code">targetValue</code></td>
              <td>Embedded success measures (detail KPIs live in KPI list).</td>
            </tr>
            <tr>
              <td><code className="inline-code">measurementSource</code>, <code className="inline-code">confidenceLevel</code></td>
              <td>Evidence posture.</td>
            </tr>
            <tr>
              <td><code className="inline-code">advisoryPriority</code>, <code className="inline-code">health</code>, <code className="inline-code">status</code></td>
              <td>Portfolio triage and workflow.</td>
            </tr>
            <tr>
              <td><code className="inline-code">owner</code>, <code className="inline-code">targetReviewDate</code>, <code className="inline-code">notes</code></td>
              <td>Ownership and follow-up.</td>
            </tr>
          </tbody>
        </table>

        <h4>Capability requirement</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">relatedOutcomeId</code> → Outcome;{" "}
          <code className="inline-code">lobId</code> → LOB.
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field group</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td><code className="inline-code">requirementId</code>, <code className="inline-code">lobId</code>, <code className="inline-code">lobName</code></td>
            </tr>
            <tr>
              <td>Scope</td>
              <td><code className="inline-code">capabilityArea</code>, <code className="inline-code">specificRequirement</code></td>
            </tr>
            <tr>
              <td>As-is / to-be</td>
              <td><code className="inline-code">currentState</code>, <code className="inline-code">requiredFutureState</code>, <code className="inline-code">existingFeatureAvailable</code>, <code className="inline-code">bestPracticeAvailable</code></td>
            </tr>
            <tr>
              <td>Classification</td>
              <td><code className="inline-code">gapType</code>, <code className="inline-code">requiresCr</code>, <code className="inline-code">complexity</code></td>
            </tr>
            <tr>
              <td>Workflow</td>
              <td><code className="inline-code">recommendation</code>, <code className="inline-code">owner</code>, <code className="inline-code">status</code>, <code className="inline-code">targetDate</code>, <code className="inline-code">notes</code></td>
            </tr>
          </tbody>
        </table>

        <h4>Gap finding</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">relatedRequirementId</code>,{" "}
          <code className="inline-code">relatedOutcomeId</code>, <code className="inline-code">lobId</code>.
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field group</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td><code className="inline-code">findingId</code>, LOB keys</td>
            </tr>
            <tr>
              <td>Observation</td>
              <td><code className="inline-code">findingObservation</code>, <code className="inline-code">impact</code>, <code className="inline-code">gapType</code></td>
            </tr>
            <tr>
              <td>Advisory</td>
              <td><code className="inline-code">advisoryRecommendation</code>, <code className="inline-code">expectedValue</code>, <code className="inline-code">decisionNeeded</code></td>
            </tr>
            <tr>
              <td>Controls</td>
              <td><code className="inline-code">priority</code>, <code className="inline-code">health</code>, <code className="inline-code">status</code>, <code className="inline-code">owner</code>, dates, <code className="inline-code">evidenceSource</code>, <code className="inline-code">notes</code></td>
            </tr>
          </tbody>
        </table>

        <h4>Enhancement action</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">relatedGapId</code>, <code className="inline-code">relatedOutcomeId</code>, <code className="inline-code">lobId</code>. Evidence:{" "}
          <code className="inline-code">evidenceAttachment</code> (URL/text) or{" "}
          <code className="inline-code">evidenceAttachmentS3Key</code> (private object key;
          UI may use <code className="inline-code">s3key:</code> prefix in forms).
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field group</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td><code className="inline-code">actionId</code>, LOB keys</td>
            </tr>
            <tr>
              <td>Request</td>
              <td><code className="inline-code">requestType</code>, <code className="inline-code">requestTitle</code>, <code className="inline-code">description</code></td>
            </tr>
            <tr>
              <td>Prioritization</td>
              <td><code className="inline-code">businessDriver</code>, <code className="inline-code">impactArea</code>, <code className="inline-code">priority</code>, <code className="inline-code">urgency</code>, <code className="inline-code">effortEstimate</code>, <code className="inline-code">dependency</code></td>
            </tr>
            <tr>
              <td>Workflow</td>
              <td><code className="inline-code">decisionNeeded</code>, <code className="inline-code">owner</code>, <code className="inline-code">status</code>, <code className="inline-code">targetDate</code>, <code className="inline-code">advisoryNotes</code>, evidence fields</td>
            </tr>
          </tbody>
        </table>

        <h4>Risk / decision</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">relatedActionId</code>, <code className="inline-code">lobId</code>.
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field group</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td><code className="inline-code">riskDecisionId</code>, LOB keys, <code className="inline-code">type</code></td>
            </tr>
            <tr>
              <td>Risk body</td>
              <td><code className="inline-code">description</code>, <code className="inline-code">impact</code>, <code className="inline-code">probability</code>, <code className="inline-code">severity</code></td>
            </tr>
            <tr>
              <td>Decisioning</td>
              <td><code className="inline-code">mitigationDecisionRequired</code>, <code className="inline-code">decisionOwner</code>, <code className="inline-code">dueDate</code>, <code className="inline-code">status</code>, <code className="inline-code">escalationRequired</code>, <code className="inline-code">notes</code></td>
            </tr>
          </tbody>
        </table>

        <h4>Training &amp; adoption</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">relatedOutcomeId</code>, <code className="inline-code">lobId</code>; soft link by <code className="inline-code">capabilityArea</code>.
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field group</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td><code className="inline-code">trainingId</code>, LOB keys</td>
            </tr>
            <tr>
              <td>Need</td>
              <td><code className="inline-code">capabilityArea</code>, <code className="inline-code">audience</code>, <code className="inline-code">trainingAdoptionNeed</code>, <code className="inline-code">currentState</code></td>
            </tr>
            <tr>
              <td>Plan</td>
              <td><code className="inline-code">recommendedEnablement</code>, <code className="inline-code">referenceMaterialNeeded</code>, <code className="inline-code">deliveryMethod</code></td>
            </tr>
            <tr>
              <td>Workflow</td>
              <td><code className="inline-code">priority</code>, <code className="inline-code">owner</code>, <code className="inline-code">status</code>, <code className="inline-code">targetDate</code>, <code className="inline-code">completionAdoptionMeasure</code>, <code className="inline-code">notes</code></td>
            </tr>
          </tbody>
        </table>

        <h4>KPI measurement</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">relatedOutcomeId</code>, <code className="inline-code">lobId</code>.
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field group</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td><code className="inline-code">kpiId</code>, LOB keys</td>
            </tr>
            <tr>
              <td>Definition</td>
              <td><code className="inline-code">kpiSuccessMeasure</code>, <code className="inline-code">definition</code></td>
            </tr>
            <tr>
              <td>Values</td>
              <td><code className="inline-code">baselineValue</code>, <code className="inline-code">targetValue</code>, <code className="inline-code">currentValue</code>, <code className="inline-code">trend</code></td>
            </tr>
            <tr>
              <td>Operating model</td>
              <td><code className="inline-code">measurementSource</code>, <code className="inline-code">reportingFrequency</code>, <code className="inline-code">dataOwner</code>, <code className="inline-code">confidenceLevel</code>, <code className="inline-code">lastUpdated</code>, <code className="inline-code">notes</code></td>
            </tr>
          </tbody>
        </table>

        <h4>Meeting governance log</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">relatedActionId</code>,{" "}
          <code className="inline-code">relatedRiskDecisionId</code>, <code className="inline-code">lobId</code>.
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field group</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td><code className="inline-code">meetingId</code>, <code className="inline-code">meetingDate</code>, <code className="inline-code">meetingType</code>, LOB keys</td>
            </tr>
            <tr>
              <td>Content</td>
              <td><code className="inline-code">topic</code>, <code className="inline-code">summary</code>, <code className="inline-code">decisionAction</code></td>
            </tr>
            <tr>
              <td>Follow-up</td>
              <td><code className="inline-code">owner</code>, <code className="inline-code">dueDate</code>, related ids, <code className="inline-code">status</code>, <code className="inline-code">nextReviewDate</code>, <code className="inline-code">notes</code></td>
            </tr>
          </tbody>
        </table>

        <h4>Document artifact</h4>
        <p className="lede subtle">
          FK: <code className="inline-code">relatedOutcomeId</code>, <code className="inline-code">relatedActionId</code>, <code className="inline-code">lobId</code>. Location:{" "}
          <code className="inline-code">locationLink</code> or <code className="inline-code">artifactS3Key</code> (forms may use <code className="inline-code">s3key:</code> prefix).
        </p>
        <table className="blueprint-table blueprint-table-compact">
          <thead>
            <tr>
              <th>Field group</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identity</td>
              <td><code className="inline-code">artifactId</code>, LOB keys, <code className="inline-code">artifactType</code>, <code className="inline-code">artifactName</code></td>
            </tr>
            <tr>
              <td>Metadata</td>
              <td><code className="inline-code">description</code>, <code className="inline-code">owner</code>, <code className="inline-code">version</code>, <code className="inline-code">status</code>, <code className="inline-code">lastUpdated</code>, <code className="inline-code">notes</code></td>
            </tr>
            <tr>
              <td>Storage</td>
              <td><code className="inline-code">locationLink</code>, optional <code className="inline-code">artifactS3Key</code></td>
            </tr>
          </tbody>
        </table>

        <h4>Reference rows (seed only today)</h4>
        <p className="lede subtle">
          <code className="inline-code">lookups</code>, <code className="inline-code">relationshipMap</code>, and{" "}
          <code className="inline-code">fieldDictionary</code> arrays in the bundle mirror
          workbook sheets; Phase 2 can move them to dedicated items or a side table with
          read-only APIs.
        </p>
      </section>

      <section id="traceability-lookups" className="blueprint-section">
        <h2>Traceability and reference lookups</h2>
        <p className="lede subtle">
          The workbook&apos;s <em>Relationship Map</em> and <em>Lookup Values</em> sheets
          are reference material: they define how lists link to each other and which
          canonical values (health, priority, status, and so on) should appear in
          dropdowns. That material is documented here so it is not duplicated as
          separate top-level app screens. Legacy paths <code className="inline-code">
            /relationships
          </code>{" "}
          and <code className="inline-code">/lookups</code> redirect to this section.
        </p>

        <h3>List-to-list traceability (from the Relationship Map)</h3>
        <p className="lede subtle">
          Foreign keys in the data model follow these parent → child relationships (use
          IDs in APIs and DynamoDB; display names are denormalized for readability).
        </p>
        <table className="blueprint-table">
          <thead>
            <tr>
              <th>Parent list</th>
              <th>Key on parent</th>
              <th>Child list</th>
              <th>Matching field on child</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LOB Profile</td>
              <td>LOB ID</td>
              <td>Outcomes</td>
              <td>LOB ID</td>
            </tr>
            <tr>
              <td>Outcomes</td>
              <td>Outcome ID</td>
              <td>Capabilities Requirements</td>
              <td>Related Outcome ID</td>
            </tr>
            <tr>
              <td>Capabilities Requirements</td>
              <td>Requirement ID</td>
              <td>Gap Advisory Findings</td>
              <td>Related Requirement ID</td>
            </tr>
            <tr>
              <td>Gap Advisory Findings</td>
              <td>Finding ID</td>
              <td>Enhancement Action Backlog</td>
              <td>Related Gap ID</td>
            </tr>
            <tr>
              <td>Enhancement Action Backlog</td>
              <td>Action ID</td>
              <td>Risks Decisions Escalations</td>
              <td>Related Action ID</td>
            </tr>
            <tr>
              <td>Outcomes</td>
              <td>Outcome ID</td>
              <td>KPI Measurement</td>
              <td>Related Outcome ID</td>
            </tr>
            <tr>
              <td>Outcomes / capability area</td>
              <td>Outcome ID / capability area</td>
              <td>Training Adoption</td>
              <td>Related Outcome ID / capability area</td>
            </tr>
            <tr>
              <td>Any list</td>
              <td>Relevant IDs</td>
              <td>Meeting Governance Log</td>
              <td>Related Action ID, Related Risk / Decision ID</td>
            </tr>
            <tr>
              <td>Any list</td>
              <td>Relevant IDs</td>
              <td>Document Artifact Register</td>
              <td>Related Outcome ID, Related Action ID</td>
            </tr>
          </tbody>
        </table>

        <h3>Lookup values sheet</h3>
        <p className="lede subtle">
          The workbook&apos;s <em>Lookup Values</em> grid holds approved choice columns
          used across lists—for example <strong>Health</strong> (Green, Amber, Red,
          Grey), <strong>Priority</strong>, <strong>Status</strong>,{" "}
          <strong>Capability Area</strong>, <strong>Gap Type</strong>,{" "}
          <strong>Request Type</strong>, <strong>Meeting Type</strong>, and{" "}
          <strong>Dependency</strong>. In Phase 2, expose these via a read-mostly API
          (see <code className="inline-code">GET /v1/orgs/{"{orgId}"}/lookups</code>) or
          replicate them as choice sets in the SPA build. Phase 1 keeps them inside{" "}
          <code className="inline-code">normalizedSeed.json</code> for development.
        </p>
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
