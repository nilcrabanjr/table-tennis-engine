import type {
  TournamentEditionSummary,
  TournamentSeriesHistory,
} from "./TournamentHistory";

export function createDefaultTournamentEdition(
  id: string,
  seriesId: string,
  year: number,
): TournamentEditionSummary {
  return {
    id,

    tournamentSeriesId: seriesId,

    name: `${year} Tournament`,

    year,

    hostCountryId: "",
    hostCity: "",

    entryCount: 0,
    matchCount: 0,

    podium: [],

    completed: false,

    notes: [],
  };
}

export function createDefaultTournamentHistory(
  seriesId: string,
  seriesName: string,
): TournamentSeriesHistory {
  return {
    seriesId,
    seriesName,

    editions: [],
    records: [],

    totalEditions: 0,
    totalMatchesPlayed: 0,
    totalEntries: 0,

    revision: 0,
  };
}