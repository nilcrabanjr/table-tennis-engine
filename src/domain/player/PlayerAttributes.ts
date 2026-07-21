import type { ExperienceAttributes } from "./ExperienceAttributes";
import type { MentalAttributes } from "./MentalAttributes";
import type { PhysicalAttributes } from "./PhysicalAttributes";
import type { TechnicalAttributes } from "./TechnicalAttributes";

/**
 * Complete persistent attribute collection for a player.
 */
export interface PlayerAttributes {
  technical: TechnicalAttributes;
  physical: PhysicalAttributes;
  mental: MentalAttributes;
  experience: ExperienceAttributes;
}