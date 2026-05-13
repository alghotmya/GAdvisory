import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useControlTower } from "../controlTower/ControlTowerContext";
import {
  ATTACHMENTS_BUCKET_PLACEHOLDER,
  placeholderPresignedDownloadUrl,
} from "../controlTower/s3Attachment";
import {
  ACT_FORM_FIELDS,
  ACT_TABLE_COLS,
  ART_FORM_FIELDS,
  ART_TABLE_COLS,
  blankAction,
  blankArtifact,
  blankGap,
  blankKpi,
  blankMeeting,
  blankOutcome,
  blankRequirement,
  blankRisk,
  blankTraining,
  GAP_FORM_FIELDS,
  GAP_TABLE_COLS,
  KPI_FORM_FIELDS,
  KPI_TABLE_COLS,
  LOB_FORM_FIELDS,
  lobProfileToDraft,
  MTG_FORM_FIELDS,
  MTG_TABLE_COLS,
  OUTCOME_FORM_FIELDS,
  OUTCOME_TABLE_COLS,
  parseAction,
  parseArtifact,
  parseGap,
  parseKpi,
  parseLobProfile,
  parseMeeting,
  parseOutcome,
  parseRequirement,
  parseRisk,
  parseTraining,
  REQ_FORM_FIELDS,
  REQ_TABLE_COLS,
  RISK_FORM_FIELDS,
  RISK_TABLE_COLS,
  TRN_FORM_FIELDS,
  TRN_TABLE_COLS,
} from "../controlTower/lobEntityForms";
import type { DocumentArtifact, EnhancementAction } from "../controlTower/types";
import { RecordCrudPanel } from "../components/crud/RecordCrudPanel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

function healthBadgeVariant(health: string): "default" | "secondary" | "destructive" | "outline" {
  const h = health.toLowerCase();
  if (h === "green") return "default";
  if (h === "amber") return "secondary";
  if (h === "red") return "destructive";
  return "outline";
}

function actionRowForCrud(a: EnhancementAction): Record<string, unknown> {
  return {
    ...a,
    evidenceAttachment: a.evidenceAttachmentS3Key
      ? `s3key:${a.evidenceAttachmentS3Key}`
      : a.evidenceAttachment,
  };
}

function artifactRowForCrud(a: DocumentArtifact): Record<string, unknown> {
  return {
    ...a,
    locationLink: a.artifactS3Key ? `s3key:${a.artifactS3Key}` : a.locationLink,
  };
}

