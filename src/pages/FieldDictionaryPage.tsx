import { useMemo, useState } from "react";
import { DataTable } from "../components/DataTable";
import { controlTowerStore } from "../controlTower/store";

export function FieldDictionaryPage() {
  const rows = controlTowerStore.bundle.fieldDictionary;
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const s = q.toLowerCase();
    return rows.filter(
      (r) =>
        r.listSheet.toLowerCase().includes(s) ||
        r.fieldName.toLowerCase().includes(s) ||
        r.recommendedType.toLowerCase().includes(s),
    );
  }, [rows, q]);

  return (
    <section className="panel panel-wide">
      <h2>Field dictionary</h2>
      <p className="lede">
        Column-level guidance from the workbook: recommended field types and
        lookup candidates for a future SharePoint or API schema.
      </p>
      <label className="filter-label">
        Filter by list or field
        <input
          className="filter-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. Outcomes, LOB ID…"
        />
      </label>
      <DataTable
        columns={[
          { key: "listSheet", label: "List / sheet" },
          { key: "fieldName", label: "Field name" },
          { key: "recommendedType", label: "Recommended type" },
          { key: "lookupCandidate", label: "Lookup candidate?" },
          { key: "suggestedLinkSource", label: "Suggested link / source" },
          { key: "notes", label: "Notes" },
        ]}
        rows={filtered as unknown as Record<string, unknown>[]}
      />
    </section>
  );
}
