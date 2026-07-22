import {
  isValidRating,
} from "../shared";

import type { Blade } from "./Blade";
import type { Racquet } from "./Racquet";
import type { Rubber } from "./Rubber";

export interface EquipmentValidationError {
  path: string;
  message: string;
}

export interface EquipmentValidationResult {
  valid: boolean;
  errors: EquipmentValidationError[];
}

function validateYearRange(
  introducedYear: number,
  discontinuedYear: number | undefined,
  path: string,
  errors: EquipmentValidationError[],
): void {
  if (!Number.isInteger(introducedYear) || introducedYear < 1800) {
    errors.push({
      path: `${path}.introducedYear`,
      message: "Introduced year must be a valid year from 1800 onward.",
    });
  }

  if (
    discontinuedYear !== undefined
    && (
      !Number.isInteger(discontinuedYear)
      || discontinuedYear < introducedYear
    )
  ) {
    errors.push({
      path: `${path}.discontinuedYear`,
      message:
        "Discontinued year must not be earlier than the introduced year.",
    });
  }
}

function validateRatings(
  record: Record<string, unknown>,
  fields: string[],
  path: string,
  errors: EquipmentValidationError[],
): void {
  for (const field of fields) {
    if (!isValidRating(record[field])) {
      errors.push({
        path: `${path}.${field}`,
        message: `${field} must be a whole number between 0 and 100.`,
      });
    }
  }
}

export function validateBlade(
  blade: Blade,
): EquipmentValidationResult {
  const errors: EquipmentValidationError[] = [];

  if (!blade.id.trim()) {
    errors.push({
      path: "blade.id",
      message: "Blade ID is required.",
    });
  }

  if (!blade.name.trim()) {
    errors.push({
      path: "blade.name",
      message: "Blade name is required.",
    });
  }

  validateYearRange(
    blade.introducedYear,
    blade.discontinuedYear,
    "blade",
    errors,
  );

  if (!Number.isInteger(blade.plies) || blade.plies < 1) {
    errors.push({
      path: "blade.plies",
      message: "Blade plies must be a positive whole number.",
    });
  }

  if (
    !Number.isFinite(blade.weightGrams)
    || blade.weightGrams <= 0
  ) {
    errors.push({
      path: "blade.weightGrams",
      message: "Blade weight must be greater than zero.",
    });
  }

  validateRatings(
    blade as unknown as Record<string, unknown>,
    [
      "speed",
      "control",
      "stiffness",
      "flexibility",
      "vibration",
      "sweetSpot",
      "powerTransfer",
      "touchSupport",
    ],
    "blade",
    errors,
  );

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateRubber(
  rubber: Rubber,
): EquipmentValidationResult {
  const errors: EquipmentValidationError[] = [];

  if (!rubber.id.trim()) {
    errors.push({
      path: "rubber.id",
      message: "Surface ID is required.",
    });
  }

  if (!rubber.name.trim()) {
    errors.push({
      path: "rubber.name",
      message: "Surface name is required.",
    });
  }

  validateYearRange(
    rubber.introducedYear,
    rubber.discontinuedYear,
    "rubber",
    errors,
  );

  if (
    !Number.isFinite(rubber.thicknessMm)
    || rubber.thicknessMm < 0
  ) {
    errors.push({
      path: "rubber.thicknessMm",
      message: "Surface thickness cannot be negative.",
    });
  }

  if (
    !Number.isFinite(rubber.weightGrams)
    || rubber.weightGrams < 0
  ) {
    errors.push({
      path: "rubber.weightGrams",
      message: "Surface weight cannot be negative.",
    });
  }

  validateRatings(
    rubber as unknown as Record<string, unknown>,
    [
      "speed",
      "spin",
      "control",
      "hardness",
      "grip",
      "spinSensitivity",
      "spinReversal",
      "disruption",
      "flatHitSupport",
      "chopSupport",
      "blockSupport",
    ],
    "rubber",
    errors,
  );

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateRacquet(
  racquet: Racquet,
): EquipmentValidationResult {
  const errors: EquipmentValidationError[] = [];

  if (!racquet.id.trim()) {
    errors.push({
      path: "racquet.id",
      message: "Racquet ID is required.",
    });
  }

  if (!racquet.name.trim()) {
    errors.push({
      path: "racquet.name",
      message: "Racquet name is required.",
    });
  }

  if (!racquet.composition.bladeId.trim()) {
    errors.push({
      path: "racquet.composition.bladeId",
      message: "A blade must be selected.",
    });
  }

  if (!racquet.composition.forehandRubberId.trim()) {
    errors.push({
      path: "racquet.composition.forehandRubberId",
      message: "A forehand surface must be selected.",
    });
  }

  if (!racquet.composition.backhandRubberId.trim()) {
    errors.push({
      path: "racquet.composition.backhandRubberId",
      message: "A backhand surface must be selected.",
    });
  }

  if (!isValidRating(racquet.condition)) {
    errors.push({
      path: "racquet.condition",
      message: "Condition must be a whole number between 0 and 100.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Checks whether a piece of equipment was available in a selected year.
 */
export function isEquipmentAvailableInYear(
  introducedYear: number,
  discontinuedYear: number | undefined,
  year: number,
): boolean {
  return (
    year >= introducedYear
    && (
      discontinuedYear === undefined
      || year <= discontinuedYear
    )
  );
}