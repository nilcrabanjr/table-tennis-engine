import {
  STANDING_QUALIFICATION_STATUSES,
  STANDING_TIEBREAKERS,
  type TournamentStandingRow,
  type TournamentStandings,
} from "./TournamentStandings";

import type {
  TournamentEntryProfile,
} from "./TournamentEntryProfile";

export interface TournamentStandingsValidationError {
  path: string;
  message: string;
}

export interface TournamentStandingsValidationResult {
  valid: boolean;
  errors: TournamentStandingsValidationError[];
}

function requireNonNegativeWholeNumber(
  value: number,
  path: string,
  errors: TournamentStandingsValidationError[],
): void {
  if (!Number.isInteger(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative whole number.`,
    });
  }
}

function requireNonNegativeNumber(
  value: number,
  path: string,
  errors: TournamentStandingsValidationError[],
): void {
  if (!Number.isFinite(value) || value < 0) {
    errors.push({
      path,
      message: `${path} must be a non-negative number.`,
    });
  }
}

function validateStandingRow(
  row: TournamentStandingRow,
  tableIndex: number,
  rowIndex: number,
  knownEntryIds: Set<string>,
  errors: TournamentStandingsValidationError[],
): void {
  const path =
    `standings.tables.${tableIndex}.rows.${rowIndex}`;

  if (!row.entryId.trim()) {
    errors.push({
      path: `${path}.entryId`,
      message: "Standing row entry ID is required.",
    });
  } else if (!knownEntryIds.has(row.entryId)) {
    errors.push({
      path: `${path}.entryId`,
      message:
        `${row.entryId} is not a known tournament entry.`,
    });
  }

  if (
    row.rank !== undefined
    && (
      !Number.isInteger(row.rank)
      || row.rank < 1
    )
  ) {
    errors.push({
      path: `${path}.rank`,
      message: "Standing rank must be a positive whole number.",
    });
  }

  if (
    row.seed !== undefined
    && (
      !Number.isInteger(row.seed)
      || row.seed < 1
    )
  ) {
    errors.push({
      path: `${path}.seed`,
      message: "Standing seed must be a positive whole number.",
    });
  }

  const countFields = [
    "matchesPlayed",
    "matchesWon",
    "matchesLost",
    "gamesWon",
    "gamesLost",
    "pointsWon",
    "pointsLost",
    "tournamentPoints",
  ] as const;

  for (const field of countFields) {
    requireNonNegativeWholeNumber(
      row[field],
      `${path}.${field}`,
      errors,
    );
  }

  for (
    const field of [
      "headToHeadValue",
      "buchholz",
      "sonnebornBerger",
    ] as const
  ) {
    requireNonNegativeNumber(
      row[field],
      `${path}.${field}`,
      errors,
    );
  }

  if (
    row.matchesWon + row.matchesLost
    > row.matchesPlayed
  ) {
    errors.push({
      path: `${path}.matchesPlayed`,
      message:
        "Wins and losses cannot exceed matches played.",
    });
  }

  if (
    !STANDING_QUALIFICATION_STATUSES.includes(
      row.qualificationStatus,
    )
  ) {
    errors.push({
      path: `${path}.qualificationStatus`,
      message: "Qualification status is invalid.",
    });
  }
}

export function validateTournamentStandings(
  standings: TournamentStandings,
  entries: TournamentEntryProfile,
): TournamentStandingsValidationResult {
  const errors: TournamentStandingsValidationError[] = [];

  const knownEntryIds = new Set(
    entries.entries.map((entry) => entry.id),
  );

  const tableIds = standings.tables.map(
    (table) => table.id,
  );

  if (new Set(tableIds).size !== tableIds.length) {
    errors.push({
      path: "standings.tables",
      message: "Standing table IDs must be unique.",
    });
  }

  standings.tables.forEach((table, tableIndex) => {
    const path = `standings.tables.${tableIndex}`;

    if (!table.id.trim()) {
      errors.push({
        path: `${path}.id`,
        message: "Standing table ID is required.",
      });
    }

    if (!table.name.trim()) {
      errors.push({
        path: `${path}.name`,
        message: "Standing table name is required.",
      });
    }

    const rowEntryIds = table.rows.map(
      (row) => row.entryId,
    );

    if (
      new Set(rowEntryIds).size
      !== rowEntryIds.length
    ) {
      errors.push({
        path: `${path}.rows`,
        message:
          "An entry cannot appear more than once in one table.",
      });
    }

    const assignedRanks = table.rows
      .map((row) => row.rank)
      .filter(
        (rank): rank is number =>
          rank !== undefined,
      );

    if (
      new Set(assignedRanks).size
      !== assignedRanks.length
    ) {
      errors.push({
        path: `${path}.rows.rank`,
        message:
          "Assigned ranks must be unique within a table.",
      });
    }

    table.rows.forEach((row, rowIndex) => {
      validateStandingRow(
        row,
        tableIndex,
        rowIndex,
        knownEntryIds,
        errors,
      );
    });
  });

  if (standings.tiebreakOrder.length === 0) {
    errors.push({
      path: "standings.tiebreakOrder",
      message:
        "At least one standings tiebreaker is required.",
    });
  }

  if (
    new Set(standings.tiebreakOrder).size
    !== standings.tiebreakOrder.length
  ) {
    errors.push({
      path: "standings.tiebreakOrder",
      message:
        "The same standings tiebreaker cannot be repeated.",
    });
  }

  for (const tiebreaker of standings.tiebreakOrder) {
    if (!STANDING_TIEBREAKERS.includes(tiebreaker)) {
      errors.push({
        path: "standings.tiebreakOrder",
        message: `Unknown standings tiebreaker: ${tiebreaker}.`,
      });
    }
  }

  if (
    !Number.isInteger(standings.revision)
    || standings.revision < 0
  ) {
    errors.push({
      path: "standings.revision",
      message:
        "Standings revision must be a non-negative whole number.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}