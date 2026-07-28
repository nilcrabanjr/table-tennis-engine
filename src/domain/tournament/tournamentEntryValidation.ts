import {
  isValidRating,
} from "../shared";

import {
  TOURNAMENT_ENTRY_KINDS,
  TOURNAMENT_ENTRY_METHODS,
  TOURNAMENT_ENTRY_STATUSES,
  type TournamentEntry,
} from "./TournamentEntry";

import type {
  TournamentEntryProfile,
} from "./TournamentEntryProfile";

export interface TournamentEntryValidationError {
  path: string;
  message: string;
}

export interface TournamentEntryValidationResult {
  valid: boolean;
  errors: TournamentEntryValidationError[];
}

function validateEntry(
  entry: TournamentEntry,
  index: number,
  errors: TournamentEntryValidationError[],
): void {
  const path = `entries.${index}`;

  if (!entry.id.trim()) {
    errors.push({
      path: `${path}.id`,
      message: "Tournament entry ID is required.",
    });
  }

  if (!entry.displayName.trim()) {
    errors.push({
      path: `${path}.displayName`,
      message: "Tournament entry display name is required.",
    });
  }

  if (!TOURNAMENT_ENTRY_KINDS.includes(entry.kind)) {
    errors.push({
      path: `${path}.kind`,
      message: "Tournament entry kind is invalid.",
    });
  }

  if (!TOURNAMENT_ENTRY_STATUSES.includes(entry.status)) {
    errors.push({
      path: `${path}.status`,
      message: "Tournament entry status is invalid.",
    });
  }

  if (
    !TOURNAMENT_ENTRY_METHODS.includes(
      entry.qualification.method,
    )
  ) {
    errors.push({
      path: `${path}.qualification.method`,
      message: "Tournament qualification method is invalid.",
    });
  }

  if (!entry.countryId.trim()) {
    errors.push({
      path: `${path}.countryId`,
      message: "Tournament entry country ID is required.",
    });
  }

  if (entry.playerIds.length === 0) {
    errors.push({
      path: `${path}.playerIds`,
      message: "Tournament entry must contain at least one player.",
    });
  }

  const uniquePlayerIds = new Set(entry.playerIds);

  if (uniquePlayerIds.size !== entry.playerIds.length) {
    errors.push({
      path: `${path}.playerIds`,
      message: "A tournament entry cannot repeat the same player.",
    });
  }

  if (
    entry.kind === "player"
    && entry.playerIds.length !== 1
  ) {
    errors.push({
      path: `${path}.playerIds`,
      message: "A singles player entry must contain exactly one player.",
    });
  }

  if (
    entry.kind === "doubles-pair"
    && entry.playerIds.length !== 2
  ) {
    errors.push({
      path: `${path}.playerIds`,
      message: "A doubles entry must contain exactly two players.",
    });
  }

  if (
    entry.kind === "team"
    && entry.playerIds.length < 2
  ) {
    errors.push({
      path: `${path}.playerIds`,
      message: "A team entry must contain at least two players.",
    });
  }

  if (!isValidRating(entry.entryStrength)) {
    errors.push({
      path: `${path}.entryStrength`,
      message: "Entry strength must be between 0 and 100.",
    });
  }

  if (
    entry.seed !== undefined
    && (
      !Number.isInteger(entry.seed)
      || entry.seed < 1
    )
  ) {
    errors.push({
      path: `${path}.seed`,
      message: "Seed must be a positive whole number.",
    });
  }

  if (
    entry.rankingAtEntry !== undefined
    && (
      !Number.isInteger(entry.rankingAtEntry)
      || entry.rankingAtEntry < 1
    )
  ) {
    errors.push({
      path: `${path}.rankingAtEntry`,
      message: "Ranking at entry must be a positive whole number.",
    });
  }

  if (
    entry.status === "withdrawn"
    && !entry.withdrawal
  ) {
    errors.push({
      path: `${path}.withdrawal`,
      message: "A withdrawn entry must include withdrawal details.",
    });
  }

  if (
    entry.status === "replaced"
    && !entry.withdrawal?.replacementEntryId
  ) {
    errors.push({
      path: `${path}.withdrawal.replacementEntryId`,
      message: "A replaced entry must reference its replacement.",
    });
  }

  if (
    entry.qualification.method === "replacement"
    && !entry.replacement
  ) {
    errors.push({
      path: `${path}.replacement`,
      message: "A replacement entry must identify the entry it replaced.",
    });
  }

  if (
    entry.qualification.qualificationPosition !== undefined
    && (
      !Number.isInteger(
        entry.qualification.qualificationPosition,
      )
      || entry.qualification.qualificationPosition < 1
    )
  ) {
    errors.push({
      path:
        `${path}.qualification.qualificationPosition`,
      message:
        "Qualification position must be a positive whole number.",
    });
  }
}

