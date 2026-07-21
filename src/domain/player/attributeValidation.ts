import {
  isValidRating,
  requireRating,
} from "../shared";

import type { PlayerAttributes } from "./PlayerAttributes";

export interface AttributeValidationError {
  path: string;
  message: string;
}

export interface AttributeValidationResult {
  valid: boolean;
  errors: AttributeValidationError[];
}

/**
 * Checks every nested player attribute.
 */
export function validatePlayerAttributes(
  attributes: PlayerAttributes,
): AttributeValidationResult {
  const errors: AttributeValidationError[] = [];

  for (const [familyName, family] of Object.entries(attributes)) {
    for (const [attributeName, value] of Object.entries(family)) {
      if (!isValidRating(value)) {
        errors.push({
          path: `${familyName}.${attributeName}`,
          message:
            `${familyName}.${attributeName} must be a whole number `
            + "between 0 and 100.",
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Throws when any player attribute is invalid.
 */
export function requireValidPlayerAttributes(
  attributes: PlayerAttributes,
): PlayerAttributes {
  for (const [familyName, family] of Object.entries(attributes)) {
    for (const [attributeName, value] of Object.entries(family)) {
      requireRating(
        value,
        `${familyName}.${attributeName}`,
      );
    }
  }

  return attributes;
}