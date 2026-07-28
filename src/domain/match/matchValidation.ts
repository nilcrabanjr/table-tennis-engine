import {
  MATCH_STATUSES,
  isValidRating,
} from "../shared";

import type { MatchCompetitor } from "./MatchCompetitor";
import type { MatchState } from "./MatchState";

export interface MatchValidationError {
  path: string;
  message: string;
}

export interface MatchValidationResult {
  valid: boolean;
  errors: MatchValidationError[];
}

function requireNonNegativeWholeNumber(
  value: number,
  path: string,
  errors: MatchValidationError[],
): void {
  if (!Number.isInteger(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative whole number.`,
    });
  }
}

function validateCompetitor(
  competitor: MatchCompetitor,
  path: string,
  errors: MatchValidationError[],
): void {
  if (!competitor.playerId.trim()) {
    errors.push({
      path: `${path}.playerId`,
      message: "Competitor player ID is required.",
    });
  }

  if (!competitor.countryId.trim()) {
    errors.push({
      path: `${path}.countryId`,
      message: "Competitor country ID is required.",
    });
  }

  if (!competitor.displayName.trim()) {
    errors.push({
      path: `${path}.displayName`,
      message: "Competitor display name is required.",
    });
  }

  if (!competitor.playstyleId.trim()) {
    errors.push({
      path: `${path}.playstyleId`,
      message: "Competitor playstyle ID is required.",
    });
  }

  if (!competitor.racquetId.trim()) {
    errors.push({
      path: `${path}.racquetId`,
      message: "Competitor racquet ID is required.",
    });
  }

  if (!isValidRating(competitor.racquetFamiliarity)) {
    errors.push({
      path: `${path}.racquetFamiliarity`,
      message: "Racquet familiarity must be between 0 and 100.",
    });
  }

  requireNonNegativeWholeNumber(
    competitor.timeoutsRemaining,
    `${path}.timeoutsRemaining`,
    errors,
  );

  for (
    const [field, value]
    of Object.entries(competitor.condition)
  ) {
    if (!isValidRating(value)) {
      errors.push({
        path: `${path}.condition.${field}`,
        message: `${field} must be between 0 and 100.`,
      });
    }
  }
}

export function validateMatchState(
  match: MatchState,
): MatchValidationResult {
  const errors: MatchValidationError[] = [];

  if (!match.metadata.id.trim()) {
    errors.push({
      path: "metadata.id",
      message: "Match ID is required.",
    });
  }

  if (!match.metadata.name.trim()) {
    errors.push({
      path: "metadata.name",
      message: "Match name is required.",
    });
  }

  if (!MATCH_STATUSES.includes(match.metadata.status)) {
    errors.push({
      path: "metadata.status",
      message: "Match status is invalid.",
    });
  }

  if (!match.metadata.ruleSetId.trim()) {
    errors.push({
      path: "metadata.ruleSetId",
      message: "A ruleset ID is required.",
    });
  }

  if (
    !Number.isInteger(match.metadata.year)
    || match.metadata.year < 1800
  ) {
    errors.push({
      path: "metadata.year",
      message: "Match year must be valid.",
    });
  }

  if (!Number.isInteger(match.metadata.randomSeed)) {
    errors.push({
      path: "metadata.randomSeed",
      message: "Random seed must be a whole number.",
    });
  }

  requireNonNegativeWholeNumber(
    match.metadata.elapsedSeconds,
    "metadata.elapsedSeconds",
    errors,
  );

  validateCompetitor(
    match.firstCompetitor,
    "firstCompetitor",
    errors,
  );

  validateCompetitor(
    match.secondCompetitor,
    "secondCompetitor",
    errors,
  );

  if (
    match.firstCompetitor.playerId
    === match.secondCompetitor.playerId
  ) {
    errors.push({
      path: "competitors",
      message: "A player cannot compete against themselves.",
    });
  }

  requireNonNegativeWholeNumber(
    match.score.firstPlayerGames,
    "score.firstPlayerGames",
    errors,
  );

  requireNonNegativeWholeNumber(
    match.score.secondPlayerGames,
    "score.secondPlayerGames",
    errors,
  );

  requireNonNegativeWholeNumber(
    match.score.currentGame.firstPlayerPoints,
    "score.currentGame.firstPlayerPoints",
    errors,
  );

  requireNonNegativeWholeNumber(
    match.score.currentGame.secondPlayerPoints,
    "score.currentGame.secondPlayerPoints",
    errors,
  );

  const competitorIds = new Set([
    match.firstCompetitor.playerId,
    match.secondCompetitor.playerId,
  ]);

  if (
    !competitorIds.has(
      match.score.currentGame.currentServerPlayerId,
    )
  ) {
    errors.push({
      path: "score.currentGame.currentServerPlayerId",
      message: "Current server must be one of the competitors.",
    });
  }

  if (
    !competitorIds.has(
      match.score.currentGame.currentReceiverPlayerId,
    )
  ) {
    errors.push({
      path: "score.currentGame.currentReceiverPlayerId",
      message: "Current receiver must be one of the competitors.",
    });
  }

  if (
    match.score.currentGame.currentServerPlayerId
    === match.score.currentGame.currentReceiverPlayerId
  ) {
    errors.push({
      path: "score.currentGame",
      message: "Server and receiver cannot be the same player.",
    });
  }

  if (
    match.currentEndAssignments.nearEndPlayerId
    === match.currentEndAssignments.farEndPlayerId
  ) {
    errors.push({
      path: "currentEndAssignments",
      message: "Both ends cannot be assigned to the same player.",
    });
  }

  requireNonNegativeWholeNumber(
    match.revision,
    "revision",
    errors,
  );

  return {
    valid: errors.length === 0,
    errors,
  };
}