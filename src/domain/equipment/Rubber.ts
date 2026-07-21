import type {
  EntityId,
  Rating,
  RubberType,
  Year,
} from "../shared";

/**
 * A racquet playing surface.
 *
 * The name "Rubber" is retained for convenience even though some supported
 * surfaces, such as bare wood or sandpaper, are not conventional rubber.
 */
export interface Rubber {
  id: EntityId;

  name: string;
  manufacturer?: string;
  description?: string;

  type: RubberType;

  introducedYear: Year;
  discontinuedYear?: Year;

  /**
   * Surface thickness in millimetres.
   *
   * Bare wood may use zero.
   */
  thicknessMm: number;

  /**
   * Surface weight in grams.
   */
  weightGrams: number;

  /**
   * Maximum pace supported by the surface.
   */
  speed: Rating;

  /**
   * Ability to generate spin.
   */
  spin: Rating;

  /**
   * Ease of controlling ordinary shots.
   */
  control: Rating;

  /**
   * Surface hardness.
   */
  hardness: Rating;

  /**
   * Surface grip or adhesion.
   */
  grip: Rating;

  /**
   * Sensitivity to incoming spin.
   *
   * A higher value means incoming spin has a larger effect.
   */
  spinSensitivity: Rating;

  /**
   * Ability to return altered or reversed spin.
   */
  spinReversal: Rating;

  /**
   * Unusual or difficult bounce characteristics.
   */
  disruption: Rating;

  /**
   * Support for direct flat hitting.
   */
  flatHitSupport: Rating;

  /**
   * Support for defensive chopping.
   */
  chopSupport: Rating;

  /**
   * Support for blocking incoming attacks.
   */
  blockSupport: Rating;

  builtIn: boolean;
}