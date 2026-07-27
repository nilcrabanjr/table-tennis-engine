import { isValidRating } from "../shared";

import type {
  DomesticCompetitionProfile,
  DomesticLeague,
  NationalChampionship,
} from "./DomesticCompetitionProfile";

import {
  NATIONAL_SQUAD_TYPES,
  type NationalSquad,
  type NationalTeamProfile,
} from "./NationalTeamProfile";

import type { CountryPlayerPool } from "./CountryPlayerPool";
import type { CountryRecords } from "./CountryRecords";

export interface CountryCompetitionValidationError {
  path: string;
  message: string;
}

export interface CountryCompetitionValidationResult {
  valid: boolean;
  errors: CountryCompetitionValidationError[];
}

function requireNonNegativeWholeNumber(
  value: number,
  path: string,
  errors: CountryCompetitionValidationError[],
): void {
  if (!Number.isInteger(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative whole number.`,
    });
  }
}

function validateRating(
  value: unknown,
  path: string,
  errors: CountryCompetitionValidationError[],
): void {
  if (!isValidRating(value)) {
    errors.push({
      path,
      message: `${path} must be a whole number between 0 and 100.`,
    });
  }
}

function validateLeague(
  league: DomesticLeague,
  errors: CountryCompetitionValidationError[],
): void {
  if (!league.id.trim()) {
    errors.push({
      path: "domestic.primaryLeague.id",
      message: "League ID is required.",
    });
  }

  if (!league.name.trim()) {
    errors.push({
      path: "domestic.primaryLeague.name",
      message: "League name is required.",
    });
  }

  requireNonNegativeWholeNumber(
    league.clubCount,
    "domestic.primaryLeague.clubCount",
    errors,
  );

  if (
    !Number.isInteger(league.divisionCount)
    || league.divisionCount < 1
  ) {
    errors.push({
      path: "domestic.primaryLeague.divisionCount",
      message: "A league must have at least one division.",
    });
  }

  const ratingFields = [
    "professionalism",
    "competitiveStrength",
    "competitiveBalance",
    "financialHealth",
    "attendance",
    "mediaInterest",
    "internationalPrestige",
    "matchIntensity",
  ] as const;

  for (const field of ratingFields) {
    validateRating(
      league[field],
      `domestic.primaryLeague.${field}`,
      errors,
    );
  }
}

function validateChampionship(
  championship: NationalChampionship,
  errors: CountryCompetitionValidationError[],
): void {
  if (!championship.id.trim()) {
    errors.push({
      path: "domestic.nationalChampionship.id",
      message: "Championship ID is required.",
    });
  }

  if (!championship.name.trim()) {
    errors.push({
      path: "domestic.nationalChampionship.name",
      message: "Championship name is required.",
    });
  }

  for (
    const field of [
      "prestige",
      "organisationQuality",
      "participationLevel",
    ] as const
  ) {
    validateRating(
      championship[field],
      `domestic.nationalChampionship.${field}`,
      errors,
    );
  }
}

export function validateDomesticCompetition(
  domestic: DomesticCompetitionProfile,
): CountryCompetitionValidationResult {
  const errors: CountryCompetitionValidationError[] = [];

  if (domestic.primaryLeague) {
    validateLeague(domestic.primaryLeague, errors);
  }

  validateChampionship(
    domestic.nationalChampionship,
    errors,
  );

  for (
    const field of [
      "regionalCompetitionQuality",
      "amateurCompetitionQuality",
      "juniorCompetitionQuality",
    ] as const
  ) {
    validateRating(
      domestic[field],
      `domestic.${field}`,
      errors,
    );
  }

  requireNonNegativeWholeNumber(
    domestic.annualDomesticMatchVolume,
    "domestic.annualDomesticMatchVolume",
    errors,
  );

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateSquad(
  squad: NationalSquad,
  index: number,
  errors: CountryCompetitionValidationError[],
): void {
  const path = `nationalTeams.squads.${index}`;

  if (!squad.id.trim()) {
    errors.push({
      path: `${path}.id`,
      message: "Squad ID is required.",
    });
  }

  if (!squad.name.trim()) {
    errors.push({
      path: `${path}.name`,
      message: "Squad name is required.",
    });
  }

  if (!NATIONAL_SQUAD_TYPES.includes(squad.type)) {
    errors.push({
      path: `${path}.type`,
      message: "National squad type is invalid.",
    });
  }

  if (
    !Number.isInteger(squad.squadLimit)
    || squad.squadLimit < 1
  ) {
    errors.push({
      path: `${path}.squadLimit`,
      message: "Squad limit must be a positive whole number.",
    });
  }

  if (squad.playerIds.length > squad.squadLimit) {
    errors.push({
      path: `${path}.playerIds`,
      message: "Squad contains more players than its limit permits.",
    });
  }

  for (
    const field of [
      "cohesion",
      "tacticalPreparation",
      "morale",
      "depth",
    ] as const
  ) {
    validateRating(
      squad[field],
      `${path}.${field}`,
      errors,
    );
  }
}

export function validateNationalTeams(
  nationalTeams: NationalTeamProfile,
): CountryCompetitionValidationResult {
  const errors: CountryCompetitionValidationError[] = [];

  nationalTeams.squads.forEach(
    (squad, index) => validateSquad(squad, index, errors),
  );

  const squadIds = nationalTeams.squads.map(
    (squad) => squad.id,
  );

  if (new Set(squadIds).size !== squadIds.length) {
    errors.push({
      path: "nationalTeams.squads",
      message: "National squad IDs must be unique.",
    });
  }

  for (
    const field of [
      "selectionQuality",
      "trainingCampQuality",
      "doublesPreparation",
      "internationalScheduling",
      "travelSupport",
      "medicalSupport",
    ] as const
  ) {
    validateRating(
      nationalTeams[field],
      `nationalTeams.${field}`,
      errors,
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateCountryPlayerPool(
  playerPool: CountryPlayerPool,
): CountryCompetitionValidationResult {
  const errors: CountryCompetitionValidationError[] = [];

  for (
    const field of [
      "playerPoolDepth",
      "elitePlayerDepth",
      "youthProspectQuality",
    ] as const
  ) {
    validateRating(
      playerPool[field],
      `playerPool.${field}`,
      errors,
    );
  }

  requireNonNegativeWholeNumber(
    playerPool.unmodelledCompetitivePlayers,
    "playerPool.unmodelledCompetitivePlayers",
    errors,
  );

  const registeredIds =
    new Set(playerPool.registeredPlayerIds);

  for (
    const eligibleId
    of playerPool.internationallyEligiblePlayerIds
  ) {
    if (!registeredIds.has(eligibleId)) {
      errors.push({
        path: "playerPool.internationallyEligiblePlayerIds",
        message:
          `${eligibleId} is internationally eligible but not registered.`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateCountryRecords(
  records: CountryRecords,
): CountryCompetitionValidationResult {
  const errors: CountryCompetitionValidationError[] = [];

  const countFields = [
    "internationalTeamMatchesPlayed",
    "internationalTeamMatchesWon",
    "internationalTeamMatchesLost",
    "individualWorldTitles",
    "doublesWorldTitles",
    "teamWorldTitles",
    "continentalTitles",
    "majorTournamentTitles",
    "longestTeamWinningStreak",
  ] as const;

  for (const field of countFields) {
    requireNonNegativeWholeNumber(
      records[field],
      `records.${field}`,
      errors,
    );
  }

  for (
    const field of [
      "gold",
      "silver",
      "bronze",
    ] as const
  ) {
    requireNonNegativeWholeNumber(
      records.medals[field],
      `records.medals.${field}`,
      errors,
    );
  }

  if (
    records.internationalTeamMatchesWon
      + records.internationalTeamMatchesLost
    > records.internationalTeamMatchesPlayed
  ) {
    errors.push({
      path: "records.internationalTeamMatchesPlayed",
      message:
        "Recorded wins and losses cannot exceed matches played.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}