import type {
  EntityId,
  Rating,
  Year,
} from "../shared";

/**
 * Describes the broader technological and sporting environment in which
 * matches take place.
 *
 * An era is not itself a complete ruleset. It provides context that can be
 * shared by multiple competitions and rulesets.
 */
export interface Era {
  id: EntityId;

  name: string;
  description?: string;

  startYear: Year;
  endYear?: Year;

  /**
   * Whether this era is intended to represent documented history,
   * fictional history, or a deliberate alternate-history setting.
   */
  historicalStatus:
    | "historical"
    | "historical-inspired"
    | "fictional"
    | "alternate-history";

  /**
   * General technological level of equipment available in this era.
   */
  equipmentTechnology: Rating;

  /**
   * General sophistication of coaching and tactical analysis.
   */
  coachingKnowledge: Rating;

  /**
   * General standard of athletic preparation.
   */
  athleticPreparation: Rating;

  /**
   * General quality and consistency of manufactured equipment.
   */
  manufacturingQuality: Rating;

  /**
   * Whether equipment introduced after the selected year may still be used.
   */
  allowFutureTechnology: boolean;

  /**
   * Whether fictional equipment is allowed.
   */
  allowFictionalEquipment: boolean;

  builtIn: boolean;
}