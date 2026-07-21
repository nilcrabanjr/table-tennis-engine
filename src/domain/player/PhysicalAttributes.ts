import type { Rating } from "../shared";

/**
 * Persistent physical abilities.
 */
export interface PhysicalAttributes {
  /**
   * Initial reaction speed after recognising an opponent's action.
   */
  reflexes: Rating;

  /**
   * General ability to move efficiently around the table.
   */
  footwork: Rating;

  /**
   * Ability to accelerate into position.
   */
  acceleration: Rating;

  /**
   * Maximum movement speed over a short distance.
   */
  movementSpeed: Rating;

  /**
   * Stability while executing a shot.
   */
  balance: Rating;

  /**
   * Effective playing range created by body dimensions and technique.
   */
  reach: Rating;

  /**
   * Ability to maintain performance across long rallies and matches.
   */
  stamina: Rating;

  /**
   * Ability to generate force.
   */
  strength: Rating;

  /**
   * Ability to rotate, stretch, and recover from awkward positions.
   */
  flexibility: Rating;

  /**
   * Speed of physical recovery after demanding movement.
   */
  recovery: Rating;

  /**
   * Ability to coordinate body movement with racquet contact.
   */
  coordination: Rating;

  /**
   * Resistance to physical strain and minor injury.
   */
  durability: Rating;
}