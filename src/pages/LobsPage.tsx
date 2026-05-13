import { Link } from "react-router-dom";
import { controlTowerStore } from "../controlTower/store";

export function LobsPage() {
  const lobs = controlTowerStore.listLobs();
  return (
    <section className="panel">
      <h2>LOB 360</h2>
      <p className="lede">
        <strong>LOB 360</strong> is the full workspace for one line of business (program
        area): profile plus outcomes, requirements, gaps, actions, risks, training, KPIs,
        meetings, and artifacts in one place. See{" "}
        <Link to="/system-design#lob-360">What is LOB 360?</Link> on the system design
        blueprint. Data is hydrated from{" "}
        <code className="inline-code">normalizedSeed.json</code> (run{" "}
        <code className="inline-code">npm run extract:workbook</code> after editing Excel).
      </p>
      <ul className="lob-list">
        {lobs.map((lob) => (
          <li key={lob.lobId}>
            <Link to={`/lobs/${encodeURIComponent(lob.lobId)}`}>
              <span className="lob-name">{lob.lobName}</span>
              <span className="lob-meta">{lob.lobId}</span>
              <span className="lob-meta">{lob.currentEpStatus}</span>
              <span className="lob-meta">{lob.health}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
