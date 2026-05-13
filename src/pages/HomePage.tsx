import { Link } from "react-router-dom";

const destinations = [
  { to: "/dashboard", label: "Dashboard", desc: "Portfolio metrics and health mix" },
  { to: "/lobs", label: "LOB 360", desc: "Per–line of business workspace" },
  { to: "/field-dictionary", label: "Field dictionary", desc: "Workbook column metadata" },
  { to: "/modules", label: "Modules", desc: "Advisory modules overview" },
  { to: "/system-design", label: "System design", desc: "Architecture and data blueprint" },
] as const;

export function HomePage() {
  return (
    <section className="panel panel-home">
      <p className="tagline">From LOB requests to measurable outcomes.</p>
      <p className="lede">
        EP Navigator mirrors the GoO EP Advisory Control Tower workbook: LOB profiles,
        outcomes, capabilities, gaps, enhancement backlog, risks, training, KPIs, meetings,
        and artifacts—backed by a single-table DynamoDB layout and S3-ready attachment keys.
        Traceability between lists and canonical lookup values are documented on the system
        design page so navigation stays focused on operational screens.
      </p>
      <nav className="tiles" aria-label="Primary destinations">
        {destinations.map(({ to, label, desc }) => (
          <Link key={to} className="tile" to={to}>
            <span className="tile-label">{label}</span>
            <span className="tile-desc">{desc}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
