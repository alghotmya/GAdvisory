import { Link } from "react-router-dom";

const modules: { name: string; desc: string; to: string }[] = [
  {
    name: "LOB 360 Profile",
    desc: "Ministry, owners, maturity, review cadence.",
    to: "/lobs",
  },
  {
    name: "Outcome Tracker",
    desc: "Outcomes, baselines, targets, monthly status.",
    to: "/lobs",
  },
  {
    name: "Capability register",
    desc: "Requirements by capability area, linked to outcomes.",
    to: "/lobs",
  },
  {
    name: "Gap & advisory findings",
    desc: "Recommendations, value, priority, owner.",
    to: "/lobs",
  },
  {
    name: "Enhancement & action backlog",
    desc: "Investigations, decisions, best-practice recommendations.",
    to: "/lobs",
  },
  {
    name: "Risks, decisions & escalations",
    desc: "Blockers, exec visibility, dates.",
    to: "/lobs",
  },
  {
    name: "Training & adoption",
    desc: "Audience-specific readiness and gaps.",
    to: "/lobs",
  },
  {
    name: "KPI & value",
    desc: "Period-based metrics tied to LOBs.",
    to: "/lobs",
  },
  {
    name: "Monthly governance",
    desc: "Meeting log and portfolio dashboard.",
    to: "/dashboard",
  },
];

export function ModulesPage() {
  return (
    <section className="panel">
      <h2>Core modules</h2>
      <p className="lede">
        Each workbook list maps to a DynamoDB sort-key prefix under the LOB
        partition. Use LOB 360 for per-LOB tabs; dashboard and reference sheets
        are separate routes.
      </p>
      <ul className="module-list">
        {modules.map((m) => (
          <li key={m.name}>
            <Link to={m.to} className="module-link">
              <strong>{m.name}</strong>
              <span>{m.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
