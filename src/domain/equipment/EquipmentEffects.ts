import type { Rating } from "../shared";
import { clampRating } from "../shared";

import type { Blade } from "./Blade";
import type { Racquet } from "./Racquet";
import type { Rubber } from "./Rubber";

/**
 * Calculated performance properties of a complete racquet.
 *
 * These values are derived from the blade, both surfaces, condition,
 * and familiarity. They should not be manually edited.
 */
export interface EquipmentEffects {
  totalWeightGrams: number;

  speed: Rating;
  control: Rating;
  spinGeneration: Rating;
  spinResistance: Rating;

  flatHitSupport: Rating;
  chopSupport: Rating;
  blockSupport: Rating;
  touchSupport: Rating;

  forgiveness: Rating;
  physicalDemand: Rating;
}

function average(
  ...values: number[]
): number {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0)
    / values.length;
}

function weightedAverage(
  values: Array<readonly [number, number]>,
): Rating {
  const totalWeight = values.reduce(
    (sum, [, weight]) => sum + weight,
    0,
  );

  if (totalWeight <= 0) {
    return 0;
  }

  const total = values.reduce(
    (sum, [value, weight]) => sum + value * weight,
    0,
  );

  return clampRating(total / totalWeight);
}

/**
 * Calculates complete racquet behaviour.
 */
export function calculateEquipmentEffects(
  racquet: Racquet,
  blade: Blade,
  forehandRubber: Rubber,
  backhandRubber: Rubber,
): EquipmentEffects {
  const averageRubberSpeed = average(
    forehandRubber.speed,
    backhandRubber.speed,
  );

  const averageRubberControl = average(
    forehandRubber.control,
    backhandRubber.control,
  );

  const averageRubberSpin = average(
    forehandRubber.spin,
    backhandRubber.spin,
  );

  const averageSpinSensitivity = average(
    forehandRubber.spinSensitivity,
    backhandRubber.spinSensitivity,
  );

  const conditionMultiplier = 0.75 + racquet.condition / 400;
  const familiarityMultiplier = 0.80 + racquet.familiarity / 500;

  const speed = clampRating(
    weightedAverage([
      [blade.speed, 0.48],
      [averageRubberSpeed, 0.38],
      [blade.powerTransfer, 0.14],
    ])
    * conditionMultiplier,
  );

  const control = clampRating(
    weightedAverage([
      [blade.control, 0.42],
      [averageRubberControl, 0.36],
      [blade.sweetSpot, 0.12],
      [blade.touchSupport, 0.10],
    ])
    * conditionMultiplier
    * familiarityMultiplier,
  );

  const spinGeneration = clampRating(
    weightedAverage([
      [averageRubberSpin, 0.62],
      [average(
        forehandRubber.grip,
        backhandRubber.grip,
      ), 0.24],
      [blade.flexibility, 0.14],
    ])
    * conditionMultiplier
    * familiarityMultiplier,
  );

  const spinResistance = clampRating(
    weightedAverage([
      [100 - averageSpinSensitivity, 0.66],
      [averageRubberControl, 0.20],
      [blade.control, 0.14],
    ])
    * familiarityMultiplier,
  );

  const flatHitSupport = weightedAverage([
    [blade.powerTransfer, 0.34],
    [blade.stiffness, 0.18],
    [forehandRubber.flatHitSupport, 0.24],
    [backhandRubber.flatHitSupport, 0.24],
  ]);

  const chopSupport = weightedAverage([
    [blade.control, 0.22],
    [blade.flexibility, 0.14],
    [forehandRubber.chopSupport, 0.32],
    [backhandRubber.chopSupport, 0.32],
  ]);

  const blockSupport = weightedAverage([
    [blade.control, 0.24],
    [blade.sweetSpot, 0.18],
    [forehandRubber.blockSupport, 0.29],
    [backhandRubber.blockSupport, 0.29],
  ]);

  const touchSupport = weightedAverage([
    [blade.touchSupport, 0.40],
    [blade.control, 0.24],
    [averageRubberControl, 0.24],
    [100 - averageRubberSpeed, 0.12],
  ]);

  const forgiveness = weightedAverage([
    [blade.sweetSpot, 0.36],
    [blade.control, 0.24],
    [averageRubberControl, 0.24],
    [racquet.familiarity, 0.16],
  ]);

  const totalWeightGrams =
    blade.weightGrams
    + forehandRubber.weightGrams
    + backhandRubber.weightGrams;

  /**
   * Higher weight, stiffness, and speed require more physical effort.
   */
  const physicalDemand = weightedAverage([
    [clampRating((totalWeightGrams - 100) * 1.25), 0.44],
    [blade.stiffness, 0.18],
    [speed, 0.20],
    [100 - forgiveness, 0.18],
  ]);

  return {
    totalWeightGrams,
    speed,
    control,
    spinGeneration,
    spinResistance,
    flatHitSupport,
    chopSupport,
    blockSupport,
    touchSupport,
    forgiveness,
    physicalDemand,
  };
}