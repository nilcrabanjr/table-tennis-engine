import type { MatchCondition } from "../player";
import { DEFAULT_MATCH_CONDITION } from "../player";

import type { MatchState } from "./MatchState";

function cloneMatchCondition(): MatchCondition {
  return {
    ...DEFAULT_MATCH_CONDITION,
  };
}

export interface CreateMatchStateInput {
  matchId: string;
  matchName: string;

  firstPlayerId: string;
  firstPlayerName: string;
  firstCountryId: string;
  firstCountryName: string;
  firstPlaystyleId: string;
  firstRacquetId: string;

  secondPlayerId: string;
  secondPlayerName: string;
  secondCountryId: string;
  secondCountryName: string;
  secondPlaystyleId: string;
  secondRacquetId: string;

  ruleSetId: string;

  year: number;
  randomSeed: number;

  engineVersion?: string;
  schemaVersion?: number;
}

/**
 * Creates a complete match in the not-started state.
 */
export function createDefaultMatchState(
  input: CreateMatchStateInput,
): MatchState {
  return {
    metadata: {
      id: input.matchId,

      name: input.matchName,

      matchType: "singles",
      status: "not-started",

      ruleSetId: input.ruleSetId,

      year: input.year,

      engineVersion: input.engineVersion ?? "0.1.0",
      schemaVersion: input.schemaVersion ?? 1,

      randomSeed: input.randomSeed,

      createdAtIso: new Date().toISOString(),

      elapsedSeconds: 0,
    },

    firstCompetitor: {
      playerId: input.firstPlayerId,
      countryId: input.firstCountryId,

      displayName: input.firstPlayerName,
      countryName: input.firstCountryName,

      playstyleId: input.firstPlaystyleId,
      racquetId: input.firstRacquetId,
      racquetFamiliarity: 70,

      condition: cloneMatchCondition(),

      timeoutsRemaining: 0,

      withdrawn: false,
      disqualified: false,
    },

    secondCompetitor: {
      playerId: input.secondPlayerId,
      countryId: input.secondCountryId,

      displayName: input.secondPlayerName,
      countryName: input.secondCountryName,

      playstyleId: input.secondPlaystyleId,
      racquetId: input.secondRacquetId,
      racquetFamiliarity: 70,

      condition: cloneMatchCondition(),

      timeoutsRemaining: 0,

      withdrawn: false,
      disqualified: false,
    },

    score: {
      firstPlayerGames: 0,
      secondPlayerGames: 0,

      completedGames: [],

      currentGame: {
        gameNumber: 1,

        firstPlayerPoints: 0,
        secondPlayerPoints: 0,

        initialServerPlayerId: input.firstPlayerId,
        currentServerPlayerId: input.firstPlayerId,
        currentReceiverPlayerId: input.secondPlayerId,

        changeEndsCompleted: false,

        elapsedSeconds: 0,
      },
    },

    pointHistory: [],

    expedite: {
      active: false,
    },

    currentEndAssignments: {
      nearEndPlayerId: input.firstPlayerId,
      farEndPlayerId: input.secondPlayerId,
    },

    paused: false,

    revision: 0,
  };
}