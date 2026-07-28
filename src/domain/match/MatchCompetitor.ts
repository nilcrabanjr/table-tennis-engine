import type {
  EntityId,
  Rating,
} from "../shared";

import type { MatchCondition } from "../player";

/**
 * A player participating in a match.
 *
 * The player ID references the persistent player database, while the
 * snapshot fields preserve important information as it existed when the
 * match began.
 */
export interface MatchCompetitor {
  playerId: EntityId;
  countryId: EntityId;

  displayName: string;
  countryName: string;

  playstyleId: EntityId;
  racquetId: EntityId;
  racquetFamiliarity: Rating;

  /**
   * Temporary state belonging only to this match.
   */
  condition: MatchCondition;

  timeoutsRemaining: number;

  /**
   * Tactical plan selected for this match.
   * The complete tactics model will be added later.
   */
  tacticsId?: EntityId;

  withdrawn: boolean;
  disqualified: boolean;
}