import type {
  EntityId,
  Rating,
} from "../shared";

export interface CountryPlayerPool {
  /**
   * Every player currently registered to this country.
   */
  registeredPlayerIds: EntityId[];

  /**
   * Players eligible to represent the country internationally.
   */
  internationallyEligiblePlayerIds: EntityId[];

  /**
   * Players identified as promising juniors or prospects.
   */
  prospectPlayerIds: EntityId[];

  /**
   * Former players kept for history and records.
   */
  retiredPlayerIds: EntityId[];

  playerPoolDepth: Rating;
  elitePlayerDepth: Rating;
  youthProspectQuality: Rating;

  /**
   * Estimated number of players outside the individually modelled database.
   */
  unmodelledCompetitivePlayers: number;
}