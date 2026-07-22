import type {
  EntityId,
  HandleType,
  RubberType,
} from "../shared";

/**
 * Defines what equipment may legally be used under a ruleset.
 */
export interface EquipmentRules {
  /**
   * Allowed broad surface categories.
   */
  allowedRubberTypes: RubberType[];

  /**
   * Allowed handle categories.
   */
  allowedHandleTypes: HandleType[];

  /**
   * Optional explicit whitelist of legal blade IDs.
   *
   * An empty or undefined list means blade legality is determined by the
   * broader attribute and era restrictions.
   */
  allowedBladeIds?: EntityId[];

  /**
   * Optional explicit whitelist of legal surface IDs.
   */
  allowedRubberIds?: EntityId[];

  minimumBladePlies: number;
  maximumBladePlies: number;

  minimumBladeWeightGrams?: number;
  maximumBladeWeightGrams?: number;

  minimumTotalRacquetWeightGrams?: number;
  maximumTotalRacquetWeightGrams?: number;

  maximumRubberThicknessMm?: number;

  /**
   * Whether different surfaces may be used on each side.
   */
  differentSurfacesAllowed: boolean;

  /**
   * Whether a racquet may use a playable surface on only one side.
   */
  singleSidedRacquetAllowed: boolean;

  /**
   * Whether the two playing surfaces must be visually distinguishable.
   */
  contrastingSurfaceColoursRequired: boolean;

  /**
   * Whether equipment must have existed by the match year.
   */
  enforceIntroductionYear: boolean;

  /**
   * Whether equipment discontinued before the match year is prohibited.
   */
  enforceDiscontinuedYear: boolean;

  /**
   * Whether fictional custom equipment may be used.
   */
  customEquipmentAllowed: boolean;
}

import type {
  Blade,
  Racquet,
  Rubber,
} from "../equipment";

import {
  calculateEquipmentEffects,
  isEquipmentAvailableInYear,
} from "../equipment";

export interface EquipmentLegalityIssue {
  path: string;
  message: string;
}

export interface EquipmentLegalityResult {
  legal: boolean;
  issues: EquipmentLegalityIssue[];
}

/**
 * Checks whether a complete equipment setup is legal under a ruleset.
 */
export function checkEquipmentLegality(
  blade: Blade,
  forehandRubber: Rubber,
  backhandRubber: Rubber,
  racquet: Racquet,
  rules: EquipmentRules,
  matchYear: number,
): EquipmentLegalityResult {
  const issues: EquipmentLegalityIssue[] = [];

  if (!rules.allowedHandleTypes.includes(blade.handleType)) {
    issues.push({
      path: "blade.handleType",
      message: `${blade.handleType} handles are not permitted.`,
    });
  }

  if (
    blade.plies < rules.minimumBladePlies
    || blade.plies > rules.maximumBladePlies
  ) {
    issues.push({
      path: "blade.plies",
      message:
        `Blade must have between ${rules.minimumBladePlies} and `
        + `${rules.maximumBladePlies} plies.`,
    });
  }

  if (
    rules.minimumBladeWeightGrams !== undefined
    && blade.weightGrams < rules.minimumBladeWeightGrams
  ) {
    issues.push({
      path: "blade.weightGrams",
      message: "Blade is lighter than the permitted minimum.",
    });
  }

  if (
    rules.maximumBladeWeightGrams !== undefined
    && blade.weightGrams > rules.maximumBladeWeightGrams
  ) {
    issues.push({
      path: "blade.weightGrams",
      message: "Blade exceeds the permitted maximum weight.",
    });
  }

  for (const [side, rubber] of [
    ["forehand", forehandRubber],
    ["backhand", backhandRubber],
  ] as const) {
    if (!rules.allowedRubberTypes.includes(rubber.type)) {
      issues.push({
        path: `${side}Rubber.type`,
        message: `${rubber.type} is not permitted.`,
      });
    }

    if (
      rules.maximumRubberThicknessMm !== undefined
      && rubber.thicknessMm > rules.maximumRubberThicknessMm
    ) {
      issues.push({
        path: `${side}Rubber.thicknessMm`,
        message: `${side} surface exceeds the thickness limit.`,
      });
    }

    if (
      !rules.customEquipmentAllowed
      && !rubber.builtIn
    ) {
      issues.push({
        path: `${side}Rubber.builtIn`,
        message: "Custom surfaces are not permitted.",
      });
    }

    if (
      rules.enforceIntroductionYear
      && !isEquipmentAvailableInYear(
        rubber.introducedYear,
        rules.enforceDiscontinuedYear
          ? rubber.discontinuedYear
          : undefined,
        matchYear,
      )
    ) {
      issues.push({
        path: `${side}Rubber.introducedYear`,
        message:
          `${rubber.name} was not available in ${matchYear}.`,
      });
    }
  }

  if (
    !rules.customEquipmentAllowed
    && !blade.builtIn
  ) {
    issues.push({
      path: "blade.builtIn",
      message: "Custom blades are not permitted.",
    });
  }

  if (
    rules.enforceIntroductionYear
    && !isEquipmentAvailableInYear(
      blade.introducedYear,
      rules.enforceDiscontinuedYear
        ? blade.discontinuedYear
        : undefined,
      matchYear,
    )
  ) {
    issues.push({
      path: "blade.introducedYear",
      message: `${blade.name} was not available in ${matchYear}.`,
    });
  }

  if (
    !rules.differentSurfacesAllowed
    && forehandRubber.id !== backhandRubber.id
  ) {
    issues.push({
      path: "racquet.composition",
      message: "Different forehand and backhand surfaces are prohibited.",
    });
  }

  const effects = calculateEquipmentEffects(
    racquet,
    blade,
    forehandRubber,
    backhandRubber,
  );

  if (
    rules.minimumTotalRacquetWeightGrams !== undefined
    && effects.totalWeightGrams
      < rules.minimumTotalRacquetWeightGrams
  ) {
    issues.push({
      path: "racquet.totalWeight",
      message: "Racquet is below the permitted minimum weight.",
    });
  }

  if (
    rules.maximumTotalRacquetWeightGrams !== undefined
    && effects.totalWeightGrams
      > rules.maximumTotalRacquetWeightGrams
  ) {
    issues.push({
      path: "racquet.totalWeight",
      message: "Racquet exceeds the permitted maximum weight.",
    });
  }

  return {
    legal: issues.length === 0,
    issues,
  };
}