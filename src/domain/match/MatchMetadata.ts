import type {
  EntityId,
  MatchStatus,
  MatchType,
  Year,
} from "../shared";

/**
 * Information required for reproducibility and historical records.
 */
export interface MatchMetadata {
  id: EntityId;

  name: string;

  matchType: MatchType;
  status: MatchStatus;

  ruleSetId: EntityId;

  tournamentId?: EntityId;
  roundId?: EntityId;
  venueId?: EntityId;

  year: Year;

  /**
   * Version of the simulator used to create the match.
   */
  engineVersion: string;

  /**
   * Version of the event/save schema.
   */
  schemaVersion: number;

  /**
   * Seed used by the random-number generator.
   */
  randomSeed: number;

  createdAtIso: string;
  startedAtIso?: string;
  completedAtIso?: string;

  /**
   * Elapsed simulated match time.
   */
  elapsedSeconds: number;
}