import type { EntityId } from "../shared";

export interface CompletedGameScore {
  gameNumber: number;

  firstPlayerPoints: number;
  secondPlayerPoints: number;

  winnerPlayerId: EntityId;

  durationSeconds: number;
}

export interface CurrentGameScore {
  gameNumber: number;

  firstPlayerPoints: number;
  secondPlayerPoints: number;

  initialServerPlayerId: EntityId;
  currentServerPlayerId: EntityId;
  currentReceiverPlayerId: EntityId;

  changeEndsCompleted: boolean;

  elapsedSeconds: number;
}

export interface MatchScoreState {
  firstPlayerGames: number;
  secondPlayerGames: number;

  completedGames: CompletedGameScore[];

  currentGame: CurrentGameScore;

  winnerPlayerId?: EntityId;
}