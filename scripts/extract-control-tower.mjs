import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** 0-based row index of header row (Excel row 3) for each named table region in the workbook */
const TABLES = {
  "LOB Profile": 2,
  Outcomes: 2,
  "Capabilities Requirements": 2,
  "Gap Advisory Findings": 2,
  "Enhancement Action Backlog": 2,
  "Risks Decisions Escalations": 2,
  "Training Adoption": 2,
  "KPI Measurement": 2,
  "Meeting Governance Log": 2,
  "Document Artifact Register": 2,
  "Lookup Values": 0,
  "Relationship Map": 2,
  "Field Dictionary": 2,
};

const defaultXlsx = path.join(
  process.env.HOME || "",
  "Downloads",
  "GoO_EP_Advisory_Control_Tower.xlsx",
);
const src = process.argv[2] || defaultXlsx;
const outNorm = path.join(root, "src", "controlTower", "normalizedSeed.json");
const outRaw = path.join(root, "src", "controlTower", "workbookSeed.json");
const writeRaw = process.env.WRITE_RAW === "1";

function rowsToObjects(matrix, headerRowIdx) {
  const headers = (matrix[headerRowIdx] || []).map((h) => String(h ?? "").trim());
  const out = [];
  for (let r = headerRowIdx + 1; r < matrix.length; r++) {
    const row = matrix[r] || [];
    const o = {};
    for (let c = 0; c < headers.length; c++) {
      const key = headers[c];
      if (!key) continue;
      const v = row[c];
      o[key] = v === undefined || v === null ? "" : v;
    }
    const hasContent = Object.values(o).some(
      (v) => v !== "" && v !== null && v !== undefined,
    );
    if (hasContent) out.push(o);
  }
  return out;
}

const wb = XLSX.readFile(src, { cellDates: true, raw: false });
const normalized = {};
const raw = {};

for (const name of wb.SheetNames) {
  const ws = wb.Sheets[name];
  raw[name] = XLSX.utils.sheet_to_json(ws, { defval: "", raw: false });
  const headerRow = TABLES[name];
  if (headerRow !== undefined) {
    const matrix = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
    normalized[name] = rowsToObjects(matrix, headerRow);
  }
}

fs.mkdirSync(path.dirname(outNorm), { recursive: true });
if (writeRaw) {
  fs.writeFileSync(outRaw, JSON.stringify(raw, null, 2), "utf8");
  console.log("Wrote raw", outRaw);
}
fs.writeFileSync(outNorm, JSON.stringify(normalized, null, 2), "utf8");
console.log("Wrote", outNorm);
console.log(
  "Normalized tables:",
  Object.keys(normalized).map((k) => `${k}(${normalized[k].length})`).join(", "),
);
