import type {
  CompetitionCategory,
  MatchType,
} from "../shared";

import type { ExpediteRules } from "./ExpediteRules";
import type { ScoringRules } from "./ScoringRules";
import type { ServiceRules } from "./ServiceRules";

/**
 * Conduct and match-operation rules that do not belong exclusively to
 * scoring, service, or equipment.
 */
export interface MatchRules {
  matchType: MatchType;
  competitionCategory: CompetitionCategory;

  scoring: ScoringRules;
  service: ServiceRules;
  expedite: ExpediteRules;

  /**
   * Whether players may request a timeout.
   */
  timeoutsAllowed: boolean;

  /**
   * Number of timeouts available to each player or pair.
   */
  timeoutsPerCompetitor: number;

  /**
   * Length of each timeout in seconds.
   */
  timeoutDurationSeconds: number;

  /**
   * Whether advice from a coach is permitted during play.
   */
  coachingAllowed: boolean;

  /**
   * Whether coaching is allowed between points.
   */
  coachingBetweenPointsAllowed: boolean;

  /**
   * Whether coaching is permitted between games.
   */
  coachingBetweenGamesAllowed: boolean;

  /**
   * Rest period between games.
   */
  intervalBetweenGamesSeconds: number;

  /**
   * Whether towel or equipment breaks are modelled.
   */
  equipmentBreaksAllowed: boolean;

  /**
   * Whether edge-ball contacts remain valid.
   */
  edgeBallsAreValid: boolean;

  /**
   * Whether doubles players must alternate strokes.
   */
  doublesAlternatingStrokesRequired: boolean;

  /**
   * Whether doubles service must travel diagonally.
   */
  doublesDiagonalServeRequired: boolean;

  /**
   * Whether players change service and receiving order in doubles.
   */
  doublesServiceOrderEnforced: boolean;
}