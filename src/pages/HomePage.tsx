import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="panel">
      <p className="tagline">From LOB requests to measurable outcomes.</p>
      <p className="lede">
        EP Navigator mirrors the GoO EP Advisory Control Tower workbook: LOB
        profiles, outcomes, capabilities, gaps, enhancement backlog, risks,
        training, KPIs, meetings, and artifacts—backed by a single-table
        DynamoDB layout and S3-ready attachment keys. Traceability between lists
        and canonical lookup values are documented on the system design page so
        navigation stays focused on operational screens.
      </p>
      <nav className="tiles">
        <Link className="tile" to="/dashboard">
          Dashboard
        </Link>
        <Link className="tile" to="/lobs">
          LOB 360
        </Link>
        <Link className="tile" to="/field-dictionary">
          Field dictionary
        </Link>
        <Link className="tile" to="/modules">
          Modules
        </Link>
        <Link className="tile" to="/system-design">
          System design blueprint
        </Link>
      </nav>
    </section>
  );
}
