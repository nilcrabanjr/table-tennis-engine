import type {
  EntityId,
  Year,
} from "../shared";

export const TOURNAMENT_PODIUM_PLACES = [
  "champion",
  "runner-up",
  "third-place",
  "semi-finalist",
] as const;

export type TournamentPodiumPlace =
  (typeof TOURNAMENT_PODIUM_PLACES)[number];

export interface TournamentPodiumResult {
  place: TournamentPodiumPlace;

  entryId?: EntityId;

  /**
   * Snapshot retained in case the original entry is later unavailable.
   */
  displayName: string;

  countryId?: EntityId;
  countryName?: string;
}

export interface TournamentEditionSummary {
  id: EntityId;

  tournamentSeriesId: EntityId;

  name: string;
  year: Year;

  hostCountryId: EntityId;
  hostCity: string;
  venue?: string;

  entryCount: number;
  matchCount: number;

  podium: TournamentPodiumResult[];

  championEntryId?: EntityId;
  runnerUpEntryId?: EntityId;

  finalFixtureId?: EntityId;
  finalMatchId?: EntityId;

  completed: boolean;

  notes?: string[];
}

export interface TournamentRecord {
  id: EntityId;

  name: string;
  description: string;

  category:
    | "most-titles"
    | "most-final-appearances"
    | "youngest-champion"
    | "oldest-champion"
    | "longest-match"
    | "largest-field"
    | "longest-winning-streak"
    | "custom";

  holderEntryId?: EntityId;
  holderPlayerId?: EntityId;
  holderCountryId?: EntityId;

  holderDisplayName: string;

  value: number;
  unit: string;

  setYear?: Year;
  editionId?: EntityId;

  active: boolean;
}

export interface TournamentSeriesHistory {
  seriesId: EntityId;

  seriesName: string;

  editions: TournamentEditionSummary[];

  records: TournamentRecord[];

  firstEditionYear?: Year;
  latestEditionYear?: Year;

  totalEditions: number;
  totalMatchesPlayed: number;
  totalEntries: number;

  revision: number;
}

export function getCompletedTournamentEditions(
  history: TournamentSeriesHistory,
): TournamentEditionSummary[] {
  return history.editions
    .filter((edition) => edition.completed)
    .sort((first, second) => second.year - first.year);
}

export function getLatestTournamentEdition(
  history: TournamentSeriesHistory,
): TournamentEditionSummary | undefined {
  return [...history.editions].sort(
    (first, second) => second.year - first.year,
  )[0];
}

export function getTournamentChampion(
  edition: TournamentEditionSummary,
): TournamentPodiumResult | undefined {
  return edition.podium.find(
    (result) => result.place === "champion",
  );
}