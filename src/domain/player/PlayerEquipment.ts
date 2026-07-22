import type {
  EntityId,
  HandleType,
  Rating,
  RubberType,
} from "../shared";

/**
 * A player's familiarity with one saved racquet.
 */
export interface PlayerRacquetAssignment {
  racquetId: EntityId;

  familiarity: Rating;

  /**
   * Whether this is the player's normal competitive racquet.
   */
  primary: boolean;

  matchesUsed: number;

  notes?: string;
}

/**
 * Equipment characteristics that naturally suit a player.
 */
export interface PreferredEquipmentProfile {
  preferredWeightGrams: number;

  preferredSpeed: Rating;
  preferredControl: Rating;
  preferredStiffness: Rating;
  preferredFlexibility: Rating;

  preferredHandleTypes: HandleType[];
  preferredRubberTypes: RubberType[];

  /**
   * How strongly the player is affected by equipment that does not fit.
   */
  equipmentSensitivity: Rating;
}

/**
 * Complete equipment relationship belonging to a player.
 */
export interface PlayerEquipmentProfile {
  racquets: PlayerRacquetAssignment[];

  preferredProfile: PreferredEquipmentProfile;
}

export function getPrimaryRacquetAssignment(
  equipment: PlayerEquipmentProfile,
): PlayerRacquetAssignment | undefined {
  return equipment.racquets.find((assignment) => assignment.primary);
}