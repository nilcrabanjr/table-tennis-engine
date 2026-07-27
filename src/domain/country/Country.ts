import type {
  EntityId,
  Year,
} from "../shared";

import type { CoachingProfile } from "./CoachingProfile";
import type { CountryIdentity } from "./CountryIdentity";
import type { CountryPlayerPool } from "./CountryPlayerPool";
import type { CountryRecords } from "./CountryRecords";
import type { CultureProfile } from "./CultureProfile";
import type { DemographicsProfile } from "./DemographicsProfile";
import type { DevelopmentProfile } from "./DevelopmentProfile";
import type { DomesticCompetitionProfile } from "./DomesticCompetitionProfile";
import type { FederationProfile } from "./FederationProfile";
import type { GeographyProfile } from "./GeographyProfile";
import type { NationalTeamProfile } from "./NationalTeamProfile";

/**
 * Complete persistent country entity.
 *
 * Each major area is separated into a focused profile so the country model
 * remains maintainable as the simulation grows.
 */
export interface Country {
  id: EntityId;

  identity: CountryIdentity;
  geography: GeographyProfile;
  demographics: DemographicsProfile;

  federation: FederationProfile;
  coaching: CoachingProfile;
  development: DevelopmentProfile;
  culture: CultureProfile;

  domesticCompetition: DomesticCompetitionProfile;
  nationalTeams: NationalTeamProfile;
  playerPool: CountryPlayerPool;
  records: CountryRecords;

  /**
   * Optional ruleset normally used by the country's domestic competitions.
   */
  defaultRuleSetId?: EntityId;

  /**
   * Optional playstyle associated with the national development system.
   */
  nationalPlaystyleId?: EntityId;

  createdYear?: Year;
  lastModifiedYear?: Year;

  notes?: string[];

  builtIn: boolean;
}