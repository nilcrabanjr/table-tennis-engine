import {
  FIXTURE_SLOT_SOURCES,
  TOURNAMENT_FIXTURE_STATUSES,
  TOURNAMENT_ROUND_STAGES,
  type FixtureCompetitorSlot,
  type TournamentFixture,
  type TournamentSchedule,
} from "./TournamentSchedule";

import type {
  TournamentEntryProfile,
} from "./TournamentEntryProfile";

export interface TournamentScheduleValidationError {
  path: string;
  message: string;
}

export interface TournamentScheduleValidationResult {
  valid: boolean;
  errors: TournamentScheduleValidationError[];
}

function requirePositiveWholeNumber(
  value: number,
  path: string,
  errors: TournamentScheduleValidationError[],
): void {
  if (!Number.isInteger(value) || value < 1) {
    errors.push({
      path,
      message: `${path} must be a positive whole number.`,
    });
  }
}

function isValidIsoDate(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

function validateSlot(
  slot: FixtureCompetitorSlot,
  path: string,
  knownEntryIds: Set<string>,
  knownFixtureIds: Set<string>,
  errors: TournamentScheduleValidationError[],
): void {
  if (!FIXTURE_SLOT_SOURCES.includes(slot.source)) {
    errors.push({
      path: `${path}.source`,
      message: "Fixture slot source is invalid.",
    });

    return;
  }

  switch (slot.source) {
    case "direct-entry":
      if (!slot.entryId?.trim()) {
        errors.push({
          path: `${path}.entryId`,
          message: "A direct-entry slot requires an entry ID.",
        });
      } else if (!knownEntryIds.has(slot.entryId)) {
        errors.push({
          path: `${path}.entryId`,
          message: `${slot.entryId} is not a known tournament entry.`,
        });
      }
      break;

    case "winner-of-fixture":
    case "loser-of-fixture":
      if (!slot.sourceFixtureId?.trim()) {
        errors.push({
          path: `${path}.sourceFixtureId`,
          message:
            "This fixture slot requires a source fixture ID.",
        });
      } else if (!knownFixtureIds.has(slot.sourceFixtureId)) {
        errors.push({
          path: `${path}.sourceFixtureId`,
          message:
            `${slot.sourceFixtureId} is not a known fixture.`,
        });
      }
      break;

    case "group-position":
      if (!slot.sourceGroupId?.trim()) {
        errors.push({
          path: `${path}.sourceGroupId`,
          message:
            "A group-position slot requires a group ID.",
        });
      }

      if (
        slot.sourcePosition === undefined
        || !Number.isInteger(slot.sourcePosition)
        || slot.sourcePosition < 1
      ) {
        errors.push({
          path: `${path}.sourcePosition`,
          message:
            "Group position must be a positive whole number.",
        });
      }
      break;

    case "bye":
      break;
  }
}

function validateFixture(
  fixture: TournamentFixture,
  index: number,
  knownRoundIds: Set<string>,
  knownEntryIds: Set<string>,
  knownFixtureIds: Set<string>,
  errors: TournamentScheduleValidationError[],
): void {
  const path = `schedule.fixtures.${index}`;

  if (!fixture.id.trim()) {
    errors.push({
      path: `${path}.id`,
      message: "Fixture ID is required.",
    });
  }

  if (!knownRoundIds.has(fixture.roundId)) {
    errors.push({
      path: `${path}.roundId`,
      message: "Fixture must reference a known round.",
    });
  }

  requirePositiveWholeNumber(
    fixture.fixtureNumber,
    `${path}.fixtureNumber`,
    errors,
  );

  if (
    !TOURNAMENT_FIXTURE_STATUSES.includes(
      fixture.status,
    )
  ) {
    errors.push({
      path: `${path}.status`,
      message: "Fixture status is invalid.",
    });
  }

  validateSlot(
    fixture.firstSlot,
    `${path}.firstSlot`,
    knownEntryIds,
    knownFixtureIds,
    errors,
  );

  validateSlot(
    fixture.secondSlot,
    `${path}.secondSlot`,
    knownEntryIds,
    knownFixtureIds,
    errors,
  );

  if (
    fixture.firstSlot.source === "direct-entry"
    && fixture.secondSlot.source === "direct-entry"
    && fixture.firstSlot.entryId
    === fixture.secondSlot.entryId
  ) {
    errors.push({
      path,
      message:
        "A fixture cannot contain the same entry on both sides.",
    });
  }

  if (
    fixture.scheduledStartIso !== undefined
    && !isValidIsoDate(fixture.scheduledStartIso)
  ) {
    errors.push({
      path: `${path}.scheduledStartIso`,
      message: "Scheduled start must be a valid ISO date.",
    });
  }

  if (
    fixture.tableNumber !== undefined
    && (
      !Number.isInteger(fixture.tableNumber)
      || fixture.tableNumber < 1
    )
  ) {
    errors.push({
      path: `${path}.tableNumber`,
      message: "Table number must be a positive whole number.",
    });
  }

  if (
    fixture.status === "completed"
    && !fixture.result
  ) {
    errors.push({
      path: `${path}.result`,
      message: "A completed fixture requires a result.",
    });
  }

  if (
    fixture.status === "bye"
    && fixture.firstSlot.source !== "bye"
    && fixture.secondSlot.source !== "bye"
  ) {
    errors.push({
      path,
      message:
        "A bye fixture must contain at least one bye slot.",
    });
  }

  if (fixture.result) {
    if (!knownEntryIds.has(fixture.result.winnerEntryId)) {
      errors.push({
        path: `${path}.result.winnerEntryId`,
        message:
          "Fixture winner must be a known tournament entry.",
      });
    }

    if (
      fixture.result.loserEntryId !== undefined
      && !knownEntryIds.has(
        fixture.result.loserEntryId,
      )
    ) {
      errors.push({
        path: `${path}.result.loserEntryId`,
        message:
          "Fixture loser must be a known tournament entry.",
      });
    }
  }
}

export function validateTournamentSchedule(
  schedule: TournamentSchedule,
  entries: TournamentEntryProfile,
): TournamentScheduleValidationResult {
  const errors: TournamentScheduleValidationError[] = [];

  const roundIds = schedule.rounds.map(
    (round) => round.id,
  );

  const fixtureIds = schedule.fixtures.map(
    (fixture) => fixture.id,
  );

  const knownRoundIds = new Set(roundIds);
  const knownFixtureIds = new Set(fixtureIds);
  const knownEntryIds = new Set(
    entries.entries.map((entry) => entry.id),
  );

  if (knownRoundIds.size !== roundIds.length) {
    errors.push({
      path: "schedule.rounds",
      message: "Tournament round IDs must be unique.",
    });
  }

  if (knownFixtureIds.size !== fixtureIds.length) {
    errors.push({
      path: "schedule.fixtures",
      message: "Tournament fixture IDs must be unique.",
    });
  }

  schedule.rounds.forEach((round, index) => {
    const path = `schedule.rounds.${index}`;

    if (!round.id.trim()) {
      errors.push({
        path: `${path}.id`,
        message: "Round ID is required.",
      });
    }

    if (!round.name.trim()) {
      errors.push({
        path: `${path}.name`,
        message: "Round name is required.",
      });
    }

    requirePositiveWholeNumber(
      round.roundNumber,
      `${path}.roundNumber`,
      errors,
    );

    if (!TOURNAMENT_ROUND_STAGES.includes(round.stage)) {
      errors.push({
        path: `${path}.stage`,
        message: "Tournament round stage is invalid.",
      });
    }

    if (
      round.scheduledStartIso !== undefined
      && !isValidIsoDate(round.scheduledStartIso)
    ) {
      errors.push({
        path: `${path}.scheduledStartIso`,
        message: "Round start must be a valid ISO date.",
      });
    }

    if (
      round.scheduledEndIso !== undefined
      && !isValidIsoDate(round.scheduledEndIso)
    ) {
      errors.push({
        path: `${path}.scheduledEndIso`,
        message: "Round end must be a valid ISO date.",
      });
    }

    if (
      round.scheduledStartIso
      && round.scheduledEndIso
      && Date.parse(round.scheduledEndIso)
      < Date.parse(round.scheduledStartIso)
    ) {
      errors.push({
        path: `${path}.scheduledEndIso`,
        message:
          "Round end cannot precede its start.",
      });
    }

    const uniqueFixtureIds =
      new Set(round.fixtureIds);

    if (
      uniqueFixtureIds.size
      !== round.fixtureIds.length
    ) {
      errors.push({
        path: `${path}.fixtureIds`,
        message:
          "A round cannot repeat the same fixture ID.",
      });
    }

    for (const fixtureId of round.fixtureIds) {
      const fixture = schedule.fixtures.find(
        (candidate) => candidate.id === fixtureId,
      );

      if (!fixture) {
        errors.push({
          path: `${path}.fixtureIds`,
          message:
            `${fixtureId} is not a known fixture.`,
        });
      } else if (fixture.roundId !== round.id) {
        errors.push({
          path: `${path}.fixtureIds`,
          message:
            `${fixtureId} belongs to another round.`,
        });
      }
    }
  });

  schedule.fixtures.forEach(
    (fixture, index) =>
      validateFixture(
        fixture,
        index,
        knownRoundIds,
        knownEntryIds,
        knownFixtureIds,
        errors,
      ),
  );

  const roundNumbers = schedule.rounds.map(
    (round) => round.roundNumber,
  );

  if (
    new Set(roundNumbers).size
    !== roundNumbers.length
  ) {
    errors.push({
      path: "schedule.rounds.roundNumber",
      message: "Tournament round numbers must be unique.",
    });
  }

  if (
    !Number.isInteger(schedule.revision)
    || schedule.revision < 0
  ) {
    errors.push({
      path: "schedule.revision",
      message:
        "Schedule revision must be a non-negative whole number.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}