import type { Rating } from "../shared";

/**
 * Persistent psychological and decision-making abilities.
 */
export interface MentalAttributes {
  /**
   * Ability to remain calm under pressure.
   */
  composure: Rating;

  /**
   * Ability to maintain attention over time.
   */
  concentration: Rating;

  /**
   * Ability to predict likely opponent actions.
   */
  anticipation: Rating;

  /**
   * Ability to change behaviour when current tactics fail.
   */
  adaptability: Rating;

  /**
   * Natural tendency to select attacking options.
   *
   * This is not inherently good or bad.
   */
  aggression: Rating;

  /**
   * Willingness to wait for a suitable opportunity.
   */
  patience: Rating;

  /**
   * Ability to continue competing after setbacks.
   */
  determination: Rating;

  /**
   * Ability to follow a tactical plan.
   */
  discipline: Rating;

  /**
   * Performance stability during important points.
   */
  bigPointAbility: Rating;

  /**
   * Ability to select suitable tactical actions.
   */
  tacticalIntelligence: Rating;

  /**
   * Ability to detect repeated patterns.
   */
  patternRecognition: Rating;

  /**
   * Ability to avoid frustration-driven decisions.
   */
  emotionalControl: Rating;

  /**
   * Natural belief in personal ability.
   */
  selfBelief: Rating;

  /**
   * Ability to recover mentally after errors or lost points.
   */
  resilience: Rating;
}