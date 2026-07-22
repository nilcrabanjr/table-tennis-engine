import type { Rating } from "../shared";

/**
 * Behavioural tendencies rather than abilities.
 *
 * These influence decisions and reactions without directly granting skill.
 */
export interface PersonalityProfile {
  /**
   * Preference for attempting difficult or dangerous actions.
   */
  riskTaking: Rating;

  /**
   * Tendency to choose unusual or inventive solutions.
   */
  creativity: Rating;

  /**
   * Degree to which emotions visibly influence behaviour.
   */
  emotionalVolatility: Rating;

  /**
   * Desire to dominate and win.
   */
  competitiveness: Rating;

  /**
   * Willingness to respect rules and opponents.
   */
  sportsmanship: Rating;

  /**
   * Tendency to influence teammates and national squads.
   */
  leadership: Rating;

  /**
   * Commitment to preparation, training, and recovery.
   */
  professionalism: Rating;

  /**
   * Preference for independence over strict coaching instructions.
   */
  independence: Rating;

  /**
   * Willingness to perform in expressive or crowd-pleasing ways.
   */
  showmanship: Rating;
}