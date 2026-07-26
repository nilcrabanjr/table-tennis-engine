import type { CoachingProfile } from "./CoachingProfile";
import type { CultureProfile } from "./CultureProfile";
import type { DevelopmentProfile } from "./DevelopmentProfile";
import type { FederationProfile } from "./FederationProfile";

export function createDefaultFederation(): FederationProfile {
  return {
    id: "default-federation",

    name: "National Table Tennis Federation",

    abbreviation: "NTTF",

    reputation: 50,
    administration: 50,
    financialStability: 50,
    internationalInfluence: 50,
    officiatingQuality: 50,
    transparency: 50,
  };
}

export function createDefaultCoaching(): CoachingProfile {
  return {
    technicalCoaching: 50,
    tacticalCoaching: 50,
    serveDevelopment: 50,
    receiveDevelopment: 50,
    footworkTraining: 50,
    physicalConditioning: 50,
    sportsPsychology: 50,
    talentIdentification: 50,
    coachEducation: 50,
    innovation: 50,
  };
}

export function createDefaultDevelopment(): DevelopmentProfile {
  return {
    youthAcademies: 50,
    juniorCompetition: 50,
    regionalCentres: 50,
    scoutingNetwork: 50,
    equipmentAccess: 50,
    financialSupport: 50,
    sportsScience: 50,
    trainingIntensity: 50,
    coachAvailability: 50,
    pathwayToProfessional: 50,
  };
}

export function createDefaultCulture(): CultureProfile {
  return {
    tableTennisPopularity: 50,
    youthParticipation: 50,
    schoolPrograms: 50,
    universityPrograms: 50,
    governmentSupport: 50,
    mediaCoverage: 50,
    volunteerBase: 50,
    professionalInterest: 50,
    womenParticipation: 50,
    internationalAmbition: 50,
  };
}