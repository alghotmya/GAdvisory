import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildControlTowerBundle,
  computeDashboard,
  getLob,
  listLobs,
  selectLobWorkspace,
  keyForProfile,
  keyForOutcome,
  keyForRequirement,
  keyForGap,
  keyForAction,
  keyForRisk,
  keyForTraining,
  keyForKpi,
  keyForMeeting,
  keyForArtifact,
} from "./store";
import {
  clearPersistedBundle,
  loadPersistedBundle,
  nextSequentialId,
  removeById,
  removeLobCascade,
  savePersistedBundle,
  upsertById,
} from "./bundleCrud";
import type {
  CapabilityRequirement,
  ControlTowerBundle,
  DocumentArtifact,
  EnhancementAction,
  GapFinding,
  KpiMeasurement,
  LobProfile,
  MeetingGovernanceLog,
  Outcome,
  RiskDecision,
  TrainingAdoption,
} from "./types";
import type { DashboardSnapshot, LobWorkspace, DynamoKeyPreview } from "./store";

type Ctx = {
  bundle: ControlTowerBundle;
  resetFromSeed: () => void;
  listLobs: () => LobProfile[];
  getLob: (lobId: string) => LobProfile | undefined;
  getLobWorkspace: (lobId: string) => LobWorkspace;
  getDashboard: () => DashboardSnapshot;
  upsertLob: (p: LobProfile) => void;
  deleteLob: (lobId: string) => void;
  upsertOutcome: (o: Outcome) => void;
  deleteOutcome: (id: string) => void;
  upsertRequirement: (r: CapabilityRequirement) => void;
  deleteRequirement: (id: string) => void;
  upsertGap: (g: GapFinding) => void;
  deleteGap: (id: string) => void;
  upsertAction: (a: EnhancementAction) => void;
  deleteAction: (id: string) => void;
  upsertRisk: (r: RiskDecision) => void;
  deleteRisk: (id: string) => void;
  upsertTraining: (t: TrainingAdoption) => void;
  deleteTraining: (id: string) => void;
  upsertKpi: (k: KpiMeasurement) => void;
  deleteKpi: (id: string) => void;
  upsertMeeting: (m: MeetingGovernanceLog) => void;
  deleteMeeting: (id: string) => void;
  upsertArtifact: (a: DocumentArtifact) => void;
  deleteArtifact: (id: string) => void;
  nextOutcomeId: () => string;
  nextRequirementId: () => string;
  nextGapId: () => string;
  nextActionId: () => string;
  nextRiskId: () => string;
  nextTrainingId: () => string;
  nextKpiId: () => string;
  nextMeetingId: () => string;
  nextArtifactId: () => string;
  nextLobId: () => string;
  keyForProfile: (lobId: string) => DynamoKeyPreview;
  keyForOutcome: (lobId: string, outcomeId: string) => DynamoKeyPreview;
  keyForRequirement: (lobId: string, requirementId: string) => DynamoKeyPreview;
  keyForGap: (lobId: string, findingId: string) => DynamoKeyPreview;
  keyForAction: (lobId: string, actionId: string) => DynamoKeyPreview;
  keyForRisk: (lobId: string, riskDecisionId: string) => DynamoKeyPreview;
  keyForTraining: (lobId: string, trainingId: string) => DynamoKeyPreview;
  keyForKpi: (lobId: string, kpiId: string) => DynamoKeyPreview;
  keyForMeeting: (lobId: string, meetingId: string) => DynamoKeyPreview;
  keyForArtifact: (lobId: string, artifactId: string) => DynamoKeyPreview;
};

const ControlTowerContext = createContext<Ctx | null>(null);

function useUpdate(setBundle: React.Dispatch<React.SetStateAction<ControlTowerBundle>>) {
  return useCallback(
    (fn: (b: ControlTowerBundle) => ControlTowerBundle) => {
      setBundle((prev) => {
        const next = fn(prev);
        savePersistedBundle(next);
        return next;
      });
    },
    [setBundle],
  );
}

