import type {
  EntityId,
  Rating,
} from "../shared";

export const TOURNAMENT_ENTRY_KINDS = [
  "player",
  "doubles-pair",
  "team",
] as const;

export type TournamentEntryKind =
  (typeof TOURNAMENT_ENTRY_KINDS)[number];

export const TOURNAMENT_ENTRY_METHODS = [
  "automatic",
  "invitation",
  "qualification",
  "host-entry",
  "wildcard",
  "defending-champion",
  "ranking",
  "replacement",
] as const;

export type TournamentEntryMethod =
  (typeof TOURNAMENT_ENTRY_METHODS)[number];

export const TOURNAMENT_ENTRY_STATUSES = [
  "invited",
  "pending",
  "accepted",
  "qualified",
  "confirmed",
  "withdrawn",
  "rejected",
  "replaced",
  "disqualified",
] as const;

export type TournamentEntryStatus =
  (typeof TOURNAMENT_ENTRY_STATUSES)[number];

export interface QualificationDetails {
  method: TournamentEntryMethod;

  /**
   * Optional competition, ranking list, or process through which the
   * competitor qualified.
   */
  sourceId?: EntityId;

  sourceName?: string;

  qualificationPosition?: number;

  notes?: string;
}

export interface WithdrawalDetails {
  reason: string;

  withdrawnAtIso?: string;

  replacementEntryId?: EntityId;
}

export interface ReplacementDetails {
  replacedEntryId: EntityId;

  replacementReason: string;
}

/**
 * One competitor registered or invited to a tournament.
 *
 * Competitor members are stored as IDs so player and country data are not
 * duplicated inside the tournament.
 */
export interface TournamentEntry {
  id: EntityId;

  kind: TournamentEntryKind;

  displayName: string;

  /**
   * Singles entries normally contain one player.
   * Doubles entries normally contain two players.
   * Team entries may contain a larger squad.
   */
  playerIds: EntityId[];

  /**
   * Country represented by the entry.
   */
  countryId: EntityId;

  status: TournamentEntryStatus;

  qualification: QualificationDetails;

  /**
   * Seed is undefined for an unseeded entry.
   */
  seed?: number;

  /**
   * Ranking snapshot taken when the entry is accepted.
   */
  rankingAtEntry?: number;

  /**
   * Optional strength estimate used for draws and previews.
   * This does not provide a hidden match bonus.
   */
  entryStrength: Rating;

  withdrawal?: WithdrawalDetails;

  replacement?: ReplacementDetails;

  registeredAtIso?: string;

  notes?: string[];
}