import {
  isValidRating,
} from "../shared";

import {
  CLIMATE_TYPES,
  CONTINENT_TYPES,
  type GeographyProfile,
} from "./GeographyProfile";

import type { CountryIdentity } from "./CountryIdentity";
import type { DemographicsProfile } from "./DemographicsProfile";

export interface CountryValidationError {
  path: string;
  message: string;
}

export interface CountryValidationResult {
  valid: boolean;
  errors: CountryValidationError[];
}

function isValidHexColour(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function validateCountryIdentity(
  identity: CountryIdentity,
): CountryValidationResult {
  const errors: CountryValidationError[] = [];

  if (!identity.id.trim()) {
    errors.push({
      path: "identity.id",
      message: "Country ID is required.",
    });
  }

  if (!identity.officialName.trim()) {
    errors.push({
      path: "identity.officialName",
      message: "Official country name is required.",
    });
  }

  if (!identity.shortName.trim()) {
    errors.push({
      path: "identity.shortName",
      message: "Short country name is required.",
    });
  }

  if (!identity.adjective.trim()) {
    errors.push({
      path: "identity.adjective",
      message: "Country adjective is required.",
    });
  }

  if (!/^[A-Z]{3}$/.test(identity.threeLetterCode)) {
    errors.push({
      path: "identity.threeLetterCode",
      message: "Three-letter code must contain exactly three capital letters.",
    });
  }

  if (
    identity.twoLetterCode !== undefined
    && !/^[A-Z]{2}$/.test(identity.twoLetterCode)
  ) {
    errors.push({
      path: "identity.twoLetterCode",
      message: "Two-letter code must contain exactly two capital letters.",
    });
  }

  if (!identity.capital.trim()) {
    errors.push({
      path: "identity.capital",
      message: "Capital city is required.",
    });
  }

  for (
    const field of [
      "primaryColour",
      "secondaryColour",
      "accentColour",
    ] as const
  ) {
    const value = identity[field];

    if (value !== undefined && !isValidHexColour(value)) {
      errors.push({
        path: `identity.${field}`,
        message: `${field} must be a six-digit hexadecimal colour.`,
      });
    }
  }

  if (
    identity.foundedYear !== undefined
    && (
      !Number.isInteger(identity.foundedYear)
      || identity.foundedYear < 1
    )
  ) {
    errors.push({
      path: "identity.foundedYear",
      message: "Founded year must be a positive whole number.",
    });
  }

  if (
    identity.dissolvedYear !== undefined
    && identity.foundedYear !== undefined
    && identity.dissolvedYear < identity.foundedYear
  ) {
    errors.push({
      path: "identity.dissolvedYear",
      message: "Dissolved year cannot precede founded year.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateGeographyProfile(
  geography: GeographyProfile,
): CountryValidationResult {
  const errors: CountryValidationError[] = [];

  if (!CONTINENT_TYPES.includes(geography.continent)) {
    errors.push({
      path: "geography.continent",
      message: "Continent is invalid.",
    });
  }

  if (!CLIMATE_TYPES.includes(geography.climate)) {
    errors.push({
      path: "geography.climate",
      message: "Climate is invalid.",
    });
  }

  if (
    !Number.isFinite(geography.areaSquareKm)
    || geography.areaSquareKm <= 0
  ) {
    errors.push({
      path: "geography.areaSquareKm",
      message: "Area must be greater than zero.",
    });
  }

  for (
    const field of [
      "urbanisation",
      "transportQuality",
      "regionalAccessibility",
    ] as const
  ) {
    if (!isValidRating(geography[field])) {
      errors.push({
        path: `geography.${field}`,
        message: `${field} must be between 0 and 100.`,
      });
    }
  }

  if (
    !Number.isInteger(geography.timeZoneCount)
    || geography.timeZoneCount < 1
  ) {
    errors.push({
      path: "geography.timeZoneCount",
      message: "Time-zone count must be a positive whole number.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateDemographicsProfile(
  demographics: DemographicsProfile,
): CountryValidationResult {
  const errors: CountryValidationError[] = [];

  if (
    !Number.isInteger(demographics.population)
    || demographics.population < 0
  ) {
    errors.push({
      path: "demographics.population",
      message: "Population must be a non-negative whole number.",
    });
  }

  if (!Number.isFinite(demographics.populationGrowth)) {
    errors.push({
      path: "demographics.populationGrowth",
      message: "Population growth must be a valid number.",
    });
  }

  for (
    const field of [
      "urbanPopulationPercentage",
      "youthPopulationPercentage",
      "literacyRate",
      "sportsParticipation",
    ] as const
  ) {
    if (!isValidRating(demographics[field])) {
      errors.push({
        path: `demographics.${field}`,
        message: `${field} must be between 0 and 100.`,
      });
    }
  }

  if (
    !Number.isFinite(demographics.averageLifeExpectancy)
    || demographics.averageLifeExpectancy <= 0
  ) {
    errors.push({
      path: "demographics.averageLifeExpectancy",
      message: "Life expectancy must be greater than zero.",
    });
  }

  for (
    const field of [
      "registeredTableTennisPlayers",
      "estimatedRecreationalPlayers",
    ] as const
  ) {
    if (
      !Number.isInteger(demographics[field])
      || demographics[field] < 0
    ) {
      errors.push({
        path: `demographics.${field}`,
        message: `${field} must be a non-negative whole number.`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}