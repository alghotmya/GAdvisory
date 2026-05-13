import { useMemo, useState } from "react";
import { DataTable } from "../components/DataTable";
import { controlTowerStore } from "../controlTower/store";

export function LookupsPage() {
  const rows = controlTowerStore.bundle.lookups;
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const s = q.toLowerCase();
    return rows.filter((r) =>
      Object.values(r).some((v) => String(v).toLowerCase().includes(s)),
    );
  }, [rows, q]);

  return (
    <section className="panel panel-wide">
      <h2>Lookup values</h2>
      <p className="lede">
        Choice columns shared across lists (health, priority, status, capability
        area, and so on), as defined on the workbook Lookup Values sheet.
      </p>
      <label className="filter-label">
        Filter
        <input
          className="filter-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type to filter rows…"
        />
      </label>
      <DataTable
        columns={[
          { key: "health", label: "Health" },
          { key: "priority", label: "Priority" },
          { key: "status", label: "Status" },
          { key: "category", label: "Category" },
          { key: "capabilityArea", label: "Capability area" },
          { key: "gapType", label: "Gap type" },
          { key: "requestType", label: "Request type" },
          { key: "complexity", label: "Complexity" },
          { key: "confidence", label: "Confidence" },
          { key: "maturityLevel", label: "Maturity" },
          { key: "meetingType", label: "Meeting type" },
          { key: "dependency", label: "Dependency" },
        ]}
        rows={filtered as unknown as Record<string, unknown>[]}
      />
    </section>
  );
}
