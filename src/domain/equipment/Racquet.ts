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

  /**
   * Familiarity belongs to a player's relationship with the racquet rather
   * than the equipment itself. This value is included here only for saved
   * personal loadouts and will later be separated when the Player model exists.
   */
  familiarity: Rating;

  builtIn: boolean;
}