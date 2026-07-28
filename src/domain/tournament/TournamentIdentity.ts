import type {
  EntityId,
  Year,
} from "../shared";

export interface TournamentIdentity {
  id: EntityId;

  name: string;

  shortName: string;

  hostCountryId: EntityId;

  hostCity: string;

  venue: string;

  year: Year;

  startDate: string;

  endDate: string;

  description: string;
}