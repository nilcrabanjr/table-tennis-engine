import type {
  EntityId,
  Rating,
  Year,
} from "../shared";

export interface DomesticLeague {
  id: EntityId;

  name: string;
  shortName: string;

  foundedYear?: Year;

  clubCount: number;
  divisionCount: number;

  professionalism: Rating;
  competitiveStrength: Rating;
  competitiveBalance: Rating;
  financialHealth: Rating;
  attendance: Rating;
  mediaInterest: Rating;
  internationalPrestige: Rating;
  matchIntensity: Rating;

  active: boolean;
}

export interface NationalChampionship {
  id: EntityId;

  name: string;
  foundedYear?: Year;

  singlesAvailable: boolean;
  doublesAvailable: boolean;
  teamEventAvailable: boolean;

  prestige: Rating;
  organisationQuality: Rating;
  participationLevel: Rating;

  active: boolean;
}

export interface DomesticCompetitionProfile {
  primaryLeague?: DomesticLeague;

  secondaryLeagueIds: EntityId[];
  domesticClubIds: EntityId[];

  nationalChampionship: NationalChampionship;

  regionalCompetitionQuality: Rating;
  amateurCompetitionQuality: Rating;
  juniorCompetitionQuality: Rating;

  annualDomesticMatchVolume: number;
}