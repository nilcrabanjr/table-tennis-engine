import type { Country } from "./Country";

import {
  validateCountryIdentity,
  validateDemographicsProfile,
  validateGeographyProfile,
  type CountryValidationError,
} from "./countryValidation";

import {
  validateCoaching,
  validateCulture,
  validateDevelopment,
  validateFederation,
} from "./countryDevelopmentValidation";

import {
  validateCountryPlayerPool,
  validateCountryRecords,
  validateDomesticCompetition,
  validateNationalTeams,
} from "./countryCompetitionValidation";

export interface CompleteCountryValidationResult {
  valid: boolean;
  errors: CountryValidationError[];
}

function stringErrorsToStructuredErrors(
  errors: string[],
): CountryValidationError[] {
  return errors.map((path) => ({
    path,
    message: `${path} must contain a whole-number rating between 0 and 100.`,
  }));
}

/**
 * Validates the complete country and its nested profiles.
 */
export function validateCountry(
  country: Country,
): CompleteCountryValidationResult {
  const errors: CountryValidationError[] = [];

  if (!country.id.trim()) {
    errors.push({
      path: "id",
      message: "Country ID is required.",
    });
  }

  if (country.identity.id !== country.id) {
    errors.push({
      path: "identity.id",
      message:
        "Country identity ID must match the top-level country ID.",
    });
  }

  errors.push(
    ...validateCountryIdentity(country.identity).errors,
    ...validateGeographyProfile(country.geography).errors,
    ...validateDemographicsProfile(country.demographics).errors,
  );

  errors.push(
    ...stringErrorsToStructuredErrors(
      validateFederation(country.federation),
    ),
    ...stringErrorsToStructuredErrors(
      validateCoaching(country.coaching),
    ),
    ...stringErrorsToStructuredErrors(
      validateDevelopment(country.development),
    ),
    ...stringErrorsToStructuredErrors(
      validateCulture(country.culture),
    ),
  );

  errors.push(
    ...validateDomesticCompetition(
      country.domesticCompetition,
    ).errors,

    ...validateNationalTeams(
      country.nationalTeams,
    ).errors,

    ...validateCountryPlayerPool(
      country.playerPool,
    ).errors,

    ...validateCountryRecords(
      country.records,
    ).errors,
  );

  const registeredIds =
    new Set(country.playerPool.registeredPlayerIds);

  for (
    const squad of country.nationalTeams.squads
  ) {
    for (const playerId of squad.playerIds) {
      if (!registeredIds.has(playerId)) {
        errors.push({
          path: `nationalTeams.squads.${squad.id}.playerIds`,
          message:
            `${playerId} is selected for a national squad but is not `
            + "registered in the country's player pool.",
        });
      }
    }

    if (
      squad.captainPlayerId !== undefined
      && !squad.playerIds.includes(squad.captainPlayerId)
    ) {
      errors.push({
        path: `nationalTeams.squads.${squad.id}.captainPlayerId`,
        message:
          "The squad captain must be included in the squad player list.",
      });
    }
  }

  if (
    country.records.mostCappedPlayerId !== undefined
    && !registeredIds.has(
      country.records.mostCappedPlayerId,
    )
    && !country.playerPool.retiredPlayerIds.includes(
      country.records.mostCappedPlayerId,
    )
  ) {
    errors.push({
      path: "records.mostCappedPlayerId",
      message:
        "The most-capped player must be registered or listed as retired.",
    });
  }

  if (
    country.records.mostSuccessfulPlayerId !== undefined
    && !registeredIds.has(
      country.records.mostSuccessfulPlayerId,
    )
    && !country.playerPool.retiredPlayerIds.includes(
      country.records.mostSuccessfulPlayerId,
    )
  ) {
    errors.push({
      path: "records.mostSuccessfulPlayerId",
      message:
        "The most-successful player must be registered or listed as retired.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}