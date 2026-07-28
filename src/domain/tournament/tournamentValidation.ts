import {
  isValidRating,
} from "../shared";

import {
  TOURNAMENT_CATEGORIES,
  TOURNAMENT_STATUSES,
  TOURNAMENT_SURFACES,
} from "./TournamentTypes";

import type { Tournament } from "./Tournament";

import {
  validateTournamentEntryProfile,
} from "./tournamentEntryValidation";

import {
  validateTournamentFormat,
} from "./tournamentFormatValidation";

import {
  getActiveTournamentEntries,
} from "./TournamentEntryProfile";

import {
  getExpectedGroupFieldSize,
} from "./TournamentFormat";

import {
  validateTournamentSchedule,
} from "./tournamentScheduleValidation";

import {
  validateTournamentStandings,
} from "./tournamentStandingsValidation";

import {
  validateTournamentHistory,
} from "./tournamentHistoryValidation";

export interface TournamentValidationError {
  path: string;
  message: string;
}

export interface TournamentValidationResult {
  valid: boolean;
  errors: TournamentValidationError[];
}

export function validateTournament(
  tournament: Tournament,
): TournamentValidationResult {

  const errors: TournamentValidationError[] = [];

  if (!tournament.identity.id.trim()) {
    errors.push({
      path: "identity.id",
      message: "Tournament ID is required.",
    });
  }

  if (!tournament.identity.name.trim()) {
    errors.push({
      path: "identity.name",
      message: "Tournament name is required.",
    });
  }

  if (
    !TOURNAMENT_CATEGORIES.includes(
      tournament.properties.category,
    )
  ) {
    errors.push({
      path: "properties.category",
      message: "Tournament category is invalid.",
    });
  }

  if (
    !TOURNAMENT_STATUSES.includes(
      tournament.properties.status,
    )
  ) {
    errors.push({
      path: "properties.status",
      message: "Tournament status is invalid.",
    });
  }

  if (
    !TOURNAMENT_SURFACES.includes(
      tournament.properties.surface,
    )
  ) {
    errors.push({
      path: "properties.surface",
      message: "Tournament surface is invalid.",
    });
  }

  const ratingFields = [
    "prestige",
    "rankingImportance",
    "spectatorInterest",
    "prizePrestige",
  ] as const;

  for (const field of ratingFields) {
    if (!isValidRating(tournament.properties[field])) {
      errors.push({
        path: `properties.${field}`,
        message: `${field} must be between 0 and 100.`,
      });
    }
  }

  const entryValidation =
    validateTournamentEntryProfile(tournament.entries);

  errors.push(...entryValidation.errors);

  const formatValidation =
    validateTournamentFormat(tournament.format);

  errors.push(...formatValidation.errors);

  const activeEntryCount =
  getActiveTournamentEntries(
    tournament.entries,
  ).length;

  switch (tournament.format.type) {
    case "single-elimination":
    case "double-elimination": {
      if (
        activeEntryCount > tournament.format.drawSize
      ) {
        errors.push({
          path: "format.drawSize",
          message:
            "Active entries exceed the configured draw size.",
        });
      }

      if (
        activeEntryCount < tournament.format.drawSize
        && !tournament.format.byesAllowed
      ) {
        errors.push({
          path: "format.byesAllowed",
          message:
            "Byes must be enabled when the field does not fill the draw.",
        });
      }

      break;
    }

    case "group-knockout": {
      const expectedFieldSize =
        getExpectedGroupFieldSize(
          tournament.format,
        );

      if (
        activeEntryCount > 0
        && activeEntryCount !== expectedFieldSize
      ) {
        errors.push({
          path: "entries",
          message:
            `Group format requires exactly ${expectedFieldSize} `
            + "active entries.",
        });
      }

      break;
    }

    case "swiss": {
      if (
        activeEntryCount % 2 !== 0
        && !tournament.format.byesAllowed
      ) {
        errors.push({
          path: "format.byesAllowed",
          message:
            "Swiss byes must be allowed when the field contains "
            + "an odd number of competitors.",
        });
      }

      break;
    }

    case "round-robin":
    case "league":
      break;
  }

  const scheduleValidation =
    validateTournamentSchedule(
      tournament.schedule,
      tournament.entries,
    );

  errors.push(...scheduleValidation.errors);

  const standingsValidation =
    validateTournamentStandings(
      tournament.standings,
      tournament.entries,
    );

  errors.push(...standingsValidation.errors);

  const historyValidation =
    validateTournamentHistory(
      tournament.history,
    );

  errors.push(...historyValidation.errors);

  return {
    valid: errors.length === 0,
    errors,
  };
}