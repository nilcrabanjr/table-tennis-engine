import type {
  TournamentStandingRow,
  TournamentStandings,
} from "./TournamentStandings";

export function createDefaultStandingRow(
  entryId: string,
): TournamentStandingRow {
  return {
    entryId,

    matchesPlayed: 0,
    matchesWon: 0,
    matchesLost: 0,

    gamesWon: 0,
    gamesLost: 0,

    pointsWon: 0,
    pointsLost: 0,

    tournamentPoints: 0,

    headToHeadValue: 0,
    buchholz: 0,
    sonnebornBerger: 0,

    qualificationStatus: "unresolved",
  };
}

export function createDefaultTournamentStandings():
TournamentStandings {
  return {
    tables: [],

    tiebreakOrder: [
      "tournament-points",
      "wins",
      "head-to-head",
      "game-difference",
      "point-difference",
      "seed",
    ],

    revision: 0,
  };
}