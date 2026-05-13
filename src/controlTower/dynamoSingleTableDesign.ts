/**
 * Single-table DynamoDB layout for the EP Advisory Control Tower.
 *
 * Table name (example): GoOControlTower
 *
 * Attributes
 * - pk (String): lobPartitionKey(orgId, lobId)
 * - sk (String): PROFILE | OUTCOME#... | REQ#... | GAP#... | ACTION#... | RISK#... | TRAIN#... | KPI#... | MEETING#... | ARTIFACT#...
 * - orgId, lobId, entityType (String) — denormalized for filters and Lambdas
 * - ttl (Number, optional) — only if you add ephemeral cache rows later
 *
 * GSI1 — Org LOB index (profile rows + lightweight summary if needed)
 * - gsi1pk = gsi1OrgPk(orgId)
 * - gsi1sk = gsi1LobIndexSk(lobId)
 * Projection: INCLUDE orgId, lobId, lobName, health, currentEpStatus, nextReviewDate
 *
 * GSI2 — Due-date radar (actions, risks, meetings)
 * - gsi2pk = gsi2EntityDuePk('ACTION'|'MEETING'|'RISK', orgId)
 * - gsi2sk = gsi2DueSk(targetDateOrDueDate, id)
 * Projection: KEYS_ONLY or INCLUDE priority, status, lobName
 *
 * Access patterns
 * 1) LOB profile + all children: Query pk = lobPartitionKey, sk begins_with '' (or sk > PROFILE and sk < PROFILE~ lexicographically — prefer explicit prefixes per entity).
 * 2) All LOBs in org: Query GSI1 pk = ORG#id, sk begins_with LOB#
 * 3) Monthly due items: Query GSI2 per entity type with sk between dates.
 *
 * S3: binary attachments live in a private bucket; items store only object keys
 * (see s3Attachment.ts). Never make the bucket public-read.
 */
export const CONTROL_TOWER_TABLE_NAME = "GoOControlTower";

export const CONTROL_TOWER_ATTR = {
  pk: "pk",
  sk: "sk",
  gsi1pk: "gsi1pk",
  gsi1sk: "gsi1sk",
  gsi2pk: "gsi2pk",
  gsi2sk: "gsi2sk",
} as const;

export const CONTROL_TOWER_GSI = {
  orgLobs: "GSI1_OrgLobs",
  dueRadar: "GSI2_DueRadar",
} as const;
