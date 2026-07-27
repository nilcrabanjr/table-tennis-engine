import type { Country } from "./Country";

import {
  createDefaultCountryIdentity,
  createDefaultDemographicsProfile,
  createDefaultGeographyProfile,
} from "./countryDefaults";

import {
  createDefaultCoaching,
  createDefaultCulture,
  createDefaultDevelopment,
  createDefaultFederation,
} from "./countryDevelopmentDefaults";

import {
  createDefaultCountryPlayerPool,
  createDefaultCountryRecords,
  createDefaultDomesticCompetition,
  createDefaultNationalTeamProfile,
} from "./countryCompetitionDefaults";

/**
 * Creates a complete editable fictional country.
 */
export function createDefaultCountry(
  id: string,
): Country {
  const identity = createDefaultCountryIdentity(id);

  const federation = createDefaultFederation();

  federation.id = `${id}-federation`;
  federation.name = `${identity.shortName} Table Tennis Federation`;
  federation.abbreviation =
    `${identity.threeLetterCode}TTF`;

  return {
    id,

    identity,
    geography: createDefaultGeographyProfile(),
    demographics: createDefaultDemographicsProfile(),

    federation,
    coaching: createDefaultCoaching(),
    development: createDefaultDevelopment(),
    culture: createDefaultCulture(),

    domesticCompetition:
      createDefaultDomesticCompetition(id),

    nationalTeams:
      createDefaultNationalTeamProfile(id),

    playerPool:
      createDefaultCountryPlayerPool(),

    records:
      createDefaultCountryRecords(),

    defaultRuleSetId:
      "rules-fictional-1936-international",

    nationalPlaystyleId:
      "balanced-all-rounder",

    notes: [],

    builtIn: false,
  };
}