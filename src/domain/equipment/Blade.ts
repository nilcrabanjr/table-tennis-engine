import type {
  EntityId,
  HandleType,
  Rating,
  Year,
} from "../shared";

/**
 * A wooden table-tennis blade.
 *
 * The engine initially models historical wooden blades only.
 * Alternate-history or modern materials may be added later through
 * a broader material system.
 */
export interface Blade {
  id: EntityId;

  name: string;
  manufacturer?: string;
  description?: string;

  introducedYear: Year;
  discontinuedYear?: Year;

  handleType: HandleType;

  /**
   * Number of wooden layers.
   */
  plies: number;

  /**
   * Total blade weight in grams.
   */
  weightGrams: number;

  /**
   * Overall pace produced by the blade.
   */
  speed: Rating;

  /**
   * Ease of accurately controlling the ball.
   */
  control: Rating;

  /**
   * Resistance to bending during contact.
   */
  stiffness: Rating;

  /**
   * Ability to bend and retain contact with the ball.
   */
  flexibility: Rating;

  /**
   * Amount of tactile feedback reaching the hand.
   */
  vibration: Rating;

  /**
   * Size and forgiveness of the effective hitting area.
   */
  sweetSpot: Rating;

  /**
   * Ability to generate power during flat or attacking contact.
   */
  powerTransfer: Rating;

  /**
   * Ability to support delicate short play.
   */
  touchSupport: Rating;

  /**
   * Whether this is supplied by the engine or created by the user.
   */
  builtIn: boolean;
}