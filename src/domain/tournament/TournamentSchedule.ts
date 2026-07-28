import type {
  EntityId,
} from "../shared";

export const TOURNAMENT_ROUND_STAGES = [
  "group",
  "knockout",
  "league",
  "swiss",
  "placement",
] as const;

export type TournamentRoundStage =
  (typeof TOURNAMENT_ROUND_STAGES)[number];

export const TOURNAMENT_FIXTURE_STATUSES = [
  "not-scheduled",
  "scheduled",
  "ready",
  "in-progress",
  "completed",
  "bye",
  "walkover",
  "cancelled",
] as const;

export type TournamentFixtureStatus =
  (typeof TOURNAMENT_FIXTURE_STATUSES)[number];

export const FIXTURE_SLOT_SOURCES = [
  "direct-entry",
  "winner-of-fixture",
  "loser-of-fixture",
  "group-position",
  "bye",
] as const;

export type FixtureSlotSource =
  (typeof FIXTURE_SLOT_SOURCES)[number];

/**
 * Describes how a competitor reaches one side of a fixture.
 */
export interface FixtureCompetitorSlot {
  source: FixtureSlotSource;

  /**
   * Used when the competitor is already known.
   */
  entryId?: EntityId;

  /**
   * Used for winner-of-fixture and loser-of-fixture slots.
   */
  sourceFixtureId?: EntityId;

  /**
   * Used for group-position slots.
   */
  sourceGroupId?: EntityId;
  sourcePosition?: number;
}

export interface TournamentFixtureResult {
  winnerEntryId: EntityId;
  loserEntryId?: EntityId;

  firstEntryGamesWon?: number;
  secondEntryGamesWon?: number;

  decidedBy:
    | "played"
    | "bye"
    | "walkover"
    | "retirement"
    | "disqualification";
}

/**
 * One scheduled tournament contest.
 */
export interface TournamentFixture {
  id: EntityId;

  roundId: EntityId;
  fixtureNumber: number;

  firstSlot: FixtureCompetitorSlot;
  secondSlot: FixtureCompetitorSlot;

  status: TournamentFixtureStatus;

  /**
   * ID of the detailed match state after a match is created.
   */
  matchId?: EntityId;

  scheduledStartIso?: string;

  venue?: string;
  room?: string;
  tableNumber?: number;

  result?: TournamentFixtureResult;

  notes?: string[];
}

export interface TournamentRound {
  id: EntityId;

  name: string;
  roundNumber: number;

  stage: TournamentRoundStage;

  fixtureIds: EntityId[];

  scheduledStartIso?: string;
  scheduledEndIso?: string;

  completed: boolean;
}

export interface TournamentSchedule {
  rounds: TournamentRound[];
  fixtures: TournamentFixture[];

  /**
   * Incremented whenever the draw or schedule changes.
   */
  revision: number;
}

export function getTournamentFixture(
  schedule: TournamentSchedule,
  fixtureId: EntityId,
): TournamentFixture | undefined {
  return schedule.fixtures.find(
    (fixture) => fixture.id === fixtureId,
  );
}

export function getRoundFixtures(
  schedule: TournamentSchedule,
  roundId: EntityId,
): TournamentFixture[] {
  const round = schedule.rounds.find(
    (candidate) => candidate.id === roundId,
  );

  if (!round) {
    return [];
  }

  const fixtureMap = new Map(
    schedule.fixtures.map(
      (fixture) => [fixture.id, fixture],
    ),
  );

  return round.fixtureIds
    .map((fixtureId) => fixtureMap.get(fixtureId))
    .filter(
      (fixture): fixture is TournamentFixture =>
        fixture !== undefined,
    )
    .sort(
      (first, second) =>
        first.fixtureNumber - second.fixtureNumber,
    );
}

export function getScheduledFixtures(
  schedule: TournamentSchedule,
): TournamentFixture[] {
  return schedule.fixtures
    .filter((fixture) => fixture.scheduledStartIso)
    .sort((first, second) =>
      (first.scheduledStartIso ?? "").localeCompare(
        second.scheduledStartIso ?? "",
      ),
    );
}