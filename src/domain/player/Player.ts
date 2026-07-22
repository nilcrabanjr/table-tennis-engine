import type {
  EntityId,
  Year,
} from "../shared";

import type { AvailabilityProfile } from "./AvailabilityProfile";
import type { PlayerBiography } from "./BiographyProfile";
import type { CareerProfile } from "./CareerProfile";
import type { PlayerIdentity } from "./IdentityProfile";
import type { PersonalityProfile } from "./PersonalityProfile";
import type { PlayerAttributes } from "./PlayerAttributes";
import type { PlayerEquipmentProfile } from "./PlayerEquipment";
import type { PlaystyleAssignment } from "./PlaystyleAssignment";
import type { PlayerTraitAssignment } from "./PlayerTraits";

/**
 * Complete persistent player entity.
 */
export interface Player {
  id: EntityId;

  /**
   * Country currently represented by the player.
   */
  countryId: EntityId;

  identity: PlayerIdentity;
  biography: PlayerBiography;

  attributes: PlayerAttributes;
  personality: PersonalityProfile;

  playstyle: PlaystyleAssignment;
  traits: PlayerTraitAssignment[];

  equipment: PlayerEquipmentProfile;

  career: CareerProfile;
  availability: AvailabilityProfile;

  createdYear?: Year;
  lastModifiedYear?: Year;

  notes?: string[];

  builtIn: boolean;
}