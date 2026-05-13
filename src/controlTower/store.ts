import normalizedSeed from "./normalizedSeed.json";
import {
  actionSortKey,
  artifactSortKey,
  gapSortKey,
  gsi1LobIndexSk,
  gsi1OrgPk,
  kpiSortKey,
  meetingSortKey,
  outcomeSortKey,
  profileSortKey,
  requirementSortKey,
  riskDecisionSortKey,
  lobPartitionKey,
  trainingSortKey,
  DEFAULT_ORG_ID,
} from "./dynamoKeys";
import type {
  CapabilityRequirement,
  ControlTowerBundle,
  DocumentArtifact,
  EnhancementAction,
  FieldDictionaryRow,
  GapFinding,
  KpiMeasurement,
  LobProfile,
  LookupValuesRow,
  MeetingGovernanceLog,
  Outcome,
  RelationshipMapRow,
  RiskDecision,
  TrainingAdoption,
} from "./types";

type Raw = Record<string, unknown>;

function str(r: Raw, k: string): string {
  const v = r[k];
  if (v === undefined || v === null) return "";
  return String(v).trim();
}

function mapLookupRow(r: Raw): LookupValuesRow {
  return {
    health: str(r, "Health"),
    priority: str(r, "Priority"),
    status: str(r, "Status"),
    category: str(r, "Category"),
    capabilityArea: str(r, "Capability Area"),
    gapType: str(r, "Gap Type"),
    requestType: str(r, "Request Type"),
    complexity: str(r, "Complexity"),
    confidence: str(r, "Confidence"),
    maturityLevel: str(r, "Maturity Level"),
    meetingType: str(r, "Meeting Type"),
    dependency: str(r, "Dependency"),
  };
}

function mapLob(r: Raw): LobProfile {
  const orgId = DEFAULT_ORG_ID;
  return {
    orgId,
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    ministryCluster: str(r, "Ministry / Cluster"),
    businessOwner: str(r, "Business Owner"),
    technicalOwner: str(r, "Technical Owner"),
    bellAdvisorCsm: str(r, "Bell Advisor / CSM"),
    implementationPartner: str(r, "Implementation Partner"),
    supportModel: str(r, "Support Model"),
    currentEpStatus: str(r, "Current EP Status"),
    capabilitiesEnabled: str(r, "Capabilities Enabled"),
    maturityLevel: str(r, "Maturity Level"),
    health: str(r, "Health"),
    lastReviewDate: str(r, "Last Review Date"),
    nextReviewDate: str(r, "Next Review Date"),
    notes: str(r, "Notes"),
  };
}

