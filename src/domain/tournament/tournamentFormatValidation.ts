import {
  TOURNAMENT_FORMATS,
} from "../shared";

import type {
  DoubleEliminationFormat,
  GroupKnockoutFormat,
  LeagueFormat,
  RoundRobinFormat,
  SingleEliminationFormat,
  SwissFormat,
  TournamentFormatConfiguration,
} from "./TournamentFormat";

import {
  getExpectedGroupFieldSize,
  getGroupStageAdvancingCount,
  isPowerOfTwo,
} from "./TournamentFormat";

export interface TournamentFormatValidationError {
  path: string;
  message: string;
}

export interface TournamentFormatValidationResult {
  valid: boolean;
  errors: TournamentFormatValidationError[];
}

function requirePositiveWholeNumber(
  value: number,
  path: string,
  errors: TournamentFormatValidationError[],
): void {
  if (!Number.isInteger(value) || value < 1) {
    errors.push({
      path,
      message: `${path} must be a positive whole number.`,
    });
  }
}

function requireNonNegativeWholeNumber(
  value: number,
  path: string,
  errors: TournamentFormatValidationError[],
): void {
  if (!Number.isInteger(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative whole number.`,
    });
  }
}

function validateSingleElimination(
  format: SingleEliminationFormat,
  errors: TournamentFormatValidationError[],
): void {
  requirePositiveWholeNumber(
    format.drawSize,
    "format.drawSize",
    errors,
  );

  if (!isPowerOfTwo(format.drawSize)) {
    errors.push({
      path: "format.drawSize",
      message:
        "A single-elimination draw size must be a power of two.",
    });
  }

  requireNonNegativeWholeNumber(
    format.seededEntryCount,
    "format.seededEntryCount",
    errors,
  );

  if (format.seededEntryCount > format.drawSize) {
    errors.push({
      path: "format.seededEntryCount",
      message: "Seeded entries cannot exceed the draw size.",
    });
  }
}

function validateDoubleElimination(
  format: DoubleEliminationFormat,
  errors: TournamentFormatValidationError[],
): void {
  requirePositiveWholeNumber(
    format.drawSize,
    "format.drawSize",
    errors,
  );

  if (!isPowerOfTwo(format.drawSize)) {
    errors.push({
      path: "format.drawSize",
      message:
        "A double-elimination draw size must be a power of two.",
    });
  }

  requireNonNegativeWholeNumber(
    format.seededEntryCount,
    "format.seededEntryCount",
    errors,
  );

  if (format.seededEntryCount > format.drawSize) {
    errors.push({
      path: "format.seededEntryCount",
      message: "Seeded entries cannot exceed the draw size.",
    });
  }
}

function validateRoundRobin(
  format: RoundRobinFormat,
  errors: TournamentFormatValidationError[],
): void {
  requirePositiveWholeNumber(
    format.meetingsPerOpponent,
    "format.meetingsPerOpponent",
    errors,
  );

  if (format.advancingEntryCount !== undefined) {
    requirePositiveWholeNumber(
      format.advancingEntryCount,
      "format.advancingEntryCount",
      errors,
    );
  }
}

function validateLeague(
  format: LeagueFormat,
  errors: TournamentFormatValidationError[],
): void {
  requirePositiveWholeNumber(
    format.meetingsPerOpponent,
    "format.meetingsPerOpponent",
    errors,
  );

  requireNonNegativeWholeNumber(
    format.pointsForWin,
    "format.pointsForWin",
    errors,
  );

  requireNonNegativeWholeNumber(
    format.pointsForLoss,
    "format.pointsForLoss",
    errors,
  );

  requireNonNegativeWholeNumber(
    format.pointsForForfeitLoss,
    "format.pointsForForfeitLoss",
    errors,
  );

  requireNonNegativeWholeNumber(
    format.promotionPlaces,
    "format.promotionPlaces",
    errors,
  );

  requireNonNegativeWholeNumber(
    format.relegationPlaces,
    "format.relegationPlaces",
    errors,
  );

  if (format.pointsForWin <= format.pointsForLoss) {
    errors.push({
      path: "format.pointsForWin",
      message:
        "Points awarded for a win must exceed points awarded for a loss.",
    });
  }
}

function validateGroupKnockout(
  format: GroupKnockoutFormat,
  errors: TournamentFormatValidationError[],
): void {
  requirePositiveWholeNumber(
    format.groupCount,
    "format.groupCount",
    errors,
  );

  requirePositiveWholeNumber(
    format.entriesPerGroup,
    "format.entriesPerGroup",
    errors,
  );

  requirePositiveWholeNumber(
    format.meetingsPerGroupOpponent,
    "format.meetingsPerGroupOpponent",
    errors,
  );

  requirePositiveWholeNumber(
    format.advancingEntriesPerGroup,
    "format.advancingEntriesPerGroup",
    errors,
  );

  requireNonNegativeWholeNumber(
    format.additionalAdvancingEntries,
    "format.additionalAdvancingEntries",
    errors,
  );

  requirePositiveWholeNumber(
    format.knockoutDrawSize,
    "format.knockoutDrawSize",
    errors,
  );

  if (
    format.advancingEntriesPerGroup
    >= format.entriesPerGroup
  ) {
    errors.push({
      path: "format.advancingEntriesPerGroup",
      message:
        "Each group must eliminate at least one competitor.",
    });
  }

  if (!isPowerOfTwo(format.knockoutDrawSize)) {
    errors.push({
      path: "format.knockoutDrawSize",
      message:
        "The knockout draw size must be a power of two.",
    });
  }

  const advancingCount =
    getGroupStageAdvancingCount(format);

  if (
    advancingCount > format.knockoutDrawSize
  ) {
    errors.push({
      path: "format.knockoutDrawSize",
      message:
        "More competitors advance than the knockout draw can contain.",
    });
  }

  if (
    advancingCount < format.knockoutDrawSize
    && !format.knockoutByesAllowed
  ) {
    errors.push({
      path: "format.knockoutByesAllowed",
      message:
        "Knockout byes must be allowed when advancing competitors "
        + "do not fill the knockout draw.",
    });
  }

  const expectedFieldSize =
    getExpectedGroupFieldSize(format);

  if (expectedFieldSize < 4) {
    errors.push({
      path: "format.groupCount",
      message:
        "The group stage must contain at least four competitors.",
    });
  }
}

function validateSwiss(
  format: SwissFormat,
  errors: TournamentFormatValidationError[],
): void {
  requirePositiveWholeNumber(
    format.roundCount,
    "format.roundCount",
    errors,
  );

  if (format.advancingEntryCount !== undefined) {
    requirePositiveWholeNumber(
      format.advancingEntryCount,
      "format.advancingEntryCount",
      errors,
    );
  }
}

export function validateTournamentFormat(
  format: TournamentFormatConfiguration,
): TournamentFormatValidationResult {
  const errors: TournamentFormatValidationError[] = [];

  if (!TOURNAMENT_FORMATS.includes(format.type)) {
    errors.push({
      path: "format.type",
      message: "Tournament format type is invalid.",
    });

    return {
      valid: false,
      errors,
    };
  }

  switch (format.type) {
    case "single-elimination":
      validateSingleElimination(format, errors);
      break;

    case "double-elimination":
      validateDoubleElimination(format, errors);
      break;

    case "round-robin":
      validateRoundRobin(format, errors);
      break;

    case "league":
      validateLeague(format, errors);
      break;

    case "group-knockout":
      validateGroupKnockout(format, errors);
      break;

    case "swiss":
      validateSwiss(format, errors);
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}