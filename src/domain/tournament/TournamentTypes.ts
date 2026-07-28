import type {
  EntityId,
  Rating,
} from "../shared";

export const TOURNAMENT_CATEGORIES = [
  "local",
  "regional",
  "national",
  "continental",
  "world",
  "olympic",
  "exhibition",
] as const;

export type TournamentCategory =
  (typeof TOURNAMENT_CATEGORIES)[number];

export const TOURNAMENT_SURFACES = [
  "wood",
  "hardwood",
  "sport-floor",
] as const;

export type TournamentSurface =
  (typeof TOURNAMENT_SURFACES)[number];

export const TOURNAMENT_STATUSES = [
  "planned",
  "registration",
  "active",
  "completed",
  "cancelled",
] as const;

export type TournamentStatus =
  (typeof TOURNAMENT_STATUSES)[number];

export interface TournamentProperties {
  category: TournamentCategory;

  status: TournamentStatus;

  surface: TournamentSurface;

  prestige: Rating;

  rankingImportance: Rating;

  spectatorInterest: Rating;

  prizePrestige: Rating;

  hostFederationId?: EntityId;
}