export function validateTournamentEntryProfile(
  profile: TournamentEntryProfile,
): TournamentEntryValidationResult {
  const errors: TournamentEntryValidationError[] = [];

  if (!TOURNAMENT_ENTRY_KINDS.includes(profile.entryKind)) {
    errors.push({
      path: "entryKind",
      message: "Tournament entry kind is invalid.",
    });
  }

  if (
    !Number.isInteger(profile.maximumEntries)
    || profile.maximumEntries < 2
  ) {
    errors.push({
      path: "maximumEntries",
      message: "Maximum entries must be a whole number of at least two.",
    });
  }

  if (
    !Number.isInteger(profile.minimumEntries)
    || profile.minimumEntries < 2
  ) {
    errors.push({
      path: "minimumEntries",
      message: "Minimum entries must be a whole number of at least two.",
    });
  }

  if (profile.minimumEntries > profile.maximumEntries) {
    errors.push({
      path: "minimumEntries",
      message: "Minimum entries cannot exceed maximum entries.",
    });
  }

  if (profile.entries.length > profile.maximumEntries) {
    errors.push({
      path: "entries",
      message: "Tournament field exceeds its maximum entry limit.",
    });
  }

  if (
    profile.maximumEntriesPerCountry !== undefined
    && (
      !Number.isInteger(profile.maximumEntriesPerCountry)
      || profile.maximumEntriesPerCountry < 1
    )
  ) {
    errors.push({
      path: "maximumEntriesPerCountry",
      message:
        "Maximum entries per country must be a positive whole number.",
    });
  }

  if (
    profile.maximumSeed !== undefined
    && (
      !Number.isInteger(profile.maximumSeed)
      || profile.maximumSeed < 1
    )
  ) {
    errors.push({
      path: "maximumSeed",
      message: "Maximum seed must be a positive whole number.",
    });
  }

  profile.entries.forEach(
    (entry, index) => validateEntry(entry, index, errors),
  );

  const entryIds = profile.entries.map((entry) => entry.id);

  if (new Set(entryIds).size !== entryIds.length) {
    errors.push({
      path: "entries",
      message: "Tournament entry IDs must be unique.",
    });
  }

  for (
    const [index, entry]
    of profile.entries.entries()
  ) {
    if (entry.kind !== profile.entryKind) {
      errors.push({
        path: `entries.${index}.kind`,
        message:
          "Every tournament entry must match the tournament entry kind.",
      });
    }
  }

  if (profile.uniqueSeedsRequired) {
    const seeds = profile.entries
      .map((entry) => entry.seed)
      .filter((seed): seed is number => seed !== undefined);

    if (new Set(seeds).size !== seeds.length) {
      errors.push({
        path: "entries.seed",
        message: "Tournament seeds must be unique.",
      });
    }
  }

  if (profile.maximumSeed !== undefined) {
    for (
      const [index, entry]
      of profile.entries.entries()
    ) {
      if (
        entry.seed !== undefined
        && entry.seed > profile.maximumSeed
      ) {
        errors.push({
          path: `entries.${index}.seed`,
          message:
            `Seed cannot exceed ${profile.maximumSeed}.`,
        });
      }
    }
  }

  if (
    !profile.multipleEntriesPerCountryAllowed
  ) {
    const countryIds = profile.entries
      .filter((entry) =>
        entry.status !== "withdrawn"
        && entry.status !== "rejected"
        && entry.status !== "replaced",
      )
      .map((entry) => entry.countryId);

    if (new Set(countryIds).size !== countryIds.length) {
      errors.push({
        path: "entries.countryId",
        message:
          "Only one active entry per country is permitted.",
      });
    }
  }

  if (
    profile.maximumEntriesPerCountry !== undefined
  ) {
    const countryEntryCounts = new Map<string, number>();

    for (const entry of profile.entries) {
      if (
        entry.status === "withdrawn"
        || entry.status === "rejected"
        || entry.status === "replaced"
      ) {
        continue;
      }

      const count =
        countryEntryCounts.get(entry.countryId) ?? 0;

      countryEntryCounts.set(
        entry.countryId,
        count + 1,
      );
    }

    for (
      const [countryId, count]
      of countryEntryCounts.entries()
    ) {
      if (count > profile.maximumEntriesPerCountry) {
        errors.push({
          path: "entries.countryId",
          message:
            `${countryId} exceeds the maximum permitted entries.`,
        });
      }
    }
  }

  const knownEntryIds = new Set(entryIds);

  for (const reserveId of profile.reserveEntryIds) {
    if (!knownEntryIds.has(reserveId)) {
      errors.push({
        path: "reserveEntryIds",
        message:
          `${reserveId} is listed as a reserve but is not an entry.`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}