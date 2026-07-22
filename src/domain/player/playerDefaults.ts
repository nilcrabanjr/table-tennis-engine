import type { Player } from "./Player";
import { createDefaultPlayerAttributes } from "./attributeDefaults";

/**
 * Creates a complete editable player with neutral default values.
 */
export function createDefaultPlayer(
  id: string,
  countryId: string,
): Player {
  return {
    id,
    countryId,

    identity: {
      firstName: "New",
      lastName: "Player",

      category: "open",
      handedness: "right",

      tier: "standard",
    },

    biography: {
      birthYear: 1910,

      heightCm: 175,
      weightKg: 70,

      grip: "shakehand",
    },

    attributes: createDefaultPlayerAttributes(50),

    personality: {
      riskTaking: 50,
      creativity: 50,
      emotionalVolatility: 50,
      competitiveness: 50,
      sportsmanship: 50,
      leadership: 50,
      professionalism: 50,
      independence: 50,
      showmanship: 50,
    },

    playstyle: {
      primaryPlaystyleId: "balanced-all-rounder",
      primaryAffinity: 70,
      stylisticFlexibility: 50,
    },

    traits: [],

    equipment: {
      racquets: [
        {
          racquetId: "default-balanced-racquet",
          familiarity: 70,
          primary: true,
          matchesUsed: 0,
        },
      ],

      preferredProfile: {
        preferredWeightGrams: 145,

        preferredSpeed: 50,
        preferredControl: 65,
        preferredStiffness: 50,
        preferredFlexibility: 50,

        preferredHandleTypes: ["straight", "flared"],
        preferredRubberTypes: ["hard-rubber"],

        equipmentSensitivity: 50,
      },
    },

    career: {
      status: "active",

      rankingPoints: 0,

      reputation: 40,
      popularity: 30,

      matchesPlayed: 0,
      matchesWon: 0,
      matchesLost: 0,

      singlesTitles: 0,
      doublesTitles: 0,
      teamTitles: 0,
    },

    availability: {
      status: "available",

      matchFitness: 100,
      form: 50,

      selectable: true,
    },

    notes: [],

    builtIn: false,
  };
}