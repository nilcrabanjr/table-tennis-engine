import type {
  TournamentFormat as TournamentFormatId,
} from "../shared";

export interface BaseTournamentFormat {
  type: TournamentFormatId;

  /**
   * Whether competitors are seeded when constructing the draw.
   */
  seedingEnabled: boolean;

  /**
   * Whether competitors from the same country should be separated
   * where reasonably possible.
   */
  countrySeparationEnabled: boolean;
}

export interface SingleEliminationFormat
  extends BaseTournamentFormat {
  type: "single-elimination";

  drawSize: number;

  /**
   * Whether empty draw positions may become first-round byes.
   */
  byesAllowed: boolean;

  /**
   * Whether a third-place playoff is held.
   */
  thirdPlaceMatch: boolean;

  /**
   * Number of competitors seeded in the bracket.
   */
  seededEntryCount: number;
}

export interface DoubleEliminationFormat
  extends BaseTournamentFormat {
  type: "double-elimination";

  drawSize: number;

  byesAllowed: boolean;

  seededEntryCount: number;

  /**
   * Whether the lower-bracket winner must defeat the upper-bracket
   * winner twice in the final.
   */
  grandFinalResetEnabled: boolean;
}

export interface RoundRobinFormat
  extends BaseTournamentFormat {
  type: "round-robin";

  /**
   * Competitors play each opponent this many times.
   */
  meetingsPerOpponent: number;

  /**
   * Whether draws are possible at the competition level.
   * This will normally remain false for table tennis.
   */
  drawsAllowed: boolean;

  /**
   * Number of competitors advancing when the round robin is being
   * used as a qualifying stage.
   */
  advancingEntryCount?: number;
}

export interface LeagueFormat
  extends BaseTournamentFormat {
  type: "league";

  meetingsPerOpponent: number;

  pointsForWin: number;
  pointsForLoss: number;
  pointsForForfeitLoss: number;

  /**
   * Whether the league includes promotion or relegation references.
   */
  promotionPlaces: number;
  relegationPlaces: number;
}

export interface GroupKnockoutFormat
  extends BaseTournamentFormat {
  type: "group-knockout";

  groupCount: number;
  entriesPerGroup: number;

  meetingsPerGroupOpponent: number;

  advancingEntriesPerGroup: number;

  /**
   * Optional best third-placed or wildcard competitors advancing
   * across all groups.
   */
  additionalAdvancingEntries: number;

  knockoutDrawSize: number;

  knockoutByesAllowed: boolean;
  thirdPlaceMatch: boolean;

  /**
   * Whether competitors from the same group should be kept apart
   * during the first knockout round.
   */
  separateSameGroupInFirstKnockoutRound: boolean;
}

export interface SwissFormat
  extends BaseTournamentFormat {
  type: "swiss";

  roundCount: number;

  /**
   * Whether competitors with identical records should be paired
   * whenever possible.
   */
  scoreGroupPairingEnabled: boolean;

  /**
   * Whether rematches are prohibited.
   */
  repeatPairingsAllowed: boolean;

  /**
   * Number of competitors advancing to a later knockout stage.
   * Undefined means the Swiss table itself determines the champion.
   */
  advancingEntryCount?: number;

  /**
   * Whether competitors may receive one automatic bye when an odd
   * number of entries remains.
   */
  byesAllowed: boolean;
}

export type TournamentFormatConfiguration =
  | SingleEliminationFormat
  | DoubleEliminationFormat
  | RoundRobinFormat
  | LeagueFormat
  | GroupKnockoutFormat
  | SwissFormat;

export function getExpectedGroupFieldSize(
  format: GroupKnockoutFormat,
): number {
  return format.groupCount * format.entriesPerGroup;
}

export function getGroupStageAdvancingCount(
  format: GroupKnockoutFormat,
): number {
  return (
    format.groupCount * format.advancingEntriesPerGroup
    + format.additionalAdvancingEntries
  );
}

/**
 * Returns true when a number is a positive power of two.
 */
export function isPowerOfTwo(value: number): boolean {
  return (
    Number.isInteger(value)
    && value > 0
    && (value & (value - 1)) === 0
  );
}