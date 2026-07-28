import type {
  EntityId,
} from "../shared";

import type {
  TournamentEntry,
  TournamentEntryKind,
} from "./TournamentEntry";

export interface TournamentEntryProfile {
  /**
   * Type of competitor accepted by this tournament event.
   */
  entryKind: TournamentEntryKind;

  maximumEntries: number;

  minimumEntries: number;

  entries: TournamentEntry[];

  /**
   * Entries waiting to be accepted when the main field is full.
   */
  reserveEntryIds: EntityId[];

  /**
   * Whether multiple entries may represent the same country.
   */
  multipleEntriesPerCountryAllowed: boolean;

  /**
   * Optional maximum number of entries from one country.
   */
  maximumEntriesPerCountry?: number;

  /**
   * Whether seeds must be unique.
   */
  uniqueSeedsRequired: boolean;

  /**
   * Highest seed number permitted.
   *
   * Undefined means any positive seed is allowed.
   */
  maximumSeed?: number;

  registrationClosed: boolean;
}

export function getActiveTournamentEntries(
  profile: TournamentEntryProfile,
): TournamentEntry[] {
  return profile.entries.filter((entry) =>
    [
      "accepted",
      "qualified",
      "confirmed",
    ].includes(entry.status),
  );
}

export function getWithdrawnTournamentEntries(
  profile: TournamentEntryProfile,
): TournamentEntry[] {
  return profile.entries.filter(
    (entry) => entry.status === "withdrawn",
  );
}

export function getSeededTournamentEntries(
  profile: TournamentEntryProfile,
): TournamentEntry[] {
  return profile.entries
    .filter((entry) => entry.seed !== undefined)
    .sort((first, second) =>
      (first.seed ?? Number.MAX_SAFE_INTEGER)
      - (second.seed ?? Number.MAX_SAFE_INTEGER),
    );
}