/**
 * Nearly all editable attributes use a 0-100 rating scale.
 *
 * TypeScript cannot guarantee at compile time that a normal number is within
 * that range, so all values entering the application must be validated.
 */
export type Rating = number;

export const MIN_RATING = 0;
export const MAX_RATING = 100;
export const DEFAULT_RATING = 50;

/**
 * Returns true when a value is a finite whole number between 0 and 100.
 */
export function isValidRating(value: unknown): value is Rating {
  return (
    typeof value === "number"
    && Number.isFinite(value)
    && Number.isInteger(value)
    && value >= MIN_RATING
    && value <= MAX_RATING
  );
}

/**
 * Converts a number into a valid whole-number rating.
 *
 * Examples:
 *
 * clampRating(108)  => 100
 * clampRating(-4)   => 0
 * clampRating(67.8) => 68
 */
export function clampRating(value: number): Rating {
  if (!Number.isFinite(value)) {
    return DEFAULT_RATING;
  }

  return Math.round(
    Math.min(MAX_RATING, Math.max(MIN_RATING, value)),
  );
}

/**
 * Validates a rating and throws a descriptive error when it is invalid.
 *
 * This is useful when constructing domain objects or importing save data.
 */
export function requireRating(
  value: unknown,
  fieldName: string,
): Rating {
  if (!isValidRating(value)) {
    throw new RangeError(
      `${fieldName} must be a whole number between `
      + `${MIN_RATING} and ${MAX_RATING}.`,
    );
  }

  return value;
}

/**
 * Converts a rating into a broad human-readable category.
 *
 * This will be useful in scouting summaries and interface descriptions.
 */
export function describeRating(rating: Rating): string {
  const validRating = clampRating(rating);

  if (validRating >= 95) {
    return "Generational";
  }

  if (validRating >= 90) {
    return "World class";
  }

  if (validRating >= 80) {
    return "Elite";
  }

  if (validRating >= 70) {
    return "Excellent";
  }

  if (validRating >= 60) {
    return "Strong";
  }

  if (validRating >= 50) {
    return "Average";
  }

  if (validRating >= 40) {
    return "Limited";
  }

  if (validRating >= 30) {
    return "Weak";
  }

  if (validRating >= 20) {
    return "Poor";
  }

  return "Very poor";
}