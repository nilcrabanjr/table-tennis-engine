import type {
  EntityId,
  RallyPhase,
  Rating,
} from "../shared";

import type { ShotEvent } from "./ShotEvent";

export interface PlayerTablePosition {
  distanceFromTable: number;
  lateralPosition: number;

  balance: Rating;
  readiness: Rating;
}

/**
 * Current or completed state of one rally.
 */
export interface RallyState {
  id: EntityId;

  pointNumber: number;

  serverPlayerId: EntityId;
  receiverPlayerId: EntityId;

  currentStrikerPlayerId: EntityId;
  currentReceiverPlayerId: EntityId;

  phase: RallyPhase;

  shotCount: number;

  /**
   * Which player currently controls the rally.
   * Undefined means neutral.
   */
  initiativePlayerId?: EntityId;

  initiativeStrength: Rating;
  pressure: Rating;

  firstPlayerPosition: PlayerTablePosition;
  secondPlayerPosition: PlayerTablePosition;

  shots: ShotEvent[];

  active: boolean;

  winnerPlayerId?: EntityId;
  loserPlayerId?: EntityId;

  startedAtElapsedSeconds: number;
  completedAtElapsedSeconds?: number;
}