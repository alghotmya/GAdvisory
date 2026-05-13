import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataTable } from "../components/DataTable";
import { controlTowerStore } from "../controlTower/store";
import {
  ATTACHMENTS_BUCKET_PLACEHOLDER,
  placeholderPresignedDownloadUrl,
} from "../controlTower/s3Attachment";

type TabId =
  | "profile"
  | "outcomes"
  | "requirements"
  | "gaps"
  | "actions"
  | "risks"
  | "training"
  | "kpis"
  | "meetings"
  | "artifacts";

const TABS: { id: TabId; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "outcomes", label: "Outcomes" },
  { id: "requirements", label: "Capabilities" },
  { id: "gaps", label: "Gap findings" },
  { id: "actions", label: "Action backlog" },
  { id: "risks", label: "Risks / decisions" },
  { id: "training", label: "Training" },
  { id: "kpis", label: "KPIs" },
  { id: "meetings", label: "Meetings" },
  { id: "artifacts", label: "Artifacts" },
];

function healthPillClass(health: string): string {
  const h = health.toLowerCase();
  if (h === "green") return "health-pill health-green";
  if (h === "amber") return "health-pill health-amber";
  if (h === "red") return "health-pill health-red";
  if (h === "grey" || h === "gray") return "health-pill health-grey";
  return "health-pill health-grey";
}

