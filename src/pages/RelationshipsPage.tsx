import { DataTable } from "../components/DataTable";
import { controlTowerStore } from "../controlTower/store";

export function RelationshipsPage() {
  const rows = controlTowerStore.bundle.relationshipMap;
  return (
    <section className="panel panel-wide">
      <h2>Relationship map</h2>
      <p className="lede">
        Traceability chain from the workbook: LOB → outcome → requirement → gap
        → action → risk/decision, plus KPIs, training, meetings, and artifacts.
      </p>
      <DataTable
        columns={[
          { key: "parentSourceList", label: "Parent / source list" },
          { key: "keyField", label: "Key field" },
          { key: "childTargetList", label: "Child / target list" },
          { key: "linkedField", label: "Linked field" },
          { key: "relationship", label: "Relationship" },
          { key: "whyItMatters", label: "Why it matters" },
        ]}
        rows={rows as unknown as Record<string, unknown>[]}
      />
    </section>
  );
}
