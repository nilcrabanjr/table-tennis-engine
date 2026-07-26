import type {
  EntityId,
  Rating,
  Year,
} from "../shared";

export interface FederationProfile {
  id: EntityId;

  name: string;

  abbreviation: string;

  foundedYear?: Year;

  reputation: Rating;

  administration: Rating;

  financialStability: Rating;

  internationalInfluence: Rating;

  officiatingQuality: Rating;

  transparency: Rating;

  notes?: string;
}