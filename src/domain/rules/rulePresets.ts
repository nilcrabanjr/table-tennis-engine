import type { Era } from "./Era";
import type { RuleSet } from "./RuleSet";

export const INTERWAR_HARD_BAT_ERA: Era = {
  id: "era-interwar-hard-bat",

  name: "Interwar Hard-Bat Era",

  description:
    "A historical-inspired environment representing organised "
    + "international table tennis between the world wars.",

  startYear: 1926,
  endYear: 1939,

  historicalStatus: "historical-inspired",

  equipmentTechnology: 32,
  coachingKnowledge: 38,
  athleticPreparation: 35,
  manufacturingQuality: 44,

  allowFutureTechnology: false,
  allowFictionalEquipment: true,

  builtIn: true,
};

export const FICTIONAL_1936_RULESET: RuleSet = {
  id: "rules-fictional-1936-international",

  name: "1936-Inspired International Rules",
  shortName: "1936 International",

  description:
    "A configurable hard-bat ruleset inspired by international "
    + "table tennis of the mid-1930s.",

  eraId: INTERWAR_HARD_BAT_ERA.id,
  year: 1936,

  historicalStatus: "historical-inspired",

  notes: [
    "This preset is intended for fictional simulation.",
    "It should not be treated as a verified reproduction of every rule "
      + "used by a specific 1936 competition.",
  ],

  match: {
    matchType: "singles",
    competitionCategory: "open",

    scoring: {
      pointsToWinGame: 21,
      minimumWinningMargin: 2,
      bestOfGames: 5,

      changeEndsInFinalGame: true,
      finalGameChangeEndsAt: 10,
    },

    service: {
      servesPerTurn: 5,
      deuceStartsAt: 20,
      deuceServesPerTurn: 1,

      openPalmRequired: false,
      upwardProjectionRequired: false,

      hiddenServeAllowed: true,

      netServeIsLet: true,
      illegalServeAwardsPoint: true,
    },

    expedite: {
      enabled: false,

      servesPerTurnDuringExpedite: 1,
      remainsActiveForMatch: true,
    },

    timeoutsAllowed: false,
    timeoutsPerCompetitor: 0,
    timeoutDurationSeconds: 0,

    coachingAllowed: false,
    coachingBetweenPointsAllowed: false,
    coachingBetweenGamesAllowed: false,

    intervalBetweenGamesSeconds: 120,

    equipmentBreaksAllowed: true,
    edgeBallsAreValid: true,

    doublesAlternatingStrokesRequired: true,
    doublesDiagonalServeRequired: true,
    doublesServiceOrderEnforced: true,
  },

  equipment: {
    allowedRubberTypes: [
      "bare-wood",
      "sandpaper",
      "hard-rubber",
      "short-pips",
      "custom",
    ],

    allowedHandleTypes: [
      "straight",
      "flared",
      "anatomic",
      "penhold-chinese",
      "penhold-japanese",
      "custom",
    ],

    minimumBladePlies: 1,
    maximumBladePlies: 9,

    minimumBladeWeightGrams: 40,
    maximumBladeWeightGrams: 150,

    minimumTotalRacquetWeightGrams: 80,
    maximumTotalRacquetWeightGrams: 260,

    maximumRubberThicknessMm: 2.5,

    differentSurfacesAllowed: true,
    singleSidedRacquetAllowed: true,

    contrastingSurfaceColoursRequired: false,

    enforceIntroductionYear: true,
    enforceDiscontinuedYear: false,

    customEquipmentAllowed: true,
  },

  builtIn: true,
};