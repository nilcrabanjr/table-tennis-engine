import type { Rating } from "../shared";

/**
 * Temporary player state during a match.
 *
 * These values are not permanent player abilities.
 */
export interface MatchCondition {
  /**
   * Physical tiredness.
   *
   * 0 means fresh and 100 means completely exhausted.
   */
  fatigue: Rating;

  /**
   * Current confidence in execution and decision-making.
   */
  confidence: Rating;

  /**
   * Current concentration level.
   */
  focus: Rating;

  /**
   * Current emotional frustration.
   */
  frustration: Rating;

  /**
   * Current psychological pressure.
   */
  pressure: Rating;

  /**
   * Recent positive or negative match flow.
   *
   * Fifty represents neutral momentum.
   */
  momentum: Rating;

  /**
   * Current physical stability and readiness.
   */
  balance: Rating;

  /**
   * Current positional readiness for the next shot.
   */
  readiness: Rating;

  /**
   * Current tactical certainty.
   */
  tacticalClarity: Rating;

  /**
   * Accumulated physical strain.
   */
  physicalStrain: Rating;
}

export const DEFAULT_MATCH_CONDITION: MatchCondition = {
  fatigue: 0,
  confidence: 50,
  focus: 75,
  frustration: 0,
  pressure: 0,
  momentum: 50,
  balance: 100,
  readiness: 100,
  tacticalClarity: 70,
  physicalStrain: 0,
};