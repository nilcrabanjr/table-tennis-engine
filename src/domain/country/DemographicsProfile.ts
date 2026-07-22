import type { Rating } from "../shared";

export interface DemographicsProfile {
  population: number;

  populationGrowth: number;

  urbanPopulationPercentage: Rating;

  youthPopulationPercentage: Rating;

  literacyRate: Rating;

  averageLifeExpectancy: number;

  sportsParticipation: Rating;

  registeredTableTennisPlayers: number;

  estimatedRecreationalPlayers: number;
}