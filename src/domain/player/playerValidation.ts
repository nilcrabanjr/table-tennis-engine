import {
  GRIP_TYPES,
  HANDEDNESSES,
  PLAYER_CATEGORIES,
  PLAYER_TIERS,
  isValidRating,
} from "../shared";

import type { Player } from "./Player";
import { validatePlayerAttributes } from "./attributeValidation";

export interface PlayerValidationError {
  path: string;
  message: string;
}

export interface PlayerValidationResult {
  valid: boolean;
  errors: PlayerValidationError[];
}

function validateNonNegativeWholeNumber(
  value: number,
  path: string,
  errors: PlayerValidationError[],
): void {
  if (!Number.isInteger(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative whole number.`,
    });
  }
}

export function validatePlayer(
  player: Player,
): PlayerValidationResult {
  const errors: PlayerValidationError[] = [];

  if (!player.id.trim()) {
    errors.push({
      path: "id",
      message: "Player ID is required.",
    });
  }

  if (!player.countryId.trim()) {
    errors.push({
      path: "countryId",
      message: "Player must belong to a country.",
    });
  }

  if (!player.identity.firstName.trim()) {
    errors.push({
      path: "identity.firstName",
      message: "First name is required.",
    });
  }

  if (!player.identity.lastName.trim()) {
    errors.push({
      path: "identity.lastName",
      message: "Last name is required.",
    });
  }

  if (!PLAYER_CATEGORIES.includes(player.identity.category)) {
    errors.push({
      path: "identity.category",
      message: "Player category is invalid.",
    });
  }

  if (!HANDEDNESSES.includes(player.identity.handedness)) {
    errors.push({
      path: "identity.handedness",
      message: "Player handedness is invalid.",
    });
  }

  if (!PLAYER_TIERS.includes(player.identity.tier)) {
    errors.push({
      path: "identity.tier",
      message: "Player tier is invalid.",
    });
  }

  if (
    !Number.isInteger(player.biography.birthYear)
    || player.biography.birthYear < 1800
  ) {
    errors.push({
      path: "biography.birthYear",
      message: "Birth year must be a valid year from 1800 onward.",
    });
  }

  if (
    player.biography.deathYear !== undefined
    && player.biography.deathYear < player.biography.birthYear
  ) {
    errors.push({
      path: "biography.deathYear",
      message: "Death year cannot precede birth year.",
    });
  }

  if (
    !Number.isFinite(player.biography.heightCm)
    || player.biography.heightCm <= 0
  ) {
    errors.push({
      path: "biography.heightCm",
      message: "Height must be greater than zero.",
    });
  }

  if (
    !Number.isFinite(player.biography.weightKg)
    || player.biography.weightKg <= 0
  ) {
    errors.push({
      path: "biography.weightKg",
      message: "Weight must be greater than zero.",
    });
  }

  if (!GRIP_TYPES.includes(player.biography.grip)) {
    errors.push({
      path: "biography.grip",
      message: "Grip type is invalid.",
    });
  }

  const attributeValidation =
    validatePlayerAttributes(player.attributes);

  errors.push(
    ...attributeValidation.errors.map((error) => ({
      path: `attributes.${error.path}`,
      message: error.message,
    })),
  );

  for (
    const [name, value]
    of Object.entries(player.personality)
  ) {
    if (!isValidRating(value)) {
      errors.push({
        path: `personality.${name}`,
        message:
          `personality.${name} must be a whole number between 0 and 100.`,
      });
    }
  }

  if (!player.playstyle.primaryPlaystyleId.trim()) {
    errors.push({
      path: "playstyle.primaryPlaystyleId",
      message: "A primary playstyle is required.",
    });
  }

  if (!isValidRating(player.playstyle.primaryAffinity)) {
    errors.push({
      path: "playstyle.primaryAffinity",
      message: "Primary affinity must be between 0 and 100.",
    });
  }

  if (!isValidRating(player.playstyle.stylisticFlexibility)) {
    errors.push({
      path: "playstyle.stylisticFlexibility",
      message: "Stylistic flexibility must be between 0 and 100.",
    });
  }

  const primaryRacquets =
    player.equipment.racquets.filter(
      (assignment) => assignment.primary,
    );

  if (primaryRacquets.length > 1) {
    errors.push({
      path: "equipment.racquets",
      message: "A player cannot have more than one primary racquet.",
    });
  }

  for (
    const [index, assignment]
    of player.equipment.racquets.entries()
  ) {
    if (!assignment.racquetId.trim()) {
      errors.push({
        path: `equipment.racquets.${index}.racquetId`,
        message: "Racquet ID is required.",
      });
    }

    if (!isValidRating(assignment.familiarity)) {
      errors.push({
        path: `equipment.racquets.${index}.familiarity`,
        message: "Racquet familiarity must be between 0 and 100.",
      });
    }

    validateNonNegativeWholeNumber(
      assignment.matchesUsed,
      `equipment.racquets.${index}.matchesUsed`,
      errors,
    );
  }

  const preferredProfile =
    player.equipment.preferredProfile;

  if (
    !Number.isFinite(preferredProfile.preferredWeightGrams)
    || preferredProfile.preferredWeightGrams <= 0
  ) {
    errors.push({
      path: "equipment.preferredProfile.preferredWeightGrams",
      message: "Preferred racquet weight must be greater than zero.",
    });
  }

  for (
    const field of [
      "preferredSpeed",
      "preferredControl",
      "preferredStiffness",
      "preferredFlexibility",
      "equipmentSensitivity",
    ] as const
  ) {
    if (!isValidRating(preferredProfile[field])) {
      errors.push({
        path: `equipment.preferredProfile.${field}`,
        message: `${field} must be between 0 and 100.`,
      });
    }
  }

  validateNonNegativeWholeNumber(
    player.career.rankingPoints,
    "career.rankingPoints",
    errors,
  );

  validateNonNegativeWholeNumber(
    player.career.matchesPlayed,
    "career.matchesPlayed",
    errors,
  );

  validateNonNegativeWholeNumber(
    player.career.matchesWon,
    "career.matchesWon",
    errors,
  );

  validateNonNegativeWholeNumber(
    player.career.matchesLost,
    "career.matchesLost",
    errors,
  );

  if (
    player.career.matchesWon + player.career.matchesLost
    > player.career.matchesPlayed
  ) {
    errors.push({
      path: "career.matchesPlayed",
      message:
        "Wins and losses cannot exceed the number of matches played.",
    });
  }

  if (!isValidRating(player.availability.matchFitness)) {
    errors.push({
      path: "availability.matchFitness",
      message: "Match fitness must be between 0 and 100.",
    });
  }

  if (!isValidRating(player.availability.form)) {
    errors.push({
      path: "availability.form",
      message: "Form must be between 0 and 100.",
    });
  }

  if (
    player.availability.status === "injured"
    && !player.availability.injury
  ) {
    errors.push({
      path: "availability.injury",
      message: "An injured player must have an injury record.",
    });
  }

  if (
    player.availability.selectable
    && [
      "suspended",
      "unavailable",
      "retired",
    ].includes(player.availability.status)
  ) {
    errors.push({
      path: "availability.selectable",
      message:
        "A suspended, unavailable, or retired player cannot be selectable.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}