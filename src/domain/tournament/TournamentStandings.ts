import type {
  EntityId,
} from "../shared";

export const STANDING_QUALIFICATION_STATUSES = [
  "unresolved",
  "qualified",
  "eliminated",
  "champion",
  "runner-up",
  "third-place",
  "withdrawn",
  "disqualified",
] as const;

export type StandingQualificationStatus =
  (typeof STANDING_QUALIFICATION_STATUSES)[number];

export const STANDING_TIEBREAKERS = [
  "tournament-points",
  "wins",
  "head-to-head",
  "game-difference",
  "game-ratio",
  "point-difference",
  "point-ratio",
  "buchholz",
  "sonneborn-berger",
  "seed",
  "random-draw",
] as const;

export type StandingTiebreaker =
  (typeof STANDING_TIEBREAKERS)[number];

/**
 * One competitor's record in a standings table.
 */
export interface TournamentStandingRow {
  entryId: EntityId;

  rank?: number;
  seed?: number;

  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;

  gamesWon: number;
  gamesLost: number;

  pointsWon: number;
  pointsLost: number;

  /**
   * Competition points used by leagues and some group stages.
   */
  tournamentPoints: number;

  /**
   * Numeric result of direct-match comparison.
   *
   * Higher values rank ahead. The standings engine will later derive
   * this from completed fixtures involving tied competitors.
   */
  headToHeadValue: number;

  /**
   * Sum of opponents' scores, commonly used in Swiss systems.
   */
  buchholz: number;

  /**
   * Strength-of-opposition score weighted by results.
   */
  sonnebornBerger: number;

  qualificationStatus: StandingQualificationStatus;
}

/**
 * One table, such as Group A, a league table, or a Swiss table.
 */
export interface TournamentStandingTable {
  id: EntityId;

  name: string;

  /**
   * Undefined for a general league or Swiss table.
   */
  groupId?: EntityId;

  rows: TournamentStandingRow[];

  completed: boolean;
}

/**
 * Complete standings state for a tournament.
 */
export interface TournamentStandings {
  tables: TournamentStandingTable[];

  tiebreakOrder: StandingTiebreaker[];

  revision: number;
}

export function calculateStandingWinPercentage(
  row: TournamentStandingRow,
): number {
  if (row.matchesPlayed === 0) {
    return 0;
  }

  return row.matchesWon / row.matchesPlayed;
}

export function calculateGameDifference(
  row: TournamentStandingRow,
): number {
  return row.gamesWon - row.gamesLost;
}

export function calculateGameRatio(
  row: TournamentStandingRow,
): number {
  if (row.gamesLost === 0) {
    return row.gamesWon > 0
      ? Number.POSITIVE_INFINITY
      : 0;
  }

  return row.gamesWon / row.gamesLost;
}

export function calculatePointDifference(
  row: TournamentStandingRow,
): number {
  return row.pointsWon - row.pointsLost;
}

export function calculatePointRatio(
  row: TournamentStandingRow,
): number {
  if (row.pointsLost === 0) {
    return row.pointsWon > 0
      ? Number.POSITIVE_INFINITY
      : 0;
  }

  return row.pointsWon / row.pointsLost;
}

function compareDescending(
  first: number,
  second: number,
): number {
  if (first === second) {
    return 0;
  }

  return second - first;
}

function compareByTiebreaker(
  first: TournamentStandingRow,
  second: TournamentStandingRow,
  tiebreaker: StandingTiebreaker,
): number {
  switch (tiebreaker) {
    case "tournament-points":
      return compareDescending(
        first.tournamentPoints,
        second.tournamentPoints,
      );

    case "wins":
      return compareDescending(
        first.matchesWon,
        second.matchesWon,
      );

    case "head-to-head":
      return compareDescending(
        first.headToHeadValue,
        second.headToHeadValue,
      );

    case "game-difference":
      return compareDescending(
        calculateGameDifference(first),
        calculateGameDifference(second),
      );

    case "game-ratio":
      return compareDescending(
        calculateGameRatio(first),
        calculateGameRatio(second),
      );

    case "point-difference":
      return compareDescending(
        calculatePointDifference(first),
        calculatePointDifference(second),
      );

    case "point-ratio":
      return compareDescending(
        calculatePointRatio(first),
        calculatePointRatio(second),
      );

    case "buchholz":
      return compareDescending(
        first.buchholz,
        second.buchholz,
      );

    case "sonneborn-berger":
      return compareDescending(
        first.sonnebornBerger,
        second.sonnebornBerger,
      );

    case "seed":
      return (
        (first.seed ?? Number.MAX_SAFE_INTEGER)
        - (second.seed ?? Number.MAX_SAFE_INTEGER)
      );

    case "random-draw":
      return first.entryId.localeCompare(second.entryId);
  }
}

/**
 * Returns a sorted copy and assigns rank numbers.
 */
export function rankStandingRows(
  rows: TournamentStandingRow[],
  tiebreakOrder: StandingTiebreaker[],
): TournamentStandingRow[] {
  return [...rows]
    .sort((first, second) => {
      for (const tiebreaker of tiebreakOrder) {
        const comparison = compareByTiebreaker(
          first,
          second,
          tiebreaker,
        );

        if (comparison !== 0) {
          return comparison;
        }
      }

      return first.entryId.localeCompare(second.entryId);
    })
    .map((row, index) => ({
      ...row,
      rank: index + 1,
    }));
}

export function getStandingTable(
  standings: TournamentStandings,
  tableId: EntityId,
): TournamentStandingTable | undefined {
  return standings.tables.find(
    (table) => table.id === tableId,
  );
}