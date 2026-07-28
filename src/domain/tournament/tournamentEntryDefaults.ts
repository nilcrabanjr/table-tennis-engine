import type {
  TournamentEntry,
} from "./TournamentEntry";

import type {
  TournamentEntryProfile,
} from "./TournamentEntryProfile";

export function createDefaultTournamentEntry(
  id: string,
  playerId: string,
  countryId: string,
  displayName: string,
): TournamentEntry {
  return {
    id,

    kind: "player",

    displayName,

    playerIds: [playerId],

    countryId,

    status: "pending",

    qualification: {
      method: "invitation",
    },

    entryStrength: 50,

    notes: [],
  };
}

export function createDefaultTournamentEntryProfile():
TournamentEntryProfile {
  return {
    entryKind: "player",

    maximumEntries: 32,
    minimumEntries: 2,

    entries: [],

    reserveEntryIds: [],

    multipleEntriesPerCountryAllowed: true,

    uniqueSeedsRequired: true,

    maximumSeed: 8,

    registrationClosed: false,
  };
}