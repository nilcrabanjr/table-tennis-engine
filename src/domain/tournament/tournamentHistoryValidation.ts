import {
  TOURNAMENT_PODIUM_PLACES,
  type TournamentEditionSummary,
  type TournamentSeriesHistory,
} from "./TournamentHistory";

export interface TournamentHistoryValidationError {
  path: string;
  message: string;
}

export interface TournamentHistoryValidationResult {
  valid: boolean;
  errors: TournamentHistoryValidationError[];
}

function requireNonNegativeWholeNumber(
  value: number,
  path: string,
  errors: TournamentHistoryValidationError[],
): void {
  if (!Number.isInteger(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative whole number.`,
    });
  }
}

function validateEdition(
  edition: TournamentEditionSummary,
  index: number,
  errors: TournamentHistoryValidationError[],
): void {
  const path = `history.editions.${index}`;

  if (!edition.id.trim()) {
    errors.push({
      path: `${path}.id`,
      message: "Edition ID is required.",
    });
  }

  if (!edition.tournamentSeriesId.trim()) {
    errors.push({
      path: `${path}.tournamentSeriesId`,
      message: "Tournament series ID is required.",
    });
  }

  if (!edition.name.trim()) {
    errors.push({
      path: `${path}.name`,
      message: "Edition name is required.",
    });
  }

  if (
    !Number.isInteger(edition.year)
    || edition.year < 1800
  ) {
    errors.push({
      path: `${path}.year`,
      message: "Edition year must be valid.",
    });
  }

  if (!edition.hostCountryId.trim()) {
    errors.push({
      path: `${path}.hostCountryId`,
      message: "Host country ID is required.",
    });
  }

  if (!edition.hostCity.trim()) {
    errors.push({
      path: `${path}.hostCity`,
      message: "Host city is required.",
    });
  }

  requireNonNegativeWholeNumber(
    edition.entryCount,
    `${path}.entryCount`,
    errors,
  );

  requireNonNegativeWholeNumber(
    edition.matchCount,
    `${path}.matchCount`,
    errors,
  );

  const podiumPlaces = edition.podium.map(
    (result) => result.place,
  );

  if (
    new Set(podiumPlaces).size
    !== podiumPlaces.length
  ) {
    errors.push({
      path: `${path}.podium`,
      message: "Podium places must be unique.",
    });
  }

  edition.podium.forEach((result, podiumIndex) => {
    const podiumPath =
      `${path}.podium.${podiumIndex}`;

    if (
      !TOURNAMENT_PODIUM_PLACES.includes(
        result.place,
      )
    ) {
      errors.push({
        path: `${podiumPath}.place`,
        message: "Podium place is invalid.",
      });
    }

    if (!result.displayName.trim()) {
      errors.push({
        path: `${podiumPath}.displayName`,
        message: "Podium display name is required.",
      });
    }
  });

  const champion = edition.podium.find(
    (result) => result.place === "champion",
  );

  const runnerUp = edition.podium.find(
    (result) => result.place === "runner-up",
  );

  if (edition.completed && !champion) {
    errors.push({
      path: `${path}.podium`,
      message:
        "A completed edition must have a champion.",
    });
  }

  if (
    edition.championEntryId !== undefined
    && champion?.entryId !== edition.championEntryId
  ) {
    errors.push({
      path: `${path}.championEntryId`,
      message:
        "Champion entry ID must match the podium champion.",
    });
  }

  if (
    edition.runnerUpEntryId !== undefined
    && runnerUp?.entryId !== edition.runnerUpEntryId
  ) {
    errors.push({
      path: `${path}.runnerUpEntryId`,
      message:
        "Runner-up entry ID must match the podium runner-up.",
    });
  }
}

export function validateTournamentHistory(
  history: TournamentSeriesHistory,
): TournamentHistoryValidationResult {
  const errors: TournamentHistoryValidationError[] = [];

  if (!history.seriesId.trim()) {
    errors.push({
      path: "history.seriesId",
      message: "Tournament series ID is required.",
    });
  }

  if (!history.seriesName.trim()) {
    errors.push({
      path: "history.seriesName",
      message: "Tournament series name is required.",
    });
  }

  history.editions.forEach(
    (edition, index) =>
      validateEdition(edition, index, errors),
  );

  const editionIds = history.editions.map(
    (edition) => edition.id,
  );

  if (
    new Set(editionIds).size
    !== editionIds.length
  ) {
    errors.push({
      path: "history.editions",
      message: "Tournament edition IDs must be unique.",
    });
  }

  const editionYears = history.editions.map(
    (edition) => edition.year,
  );

  if (
    new Set(editionYears).size
    !== editionYears.length
  ) {
    errors.push({
      path: "history.editions.year",
      message:
        "Tournament series cannot contain duplicate edition years.",
    });
  }

  requireNonNegativeWholeNumber(
    history.totalEditions,
    "history.totalEditions",
    errors,
  );

  requireNonNegativeWholeNumber(
    history.totalMatchesPlayed,
    "history.totalMatchesPlayed",
    errors,
  );

  requireNonNegativeWholeNumber(
    history.totalEntries,
    "history.totalEntries",
    errors,
  );

  if (
    history.totalEditions !== history.editions.length
  ) {
    errors.push({
      path: "history.totalEditions",
      message:
        "Total editions must match the number of edition records.",
    });
  }

  const calculatedMatches =
    history.editions.reduce(
      (sum, edition) => sum + edition.matchCount,
      0,
    );

  if (
    history.totalMatchesPlayed
    !== calculatedMatches
  ) {
    errors.push({
      path: "history.totalMatchesPlayed",
      message:
        "Total matches must equal the sum of edition match counts.",
    });
  }

  const calculatedEntries =
    history.editions.reduce(
      (sum, edition) => sum + edition.entryCount,
      0,
    );

  if (history.totalEntries !== calculatedEntries) {
    errors.push({
      path: "history.totalEntries",
      message:
        "Total entries must equal the sum of edition entry counts.",
    });
  }

  if (history.editions.length > 0) {
    const years = history.editions.map(
      (edition) => edition.year,
    );

    const firstYear = Math.min(...years);
    const latestYear = Math.max(...years);

    if (
      history.firstEditionYear !== firstYear
    ) {
      errors.push({
        path: "history.firstEditionYear",
        message:
          "First edition year does not match the edition history.",
      });
    }

    if (
      history.latestEditionYear !== latestYear
    ) {
      errors.push({
        path: "history.latestEditionYear",
        message:
          "Latest edition year does not match the edition history.",
      });
    }
  }

  const recordIds = history.records.map(
    (record) => record.id,
  );

  if (
    new Set(recordIds).size
    !== recordIds.length
  ) {
    errors.push({
      path: "history.records",
      message: "Tournament record IDs must be unique.",
    });
  }

  history.records.forEach((record, index) => {
    const path = `history.records.${index}`;

    if (!record.id.trim()) {
      errors.push({
        path: `${path}.id`,
        message: "Tournament record ID is required.",
      });
    }

    if (!record.name.trim()) {
      errors.push({
        path: `${path}.name`,
        message: "Tournament record name is required.",
      });
    }

    if (!record.holderDisplayName.trim()) {
      errors.push({
        path: `${path}.holderDisplayName`,
        message: "Record holder name is required.",
      });
    }

    if (
      !Number.isFinite(record.value)
      || record.value < 0
    ) {
      errors.push({
        path: `${path}.value`,
        message:
          "Tournament record value must be non-negative.",
      });
    }

    if (!record.unit.trim()) {
      errors.push({
        path: `${path}.unit`,
        message: "Tournament record unit is required.",
      });
    }
  });

  if (
    !Number.isInteger(history.revision)
    || history.revision < 0
  ) {
    errors.push({
      path: "history.revision",
      message:
        "History revision must be a non-negative whole number.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}