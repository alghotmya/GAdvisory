import { DEFAULT_ORG_ID } from "./dynamoKeys";
import type { LobProfile } from "./types";

function emptyRow(keys: string[]): Record<string, string> {
  const o: Record<string, string> = {};
  for (const k of keys) o[k] = "";
  return o;
}

const OUTCOME_KEYS = [
  "outcomeId",
  "lobId",
  "lobName",
  "businessOutcome",
  "currentPainPoint",
  "desiredFutureState",
  "successMetricKpi",
  "baselineValue",
  "targetValue",
  "measurementSource",
  "confidenceLevel",
  "advisoryPriority",
  "health",
  "executiveNarrative",
  "owner",
  "status",
  "targetReviewDate",
  "notes",
] as const;

export function blankOutcome(profile: LobProfile, nextOutcomeId: () => string): Record<string, string> {
  return {
    ...emptyRow([...OUTCOME_KEYS]),
    orgId: DEFAULT_ORG_ID,
    outcomeId: nextOutcomeId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const OUTCOME_TABLE_COLS = [
  { key: "outcomeId", label: "ID" },
  { key: "businessOutcome", label: "Outcome" },
  { key: "advisoryPriority", label: "Priority" },
  { key: "health", label: "Health" },
  { key: "status", label: "Status" },
] as const;

export const OUTCOME_FORM_FIELDS = OUTCOME_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "executiveNarrative" || k === "notes" || k === "businessOutcome",
}));

const REQ_KEYS = [
  "requirementId",
  "lobId",
  "lobName",
  "relatedOutcomeId",
  "capabilityArea",
  "specificRequirement",
  "currentState",
  "requiredFutureState",
  "existingFeatureAvailable",
  "bestPracticeAvailable",
  "gapType",
  "requiresCr",
  "complexity",
  "recommendation",
  "owner",
  "status",
  "targetDate",
  "notes",
] as const;

export function blankRequirement(profile: LobProfile, nextId: () => string): Record<string, string> {
  return {
    ...emptyRow([...REQ_KEYS]),
    orgId: DEFAULT_ORG_ID,
    requirementId: nextId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const REQ_TABLE_COLS = [
  { key: "requirementId", label: "ID" },
  { key: "relatedOutcomeId", label: "Outcome" },
  { key: "capabilityArea", label: "Area" },
  { key: "specificRequirement", label: "Requirement" },
  { key: "status", label: "Status" },
] as const;

export const REQ_FORM_FIELDS = REQ_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "specificRequirement" || k === "recommendation" || k === "notes",
}));

const GAP_KEYS = [
  "findingId",
  "lobId",
  "lobName",
  "relatedOutcomeId",
  "relatedRequirementId",
  "gapType",
  "findingObservation",
  "impact",
  "advisoryRecommendation",
  "expectedValue",
  "priority",
  "health",
  "owner",
  "status",
  "decisionNeeded",
  "targetDate",
  "evidenceSource",
  "notes",
] as const;

export function blankGap(profile: LobProfile, nextId: () => string): Record<string, string> {
  return {
    ...emptyRow([...GAP_KEYS]),
    orgId: DEFAULT_ORG_ID,
    findingId: nextId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const GAP_TABLE_COLS = [
  { key: "findingId", label: "ID" },
  { key: "relatedRequirementId", label: "Req" },
  { key: "priority", label: "Prio" },
  { key: "health", label: "Health" },
  { key: "status", label: "Status" },
] as const;

export const GAP_FORM_FIELDS = GAP_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline:
    k === "findingObservation" ||
    k === "advisoryRecommendation" ||
    k === "notes" ||
    k === "impact",
}));

const ACT_KEYS = [
  "actionId",
  "lobId",
  "lobName",
  "relatedOutcomeId",
  "relatedGapId",
  "requestType",
  "requestTitle",
  "description",
  "businessDriver",
  "impactArea",
  "priority",
  "urgency",
  "effortEstimate",
  "dependency",
  "decisionNeeded",
  "owner",
  "status",
  "targetDate",
  "advisoryNotes",
  "evidenceAttachment",
] as const;

export function blankAction(profile: LobProfile, nextId: () => string): Record<string, string> {
  return {
    ...emptyRow([...ACT_KEYS]),
    orgId: DEFAULT_ORG_ID,
    actionId: nextId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const ACT_TABLE_COLS = [
  { key: "actionId", label: "ID" },
  { key: "requestTitle", label: "Title" },
  { key: "requestType", label: "Type" },
  { key: "priority", label: "Prio" },
  { key: "status", label: "Status" },
] as const;

export const ACT_FORM_FIELDS = ACT_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "description" || k === "advisoryNotes",
}));

