import {
  SHOT_TYPES,
  TABLE_DISTANCES,
  TARGET_ZONES,
  isValidRating,
} from "../shared";

import type { Playstyle } from "./Playstyle";

export interface PlaystyleValidationError {
  path: string;
  message: string;
}

export interface PlaystyleValidationResult {
  valid: boolean;
  errors: PlaystyleValidationError[];
}

function validateRating(
  value: unknown,
  path: string,
  errors: PlaystyleValidationError[],
): void {
  if (!isValidRating(value)) {
    errors.push({
      path,
      message: `${path} must be a whole number between 0 and 100.`,
    });
  }
}

export function validatePlaystyle(
  playstyle: Playstyle,
): PlaystyleValidationResult {
  const errors: PlaystyleValidationError[] = [];

  if (!playstyle.id.trim()) {
    errors.push({
      path: "id",
      message: "Playstyle ID is required.",
    });
  }

  if (!playstyle.name.trim()) {
    errors.push({
      path: "name",
      message: "Playstyle name is required.",
    });
  }

  if (!playstyle.shortName.trim()) {
    errors.push({
      path: "shortName",
      message: "Playstyle short name is required.",
    });
  }

  if (!playstyle.description.trim()) {
    errors.push({
      path: "description",
      message: "Playstyle description is required.",
    });
  }

  if (!TABLE_DISTANCES.includes(playstyle.preferredDistance)) {
    errors.push({
      path: "preferredDistance",
      message: "Preferred table distance is invalid.",
    });
  }

  const ratingFields = [
    "aggression",
    "rallyLengthPreference",
    "tempoPreference",
    "riskTolerance",
    "spinPreference",
    "placementFocus",
    "initiativeSeeking",
    "defensivePatience",
    "staminaDemand",
    "technicalDemand",
  ] as const;

  for (const field of ratingFields) {
    validateRating(
      playstyle[field],
      field,
      errors,
    );
  }

  const shotTypes = new Set<string>();

  playstyle.shotPreferences.forEach(
    (preference, index) => {
      const path = `shotPreferences.${index}`;

      if (!SHOT_TYPES.includes(preference.shotType)) {
        errors.push({
          path: `${path}.shotType`,
          message: "Shot type is invalid.",
        });
      }

      if (shotTypes.has(preference.shotType)) {
        errors.push({
          path: `${path}.shotType`,
          message: "Shot preferences cannot contain duplicates.",
        });
      }

      shotTypes.add(preference.shotType);

      validateRating(
        preference.preference,
        `${path}.preference`,
        errors,
      );

      validateRating(
        preference.riskTolerance,
        `${path}.riskTolerance`,
        errors,
      );
    },
  );

  const targetZones = new Set<string>();

  playstyle.placementPreferences.forEach(
    (preference, index) => {
      const path = `placementPreferences.${index}`;

      if (!TARGET_ZONES.includes(preference.targetZone)) {
        errors.push({
          path: `${path}.targetZone`,
          message: "Target zone is invalid.",
        });
      }

      if (targetZones.has(preference.targetZone)) {
        errors.push({
          path: `${path}.targetZone`,
          message:
            "Placement preferences cannot contain duplicates.",
        });
      }

      targetZones.add(preference.targetZone);

      validateRating(
        preference.preference,
        `${path}.preference`,
        errors,
      );
    },
  );

  playstyle.matchups.forEach(
    (matchup, index) => {
      if (!matchup.opponentPlaystyleId.trim()) {
        errors.push({
          path: `matchups.${index}.opponentPlaystyleId`,
          message: "Opponent playstyle ID is required.",
        });
      }

      validateRating(
        matchup.comfort,
        `matchups.${index}.comfort`,
        errors,
      );
    },
  );

  return {
    valid: errors.length === 0,
    errors,
  };
}