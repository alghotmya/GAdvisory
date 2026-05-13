import type { OrgId } from "./types";

export const DEFAULT_ORG_ID = "default" as const satisfies OrgId;

/** Primary partition: one LOB workspace (tenant slice). */
export function lobPartitionKey(orgId: OrgId, lobId: string): string {
  return `ORG#${orgId}#LOB#${lobId}`;
}

export function profileSortKey(): string {
  return "PROFILE";
}

export function outcomeSortKey(outcomeId: string): string {
  return `OUTCOME#${outcomeId}`;
}

export function requirementSortKey(requirementId: string): string {
  return `REQ#${requirementId}`;
}

export function gapSortKey(findingId: string): string {
  return `GAP#${findingId}`;
}

export function actionSortKey(actionId: string): string {
  return `ACTION#${actionId}`;
}

export function riskDecisionSortKey(id: string): string {
  return `RISK#${id}`;
}

export function trainingSortKey(trainingId: string): string {
  return `TRAIN#${trainingId}`;
}

export function kpiSortKey(kpiId: string): string {
  return `KPI#${kpiId}`;
}

export function meetingSortKey(meetingId: string): string {
  return `MEETING#${meetingId}`;
}

export function artifactSortKey(artifactId: string): string {
  return `ARTIFACT#${artifactId}`;
}

/** GSI1 — list LOBs for an org (profile projection rows only). */
export function gsi1OrgPk(orgId: OrgId): string {
  return `ORG#${orgId}`;
}

export function gsi1LobIndexSk(lobId: string): string {
  return `LOB#${lobId}`;
}

/** GSI2 — optional time-ordered governance (meetings / actions by due date). */
export function gsi2EntityDuePk(entity: "ACTION" | "MEETING" | "RISK", orgId: OrgId): string {
  return `${entity}#ORG#${orgId}`;
}

export function gsi2DueSk(isoDate: string, id: string): string {
  return `${isoDate}#${id}`;
}
