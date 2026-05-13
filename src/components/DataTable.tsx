type Column = { key: string; label: string };

function cell(row: Record<string, unknown>, key: string): string {
  const v = row[key];
  if (v === undefined || v === null) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

export function DataTable({
  columns,
  rows,
  emptyMessage = "No rows.",
}: {
  columns: Column[];
  rows: Record<string, unknown>[];
  emptyMessage?: string;
}) {
  if (!rows.length) {
    return <p className="table-empty">{emptyMessage}</p>;
  }
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key}>{cell(row, c.key)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
