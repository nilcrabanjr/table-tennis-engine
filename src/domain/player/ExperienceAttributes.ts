import type { Rating } from "../shared";

/**
 * Experience-related abilities.
 *
 * These can improve through career progression and match participation.
 */
export interface ExperienceAttributes {
  /**
   * General competitive experience.
   */
  matchExperience: Rating;

  /**
   * Experience in international competition.
   */
  internationalExperience: Rating;

  /**
   * Familiarity with major-event pressure.
   */
  tournamentExperience: Rating;

  /**
   * Experience facing a wide range of playing styles.
   */
  styleExposure: Rating;

  /**
   * Knowledge of tactical preparation and match planning.
   */
  tacticalExperience: Rating;

  /**
   * Familiarity with difficult score situations.
   */
  pressureExperience: Rating;

  /**
   * Experience using and adjusting to different equipment.
   */
  equipmentExperience: Rating;
}