export function ControlTowerProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<ControlTowerBundle>(() =>
    loadPersistedBundle(buildControlTowerBundle()),
  );
  const update = useUpdate(setBundle);

  const resetFromSeed = useCallback(() => {
    clearPersistedBundle();
    const fresh = buildControlTowerBundle();
    savePersistedBundle(fresh);
    setBundle(fresh);
  }, []);

  const nextOutcomeId = useCallback(
    () => nextSequentialId("OUT", bundle.outcomes.map((o) => o.outcomeId)),
    [bundle.outcomes],
  );
  const nextRequirementId = useCallback(
    () => nextSequentialId("REQ", bundle.requirements.map((r) => r.requirementId)),
    [bundle.requirements],
  );
  const nextGapId = useCallback(
    () => nextSequentialId("GAP", bundle.gapFindings.map((g) => g.findingId)),
    [bundle.gapFindings],
  );
  const nextActionId = useCallback(
    () => nextSequentialId("ACT", bundle.actions.map((a) => a.actionId)),
    [bundle.actions],
  );
  const nextRiskId = useCallback(
    () => nextSequentialId("RDE", bundle.risksDecisions.map((r) => r.riskDecisionId)),
    [bundle.risksDecisions],
  );
  const nextTrainingId = useCallback(
    () => nextSequentialId("TRN", bundle.training.map((t) => t.trainingId)),
    [bundle.training],
  );
  const nextKpiId = useCallback(
    () => nextSequentialId("KPI", bundle.kpis.map((k) => k.kpiId)),
    [bundle.kpis],
  );
  const nextMeetingId = useCallback(
    () => nextSequentialId("MTG", bundle.meetings.map((m) => m.meetingId)),
    [bundle.meetings],
  );
  const nextArtifactId = useCallback(
    () => nextSequentialId("DOC", bundle.artifacts.map((a) => a.artifactId)),
    [bundle.artifacts],
  );
  const nextLobId = useCallback(
    () => nextSequentialId("LOB", bundle.lobProfiles.map((p) => p.lobId)),
    [bundle.lobProfiles],
  );

  const value = useMemo<Ctx>(
    () => ({
      bundle,
      resetFromSeed,
      listLobs: () => listLobs(bundle),
      getLob: (lobId) => getLob(bundle, lobId),
      getLobWorkspace: (lobId) => selectLobWorkspace(bundle, lobId),
      getDashboard: () => computeDashboard(bundle),
      upsertLob: (p) => update((b) => ({ ...b, lobProfiles: upsertById(b.lobProfiles, p, "lobId") })),
      deleteLob: (lobId) => update((b) => removeLobCascade(b, lobId)),
      upsertOutcome: (o) => update((b) => ({ ...b, outcomes: upsertById(b.outcomes, o, "outcomeId") })),
      deleteOutcome: (id) => update((b) => ({ ...b, outcomes: removeById(b.outcomes, id, "outcomeId") })),
      upsertRequirement: (r) =>
        update((b) => ({ ...b, requirements: upsertById(b.requirements, r, "requirementId") })),
      deleteRequirement: (id) =>
        update((b) => ({ ...b, requirements: removeById(b.requirements, id, "requirementId") })),
      upsertGap: (g) => update((b) => ({ ...b, gapFindings: upsertById(b.gapFindings, g, "findingId") })),
      deleteGap: (id) => update((b) => ({ ...b, gapFindings: removeById(b.gapFindings, id, "findingId") })),
      upsertAction: (a) => update((b) => ({ ...b, actions: upsertById(b.actions, a, "actionId") })),
      deleteAction: (id) => update((b) => ({ ...b, actions: removeById(b.actions, id, "actionId") })),
      upsertRisk: (r) =>
        update((b) => ({ ...b, risksDecisions: upsertById(b.risksDecisions, r, "riskDecisionId") })),
      deleteRisk: (id) =>
        update((b) => ({ ...b, risksDecisions: removeById(b.risksDecisions, id, "riskDecisionId") })),
      upsertTraining: (t) => update((b) => ({ ...b, training: upsertById(b.training, t, "trainingId") })),
      deleteTraining: (id) => update((b) => ({ ...b, training: removeById(b.training, id, "trainingId") })),
      upsertKpi: (k) => update((b) => ({ ...b, kpis: upsertById(b.kpis, k, "kpiId") })),
      deleteKpi: (id) => update((b) => ({ ...b, kpis: removeById(b.kpis, id, "kpiId") })),
      upsertMeeting: (m) => update((b) => ({ ...b, meetings: upsertById(b.meetings, m, "meetingId") })),
      deleteMeeting: (id) => update((b) => ({ ...b, meetings: removeById(b.meetings, id, "meetingId") })),
      upsertArtifact: (a) => update((b) => ({ ...b, artifacts: upsertById(b.artifacts, a, "artifactId") })),
      deleteArtifact: (id) => update((b) => ({ ...b, artifacts: removeById(b.artifacts, id, "artifactId") })),
      nextOutcomeId,
      nextRequirementId,
      nextGapId,
      nextActionId,
      nextRiskId,
      nextTrainingId,
      nextKpiId,
      nextMeetingId,
      nextArtifactId,
      nextLobId,
      keyForProfile,
      keyForOutcome,
      keyForRequirement,
      keyForGap,
      keyForAction,
      keyForRisk,
      keyForTraining,
      keyForKpi,
      keyForMeeting,
      keyForArtifact,
    }),
    [
      bundle,
      resetFromSeed,
      update,
      nextOutcomeId,
      nextRequirementId,
      nextGapId,
      nextActionId,
      nextRiskId,
      nextTrainingId,
      nextKpiId,
      nextMeetingId,
      nextArtifactId,
      nextLobId,
    ],
  );

  return <ControlTowerContext.Provider value={value}>{children}</ControlTowerContext.Provider>;
}

export function useControlTower(): Ctx {
  const ctx = useContext(ControlTowerContext);
  if (!ctx) throw new Error("useControlTower must be used within ControlTowerProvider");
  return ctx;
}
