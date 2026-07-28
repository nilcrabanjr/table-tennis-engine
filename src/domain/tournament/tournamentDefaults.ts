import type { Tournament } from "./Tournament";

import {
  createDefaultTournamentEntryProfile,
} from "./tournamentEntryDefaults";

import {
  createDefaultTournamentFormat,
} from "./tournamentFormatDefaults";

import {
  createDefaultTournamentSchedule,
} from "./tournamentScheduleDefaults";

import {
  createDefaultTournamentStandings,
} from "./tournamentStandingsDefaults";

import {
  createDefaultTournamentHistory,
} from "./tournamentHistoryDefaults";

export function createDefaultTournament(
  id: string,
): Tournament {
  return {
    identity: {
      id,

      name: "New Tournament",
      shortName: "Tournament",

      hostCountryId: "",
      hostCity: "",
      venue: "",

      year: 1936,

      startDate: "1936-01-01",
      endDate: "1936-01-03",

      description: "",
    },

    properties: {
      category: "world",
      status: "planned",
      surface: "wood",

      prestige: 75,
      rankingImportance: 75,
      spectatorInterest: 70,
      prizePrestige: 65,
    },

    entries: createDefaultTournamentEntryProfile(),

    format: createDefaultTournamentFormat(),

    schedule: createDefaultTournamentSchedule(),

    standings: createDefaultTournamentStandings(),

    history: createDefaultTournamentHistory(
      id,
      "New Tournament Series",
    ),

    builtIn: false,
  };
}