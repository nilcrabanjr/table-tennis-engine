import type {
  EntityId,
  Rating,
  ShotType,
  TableDistance,
  TargetZone,
} from "../shared";

export interface ShotPreference {
  shotType: ShotType;

  /**
   * Likelihood of selecting this shot when it is available.
   */
  preference: Rating;

  /**
   * Willingness to attempt the shot under difficult conditions.
   */
  riskTolerance: Rating;
}

export interface PlacementPreference {
  targetZone: TargetZone;
  preference: Rating;
}

export interface PlaystyleMatchup {
  opponentPlaystyleId: EntityId;

  /**
   * Tactical comfort against this opponent style.
   *
   * 50 is neutral.
   */
  comfort: Rating;

  notes?: string;
}

export interface Playstyle {
  id: EntityId;

  name: string;
  shortName: string;
  description: string;

  preferredDistance: TableDistance;

  /**
   * General attacking tendency.
   */
  aggression: Rating;

  /**
   * Preference for shorter or longer rallies.
   *
   * 0 strongly prefers short rallies.
   * 100 strongly prefers long rallies.
   */
  rallyLengthPreference: Rating;

  /**
   * Preference for fast or slow rally tempo.
   */
  tempoPreference: Rating;

  /**
   * Willingness to attempt difficult shots.
   */
  riskTolerance: Rating;

  /**
   * Natural preference for using spin.
   */
  spinPreference: Rating;

  /**
   * Preference for precise placement over raw pace.
   */
  placementFocus: Rating;

  /**
   * Preference for taking the initiative.
   */
  initiativeSeeking: Rating;

  /**
   * Willingness to absorb pressure defensively.
   */
  defensivePatience: Rating;

  /**
   * Energy required to maintain this style.
   */
  staminaDemand: Rating;

  /**
   * Difficulty of mastering this style.
   */
  technicalDemand: Rating;

  shotPreferences: ShotPreference[];
  placementPreferences: PlacementPreference[];
  matchups: PlaystyleMatchup[];

  builtIn: boolean;
}