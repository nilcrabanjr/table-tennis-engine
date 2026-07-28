import type {
  EntityId,
  ShotOutcome,
} from "../shared";

export type PointEndingReason =
  | "clean-winner"
  | "forced-error"
  | "unforced-error"
  | "failed-return"
  | "service-error"
  | "net"
  | "long"
  | "wide"
  | "disqualification"
  | "retirement"
  | "penalty";

export interface PointScoreSnapshot {
  firstPlayerPoints: number;
  secondPlayerPoints: number;

  firstPlayerGames: number;
  secondPlayerGames: number;
}

/**
 * Completed point event.
 *
 * The score and statistics will later be derived from these events.
 */
export interface PointEvent {
  id: EntityId;

  pointNumber: number;
  gameNumber: number;

  rallyId: EntityId;

  winnerPlayerId: EntityId;
  loserPlayerId: EntityId;

  serverPlayerId: EntityId;

  endingReason: PointEndingReason;
  endingShotOutcome: ShotOutcome;

  shotCount: number;
  durationSeconds: number;

  scoreBefore: PointScoreSnapshot;
  scoreAfter: PointScoreSnapshot;

  gameCompleted: boolean;
  matchCompleted: boolean;

  elapsedMatchSeconds: number;
}