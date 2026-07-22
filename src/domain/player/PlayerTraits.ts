import type {
  EntityId,
  Rating,
} from "../shared";

export const BUILT_IN_PLAYER_TRAITS = [
  "fast-starter",
  "slow-starter",
  "comeback-specialist",
  "front-runner",
  "big-match-player",
  "training-focused",
  "equipment-sensitive",
  "injury-prone",
  "iron-fitness",
  "serve-specialist",
  "return-specialist",
  "rally-specialist",
  "unpredictable",
  "tactical-purist",
] as const;

export type BuiltInPlayerTrait =
  (typeof BUILT_IN_PLAYER_TRAITS)[number];

/**
 * A custom or built-in trait definition.
 *
 * Mechanical effects will be implemented later through explicit effect
 * definitions rather than hidden hardcoded bonuses.
 */
export interface PlayerTraitDefinition {
  id: EntityId;
  name: string;
  description: string;

  /**
   * General strength of the trait's behavioural effect.
   */
  intensity: Rating;

  builtIn: boolean;
}

/**
 * A trait attached to a player.
 */
export interface PlayerTraitAssignment {
  traitId: EntityId;

  /**
   * Allows the same trait definition to be weaker or stronger by player.
   */
  intensity: Rating;

  notes?: string;
}