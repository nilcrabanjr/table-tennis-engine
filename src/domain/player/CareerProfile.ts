import type {
  Rating,
  Year,
} from "../shared";

export const CAREER_STATUSES = [
  "youth",
  "amateur",
  "active",
  "inactive",
  "retired",
  "deceased",
] as const;

export type CareerStatus =
  (typeof CAREER_STATUSES)[number];

/**
 * Long-term competitive state.
 */
export interface CareerProfile {
  status: CareerStatus;

  debutYear?: Year;
  retirementYear?: Year;

  rankingPoints: number;
  worldRanking?: number;
  nationalRanking?: number;

  reputation: Rating;
  popularity: Rating;

  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;

  singlesTitles: number;
  doublesTitles: number;
  teamTitles: number;
}

export function calculateCareerWinRate(
  career: CareerProfile,
): number {
  if (career.matchesPlayed <= 0) {
    return 0;
  }

  return career.matchesWon / career.matchesPlayed;
}