const RISK_KEYS = [
  "riskDecisionId",
  "lobId",
  "lobName",
  "type",
  "relatedActionId",
  "description",
  "impact",
  "probability",
  "severity",
  "mitigationDecisionRequired",
  "decisionOwner",
  "dueDate",
  "status",
  "escalationRequired",
  "notes",
] as const;

export function blankRisk(profile: LobProfile, nextId: () => string): Record<string, string> {
  return {
    ...emptyRow([...RISK_KEYS]),
    orgId: DEFAULT_ORG_ID,
    riskDecisionId: nextId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const RISK_TABLE_COLS = [
  { key: "riskDecisionId", label: "ID" },
  { key: "type", label: "Type" },
  { key: "severity", label: "Severity" },
  { key: "status", label: "Status" },
  { key: "dueDate", label: "Due" },
] as const;

export const RISK_FORM_FIELDS = RISK_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "description" || k === "mitigationDecisionRequired" || k === "notes",
}));

const TRN_KEYS = [
  "trainingId",
  "lobId",
  "lobName",
  "relatedOutcomeId",
  "capabilityArea",
  "audience",
  "trainingAdoptionNeed",
  "currentState",
  "recommendedEnablement",
  "referenceMaterialNeeded",
  "deliveryMethod",
  "priority",
  "owner",
  "status",
  "targetDate",
  "completionAdoptionMeasure",
  "notes",
] as const;

export function blankTraining(profile: LobProfile, nextId: () => string): Record<string, string> {
  return {
    ...emptyRow([...TRN_KEYS]),
    orgId: DEFAULT_ORG_ID,
    trainingId: nextId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const TRN_TABLE_COLS = [
  { key: "trainingId", label: "ID" },
  { key: "capabilityArea", label: "Area" },
  { key: "audience", label: "Audience" },
  { key: "priority", label: "Prio" },
  { key: "status", label: "Status" },
] as const;

export const TRN_FORM_FIELDS = TRN_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "trainingAdoptionNeed" || k === "notes",
}));

const KPI_KEYS = [
  "kpiId",
  "lobId",
  "lobName",
  "relatedOutcomeId",
  "kpiSuccessMeasure",
  "definition",
  "baselineValue",
  "targetValue",
  "currentValue",
  "trend",
  "measurementSource",
  "reportingFrequency",
  "dataOwner",
  "confidenceLevel",
  "lastUpdated",
  "notes",
] as const;

export function blankKpi(profile: LobProfile, nextId: () => string): Record<string, string> {
  return {
    ...emptyRow([...KPI_KEYS]),
    orgId: DEFAULT_ORG_ID,
    kpiId: nextId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const KPI_TABLE_COLS = [
  { key: "kpiId", label: "ID" },
  { key: "kpiSuccessMeasure", label: "Measure" },
  { key: "baselineValue", label: "Baseline" },
  { key: "targetValue", label: "Target" },
  { key: "trend", label: "Trend" },
] as const;

export const KPI_FORM_FIELDS = KPI_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "definition" || k === "notes",
}));

const MTG_KEYS = [
  "meetingId",
  "meetingDate",
  "meetingType",
  "lobId",
  "lobName",
  "topic",
  "summary",
  "decisionAction",
  "owner",
  "dueDate",
  "relatedActionId",
  "relatedRiskDecisionId",
  "status",
  "nextReviewDate",
  "notes",
] as const;

export function blankMeeting(profile: LobProfile, nextId: () => string): Record<string, string> {
  return {
    ...emptyRow([...MTG_KEYS]),
    orgId: DEFAULT_ORG_ID,
    meetingId: nextId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const MTG_TABLE_COLS = [
  { key: "meetingId", label: "ID" },
  { key: "meetingDate", label: "Date" },
  { key: "meetingType", label: "Type" },
  { key: "topic", label: "Topic" },
  { key: "status", label: "Status" },
] as const;

export const MTG_FORM_FIELDS = MTG_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "summary" || k === "decisionAction" || k === "notes",
}));

const ART_KEYS = [
  "artifactId",
  "lobId",
  "lobName",
  "relatedOutcomeId",
  "relatedActionId",
  "artifactType",
  "artifactName",
  "description",
  "owner",
  "locationLink",
  "version",
  "status",
  "lastUpdated",
  "notes",
] as const;

export function blankArtifact(profile: LobProfile, nextId: () => string): Record<string, string> {
  return {
    ...emptyRow([...ART_KEYS]),
    orgId: DEFAULT_ORG_ID,
    artifactId: nextId(),
    lobId: profile.lobId,
    lobName: profile.lobName,
  };
}

