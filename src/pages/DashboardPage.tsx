import { useControlTower } from "../controlTower/ControlTowerContext";
import {
  CONTROL_TOWER_ATTR,
  CONTROL_TOWER_GSI,
  CONTROL_TOWER_TABLE_NAME,
} from "../controlTower/dynamoSingleTableDesign";

export function DashboardPage() {
  const { getDashboard } = useControlTower();
  const d = getDashboard();

  return (
    <section className="panel panel-wide">
      <h2>Executive dashboard</h2>
      <p className="lede">
        Counts mirror the Excel dashboard sheet: portfolio size, open work, and
        LOB health distribution. Data is loaded from{" "}
        <code className="inline-code">normalizedSeed.json</code> (regenerate from
        the workbook with <code className="inline-code">npm run extract:workbook</code>
        ).
      </p>
      <div className="metric-grid">
        <div className="metric-card">
          <span className="metric-label">Total LOBs</span>
          <span className="metric-value">{d.totalLobs}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Open actions</span>
          <span className="metric-value">{d.openActions}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">High / critical open actions</span>
          <span className="metric-value">{d.highCriticalActions}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Open risks / decisions</span>
          <span className="metric-value">{d.openRisksDecisions}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Decision-line items</span>
          <span className="metric-value">{d.decisionItems}</span>
        </div>
      </div>
      <div className="two-col">
        <div>
          <h3>LOB health</h3>
          <ul className="kv-list">
            {Object.entries(d.healthCounts).map(([k, v]) => (
              <li key={k}>
                <span>{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Action priority mix</h3>
          <ul className="kv-list">
            {Object.entries(d.priorityCounts).map(([k, v]) => (
              <li key={k}>
                <span>{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <details className="design-callout">
        <summary>DynamoDB single-table mapping (read-only)</summary>
        <p>
          Table <code className="inline-code">{CONTROL_TOWER_TABLE_NAME}</code> uses{" "}
          <code className="inline-code">{CONTROL_TOWER_ATTR.pk}</code> /{" "}
          <code className="inline-code">{CONTROL_TOWER_ATTR.sk}</code> per LOB partition.
          Global secondary indexes: <code className="inline-code">{CONTROL_TOWER_GSI.orgLobs}</code>{" "}
          ({CONTROL_TOWER_ATTR.gsi1pk}, {CONTROL_TOWER_ATTR.gsi1sk}) and{" "}
          <code className="inline-code">{CONTROL_TOWER_GSI.dueRadar}</code> for due-date
          radars. See <code className="inline-code">src/controlTower/dynamoSingleTableDesign.ts</code>{" "}
          and <code className="inline-code">dynamoKeys.ts</code> for full access patterns.
        </p>
      </details>
    </section>
  );
}
