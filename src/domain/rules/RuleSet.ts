import type {
  EntityId,
  Year,
} from "../shared";

import type { EquipmentRules } from "./EquipmentRules";
import type { MatchRules } from "./MatchRules";

/**
 * Complete selectable ruleset.
 */
export interface RuleSet {
  id: EntityId;

  name: string;
  shortName: string;
  description?: string;

  /**
   * Era providing the broader historical or fictional environment.
   */
  eraId: EntityId;

  /**
   * Nominal year used for equipment legality and historical context.
   */
  year: Year;

  match: MatchRules;
  equipment: EquipmentRules;

  /**
   * Whether the ruleset is claimed to reproduce a documented real ruleset.
   */
  historicalStatus:
    | "verified-historical"
    | "historical-inspired"
    | "fictional"
    | "alternate-history";

  /**
   * Optional source or design notes.
   */
  notes?: string[];

  builtIn: boolean;
}