export const ART_TABLE_COLS = [
  { key: "artifactId", label: "ID" },
  { key: "artifactType", label: "Type" },
  { key: "artifactName", label: "Name" },
  { key: "status", label: "Status" },
  { key: "version", label: "Ver" },
] as const;

export const ART_FORM_FIELDS = ART_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "description" || k === "notes",
}));

export function parseOutcome(d: Record<string, string>): import("./types").Outcome {
  return {
    orgId: DEFAULT_ORG_ID,
    outcomeId: d.outcomeId,
    lobId: d.lobId,
    lobName: d.lobName,
    businessOutcome: d.businessOutcome,
    currentPainPoint: d.currentPainPoint,
    desiredFutureState: d.desiredFutureState,
    successMetricKpi: d.successMetricKpi,
    baselineValue: d.baselineValue,
    targetValue: d.targetValue,
    measurementSource: d.measurementSource,
    confidenceLevel: d.confidenceLevel,
    advisoryPriority: d.advisoryPriority,
    health: d.health,
    executiveNarrative: d.executiveNarrative,
    owner: d.owner,
    status: d.status,
    targetReviewDate: d.targetReviewDate,
    notes: d.notes,
  };
}

export function parseRequirement(d: Record<string, string>): import("./types").CapabilityRequirement {
  return {
    orgId: DEFAULT_ORG_ID,
    requirementId: d.requirementId,
    lobId: d.lobId,
    lobName: d.lobName,
    relatedOutcomeId: d.relatedOutcomeId,
    capabilityArea: d.capabilityArea,
    specificRequirement: d.specificRequirement,
    currentState: d.currentState,
    requiredFutureState: d.requiredFutureState,
    existingFeatureAvailable: d.existingFeatureAvailable,
    bestPracticeAvailable: d.bestPracticeAvailable,
    gapType: d.gapType,
    requiresCr: d.requiresCr,
    complexity: d.complexity,
    recommendation: d.recommendation,
    owner: d.owner,
    status: d.status,
    targetDate: d.targetDate,
    notes: d.notes,
  };
}

export function parseGap(d: Record<string, string>): import("./types").GapFinding {
  return {
    orgId: DEFAULT_ORG_ID,
    findingId: d.findingId,
    lobId: d.lobId,
    lobName: d.lobName,
    relatedOutcomeId: d.relatedOutcomeId,
    relatedRequirementId: d.relatedRequirementId,
    gapType: d.gapType,
    findingObservation: d.findingObservation,
    impact: d.impact,
    advisoryRecommendation: d.advisoryRecommendation,
    expectedValue: d.expectedValue,
    priority: d.priority,
    health: d.health,
    owner: d.owner,
    status: d.status,
    decisionNeeded: d.decisionNeeded,
    targetDate: d.targetDate,
    evidenceSource: d.evidenceSource,
    notes: d.notes,
  };
}

export function parseAction(d: Record<string, string>): import("./types").EnhancementAction {
  const ev = d.evidenceAttachment;
  return {
    orgId: DEFAULT_ORG_ID,
    actionId: d.actionId,
    lobId: d.lobId,
    lobName: d.lobName,
    relatedOutcomeId: d.relatedOutcomeId,
    relatedGapId: d.relatedGapId,
    requestType: d.requestType,
    requestTitle: d.requestTitle,
    description: d.description,
    businessDriver: d.businessDriver,
    impactArea: d.impactArea,
    priority: d.priority,
    urgency: d.urgency,
    effortEstimate: d.effortEstimate,
    dependency: d.dependency,
    decisionNeeded: d.decisionNeeded,
    owner: d.owner,
    status: d.status,
    targetDate: d.targetDate,
    advisoryNotes: d.advisoryNotes,
    evidenceAttachment: ev,
    evidenceAttachmentS3Key: ev.startsWith("s3key:") ? ev.slice(6) : undefined,
  };
}

export function parseRisk(d: Record<string, string>): import("./types").RiskDecision {
  return {
    orgId: DEFAULT_ORG_ID,
    riskDecisionId: d.riskDecisionId,
    lobId: d.lobId,
    lobName: d.lobName,
    type: d.type,
    relatedActionId: d.relatedActionId,
    description: d.description,
    impact: d.impact,
    probability: d.probability,
    severity: d.severity,
    mitigationDecisionRequired: d.mitigationDecisionRequired,
    decisionOwner: d.decisionOwner,
    dueDate: d.dueDate,
    status: d.status,
    escalationRequired: d.escalationRequired,
    notes: d.notes,
  };
}

