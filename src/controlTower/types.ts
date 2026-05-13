/** Domain types aligned with GoO_EP_Advisory_Control_Tower workbook lists. */

export type HealthValue = string;
export type OrgId = string;

export type LobProfile = {
  orgId: OrgId;
  lobId: string;
  lobName: string;
  ministryCluster: string;
  businessOwner: string;
  technicalOwner: string;
  bellAdvisorCsm: string;
  implementationPartner: string;
  supportModel: string;
  currentEpStatus: string;
  capabilitiesEnabled: string;
  maturityLevel: string;
  health: HealthValue;
  lastReviewDate: string;
  nextReviewDate: string;
  notes: string;
};

export type Outcome = {
  orgId: OrgId;
  outcomeId: string;
  lobId: string;
  lobName: string;
  businessOutcome: string;
  currentPainPoint: string;
  desiredFutureState: string;
  successMetricKpi: string;
  baselineValue: string;
  targetValue: string;
  measurementSource: string;
  confidenceLevel: string;
  advisoryPriority: string;
  health: HealthValue;
  executiveNarrative: string;
  owner: string;
  status: string;
  targetReviewDate: string;
  notes: string;
};

export type CapabilityRequirement = {
  orgId: OrgId;
  requirementId: string;
  lobId: string;
  lobName: string;
  relatedOutcomeId: string;
  capabilityArea: string;
  specificRequirement: string;
  currentState: string;
  requiredFutureState: string;
  existingFeatureAvailable: string;
  bestPracticeAvailable: string;
  gapType: string;
  requiresCr: string;
  complexity: string;
  recommendation: string;
  owner: string;
  status: string;
  targetDate: string;
  notes: string;
};

export type GapFinding = {
  orgId: OrgId;
  findingId: string;
  lobId: string;
  lobName: string;
  relatedOutcomeId: string;
  relatedRequirementId: string;
  gapType: string;
  findingObservation: string;
  impact: string;
  advisoryRecommendation: string;
  expectedValue: string;
  priority: string;
  health: HealthValue;
  owner: string;
  status: string;
  decisionNeeded: string;
  targetDate: string;
  evidenceSource: string;
  notes: string;
};

export type EnhancementAction = {
  orgId: OrgId;
  actionId: string;
  lobId: string;
  lobName: string;
  relatedOutcomeId: string;
  relatedGapId: string;
  requestType: string;
  requestTitle: string;
  description: string;
  businessDriver: string;
  impactArea: string;
  priority: string;
  urgency: string;
  effortEstimate: string;
  dependency: string;
  decisionNeeded: string;
  owner: string;
  status: string;
  targetDate: string;
  advisoryNotes: string;
  /** External URL or free text; binary evidence uses evidenceAttachmentS3Key. */
  evidenceAttachment: string;
  /** S3 object key when file is stored in Control Tower attachments bucket. */
  evidenceAttachmentS3Key?: string;
};

export type RiskDecision = {
  orgId: OrgId;
  riskDecisionId: string;
  lobId: string;
  lobName: string;
  type: string;
  relatedActionId: string;
  description: string;
  impact: string;
  probability: string;
  severity: string;
  mitigationDecisionRequired: string;
  decisionOwner: string;
  dueDate: string;
  status: string;
  escalationRequired: string;
  notes: string;
};

export type TrainingAdoption = {
  orgId: OrgId;
  trainingId: string;
  lobId: string;
  lobName: string;
  relatedOutcomeId: string;
  capabilityArea: string;
  audience: string;
  trainingAdoptionNeed: string;
  currentState: string;
  recommendedEnablement: string;
  referenceMaterialNeeded: string;
  deliveryMethod: string;
  priority: string;
  owner: string;
  status: string;
  targetDate: string;
  completionAdoptionMeasure: string;
  notes: string;
};

export type KpiMeasurement = {
  orgId: OrgId;
  kpiId: string;
  lobId: string;
  lobName: string;
  relatedOutcomeId: string;
  kpiSuccessMeasure: string;
  definition: string;
  baselineValue: string;
  targetValue: string;
  currentValue: string;
  trend: string;
  measurementSource: string;
  reportingFrequency: string;
  dataOwner: string;
  confidenceLevel: string;
  lastUpdated: string;
  notes: string;
};

export type MeetingGovernanceLog = {
  orgId: OrgId;
  meetingId: string;
  meetingDate: string;
  meetingType: string;
  lobId: string;
  lobName: string;
  topic: string;
  summary: string;
  decisionAction: string;
  owner: string;
  dueDate: string;
  relatedActionId: string;
  relatedRiskDecisionId: string;
  status: string;
  nextReviewDate: string;
  notes: string;
};

export type DocumentArtifact = {
  orgId: OrgId;
  artifactId: string;
  lobId: string;
  lobName: string;
  relatedOutcomeId: string;
  relatedActionId: string;
  artifactType: string;
  artifactName: string;
  description: string;
  owner: string;
  locationLink: string;
  /** When binary is uploaded to S3 instead of external link. */
  artifactS3Key?: string;
  version: string;
  status: string;
  lastUpdated: string;
  notes: string;
};

export type LookupValuesRow = {
  health: string;
  priority: string;
  status: string;
  category: string;
  capabilityArea: string;
  gapType: string;
  requestType: string;
  complexity: string;
  confidence: string;
  maturityLevel: string;
  meetingType: string;
  dependency: string;
};

export type RelationshipMapRow = {
  parentSourceList: string;
  keyField: string;
  childTargetList: string;
  linkedField: string;
  relationship: string;
  whyItMatters: string;
};

export type FieldDictionaryRow = {
  listSheet: string;
  fieldName: string;
  recommendedType: string;
  lookupCandidate: string;
  suggestedLinkSource: string;
  notes: string;
};

export type ControlTowerBundle = {
  lobProfiles: LobProfile[];
  outcomes: Outcome[];
  requirements: CapabilityRequirement[];
  gapFindings: GapFinding[];
  actions: EnhancementAction[];
  risksDecisions: RiskDecision[];
  training: TrainingAdoption[];
  kpis: KpiMeasurement[];
  meetings: MeetingGovernanceLog[];
  artifacts: DocumentArtifact[];
  lookups: LookupValuesRow[];
  relationshipMap: RelationshipMapRow[];
  fieldDictionary: FieldDictionaryRow[];
};
