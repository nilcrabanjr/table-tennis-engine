import { isValidRating } from "../shared";

import type { CoachingProfile } from "./CoachingProfile";
import type { CultureProfile } from "./CultureProfile";
import type { DevelopmentProfile } from "./DevelopmentProfile";
import type { FederationProfile } from "./FederationProfile";

function validateRatingFields<
  T extends object,
  K extends keyof T,
>(
  object: T,
  fields: readonly K[],
  prefix: string,
): string[] {
  const errors: string[] = [];

  for (const field of fields) {
    if (!isValidRating(object[field])) {
      errors.push(`${prefix}.${String(field)}`);
    }
  }

  return errors;
}

export function validateFederation(
  federation: FederationProfile,
): string[] {
  const ratingFields = [
    "reputation",
    "administration",
    "financialStability",
    "internationalInfluence",
    "officiatingQuality",
    "transparency",
  ] as const;

  return validateRatingFields(
    federation,
    ratingFields,
    "federation",
  );
}

export function validateCoaching(
  coaching: CoachingProfile,
): string[] {
  const ratingFields = [
    "technicalCoaching",
    "tacticalCoaching",
    "serveDevelopment",
    "receiveDevelopment",
    "footworkTraining",
    "physicalConditioning",
    "sportsPsychology",
    "talentIdentification",
    "coachEducation",
    "innovation",
  ] as const;

  return validateRatingFields(
    coaching,
    ratingFields,
    "coaching",
  );
}

export function validateDevelopment(
  development: DevelopmentProfile,
): string[] {
  const ratingFields = [
    "youthAcademies",
    "juniorCompetition",
    "regionalCentres",
    "scoutingNetwork",
    "equipmentAccess",
    "financialSupport",
    "sportsScience",
    "trainingIntensity",
    "coachAvailability",
    "pathwayToProfessional",
  ] as const;

  return validateRatingFields(
    development,
    ratingFields,
    "development",
  );
}

export function validateCulture(
  culture: CultureProfile,
): string[] {
  const ratingFields = [
    "tableTennisPopularity",
    "youthParticipation",
    "schoolPrograms",
    "universityPrograms",
    "governmentSupport",
    "mediaCoverage",
    "volunteerBase",
    "professionalInterest",
    "womenParticipation",
    "internationalAmbition",
  ] as const;

  return validateRatingFields(
    culture,
    ratingFields,
    "culture",
  );
}