export function parseTraining(d: Record<string, string>): import("./types").TrainingAdoption {
  return {
    orgId: DEFAULT_ORG_ID,
    trainingId: d.trainingId,
    lobId: d.lobId,
    lobName: d.lobName,
    relatedOutcomeId: d.relatedOutcomeId,
    capabilityArea: d.capabilityArea,
    audience: d.audience,
    trainingAdoptionNeed: d.trainingAdoptionNeed,
    currentState: d.currentState,
    recommendedEnablement: d.recommendedEnablement,
    referenceMaterialNeeded: d.referenceMaterialNeeded,
    deliveryMethod: d.deliveryMethod,
    priority: d.priority,
    owner: d.owner,
    status: d.status,
    targetDate: d.targetDate,
    completionAdoptionMeasure: d.completionAdoptionMeasure,
    notes: d.notes,
  };
}

export function parseKpi(d: Record<string, string>): import("./types").KpiMeasurement {
  return {
    orgId: DEFAULT_ORG_ID,
    kpiId: d.kpiId,
    lobId: d.lobId,
    lobName: d.lobName,
    relatedOutcomeId: d.relatedOutcomeId,
    kpiSuccessMeasure: d.kpiSuccessMeasure,
    definition: d.definition,
    baselineValue: d.baselineValue,
    targetValue: d.targetValue,
    currentValue: d.currentValue,
    trend: d.trend,
    measurementSource: d.measurementSource,
    reportingFrequency: d.reportingFrequency,
    dataOwner: d.dataOwner,
    confidenceLevel: d.confidenceLevel,
    lastUpdated: d.lastUpdated,
    notes: d.notes,
  };
}

export function parseMeeting(d: Record<string, string>): import("./types").MeetingGovernanceLog {
  return {
    orgId: DEFAULT_ORG_ID,
    meetingId: d.meetingId,
    meetingDate: d.meetingDate,
    meetingType: d.meetingType,
    lobId: d.lobId,
    lobName: d.lobName,
    topic: d.topic,
    summary: d.summary,
    decisionAction: d.decisionAction,
    owner: d.owner,
    dueDate: d.dueDate,
    relatedActionId: d.relatedActionId,
    relatedRiskDecisionId: d.relatedRiskDecisionId,
    status: d.status,
    nextReviewDate: d.nextReviewDate,
    notes: d.notes,
  };
}

export function parseArtifact(d: Record<string, string>): import("./types").DocumentArtifact {
  const loc = d.locationLink;
  return {
    orgId: DEFAULT_ORG_ID,
    artifactId: d.artifactId,
    lobId: d.lobId,
    lobName: d.lobName,
    relatedOutcomeId: d.relatedOutcomeId,
    relatedActionId: d.relatedActionId,
    artifactType: d.artifactType,
    artifactName: d.artifactName,
    description: d.description,
    owner: d.owner,
    locationLink: loc,
    artifactS3Key: loc.startsWith("s3key:") ? loc.slice(6) : undefined,
    version: d.version,
    status: d.status,
    lastUpdated: d.lastUpdated,
    notes: d.notes,
  };
}

const LOB_KEYS = [
  "lobId",
  "lobName",
  "ministryCluster",
  "businessOwner",
  "technicalOwner",
  "bellAdvisorCsm",
  "implementationPartner",
  "supportModel",
  "currentEpStatus",
  "capabilitiesEnabled",
  "maturityLevel",
  "health",
  "lastReviewDate",
  "nextReviewDate",
  "notes",
] as const;

export const LOB_FORM_FIELDS = LOB_KEYS.map((k) => ({
  key: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  multiline: k === "notes" || k === "capabilitiesEnabled",
}));

export function lobProfileToDraft(p: LobProfile): Record<string, string> {
  const d: Record<string, string> = { orgId: p.orgId };
  for (const k of LOB_KEYS) d[k] = String((p as unknown as Record<string, unknown>)[k] ?? "");
  return d;
}

export function parseLobProfile(d: Record<string, string>): LobProfile {
  return {
    orgId: DEFAULT_ORG_ID,
    lobId: d.lobId,
    lobName: d.lobName,
    ministryCluster: d.ministryCluster,
    businessOwner: d.businessOwner,
    technicalOwner: d.technicalOwner,
    bellAdvisorCsm: d.bellAdvisorCsm,
    implementationPartner: d.implementationPartner,
    supportModel: d.supportModel,
    currentEpStatus: d.currentEpStatus,
    capabilitiesEnabled: d.capabilitiesEnabled,
    maturityLevel: d.maturityLevel,
    health: d.health,
    lastReviewDate: d.lastReviewDate,
    nextReviewDate: d.nextReviewDate,
    notes: d.notes,
  };
}

export function blankLob(nextLobId: () => string): Record<string, string> {
  return {
    ...emptyRow([...LOB_KEYS]),
    orgId: DEFAULT_ORG_ID,
    lobId: nextLobId(),
    lobName: "New LOB",
  };
}
