import type {
  DoubleEliminationFormat,
  GroupKnockoutFormat,
  LeagueFormat,
  RoundRobinFormat,
  SingleEliminationFormat,
  SwissFormat,
  TournamentFormatConfiguration,
} from "./TournamentFormat";

export const DEFAULT_SINGLE_ELIMINATION_FORMAT:
SingleEliminationFormat = {
  type: "single-elimination",

  seedingEnabled: true,
  countrySeparationEnabled: true,

  drawSize: 32,

  byesAllowed: true,
  thirdPlaceMatch: true,

  seededEntryCount: 8,
};

export const DEFAULT_DOUBLE_ELIMINATION_FORMAT:
DoubleEliminationFormat = {
  type: "double-elimination",

  seedingEnabled: true,
  countrySeparationEnabled: true,

  drawSize: 16,

  byesAllowed: true,
  seededEntryCount: 4,

  grandFinalResetEnabled: true,
};

export const DEFAULT_ROUND_ROBIN_FORMAT:
RoundRobinFormat = {
  type: "round-robin",

  seedingEnabled: false,
  countrySeparationEnabled: false,

  meetingsPerOpponent: 1,
  drawsAllowed: false,
};

export const DEFAULT_LEAGUE_FORMAT:
LeagueFormat = {
  type: "league",

  seedingEnabled: false,
  countrySeparationEnabled: false,

  meetingsPerOpponent: 2,

  pointsForWin: 2,
  pointsForLoss: 0,
  pointsForForfeitLoss: 0,

  promotionPlaces: 0,
  relegationPlaces: 0,
};

export const DEFAULT_GROUP_KNOCKOUT_FORMAT:
GroupKnockoutFormat = {
  type: "group-knockout",

  seedingEnabled: true,
  countrySeparationEnabled: true,

  groupCount: 8,
  entriesPerGroup: 4,

  meetingsPerGroupOpponent: 1,

  advancingEntriesPerGroup: 2,
  additionalAdvancingEntries: 0,

  knockoutDrawSize: 16,

  knockoutByesAllowed: false,
  thirdPlaceMatch: true,

  separateSameGroupInFirstKnockoutRound: true,
};

export const DEFAULT_SWISS_FORMAT:
SwissFormat = {
  type: "swiss",

  seedingEnabled: true,
  countrySeparationEnabled: false,

  roundCount: 5,

  scoreGroupPairingEnabled: true,
  repeatPairingsAllowed: false,

  byesAllowed: true,
};

export function createDefaultTournamentFormat():
TournamentFormatConfiguration {
  return {
    ...DEFAULT_SINGLE_ELIMINATION_FORMAT,
  };
}