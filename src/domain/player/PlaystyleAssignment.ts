import type {
  EntityId,
  Rating,
} from "../shared";

/**
 * Links a player to editable playstyle records.
 */
export interface PlaystyleAssignment {
  primaryPlaystyleId: EntityId;

  secondaryPlaystyleId?: EntityId;

  /**
   * How strongly the player naturally follows the primary playstyle.
   */
  primaryAffinity: Rating;

  /**
   * Ability to move away from the primary playstyle when required.
   */
  stylisticFlexibility: Rating;
}