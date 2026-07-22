import {
  HANDLE_TYPES,
  RUBBER_TYPES,
} from "../shared";

import type { Era } from "./Era";
import type { EquipmentRules } from "./EquipmentRules";
import type { MatchRules } from "./MatchRules";
import type { RuleSet } from "./RuleSet";
import type { ScoringRules } from "./ScoringRules";
import type { ServiceRules } from "./ServiceRules";

export interface RulesValidationError {
  path: string;
  message: string;
}

export interface RulesValidationResult {
  valid: boolean;
  errors: RulesValidationError[];
}

function result(
  errors: RulesValidationError[],
): RulesValidationResult {
  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateEra(
  era: Era,
): RulesValidationResult {
  const errors: RulesValidationError[] = [];

  if (!era.id.trim()) {
    errors.push({
      path: "era.id",
      message: "Era ID is required.",
    });
  }

  if (!era.name.trim()) {
    errors.push({
      path: "era.name",
      message: "Era name is required.",
    });
  }

  if (
    !Number.isInteger(era.startYear)
    || era.startYear < 1800
  ) {
    errors.push({
      path: "era.startYear",
      message: "Era start year must be a valid year from 1800 onward.",
    });
  }

  if (
    era.endYear !== undefined
    && (
      !Number.isInteger(era.endYear)
      || era.endYear < era.startYear
    )
  ) {
    errors.push({
      path: "era.endYear",
      message: "Era end year cannot precede its start year.",
    });
  }

  return result(errors);
}

export function validateScoringRules(
  scoring: ScoringRules,
): RulesValidationResult {
  const errors: RulesValidationError[] = [];

  if (
    !Number.isInteger(scoring.pointsToWinGame)
    || scoring.pointsToWinGame < 1
  ) {
    errors.push({
      path: "scoring.pointsToWinGame",
      message: "Points to win a game must be a positive whole number.",
    });
  }

  if (
    !Number.isInteger(scoring.minimumWinningMargin)
    || scoring.minimumWinningMargin < 1
  ) {
    errors.push({
      path: "scoring.minimumWinningMargin",
      message: "Winning margin must be a positive whole number.",
    });
  }

  if (
    !Number.isInteger(scoring.bestOfGames)
    || scoring.bestOfGames < 1
    || scoring.bestOfGames % 2 === 0
  ) {
    errors.push({
      path: "scoring.bestOfGames",
      message: "Best-of games must be a positive odd number.",
    });
  }

  if (
    scoring.gameScoreCap !== undefined
    && (
      !Number.isInteger(scoring.gameScoreCap)
      || scoring.gameScoreCap < scoring.pointsToWinGame
    )
  ) {
    errors.push({
      path: "scoring.gameScoreCap",
      message:
        "The score cap must be a whole number no lower than the normal "
        + "target score.",
    });
  }

  if (
    !Number.isInteger(scoring.finalGameChangeEndsAt)
    || scoring.finalGameChangeEndsAt < 1
  ) {
    errors.push({
      path: "scoring.finalGameChangeEndsAt",
      message: "Final-game change-of-ends score must be positive.",
    });
  }

  return result(errors);
}

export function validateServiceRules(
  service: ServiceRules,
): RulesValidationResult {
  const errors: RulesValidationError[] = [];

  if (
    !Number.isInteger(service.servesPerTurn)
    || service.servesPerTurn < 1
  ) {
    errors.push({
      path: "service.servesPerTurn",
      message: "Serves per turn must be a positive whole number.",
    });
  }

  if (
    !Number.isInteger(service.deuceStartsAt)
    || service.deuceStartsAt < 1
  ) {
    errors.push({
      path: "service.deuceStartsAt",
      message: "Deuce starting score must be a positive whole number.",
    });
  }

  if (
    !Number.isInteger(service.deuceServesPerTurn)
    || service.deuceServesPerTurn < 1
  ) {
    errors.push({
      path: "service.deuceServesPerTurn",
      message: "Deuce serves per turn must be positive.",
    });
  }

  if (
    service.minimumProjectionCm !== undefined
    && (
      !Number.isFinite(service.minimumProjectionCm)
      || service.minimumProjectionCm < 0
    )
  ) {
    errors.push({
      path: "service.minimumProjectionCm",
      message: "Minimum service projection cannot be negative.",
    });
  }

  return result(errors);
}

export function validateEquipmentRules(
  equipment: EquipmentRules,
): RulesValidationResult {
  const errors: RulesValidationError[] = [];

  if (
    !Number.isInteger(equipment.minimumBladePlies)
    || equipment.minimumBladePlies < 1
  ) {
    errors.push({
      path: "equipment.minimumBladePlies",
      message: "Minimum blade plies must be positive.",
    });
  }

  if (
    !Number.isInteger(equipment.maximumBladePlies)
    || equipment.maximumBladePlies
      < equipment.minimumBladePlies
  ) {
    errors.push({
      path: "equipment.maximumBladePlies",
      message:
        "Maximum blade plies cannot be lower than the minimum.",
    });
  }

  for (const type of equipment.allowedRubberTypes) {
    if (!RUBBER_TYPES.includes(type)) {
      errors.push({
        path: "equipment.allowedRubberTypes",
        message: `Unknown surface type: ${type}.`,
      });
    }
  }

  for (const type of equipment.allowedHandleTypes) {
    if (!HANDLE_TYPES.includes(type)) {
      errors.push({
        path: "equipment.allowedHandleTypes",
        message: `Unknown handle type: ${type}.`,
      });
    }
  }

  if (
    equipment.maximumRubberThicknessMm !== undefined
    && (
      !Number.isFinite(equipment.maximumRubberThicknessMm)
      || equipment.maximumRubberThicknessMm < 0
    )
  ) {
    errors.push({
      path: "equipment.maximumRubberThicknessMm",
      message: "Maximum surface thickness cannot be negative.",
    });
  }

  return result(errors);
}

export function validateMatchRules(
  match: MatchRules,
): RulesValidationResult {
  const errors: RulesValidationError[] = [];

  errors.push(
    ...validateScoringRules(match.scoring).errors,
    ...validateServiceRules(match.service).errors,
  );

  if (
    !Number.isInteger(match.timeoutsPerCompetitor)
    || match.timeoutsPerCompetitor < 0
  ) {
    errors.push({
      path: "match.timeoutsPerCompetitor",
      message: "Timeout allowance cannot be negative.",
    });
  }

  if (
    !Number.isFinite(match.timeoutDurationSeconds)
    || match.timeoutDurationSeconds < 0
  ) {
    errors.push({
      path: "match.timeoutDurationSeconds",
      message: "Timeout duration cannot be negative.",
    });
  }

  if (
    !Number.isFinite(match.intervalBetweenGamesSeconds)
    || match.intervalBetweenGamesSeconds < 0
  ) {
    errors.push({
      path: "match.intervalBetweenGamesSeconds",
      message: "Interval between games cannot be negative.",
    });
  }

  if (
    match.expedite.enabled
    && (
      match.expedite.activationAfterMinutes === undefined
      || match.expedite.activationAfterMinutes <= 0
    )
  ) {
    errors.push({
      path: "match.expedite.activationAfterMinutes",
      message:
        "Enabled expedite rules require a positive activation time.",
    });
  }

  return result(errors);
}

export function validateRuleSet(
  ruleSet: RuleSet,
): RulesValidationResult {
  const errors: RulesValidationError[] = [];

  if (!ruleSet.id.trim()) {
    errors.push({
      path: "ruleSet.id",
      message: "Ruleset ID is required.",
    });
  }

  if (!ruleSet.name.trim()) {
    errors.push({
      path: "ruleSet.name",
      message: "Ruleset name is required.",
    });
  }

  if (!ruleSet.shortName.trim()) {
    errors.push({
      path: "ruleSet.shortName",
      message: "Ruleset short name is required.",
    });
  }

  if (!ruleSet.eraId.trim()) {
    errors.push({
      path: "ruleSet.eraId",
      message: "Ruleset must reference an era.",
    });
  }

  if (
    !Number.isInteger(ruleSet.year)
    || ruleSet.year < 1800
  ) {
    errors.push({
      path: "ruleSet.year",
      message: "Ruleset year must be valid.",
    });
  }

  errors.push(
    ...validateMatchRules(ruleSet.match).errors,
    ...validateEquipmentRules(ruleSet.equipment).errors,
  );

  if (
    ruleSet.match.service.deuceStartsAt
    !== ruleSet.match.scoring.pointsToWinGame - 1
  ) {
    errors.push({
      path: "ruleSet.match.service.deuceStartsAt",
      message:
        "Deuce normally begins one point below the target score. "
        + "Change this only if the variation is intentional.",
    });
  }

  return result(errors);
}