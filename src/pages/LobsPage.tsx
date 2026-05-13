import { Link } from "react-router-dom";
import { controlTowerStore } from "../controlTower/store";

export function LobsPage() {
  const lobs = controlTowerStore.listLobs();
  return (
    <section className="panel">
      <h2>LOB 360</h2>
      <p className="lede">
        Profiles and child lists are hydrated from{" "}
        <code className="inline-code">normalizedSeed.json</code>, produced from your
        Control Tower workbook. Re-run{" "}
        <code className="inline-code">npm run extract:workbook</code> after editing Excel.
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
