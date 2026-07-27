import type { Playstyle } from "./Playstyle";

export const BALANCED_ALL_ROUNDER: Playstyle = {
  id: "balanced-all-rounder",

  name: "Balanced All-Rounder",
  shortName: "All-Rounder",

  description:
    "A flexible style that combines control, attack, defence, "
    + "and tactical adaptability.",

  preferredDistance: "mid",

  aggression: 55,
  rallyLengthPreference: 55,
  tempoPreference: 55,
  riskTolerance: 45,
  spinPreference: 55,
  placementFocus: 65,
  initiativeSeeking: 55,
  defensivePatience: 60,
  staminaDemand: 55,
  technicalDemand: 65,

  shotPreferences: [
    {
      shotType: "drive",
      preference: 75,
      riskTolerance: 50,
    },
    {
      shotType: "push",
      preference: 60,
      riskTolerance: 35,
    },
    {
      shotType: "block",
      preference: 65,
      riskTolerance: 35,
    },
    {
      shotType: "counter",
      preference: 60,
      riskTolerance: 55,
    },
    {
      shotType: "smash",
      preference: 55,
      riskTolerance: 65,
    },
  ],

  placementPreferences: [
    {
      targetZone: "deep-backhand",
      preference: 70,
    },
    {
      targetZone: "elbow",
      preference: 68,
    },
    {
      targetZone: "deep-forehand",
      preference: 60,
    },
    {
      targetZone: "short-forehand",
      preference: 45,
    },
  ],

  matchups: [],

  builtIn: true,
};

export const CLASSIC_DEFENDER: Playstyle = {
  id: "classic-defender",

  name: "Classic Defender",
  shortName: "Defender",

  description:
    "A patient defensive style built around chopping, placement, "
    + "consistency, and forcing opponents into errors.",

  preferredDistance: "far",

  aggression: 25,
  rallyLengthPreference: 92,
  tempoPreference: 30,
  riskTolerance: 25,
  spinPreference: 78,
  placementFocus: 82,
  initiativeSeeking: 30,
  defensivePatience: 95,
  staminaDemand: 78,
  technicalDemand: 82,

  shotPreferences: [
    {
      shotType: "chop",
      preference: 92,
      riskTolerance: 45,
    },
    {
      shotType: "push",
      preference: 78,
      riskTolerance: 25,
    },
    {
      shotType: "lob",
      preference: 65,
      riskTolerance: 40,
    },
    {
      shotType: "block",
      preference: 55,
      riskTolerance: 30,
    },
    {
      shotType: "counter",
      preference: 35,
      riskTolerance: 55,
    },
  ],

  placementPreferences: [
    {
      targetZone: "deep-backhand",
      preference: 82,
    },
    {
      targetZone: "deep-forehand",
      preference: 72,
    },
    {
      targetZone: "elbow",
      preference: 75,
    },
    {
      targetZone: "short-backhand",
      preference: 50,
    },
  ],

  matchups: [
    {
      opponentPlaystyleId: "forehand-attacker",
      comfort: 58,
      notes:
        "Long rallies and changing spin can frustrate aggressive attackers.",
    },
  ],

  builtIn: true,
};

export const FOREHAND_ATTACKER: Playstyle = {
  id: "forehand-attacker",

  name: "Forehand Attacker",
  shortName: "FH Attacker",

  description:
    "An aggressive style focused on taking the initiative and creating "
    + "forehand attacking opportunities.",

  preferredDistance: "close",

  aggression: 88,
  rallyLengthPreference: 28,
  tempoPreference: 85,
  riskTolerance: 78,
  spinPreference: 58,
  placementFocus: 62,
  initiativeSeeking: 94,
  defensivePatience: 25,
  staminaDemand: 76,
  technicalDemand: 80,

  shotPreferences: [
    {
      shotType: "drive",
      preference: 92,
      riskTolerance: 75,
    },
    {
      shotType: "flat-hit",
      preference: 78,
      riskTolerance: 82,
    },
    {
      shotType: "smash",
      preference: 90,
      riskTolerance: 85,
    },
    {
      shotType: "counter",
      preference: 72,
      riskTolerance: 72,
    },
    {
      shotType: "push",
      preference: 32,
      riskTolerance: 20,
    },
  ],

  placementPreferences: [
    {
      targetZone: "wide-backhand",
      preference: 82,
    },
    {
      targetZone: "wide-forehand",
      preference: 75,
    },
    {
      targetZone: "elbow",
      preference: 78,
    },
    {
      targetZone: "deep-backhand",
      preference: 72,
    },
  ],

  matchups: [
    {
      opponentPlaystyleId: "classic-defender",
      comfort: 42,
      notes:
        "May become impatient against deep defensive returns.",
    },
  ],

  builtIn: true,
};

export const CLOSE_TABLE_BLOCKER: Playstyle = {
  id: "close-table-blocker",

  name: "Close-Table Blocker",
  shortName: "Blocker",

  description:
    "A compact close-table style using reflexes, blocks, redirects, "
    + "and early timing.",

  preferredDistance: "very-close",

  aggression: 58,
  rallyLengthPreference: 48,
  tempoPreference: 90,
  riskTolerance: 45,
  spinPreference: 38,
  placementFocus: 80,
  initiativeSeeking: 65,
  defensivePatience: 58,
  staminaDemand: 55,
  technicalDemand: 76,

  shotPreferences: [
    {
      shotType: "block",
      preference: 94,
      riskTolerance: 48,
    },
    {
      shotType: "counter",
      preference: 82,
      riskTolerance: 62,
    },
    {
      shotType: "drive",
      preference: 70,
      riskTolerance: 55,
    },
    {
      shotType: "flat-hit",
      preference: 62,
      riskTolerance: 65,
    },
    {
      shotType: "push",
      preference: 52,
      riskTolerance: 28,
    },
  ],

  placementPreferences: [
    {
      targetZone: "elbow",
      preference: 90,
    },
    {
      targetZone: "wide-backhand",
      preference: 78,
    },
    {
      targetZone: "deep-forehand",
      preference: 65,
    },
  ],

  matchups: [],

  builtIn: true,
};

export const BUILT_IN_PLAYSTYLES: Playstyle[] = [
  BALANCED_ALL_ROUNDER,
  CLASSIC_DEFENDER,
  FOREHAND_ATTACKER,
  CLOSE_TABLE_BLOCKER,
];