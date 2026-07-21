import type { PlayerAttributes } from "./PlayerAttributes";

/**
 * Creates a complete average attribute collection.
 *
 * A function is used rather than a shared object so every player receives
 * independent nested objects.
 */
export function createDefaultPlayerAttributes(
  value = 50,
): PlayerAttributes {
  return {
    technical: {
      forehandAttack: value,
      backhandAttack: value,
      forehandControl: value,
      backhandControl: value,
      forehandConsistency: value,
      backhandConsistency: value,

      serveQuality: value,
      serveDeception: value,
      serveVariation: value,
      serveConsistency: value,

      returnQuality: value,
      serveReading: value,
      returnAdaptability: value,

      spinGeneration: value,
      spinReading: value,

      placement: value,
      touch: value,

      push: value,
      drive: value,
      flatHit: value,
      smash: value,
      chop: value,
      block: value,
      counterAttack: value,
      flick: value,
      lob: value,
      dropShot: value,
      emergencyControl: value,
    },

    physical: {
      reflexes: value,
      footwork: value,
      acceleration: value,
      movementSpeed: value,
      balance: value,
      reach: value,
      stamina: value,
      strength: value,
      flexibility: value,
      recovery: value,
      coordination: value,
      durability: value,
    },

    mental: {
      composure: value,
      concentration: value,
      anticipation: value,
      adaptability: value,
      aggression: value,
      patience: value,
      determination: value,
      discipline: value,
      bigPointAbility: value,
      tacticalIntelligence: value,
      patternRecognition: value,
      emotionalControl: value,
      selfBelief: value,
      resilience: value,
    },

    experience: {
      matchExperience: value,
      internationalExperience: value,
      tournamentExperience: value,
      styleExposure: value,
      tacticalExperience: value,
      pressureExperience: value,
      equipmentExperience: value,
    },
  };
}