export function LobDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState<TabId>("profile");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState<Record<string, string>>({});

  const {
    bundle,
    getLobWorkspace,
    keyForProfile,
    upsertLob,
    upsertOutcome,
    deleteOutcome,
    upsertRequirement,
    deleteRequirement,
    upsertGap,
    deleteGap,
    upsertAction,
    deleteAction,
    upsertRisk,
    deleteRisk,
    upsertTraining,
    deleteTraining,
    upsertKpi,
    deleteKpi,
    upsertMeeting,
    deleteMeeting,
    upsertArtifact,
    deleteArtifact,
    nextOutcomeId,
    nextRequirementId,
    nextGapId,
    nextActionId,
    nextRiskId,
    nextTrainingId,
    nextKpiId,
    nextMeetingId,
    nextArtifactId,
  } = useControlTower();

  const ws = useMemo(() => (id ? getLobWorkspace(id) : null), [id, bundle, getLobWorkspace]);

  if (!id || !ws?.profile) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-6">
        <p>
          <Link to="/lobs" className="text-sm text-primary hover:underline">
            ← All LOBs
          </Link>
        </p>
        <h2 className="text-xl font-semibold">LOB not found</h2>
        <p className="text-sm text-muted-foreground">
          No LOB profile matches this id. Open <Link to="/lobs" className="text-primary underline">LOB 360</Link> and
          pick a row from the list.
        </p>
      </div>
    );
  }

  const { profile } = ws;
  const keys = keyForProfile(profile.lobId);

  function openProfileEdit() {
    setProfileDraft(lobProfileToDraft(profile));
    setProfileOpen(true);
  }

  function saveProfile() {
    upsertLob(parseLobProfile(profileDraft));
    setProfileOpen(false);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-4 md:p-6">
      <p>
        <Link to="/lobs" className="text-sm text-primary hover:underline">
          ← All LOBs
        </Link>
      </p>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{profile.lobName}</h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {profile.lobId} · {profile.ministryCluster} · {profile.currentEpStatus}
          </p>
        </div>
        <Badge variant={healthBadgeVariant(profile.health)}>{profile.health}</Badge>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)} className="w-full">
        <TabsList className="flex h-auto min-h-9 w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
          <TabsTrigger value="requirements">Capabilities</TabsTrigger>
          <TabsTrigger value="gaps">Gaps</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="flex justify-end">
            <Button type="button" size="sm" variant="secondary" onClick={openProfileEdit}>
              <Pencil className="mr-1 h-4 w-4" />
              Edit profile
            </Button>
          </div>
          <dl className="grid gap-3 rounded-lg border border-border bg-card/40 p-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Business owner</dt>
              <dd className="font-medium">{profile.businessOwner}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Technical owner</dt>
              <dd className="font-medium">{profile.technicalOwner}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Bell advisor / CSM</dt>
              <dd className="font-medium">{profile.bellAdvisorCsm}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Implementation partner</dt>
              <dd className="font-medium">{profile.implementationPartner}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Support model</dt>
              <dd className="font-medium">{profile.supportModel}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Capabilities enabled</dt>
              <dd className="font-medium">{profile.capabilitiesEnabled}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Maturity</dt>
              <dd className="font-medium">{profile.maturityLevel}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Last / next review</dt>
              <dd className="font-medium">
                {profile.lastReviewDate || "—"} / {profile.nextReviewDate || "—"}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Notes</dt>
              <dd className="mt-1 whitespace-pre-wrap">{profile.notes}</dd>
            </div>
          </dl>
          <details className="rounded-md border border-border/80 bg-muted/20 p-3 text-sm">
            <summary className="cursor-pointer font-medium">DynamoDB keys (this LOB profile row)</summary>
            <dl className="mt-3 grid gap-2 font-mono text-xs sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">pk</dt>
                <dd>{keys.pk}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">sk</dt>
                <dd>{keys.sk}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">gsi1pk</dt>
                <dd>{keys.gsi1pk}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">gsi1sk</dt>
                <dd>{keys.gsi1sk}</dd>
              </div>
            </dl>
          </details>
        </TabsContent>

        <TabsContent value="outcomes">
          <RecordCrudPanel
            title="Outcomes"
            rows={ws.outcomes as unknown as Record<string, unknown>[]}
            idField="outcomeId"
            tableColumns={[...OUTCOME_TABLE_COLS]}
            formFields={[...OUTCOME_FORM_FIELDS]}
            blankRow={() => blankOutcome(profile, nextOutcomeId)}
            onSave={(row) => upsertOutcome(parseOutcome(row))}
            onDelete={deleteOutcome}
          />
        </TabsContent>

        <TabsContent value="requirements">
          <RecordCrudPanel
            title="Capability requirements"
            rows={ws.requirements as unknown as Record<string, unknown>[]}
            idField="requirementId"
            tableColumns={[...REQ_TABLE_COLS]}
            formFields={[...REQ_FORM_FIELDS]}
            blankRow={() => blankRequirement(profile, nextRequirementId)}
            onSave={(row) => upsertRequirement(parseRequirement(row))}
            onDelete={deleteRequirement}
          />
        </TabsContent>

        <TabsContent value="gaps">
          <RecordCrudPanel
            title="Gap findings"
            rows={ws.gapFindings as unknown as Record<string, unknown>[]}
            idField="findingId"
            tableColumns={[...GAP_TABLE_COLS]}
            formFields={[...GAP_FORM_FIELDS]}
            blankRow={() => blankGap(profile, nextGapId)}
            onSave={(row) => upsertGap(parseGap(row))}
            onDelete={deleteGap}
          />
        </TabsContent>

        <TabsContent value="actions" className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Evidence: use a URL in <strong>evidence attachment</strong>, or prefix with{" "}
            <code className="rounded bg-muted px-1">s3key:</code> plus the object key for private S3
            (presigned URLs from your API in production).
          </p>
          <RecordCrudPanel
            title="Enhancement actions"
            rows={ws.actions.map((a) => actionRowForCrud(a))}
            idField="actionId"
            tableColumns={[...ACT_TABLE_COLS]}
            formFields={[...ACT_FORM_FIELDS]}
            blankRow={() => blankAction(profile, nextActionId)}
            onSave={(row) => upsertAction(parseAction(row))}
            onDelete={deleteAction}
          />
          {ws.actions.some((a) => a.evidenceAttachmentS3Key) && (
            <p className="text-xs text-muted-foreground">
              Example presigned GET pattern:{" "}
              {placeholderPresignedDownloadUrl(
                ATTACHMENTS_BUCKET_PLACEHOLDER,
                "control-tower/default/lob/LOB-001/actions/ACT-001/file.pdf",
              )}
            </p>
          )}
        </TabsContent>

        <TabsContent value="risks">
          <RecordCrudPanel
            title="Risks / decisions"
            rows={ws.risksDecisions as unknown as Record<string, unknown>[]}
            idField="riskDecisionId"
            tableColumns={[...RISK_TABLE_COLS]}
            formFields={[...RISK_FORM_FIELDS]}
            blankRow={() => blankRisk(profile, nextRiskId)}
            onSave={(row) => upsertRisk(parseRisk(row))}
            onDelete={deleteRisk}
          />
        </TabsContent>

        <TabsContent value="training">
          <RecordCrudPanel
            title="Training & adoption"
            rows={ws.training as unknown as Record<string, unknown>[]}
            idField="trainingId"
            tableColumns={[...TRN_TABLE_COLS]}
            formFields={[...TRN_FORM_FIELDS]}
            blankRow={() => blankTraining(profile, nextTrainingId)}
            onSave={(row) => upsertTraining(parseTraining(row))}
            onDelete={deleteTraining}
          />
        </TabsContent>

        <TabsContent value="kpis">
          <RecordCrudPanel
            title="KPI measurements"
            rows={ws.kpis as unknown as Record<string, unknown>[]}
            idField="kpiId"
            tableColumns={[...KPI_TABLE_COLS]}
            formFields={[...KPI_FORM_FIELDS]}
            blankRow={() => blankKpi(profile, nextKpiId)}
            onSave={(row) => upsertKpi(parseKpi(row))}
            onDelete={deleteKpi}
          />
        </TabsContent>

        <TabsContent value="meetings">
          <RecordCrudPanel
            title="Meeting governance log"
            rows={ws.meetings as unknown as Record<string, unknown>[]}
            idField="meetingId"
            tableColumns={[...MTG_TABLE_COLS]}
            formFields={[...MTG_FORM_FIELDS]}
            blankRow={() => blankMeeting(profile, nextMeetingId)}
            onSave={(row) => upsertMeeting(parseMeeting(row))}
            onDelete={deleteMeeting}
          />
        </TabsContent>

        <TabsContent value="artifacts" className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Location: external URL, or <code className="rounded bg-muted px-1">s3key:</code> plus object key for
            artifacts stored in S3.
          </p>
          <RecordCrudPanel
            title="Document artifacts"
            rows={ws.artifacts.map((a) => artifactRowForCrud(a))}
            idField="artifactId"
            tableColumns={[...ART_TABLE_COLS]}
            formFields={[...ART_FORM_FIELDS]}
            blankRow={() => blankArtifact(profile, nextArtifactId)}
            onSave={(row) => upsertArtifact(parseArtifact(row))}
            onDelete={deleteArtifact}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit LOB profile</DialogTitle>
            <DialogDescription>
              Changing <code className="rounded bg-muted px-1">lobId</code> re-keys this LOB in local storage only;
              keep IDs stable once tied to integrations.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            {LOB_FORM_FIELDS.map((f) => (
              <div key={f.key} className="grid gap-1.5">
                <Label htmlFor={`prof-${f.key}`}>{f.label}</Label>
                {f.multiline ? (
                  <textarea
                    id={`prof-${f.key}`}
                    disabled={f.key === "lobId"}
                    className={cn(
                      "flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                      f.key === "lobId" && "opacity-70",
                    )}
                    value={profileDraft[f.key] ?? ""}
                    onChange={(e) => setProfileDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                  />
                ) : (
                  <Input
                    id={`prof-${f.key}`}
                    disabled={f.key === "lobId"}
                    value={profileDraft[f.key] ?? ""}
                    onChange={(e) => setProfileDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setProfileOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={saveProfile}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
