import type {
  EntityId,
  Rating,
} from "../shared";

export const NATIONAL_SQUAD_TYPES = [
  "men",
  "women",
  "open",
  "youth-men",
  "youth-women",
  "youth-open",
] as const;

export type NationalSquadType =
  (typeof NATIONAL_SQUAD_TYPES)[number];

export interface NationalSquad {
  id: EntityId;

  name: string;
  type: NationalSquadType;

  playerIds: EntityId[];
  captainPlayerId?: EntityId;
  coachId?: EntityId;

  squadLimit: number;

  cohesion: Rating;
  tacticalPreparation: Rating;
  morale: Rating;
  depth: Rating;

  active: boolean;
}

export interface NationalTeamProfile {
  squads: NationalSquad[];

  selectionQuality: Rating;
  trainingCampQuality: Rating;
  doublesPreparation: Rating;
  internationalScheduling: Rating;
  travelSupport: Rating;
  medicalSupport: Rating;

  preferredHomeVenueId?: EntityId;
}