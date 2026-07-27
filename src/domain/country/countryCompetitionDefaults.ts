import type {
  DomesticCompetitionProfile,
  DomesticLeague,
  NationalChampionship,
} from "./DomesticCompetitionProfile";

import type {
  NationalSquad,
  NationalTeamProfile,
} from "./NationalTeamProfile";

import type { CountryPlayerPool } from "./CountryPlayerPool";
import type { CountryRecords } from "./CountryRecords";

export function createDefaultDomesticLeague(
  countryId: string,
): DomesticLeague {
  return {
    id: `${countryId}-national-league`,

    name: "National Table Tennis League",
    shortName: "NTTL",

    foundedYear: 1930,

    clubCount: 10,
    divisionCount: 1,

    professionalism: 50,
    competitiveStrength: 50,
    competitiveBalance: 50,
    financialHealth: 50,
    attendance: 50,
    mediaInterest: 50,
    internationalPrestige: 50,
    matchIntensity: 50,

    active: true,
  };
}

export function createDefaultNationalChampionship(
  countryId: string,
): NationalChampionship {
  return {
    id: `${countryId}-national-championship`,

    name: "National Table Tennis Championships",
    foundedYear: 1930,

    singlesAvailable: true,
    doublesAvailable: true,
    teamEventAvailable: true,

    prestige: 50,
    organisationQuality: 50,
    participationLevel: 50,

    active: true,
  };
}

export function createDefaultDomesticCompetition(
  countryId: string,
): DomesticCompetitionProfile {
  return {
    primaryLeague: createDefaultDomesticLeague(countryId),

    secondaryLeagueIds: [],
    domesticClubIds: [],

    nationalChampionship:
      createDefaultNationalChampionship(countryId),

    regionalCompetitionQuality: 50,
    amateurCompetitionQuality: 50,
    juniorCompetitionQuality: 50,

    annualDomesticMatchVolume: 1_000,
  };
}

export function createDefaultNationalSquad(
  countryId: string,
): NationalSquad {
  return {
    id: `${countryId}-open-national-squad`,

    name: "National Team",
    type: "open",

    playerIds: [],

    squadLimit: 8,

    cohesion: 50,
    tacticalPreparation: 50,
    morale: 50,
    depth: 50,

    active: true,
  };
}

export function createDefaultNationalTeamProfile(
  countryId: string,
): NationalTeamProfile {
  return {
    squads: [
      createDefaultNationalSquad(countryId),
    ],

    selectionQuality: 50,
    trainingCampQuality: 50,
    doublesPreparation: 50,
    internationalScheduling: 50,
    travelSupport: 50,
    medicalSupport: 50,
  };
}

export function createDefaultCountryPlayerPool():
CountryPlayerPool {
  return {
    registeredPlayerIds: [],
    internationallyEligiblePlayerIds: [],
    prospectPlayerIds: [],
    retiredPlayerIds: [],

    playerPoolDepth: 50,
    elitePlayerDepth: 50,
    youthProspectQuality: 50,

    unmodelledCompetitivePlayers: 0,
  };
}

export function createDefaultCountryRecords():
CountryRecords {
  return {
    internationalTeamMatchesPlayed: 0,
    internationalTeamMatchesWon: 0,
    internationalTeamMatchesLost: 0,

    individualWorldTitles: 0,
    doublesWorldTitles: 0,
    teamWorldTitles: 0,

    continentalTitles: 0,
    majorTournamentTitles: 0,

    medals: {
      gold: 0,
      silver: 0,
      bronze: 0,
    },

    titleHistory: [],

    longestTeamWinningStreak: 0,
  };
}