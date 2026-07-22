import type {
  EntityId,
  Rating,
} from "../shared";

/**
 * References the equipment records used to assemble a racquet.
 */
export interface RacquetComposition {
  bladeId: EntityId;
  forehandRubberId: EntityId;
  backhandRubberId: EntityId;
}

/**
 * A saved racquet setup.
 *
 * Player-specific familiarity is stored in the player's equipment profile.
 */
export interface Racquet {
  id: EntityId;

  name: string;
  description?: string;

  composition: RacquetComposition;

  /**
   * Physical condition of the equipment.
   *
   * 100 means excellent condition.
   */
  condition: Rating;

  builtIn: boolean;
}