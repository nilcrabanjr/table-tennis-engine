import type {
  FixtureCompetitorSlot,
  TournamentFixture,
  TournamentRound,
  TournamentSchedule,
} from "./TournamentSchedule";

export function createDirectEntrySlot(
  entryId: string,
): FixtureCompetitorSlot {
  return {
    source: "direct-entry",
    entryId,
  };
}

export function createWinnerSlot(
  fixtureId: string,
): FixtureCompetitorSlot {
  return {
    source: "winner-of-fixture",
    sourceFixtureId: fixtureId,
  };
}

export function createByeSlot():
FixtureCompetitorSlot {
  return {
    source: "bye",
  };
}

export function createDefaultTournamentFixture(
  id: string,
  roundId: string,
  fixtureNumber: number,
): TournamentFixture {
  return {
    id,
    roundId,
    fixtureNumber,

    firstSlot: createByeSlot(),
    secondSlot: createByeSlot(),

    status: "not-scheduled",

    notes: [],
  };
}

export function createDefaultTournamentRound(
  id: string,
  name: string,
  roundNumber: number,
): TournamentRound {
  return {
    id,
    name,
    roundNumber,

    stage: "knockout",

    fixtureIds: [],

    completed: false,
  };
}

export function createDefaultTournamentSchedule():
TournamentSchedule {
  return {
    rounds: [],
    fixtures: [],
    revision: 0,
  };
}