import type { Playstyle } from "./Playstyle";

export function createDefaultPlaystyle(
  id: string,
): Playstyle {
  return {
    id,

    name: "Custom Playstyle",
    shortName: "Custom",

    description:
      "A balanced custom playing style.",

    preferredDistance: "mid",

    aggression: 50,
    rallyLengthPreference: 50,
    tempoPreference: 50,
    riskTolerance: 50,
    spinPreference: 50,
    placementFocus: 50,
    initiativeSeeking: 50,
    defensivePatience: 50,
    staminaDemand: 50,
    technicalDemand: 50,

    shotPreferences: [
      {
        shotType: "drive",
        preference: 60,
        riskTolerance: 50,
      },
      {
        shotType: "push",
        preference: 50,
        riskTolerance: 30,
      },
      {
        shotType: "block",
        preference: 50,
        riskTolerance: 30,
      },
    ],

    placementPreferences: [
      {
        targetZone: "deep-backhand",
        preference: 60,
      },
      {
        targetZone: "deep-forehand",
        preference: 50,
      },
      {
        targetZone: "elbow",
        preference: 55,
      },
    ],

    matchups: [],

    builtIn: false,
  };
}