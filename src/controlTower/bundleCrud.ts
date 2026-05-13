import type { ControlTowerBundle } from "./types";

const STORAGE_KEY = "ep-navigator-control-tower-v1";

export function loadPersistedBundle(fallback: ControlTowerBundle): ControlTowerBundle {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as ControlTowerBundle;
    if (!parsed?.lobProfiles || !Array.isArray(parsed.outcomes)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function savePersistedBundle(bundle: ControlTowerBundle): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bundle));
  } catch {
    /* quota or private mode */
  }
}

export function clearPersistedBundle(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function upsertById<T extends Record<string, unknown>>(
  list: T[],
  row: T,
  idKey: keyof T,
): T[] {
  const id = String(row[idKey]);
  const idx = list.findIndex((x) => String(x[idKey]) === id);
  if (idx === -1) return [...list, row];
  const next = [...list];
  next[idx] = row;
  return next;
}

export function removeById<T extends Record<string, unknown>>(
  list: T[],
  id: string,
  idKey: keyof T,
): T[] {
  return list.filter((x) => String(x[idKey]) !== id);
}

export function nextSequentialId(prefix: string, ids: Iterable<string>): string {
  let max = 0;
  const re = new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-(\\d+)$`, "i");
  for (const id of ids) {
    const m = id.match(re);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

export function removeLobCascade(bundle: ControlTowerBundle, lobId: string): ControlTowerBundle {
  return {
    ...bundle,
    lobProfiles: bundle.lobProfiles.filter((p) => p.lobId !== lobId),
    outcomes: bundle.outcomes.filter((o) => o.lobId !== lobId),
    requirements: bundle.requirements.filter((r) => r.lobId !== lobId),
    gapFindings: bundle.gapFindings.filter((g) => g.lobId !== lobId),
    actions: bundle.actions.filter((a) => a.lobId !== lobId),
    risksDecisions: bundle.risksDecisions.filter((r) => r.lobId !== lobId),
    training: bundle.training.filter((t) => t.lobId !== lobId),
    kpis: bundle.kpis.filter((k) => k.lobId !== lobId),
    meetings: bundle.meetings.filter((m) => m.lobId !== lobId),
    artifacts: bundle.artifacts.filter((a) => a.lobId !== lobId),
  };
}
