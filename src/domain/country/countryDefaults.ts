import type { CountryIdentity } from "./CountryIdentity";
import type { DemographicsProfile } from "./DemographicsProfile";
import type { GeographyProfile } from "./GeographyProfile";

export function createDefaultCountryIdentity(
  id: string,
): CountryIdentity {
  return {
    id,

    officialName: "Republic of Newland",
    shortName: "Newland",
    adjective: "Newlandic",

    threeLetterCode: "NEW",
    twoLetterCode: "NW",

    capital: "New City",

    primaryColour: "#334155",
    secondaryColour: "#e2e8f0",
    accentColour: "#f59e0b",

    foundedYear: 1900,

    builtIn: false,
  };
}

export function createDefaultGeographyProfile(): GeographyProfile {
  return {
    continent: "fictional",
    region: "Unassigned",

    areaSquareKm: 100_000,

    climate: "temperate",

    urbanisation: 50,
    transportQuality: 50,
    regionalAccessibility: 50,

    timeZoneCount: 1,

    neighbouringCountryIds: [],
  };
}

export function createDefaultDemographicsProfile(): DemographicsProfile {
  return {
    population: 10_000_000,

    populationGrowth: 1,

    urbanPopulationPercentage: 50,
    youthPopulationPercentage: 30,

    literacyRate: 75,
    averageLifeExpectancy: 65,

    sportsParticipation: 50,

    registeredTableTennisPlayers: 10_000,
    estimatedRecreationalPlayers: 100_000,
  };
}