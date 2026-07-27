import type {
  EntityId,
  Year,
} from "../shared";

export interface CountryTitleRecord {
  competitionId?: EntityId;
  competitionName: string;

  year: Year;

  category:
    | "men-singles"
    | "women-singles"
    | "open-singles"
    | "men-doubles"
    | "women-doubles"
    | "mixed-doubles"
    | "team";

  playerIds: EntityId[];
}

export interface CountryMedalRecord {
  gold: number;
  silver: number;
  bronze: number;
}

export interface CountryRecords {
  internationalTeamMatchesPlayed: number;
  internationalTeamMatchesWon: number;
  internationalTeamMatchesLost: number;

  individualWorldTitles: number;
  doublesWorldTitles: number;
  teamWorldTitles: number;

  continentalTitles: number;
  majorTournamentTitles: number;

  medals: CountryMedalRecord;

  titleHistory: CountryTitleRecord[];

  highestWorldTeamRanking?: number;
  highestWorldTeamRankingYear?: Year;

  longestTeamWinningStreak: number;

  mostCappedPlayerId?: EntityId;
  mostSuccessfulPlayerId?: EntityId;
}