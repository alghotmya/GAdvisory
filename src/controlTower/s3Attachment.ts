import type { OrgId } from "./types";

/** Replace with environment-specific bucket from CDK or Amplify env. */
export const ATTACHMENTS_BUCKET_PLACEHOLDER = "REPLACE_WITH_S3_BUCKET_NAME";

/** Logical prefix inside the private attachments bucket. */
export const ATTACHMENTS_PREFIX = "control-tower";

/**
 * Object key for action evidence uploads (presigned PUT from API).
 * Pattern: control-tower/{orgId}/lob/{lobId}/actions/{actionId}/{safeFileName}
 */
export function actionEvidenceObjectKey(
  orgId: OrgId,
  lobId: string,
  actionId: string,
  fileName: string,
): string {
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${ATTACHMENTS_PREFIX}/${orgId}/lob/${lobId}/actions/${actionId}/${safe}`;
}

export function artifactObjectKey(
  orgId: OrgId,
  lobId: string,
  artifactId: string,
  fileName: string,
): string {
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${ATTACHMENTS_PREFIX}/${orgId}/lob/${lobId}/artifacts/${artifactId}/${safe}`;
}

/**
 * Placeholder until API returns a presigned GET URL.
 * Wire this to API Gateway + Lambda + S3 GetObject presigner in production.
 */
export function placeholderPresignedDownloadUrl(bucket: string, key: string): string {
  return `s3://${bucket}/${key}?presign=required`;
}
