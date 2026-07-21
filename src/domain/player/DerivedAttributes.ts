import type { Rating } from "../shared";
import { clampRating } from "../shared";
import type { PlayerAttributes } from "./PlayerAttributes";

/**
 * Calculated summaries.
 *
 * These values are never entered manually and should not be stored as the
 * authoritative source of player ability.
 */
export interface DerivedAttributes {
  forehandAttackPotential: Rating;
  backhandAttackPotential: Rating;

  forehandReliability: Rating;
  backhandReliability: Rating;

  servingThreat: Rating;
  returnStrength: Rating;

  defensiveAbility: Rating;
  counterAttackingAbility: Rating;

  movementQuality: Rating;
  endurance: Rating;

  tacticalAbility: Rating;
  pressureResistance: Rating;

  technicalOverall: Rating;
  physicalOverall: Rating;
  mentalOverall: Rating;
  experienceOverall: Rating;

  overall: Rating;
}

function weightedAverage(
  values: Array<readonly [value: number, weight: number]>,
): Rating {
  const totalWeight = values.reduce(
    (sum, [, weight]) => sum + weight,
    0,
  );

  if (totalWeight <= 0) {
    return 0;
  }

  const weightedTotal = values.reduce(
    (sum, [value, weight]) => sum + value * weight,
    0,
  );

  return clampRating(weightedTotal / totalWeight);
}

export function calculateDerivedAttributes(
  attributes: PlayerAttributes,
): DerivedAttributes {
  const { technical, physical, mental, experience } = attributes;

  const forehandAttackPotential = weightedAverage([
    [technical.forehandAttack, 0.38],
    [technical.forehandControl, 0.16],
    [technical.forehandConsistency, 0.14],
    [physical.footwork, 0.12],
    [physical.balance, 0.08],
    [physical.strength, 0.06],
    [mental.anticipation, 0.06],
  ]);

  const backhandAttackPotential = weightedAverage([
    [technical.backhandAttack, 0.38],
    [technical.backhandControl, 0.18],
    [technical.backhandConsistency, 0.16],
    [physical.reflexes, 0.10],
    [physical.balance, 0.08],
    [physical.coordination, 0.05],
    [mental.anticipation, 0.05],
  ]);

  const forehandReliability = weightedAverage([
    [technical.forehandControl, 0.40],
    [technical.forehandConsistency, 0.40],
    [physical.balance, 0.10],
    [mental.concentration, 0.10],
  ]);

  const backhandReliability = weightedAverage([
    [technical.backhandControl, 0.40],
    [technical.backhandConsistency, 0.40],
    [physical.balance, 0.10],
    [mental.concentration, 0.10],
  ]);

  const servingThreat = weightedAverage([
    [technical.serveQuality, 0.32],
    [technical.serveDeception, 0.24],
    [technical.serveVariation, 0.16],
    [technical.spinGeneration, 0.12],
    [technical.placement, 0.10],
    [technical.serveConsistency, 0.06],
  ]);

  const returnStrength = weightedAverage([
    [technical.returnQuality, 0.30],
    [technical.serveReading, 0.22],
    [technical.spinReading, 0.16],
    [technical.touch, 0.10],
    [mental.anticipation, 0.10],
    [mental.adaptability, 0.07],
    [experience.styleExposure, 0.05],
  ]);

  const defensiveAbility = weightedAverage([
    [technical.chop, 0.22],
    [technical.block, 0.20],
    [technical.lob, 0.10],
    [technical.emergencyControl, 0.13],
    [technical.spinReading, 0.10],
    [physical.footwork, 0.10],
    [physical.reach, 0.07],
    [mental.patience, 0.08],
  ]);

  const counterAttackingAbility = weightedAverage([
    [technical.counterAttack, 0.34],
    [technical.block, 0.16],
    [technical.spinReading, 0.12],
    [physical.reflexes, 0.14],
    [physical.balance, 0.08],
    [mental.anticipation, 0.10],
    [mental.composure, 0.06],
  ]);

  const movementQuality = weightedAverage([
    [physical.footwork, 0.32],
    [physical.acceleration, 0.18],
    [physical.movementSpeed, 0.15],
    [physical.balance, 0.15],
    [physical.coordination, 0.10],
    [physical.recovery, 0.10],
  ]);

  const endurance = weightedAverage([
    [physical.stamina, 0.50],
    [physical.recovery, 0.22],
    [physical.durability, 0.12],
    [mental.determination, 0.10],
    [experience.matchExperience, 0.06],
  ]);

  const tacticalAbility = weightedAverage([
    [mental.tacticalIntelligence, 0.34],
    [mental.patternRecognition, 0.20],
    [mental.adaptability, 0.16],
    [mental.anticipation, 0.12],
    [experience.tacticalExperience, 0.10],
    [experience.styleExposure, 0.08],
  ]);

  const pressureResistance = weightedAverage([
    [mental.composure, 0.24],
    [mental.bigPointAbility, 0.22],
    [mental.emotionalControl, 0.16],
    [mental.resilience, 0.14],
    [mental.concentration, 0.10],
    [experience.pressureExperience, 0.08],
    [experience.tournamentExperience, 0.06],
  ]);

  const technicalOverall = weightedAverage(
    Object.values(technical).map((value) => [value, 1] as const),
  );

  const physicalOverall = weightedAverage(
    Object.values(physical).map((value) => [value, 1] as const),
  );

  const mentalOverall = weightedAverage(
    Object.values(mental).map((value) => [value, 1] as const),
  );

  const experienceOverall = weightedAverage(
    Object.values(experience).map((value) => [value, 1] as const),
  );

  const overall = weightedAverage([
    [technicalOverall, 0.46],
    [physicalOverall, 0.20],
    [mentalOverall, 0.24],
    [experienceOverall, 0.10],
  ]);

  return {
    forehandAttackPotential,
    backhandAttackPotential,
    forehandReliability,
    backhandReliability,
    servingThreat,
    returnStrength,
    defensiveAbility,
    counterAttackingAbility,
    movementQuality,
    endurance,
    tacticalAbility,
    pressureResistance,
    technicalOverall,
    physicalOverall,
    mentalOverall,
    experienceOverall,
    overall,
  };
}