export function LobDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState<TabId>("profile");
  const ws = useMemo(() => (id ? controlTowerStore.getLobWorkspace(id) : null), [id]);

  if (!id || !ws?.profile) {
    return (
      <section className="panel">
        <p>
          <Link to="/lobs">← All LOBs</Link>
        </p>
        <h2>LOB not found</h2>
        <p className="lede">
          No LOB profile matches this id. Open{" "}
          <Link to="/lobs">LOB 360</Link> and pick a row from the workbook-backed list.
        </p>
      </section>
    );
  }

  const { profile } = ws;
  const keys = controlTowerStore.keyForProfile(profile.lobId);

  return (
    <section className="panel panel-wide">
      <p>
        <Link to="/lobs">← All LOBs</Link>
      </p>
      <div className="lob-detail-head">
        <h2>{profile.lobName}</h2>
        <span className={healthPillClass(profile.health)}>{profile.health}</span>
      </div>
      <p className="lede subtle">
        {profile.lobId} · {profile.ministryCluster} · {profile.currentEpStatus}
      </p>

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            className={`tab${tab === t.id ? " tab-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <>
          <dl className="detail-grid">
            <dt>Business owner</dt>
            <dd>{profile.businessOwner}</dd>
            <dt>Technical owner</dt>
            <dd>{profile.technicalOwner}</dd>
            <dt>Bell advisor / CSM</dt>
            <dd>{profile.bellAdvisorCsm}</dd>
            <dt>Implementation partner</dt>
            <dd>{profile.implementationPartner}</dd>
            <dt>Support model</dt>
            <dd>{profile.supportModel}</dd>
            <dt>Capabilities enabled</dt>
            <dd>{profile.capabilitiesEnabled}</dd>
            <dt>Maturity</dt>
            <dd>{profile.maturityLevel}</dd>
            <dt>Last review</dt>
            <dd>{profile.lastReviewDate || "—"}</dd>
            <dt>Next review</dt>
            <dd>{profile.nextReviewDate || "—"}</dd>
            <dt>Notes</dt>
            <dd>{profile.notes}</dd>
          </dl>
          <details className="design-callout">
            <summary>DynamoDB keys (this LOB profile row)</summary>
            <dl className="detail-grid">
              <dt>pk</dt>
              <dd>
                <code className="inline-code">{keys.pk}</code>
              </dd>
              <dt>sk</dt>
              <dd>
                <code className="inline-code">{keys.sk}</code>
              </dd>
              <dt>gsi1pk</dt>
              <dd>
                <code className="inline-code">{keys.gsi1pk}</code>
              </dd>
              <dt>gsi1sk</dt>
              <dd>
                <code className="inline-code">{keys.gsi1sk}</code>
              </dd>
            </dl>
          </details>
        </>
      )}

      {tab === "outcomes" && (
        <DataTable
          columns={[
            { key: "outcomeId", label: "Outcome ID" },
            { key: "businessOutcome", label: "Business outcome" },
            { key: "advisoryPriority", label: "Priority" },
            { key: "health", label: "Health" },
            { key: "status", label: "Status" },
            { key: "targetReviewDate", label: "Target review" },
          ]}
          rows={ws.outcomes as unknown as Record<string, unknown>[]}
        />
      )}

      {tab === "requirements" && (
        <DataTable
          columns={[
            { key: "requirementId", label: "Req ID" },
            { key: "relatedOutcomeId", label: "Outcome" },
            { key: "capabilityArea", label: "Capability" },
            { key: "specificRequirement", label: "Requirement" },
            { key: "gapType", label: "Gap type" },
            { key: "status", label: "Status" },
            { key: "targetDate", label: "Target" },
          ]}
          rows={ws.requirements as unknown as Record<string, unknown>[]}
        />
      )}

      {tab === "gaps" && (
        <DataTable
          columns={[
            { key: "findingId", label: "Finding ID" },
            { key: "relatedOutcomeId", label: "Outcome" },
            { key: "relatedRequirementId", label: "Requirement" },
            { key: "findingObservation", label: "Observation" },
            { key: "priority", label: "Priority" },
            { key: "health", label: "Health" },
            { key: "status", label: "Status" },
          ]}
          rows={ws.gapFindings as unknown as Record<string, unknown>[]}
        />
      )}

      {tab === "actions" && (
        <>
          <p className="lede subtle">
            Evidence files: store private objects in S3 and persist the object key on the
            item (prefix <code className="inline-code">s3key:</code> in seed converts to{" "}
            <code className="inline-code">evidenceAttachmentS3Key</code>). Presigned URLs
            come from your API.
          </p>
          <DataTable
            columns={[
              { key: "actionId", label: "Action ID" },
              { key: "requestTitle", label: "Title" },
              { key: "requestType", label: "Type" },
              { key: "priority", label: "Priority" },
              { key: "status", label: "Status" },
              { key: "targetDate", label: "Target" },
              { key: "relatedGapId", label: "Gap" },
              { key: "evidenceAttachment", label: "Evidence / link" },
            ]}
            rows={ws.actions.map((a) => ({
              ...a,
              evidenceAttachment:
                a.evidenceAttachmentS3Key !== undefined
                  ? `[S3] ${a.evidenceAttachmentS3Key}`
                  : a.evidenceAttachment,
            })) as unknown as Record<string, unknown>[]}
          />
          {ws.actions.some((a) => a.evidenceAttachmentS3Key) && (
            <p className="s3-hint">
              Example download URL pattern:{" "}
              {placeholderPresignedDownloadUrl(
                ATTACHMENTS_BUCKET_PLACEHOLDER,
                "control-tower/default/lob/LOB-001/actions/ACT-001/file.pdf",
              )}
            </p>
          )}
        </>
      )}

      {tab === "risks" && (
        <DataTable
          columns={[
            { key: "riskDecisionId", label: "ID" },
            { key: "type", label: "Type" },
            { key: "description", label: "Description" },
            { key: "severity", label: "Severity" },
            { key: "status", label: "Status" },
            { key: "dueDate", label: "Due" },
            { key: "relatedActionId", label: "Action" },
          ]}
          rows={ws.risksDecisions as unknown as Record<string, unknown>[]}
        />
      )}

      {tab === "training" && (
        <DataTable
          columns={[
            { key: "trainingId", label: "Training ID" },
            { key: "capabilityArea", label: "Capability" },
            { key: "audience", label: "Audience" },
            { key: "trainingAdoptionNeed", label: "Need" },
            { key: "priority", label: "Priority" },
            { key: "status", label: "Status" },
            { key: "targetDate", label: "Target" },
          ]}
          rows={ws.training as unknown as Record<string, unknown>[]}
        />
      )}

      {tab === "kpis" && (
        <DataTable
          columns={[
            { key: "kpiId", label: "KPI ID" },
            { key: "kpiSuccessMeasure", label: "Measure" },
            { key: "baselineValue", label: "Baseline" },
            { key: "targetValue", label: "Target" },
            { key: "currentValue", label: "Current" },
            { key: "reportingFrequency", label: "Frequency" },
            { key: "lastUpdated", label: "Updated" },
          ]}
          rows={ws.kpis as unknown as Record<string, unknown>[]}
        />
      )}

      {tab === "meetings" && (
        <DataTable
          columns={[
            { key: "meetingId", label: "Meeting ID" },
            { key: "meetingDate", label: "Date" },
            { key: "meetingType", label: "Type" },
            { key: "topic", label: "Topic" },
            { key: "status", label: "Status" },
            { key: "relatedActionId", label: "Action" },
          ]}
          rows={ws.meetings as unknown as Record<string, unknown>[]}
        />
      )}

      {tab === "artifacts" && (
        <DataTable
          columns={[
            { key: "artifactId", label: "Artifact ID" },
            { key: "artifactType", label: "Type" },
            { key: "artifactName", label: "Name" },
            { key: "locationLink", label: "Location / link" },
            { key: "version", label: "Ver" },
            { key: "status", label: "Status" },
          ]}
          rows={ws.artifacts.map((a) => ({
            ...a,
            locationLink:
              a.artifactS3Key !== undefined ? `[S3] ${a.artifactS3Key}` : a.locationLink,
          })) as unknown as Record<string, unknown>[]}
        />
      )}
    </section>
  );
}
