import { isValidRating } from "./Rating";

export interface ValidationError {
  path: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export function createValidationResult(
  errors: ValidationError[],
): ValidationResult {
  return {
    valid: errors.length === 0,
    errors,
  };
}

export function requireText(
  value: string,
  path: string,
  errors: ValidationError[],
  label = path,
): void {
  if (!value.trim()) {
    errors.push({
      path,
      message: `${label} is required.`,
    });
  }
}

export function requireValidRating(
  value: unknown,
  path: string,
  errors: ValidationError[],
): void {
  if (!isValidRating(value)) {
    errors.push({
      path,
      message: `${path} must be a whole number between 0 and 100.`,
    });
  }
}

export function requirePositiveWholeNumber(
  value: number,
  path: string,
  errors: ValidationError[],
): void {
  if (!Number.isInteger(value) || value < 1) {
    errors.push({
      path,
      message: `${path} must be a positive whole number.`,
    });
  }
}

export function requireNonNegativeWholeNumber(
  value: number,
  path: string,
  errors: ValidationError[],
): void {
  if (!Number.isInteger(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative whole number.`,
    });
  }
}

export function requirePositiveNumber(
  value: number,
  path: string,
  errors: ValidationError[],
): void {
  if (!Number.isFinite(value) || value <= 0) {
    errors.push({
      path,
      message: `${path} must be greater than zero.`,
    });
  }
}

export function requireNonNegativeNumber(
  value: number,
  path: string,
  errors: ValidationError[],
): void {
  if (!Number.isFinite(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative number.`,
    });
  }
}

export function requireValidYear(
  value: number,
  path: string,
  errors: ValidationError[],
  minimumYear = 1800,
): void {
  if (!Number.isInteger(value) || value < minimumYear) {
    errors.push({
      path,
      message: `${path} must be a valid year from ${minimumYear} onward.`,
    });
  }
}

export function isValidIsoDate(
  value: string,
): boolean {
  if (!value.trim()) {
    return false;
  }

  const timestamp = Date.parse(value);

  return !Number.isNaN(timestamp);
}

export function requireIsoDate(
  value: string,
  path: string,
  errors: ValidationError[],
): void {
  if (!isValidIsoDate(value)) {
    errors.push({
      path,
      message: `${path} must be a valid ISO date.`,
    });
  }
}

export function requireUniqueValues(
  values: readonly string[],
  path: string,
  errors: ValidationError[],
  message = `${path} must contain unique values.`,
): void {
  if (new Set(values).size !== values.length) {
    errors.push({
      path,
      message,
    });
  }
}

export function requireKnownReference(
  value: string,
  knownValues: ReadonlySet<string>,
  path: string,
  errors: ValidationError[],
  label = "reference",
): void {
  if (!knownValues.has(value)) {
    errors.push({
      path,
      message: `${value} is not a known ${label}.`,
    });
  }
}

export function appendValidationErrors(
  target: ValidationError[],
  source: readonly ValidationError[],
  prefix?: string,
): void {
  for (const error of source) {
    target.push({
      path: prefix
        ? `${prefix}.${error.path}`
        : error.path,
      message: error.message,
    });
  }
}