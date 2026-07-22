import type {
  GripType,
  Year,
} from "../shared";

/**
 * Personal and physical background information.
 */
export interface PlayerBiography {
  birthYear: Year;

  /**
   * Optional retirement or death year for historical saves.
   */
  deathYear?: Year;

  heightCm: number;
  weightKg: number;

  grip: GripType;

  birthplace?: string;
  residence?: string;

  biography?: string;
}