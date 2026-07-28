import type {
  TournamentEntryProfile,
} from "./TournamentEntryProfile";

import type {
  TournamentFormatConfiguration,
} from "./TournamentFormat";

import type {
  TournamentIdentity,
} from "./TournamentIdentity";

import type {
  TournamentSchedule,
} from "./TournamentSchedule";

import type {
  TournamentProperties,
} from "./TournamentTypes";

import type {
  TournamentStandings,
} from "./TournamentStandings";

import type {
  TournamentSeriesHistory,
} from "./TournamentHistory";

export interface Tournament {
  identity: TournamentIdentity;

  properties: TournamentProperties;

  entries: TournamentEntryProfile;

  format: TournamentFormatConfiguration;

  schedule: TournamentSchedule;

  standings: TournamentStandings;

  history: TournamentSeriesHistory;

  builtIn: boolean;
}