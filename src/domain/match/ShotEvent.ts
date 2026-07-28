import type {
  EntityId,
  RallyPhase,
  Rating,
  ShotOutcome,
  ShotSide,
  ShotType,
  SpinType,
  TableDistance,
  TargetZone,
} from "../shared";

/**
 * Explainable calculation data for one shot.
 *
 * These values allow a future developer mode to show why a shot succeeded
 * or failed.
 */
export interface ShotCalculationBreakdown {
  technicalContribution: number;
  physicalContribution: number;
  mentalContribution: number;

  playstyleContribution: number;
  equipmentContribution: number;
  tacticalContribution: number;

  positioningModifier: number;
  fatigueModifier: number;
  pressureModifier: number;

  randomContribution: number;

  difficulty: number;
  finalExecutionScore: number;
}

/**
 * One shot occurring during a rally.
 */
export interface ShotEvent {
  id: EntityId;

  rallyId: EntityId;
  pointNumber: number;
  shotNumber: number;

  strikerPlayerId: EntityId;
  receiverPlayerId: EntityId;

  phase: RallyPhase;

  shotType: ShotType;
  shotSide: ShotSide;

  spinType: SpinType;
  spinAmount: Rating;

  targetZone: TargetZone;
  tableDistance: TableDistance;

  ballSpeed: Rating;
  shotQuality: Rating;

  outcome: ShotOutcome;

  /**
   * Whether this shot ended the point.
   */
  pointEnding: boolean;

  /**
   * Optional calculation details for debugging and analysis.
   */
  calculation?: ShotCalculationBreakdown;

  /**
   * Commentary should later be generated from this key and event data.
   */
  commentaryKey?: string;

  elapsedMatchSeconds: number;
}