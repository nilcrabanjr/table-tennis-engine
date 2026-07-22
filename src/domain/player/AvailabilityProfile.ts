import type {
  Rating,
  Year,
} from "../shared";

export const AVAILABILITY_STATUSES = [
  "available",
  "resting",
  "injured",
  "ill",
  "suspended",
  "unavailable",
  "retired",
] as const;

export type AvailabilityStatus =
  (typeof AVAILABILITY_STATUSES)[number];

export const INJURY_SEVERITIES = [
  "minor",
  "moderate",
  "serious",
  "severe",
  "career-threatening",
] as const;

export type InjurySeverity =
  (typeof INJURY_SEVERITIES)[number];

export interface PlayerInjury {
  name: string;
  description?: string;

  severity: InjurySeverity;

  startYear: Year;
  expectedRecoveryYear?: Year;

  /**
   * Current effect on physical performance.
   */
  performanceImpact: Rating;

  /**
   * Current probability of aggravating the injury.
   */
  recurrenceRisk: Rating;
}

export interface AvailabilityProfile {
  status: AvailabilityStatus;

  injury?: PlayerInjury;

  /**
   * General fitness outside the temporary fatigue of a particular match.
   */
  matchFitness: Rating;

  /**
   * Short-term form over recent matches.
   */
  form: Rating;

  /**
   * Whether the player may currently be selected.
   */
  selectable: boolean;

  unavailableReason?: string;
}