function mapOutcome(r: Raw): Outcome {
  const orgId = DEFAULT_ORG_ID;
  return {
    orgId,
    outcomeId: str(r, "Outcome ID"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    businessOutcome: str(r, "Business Outcome"),
    currentPainPoint: str(r, "Current Pain Point"),
    desiredFutureState: str(r, "Desired Future State"),
    successMetricKpi: str(r, "Success Metric / KPI"),
    baselineValue: str(r, "Baseline Value"),
    targetValue: str(r, "Target Value"),
    measurementSource: str(r, "Measurement Source"),
    confidenceLevel: str(r, "Confidence Level"),
    advisoryPriority: str(r, "Advisory Priority"),
    health: str(r, "Health"),
    executiveNarrative: str(r, "Executive Narrative"),
    owner: str(r, "Owner"),
    status: str(r, "Status"),
    targetReviewDate: str(r, "Target Review Date"),
    notes: str(r, "Notes"),
  };
}

function mapRequirement(r: Raw): CapabilityRequirement {
  const orgId = DEFAULT_ORG_ID;
  return {
    orgId,
    requirementId: str(r, "Requirement ID"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    relatedOutcomeId: str(r, "Related Outcome ID"),
    capabilityArea: str(r, "Capability Area"),
    specificRequirement: str(r, "Specific Requirement"),
    currentState: str(r, "Current State"),
    requiredFutureState: str(r, "Required Future State"),
    existingFeatureAvailable: str(r, "Existing Feature Available?"),
    bestPracticeAvailable: str(r, "Best Practice Available?"),
    gapType: str(r, "Gap Type"),
    requiresCr: str(r, "Requires CR?"),
    complexity: str(r, "Complexity"),
    recommendation: str(r, "Recommendation"),
    owner: str(r, "Owner"),
    status: str(r, "Status"),
    targetDate: str(r, "Target Date"),
    notes: str(r, "Notes"),
  };
}

function mapGap(r: Raw): GapFinding {
  const orgId = DEFAULT_ORG_ID;
  return {
    orgId,
    findingId: str(r, "Finding ID"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    relatedOutcomeId: str(r, "Related Outcome ID"),
    relatedRequirementId: str(r, "Related Requirement ID"),
    gapType: str(r, "Gap Type"),
    findingObservation: str(r, "Finding / Observation"),
    impact: str(r, "Impact"),
    advisoryRecommendation: str(r, "Advisory Recommendation"),
    expectedValue: str(r, "Expected Value"),
    priority: str(r, "Priority"),
    health: str(r, "Health"),
    owner: str(r, "Owner"),
    status: str(r, "Status"),
    decisionNeeded: str(r, "Decision Needed?"),
    targetDate: str(r, "Target Date"),
    evidenceSource: str(r, "Evidence / Source"),
    notes: str(r, "Notes"),
  };
}

function mapAction(r: Raw): EnhancementAction {
  const orgId = DEFAULT_ORG_ID;
  const evidence = str(r, "Evidence / Attachment");
  return {
    orgId,
    actionId: str(r, "Action ID"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    relatedOutcomeId: str(r, "Related Outcome ID"),
    relatedGapId: str(r, "Related Gap ID"),
    requestType: str(r, "Request Type"),
    requestTitle: str(r, "Request Title"),
    description: str(r, "Description"),
    businessDriver: str(r, "Business Driver"),
    impactArea: str(r, "Impact Area"),
    priority: str(r, "Priority"),
    urgency: str(r, "Urgency"),
    effortEstimate: str(r, "Effort Estimate"),
    dependency: str(r, "Dependency"),
    decisionNeeded: str(r, "Decision Needed?"),
    owner: str(r, "Owner"),
    status: str(r, "Status"),
    targetDate: str(r, "Target Date"),
    advisoryNotes: str(r, "Advisory Notes"),
    evidenceAttachment: evidence,
    evidenceAttachmentS3Key: evidence.startsWith("s3key:") ? evidence.slice(6) : undefined,
  };
}

function mapRisk(r: Raw): RiskDecision {
  const orgId = DEFAULT_ORG_ID;
  return {
    orgId,
    riskDecisionId: str(r, "Risk / Decision ID"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    type: str(r, "Type"),
    relatedActionId: str(r, "Related Action ID"),
    description: str(r, "Description"),
    impact: str(r, "Impact"),
    probability: str(r, "Probability"),
    severity: str(r, "Severity"),
    mitigationDecisionRequired: str(r, "Mitigation / Decision Required"),
    decisionOwner: str(r, "Decision Owner"),
    dueDate: str(r, "Due Date"),
    status: str(r, "Status"),
    escalationRequired: str(r, "Escalation Required?"),
    notes: str(r, "Notes"),
  };
}

function mapTraining(r: Raw): TrainingAdoption {
  const orgId = DEFAULT_ORG_ID;
  return {
    orgId,
    trainingId: str(r, "Training ID"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    relatedOutcomeId: str(r, "Related Outcome ID"),
    capabilityArea: str(r, "Capability Area"),
    audience: str(r, "Audience"),
    trainingAdoptionNeed: str(r, "Training / Adoption Need"),
    currentState: str(r, "Current State"),
    recommendedEnablement: str(r, "Recommended Enablement"),
    referenceMaterialNeeded: str(r, "Reference Material Needed"),
    deliveryMethod: str(r, "Delivery Method"),
    priority: str(r, "Priority"),
    owner: str(r, "Owner"),
    status: str(r, "Status"),
    targetDate: str(r, "Target Date"),
    completionAdoptionMeasure: str(r, "Completion / Adoption Measure"),
    notes: str(r, "Notes"),
  };
}

function mapKpi(r: Raw): KpiMeasurement {
  const orgId = DEFAULT_ORG_ID;
  return {
    orgId,
    kpiId: str(r, "KPI ID"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    relatedOutcomeId: str(r, "Related Outcome ID"),
    kpiSuccessMeasure: str(r, "KPI / Success Measure"),
    definition: str(r, "Definition"),
    baselineValue: str(r, "Baseline Value"),
    targetValue: str(r, "Target Value"),
    currentValue: str(r, "Current Value"),
    trend: str(r, "Trend"),
    measurementSource: str(r, "Measurement Source"),
    reportingFrequency: str(r, "Reporting Frequency"),
    dataOwner: str(r, "Data Owner"),
    confidenceLevel: str(r, "Confidence Level"),
    lastUpdated: str(r, "Last Updated"),
    notes: str(r, "Notes"),
  };
}

function mapMeeting(r: Raw): MeetingGovernanceLog {
  const orgId = DEFAULT_ORG_ID;
  return {
    orgId,
    meetingId: str(r, "Meeting ID"),
    meetingDate: str(r, "Meeting Date"),
    meetingType: str(r, "Meeting Type"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    topic: str(r, "Topic"),
    summary: str(r, "Summary"),
    decisionAction: str(r, "Decision / Action"),
    owner: str(r, "Owner"),
    dueDate: str(r, "Due Date"),
    relatedActionId: str(r, "Related Action ID"),
    relatedRiskDecisionId: str(r, "Related Risk / Decision ID"),
    status: str(r, "Status"),
    nextReviewDate: str(r, "Next Review Date"),
    notes: str(r, "Notes"),
  };
}

function mapArtifact(r: Raw): DocumentArtifact {
  const orgId = DEFAULT_ORG_ID;
  const loc = str(r, "Location / Link");
  return {
    orgId,
    artifactId: str(r, "Artifact ID"),
    lobId: str(r, "LOB ID"),
    lobName: str(r, "LOB Name"),
    relatedOutcomeId: str(r, "Related Outcome ID"),
    relatedActionId: str(r, "Related Action ID"),
    artifactType: str(r, "Artifact Type"),
    artifactName: str(r, "Artifact Name"),
    description: str(r, "Description"),
    owner: str(r, "Owner"),
    locationLink: loc,
    artifactS3Key: loc.startsWith("s3key:") ? loc.slice(6) : undefined,
    version: str(r, "Version"),
    status: str(r, "Status"),
    lastUpdated: str(r, "Last Updated"),
    notes: str(r, "Notes"),
  };
}

function mapRelationship(r: Raw): RelationshipMapRow {
  return {
    parentSourceList: str(r, "Parent / Source List"),
    keyField: str(r, "Key Field"),
    childTargetList: str(r, "Child / Target List"),
    linkedField: str(r, "Linked Field"),
    relationship: str(r, "Relationship"),
    whyItMatters: str(r, "Why It Matters"),
  };
}

function mapFieldDict(r: Raw): FieldDictionaryRow {
  return {
    listSheet: str(r, "List / Sheet"),
    fieldName: str(r, "Field Name"),
    recommendedType: str(r, "Recommended Type"),
    lookupCandidate: str(r, "Lookup Candidate?"),
    suggestedLinkSource: str(r, "Suggested Link / Source"),
    notes: str(r, "Notes"),
  };
}

const seed = normalizedSeed as Record<string, Raw[]>;

function sheet(name: string): Raw[] {
  const a = seed[name];
  return Array.isArray(a) ? a : [];
}

function buildControlTowerBundle(): ControlTowerBundle {
  return {
    lobProfiles: sheet("LOB Profile").map(mapLob).filter((p) => p.lobId),
    outcomes: sheet("Outcomes").map(mapOutcome).filter((o) => o.outcomeId),
    requirements: sheet("Capabilities Requirements")
      .map(mapRequirement)
      .filter((x) => x.requirementId),
    gapFindings: sheet("Gap Advisory Findings").map(mapGap).filter((x) => x.findingId),
    actions: sheet("Enhancement Action Backlog").map(mapAction).filter((x) => x.actionId),
    risksDecisions: sheet("Risks Decisions Escalations").map(mapRisk).filter((x) => x.riskDecisionId),
    training: sheet("Training Adoption").map(mapTraining).filter((x) => x.trainingId),
    kpis: sheet("KPI Measurement").map(mapKpi).filter((x) => x.kpiId),
    meetings: sheet("Meeting Governance Log").map(mapMeeting).filter((x) => x.meetingId),
    artifacts: sheet("Document Artifact Register").map(mapArtifact).filter((x) => x.artifactId),
    lookups: sheet("Lookup Values").map(mapLookupRow),
    relationshipMap: sheet("Relationship Map")
      .map(mapRelationship)
      .filter((x) => x.parentSourceList),
    fieldDictionary: sheet("Field Dictionary").map(mapFieldDict).filter((x) => x.fieldName),
  };
}

const CLOSED = new Set(["Completed", "Closed", "Done"]);

function isOpenAction(status: string): boolean {
  return !CLOSED.has(status);
}

export type DashboardSnapshot = {
  totalLobs: number;
  openActions: number;
  highCriticalActions: number;
  openRisksDecisions: number;
  decisionItems: number;
  healthCounts: Record<string, number>;
  priorityCounts: Record<string, number>;
};

export type LobWorkspace = {
  profile: LobProfile | undefined;
  outcomes: Outcome[];
  requirements: CapabilityRequirement[];
  gapFindings: GapFinding[];
  actions: EnhancementAction[];
  risksDecisions: RiskDecision[];
  training: TrainingAdoption[];
  kpis: KpiMeasurement[];
  meetings: MeetingGovernanceLog[];
  artifacts: DocumentArtifact[];
};

export type DynamoKeyPreview = {
  pk: string;
  sk: string;
  gsi1pk: string;
  gsi1sk: string;
};

export function previewDynamoKeys(
  orgId: typeof DEFAULT_ORG_ID,
  lobId: string,
  sk: string,
): DynamoKeyPreview {
  return {
    pk: lobPartitionKey(orgId, lobId),
    sk,
    gsi1pk: gsi1OrgPk(orgId),
    gsi1sk: gsi1LobIndexSk(lobId),
  };
}

const _bundle = buildControlTowerBundle();

export const controlTowerStore = {
  get bundle(): ControlTowerBundle {
    return _bundle;
  },

  listLobs(): LobProfile[] {
    return _bundle.lobProfiles;
  },

  getLob(lobId: string): LobProfile | undefined {
    return _bundle.lobProfiles.find((p) => p.lobId === lobId);
  },

  getLobWorkspace(lobId: string): LobWorkspace {
    const b = _bundle;
    return {
      profile: b.lobProfiles.find((p) => p.lobId === lobId),
      outcomes: b.outcomes.filter((o) => o.lobId === lobId),
      requirements: b.requirements.filter((r) => r.lobId === lobId),
      gapFindings: b.gapFindings.filter((g) => g.lobId === lobId),
      actions: b.actions.filter((a) => a.lobId === lobId),
      risksDecisions: b.risksDecisions.filter((r) => r.lobId === lobId),
      training: b.training.filter((t) => t.lobId === lobId),
      kpis: b.kpis.filter((k) => k.lobId === lobId),
      meetings: b.meetings.filter((m) => m.lobId === lobId),
      artifacts: b.artifacts.filter((a) => a.lobId === lobId),
    };
  },

  getDashboard(): DashboardSnapshot {
    const b = _bundle;
    const actions = b.actions;
    const openActions = actions.filter((a) => isOpenAction(a.status));
    const highCritical = openActions.filter((a) =>
      ["Critical", "High"].includes(a.priority),
    );
    const rde = b.risksDecisions;
    const openRde = rde.filter((r) => !CLOSED.has(r.status));
    const decisions = rde.filter((r) => r.type === "Decision");

    const healthCounts: Record<string, number> = {};
    for (const p of b.lobProfiles) {
      const h = p.health || "Unknown";
      healthCounts[h] = (healthCounts[h] ?? 0) + 1;
    }
    const priorityCounts: Record<string, number> = {};
    for (const a of actions) {
      const p = a.priority || "Unknown";
      priorityCounts[p] = (priorityCounts[p] ?? 0) + 1;
    }

    return {
      totalLobs: b.lobProfiles.length,
      openActions: openActions.length,
      highCriticalActions: highCritical.length,
      openRisksDecisions: openRde.length,
      decisionItems: decisions.length,
      healthCounts,
      priorityCounts,
    };
  },

  keyForProfile(lobId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, profileSortKey());
  },

  keyForOutcome(lobId: string, outcomeId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, outcomeSortKey(outcomeId));
  },

  keyForRequirement(lobId: string, requirementId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, requirementSortKey(requirementId));
  },

  keyForGap(lobId: string, findingId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, gapSortKey(findingId));
  },

  keyForAction(lobId: string, actionId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, actionSortKey(actionId));
  },

  keyForRisk(lobId: string, riskDecisionId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, riskDecisionSortKey(riskDecisionId));
  },

  keyForTraining(lobId: string, trainingId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, trainingSortKey(trainingId));
  },

  keyForKpi(lobId: string, kpiId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, kpiSortKey(kpiId));
  },

  keyForMeeting(lobId: string, meetingId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, meetingSortKey(meetingId));
  },

  keyForArtifact(lobId: string, artifactId: string): DynamoKeyPreview {
    return previewDynamoKeys(DEFAULT_ORG_ID, lobId, artifactSortKey(artifactId));
  },
};
