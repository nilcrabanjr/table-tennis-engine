/**
 * Shared primitive and categorical types used throughout the engine.
 *
 * Option arrays are declared with `as const`, allowing TypeScript to derive
 * strict union types while still giving the application runtime lists that
 * can be used in forms and dropdown menus.
 */

export type EntityId = string;

export type Year = number;

export type HexColour = string;

/**
 * Competition categories are separate from a player's personal identity.
 *
 * This allows the rules of a tournament to specify whether it is a men's,
 * women's, mixed, or open competition.
 */
export const COMPETITION_CATEGORIES = [
  "men",
  "women",
  "mixed",
  "open",
] as const;

/**
 * Category in which an individual player normally competes.
 *
 * "mixed" is not included because mixed describes a competition or pair,
 * rather than an individual player's usual category.
 */
export const PLAYER_CATEGORIES = [
  "men",
  "women",
  "open",
] as const;

export type PlayerCategory =
  (typeof PLAYER_CATEGORIES)[number];

export type CompetitionCategory =
  (typeof COMPETITION_CATEGORIES)[number];

/**
 * Player handedness.
 */
export const HANDEDNESSES = [
  "right",
  "left",
  "ambidextrous",
] as const;

export type Handedness = (typeof HANDEDNESSES)[number];

/**
 * Primary racquet grip.
 *
 * Some grips may not be historically available in every ruleset.
 * Era availability will be handled later by equipment and rules validation.
 */
export const GRIP_TYPES = [
  "shakehand",
  "penhold",
  "seemiller",
  "custom",
] as const;

export type GripType = (typeof GRIP_TYPES)[number];

/**
 * A broad reputation category.
 *
 * Tiers are primarily used for display, squad selection, commentary,
 * reputation, and player generation. They will not secretly award points.
 */
export const PLAYER_TIERS = [
  "amateur",
  "standard",
  "key",
  "star",
  "legend",
] as const;

export type PlayerTier = (typeof PLAYER_TIERS)[number];

/**
 * General playing-style identifiers supplied by the engine.
 *
 * Custom playstyles will eventually be stored as user-created entities with
 * their own IDs, so a player's actual playstyle reference will be an EntityId.
 */
export const BUILT_IN_PLAYSTYLE_IDS = [
  "classic-defender",
  "chopper",
  "all-round-defender",
  "counter-attacker",
  "close-table-blocker",
  "balanced-all-rounder",
  "aggressive-all-rounder",
  "forehand-attacker",
  "penhold-attacker",
  "serve-third-ball-attacker",
] as const;

export type BuiltInPlaystyleId =
  (typeof BUILT_IN_PLAYSTYLE_IDS)[number];

/**
 * General player distance from the table.
 */
export const TABLE_DISTANCES = [
  "very-close",
  "close",
  "mid",
  "far",
  "very-far",
] as const;

export type TableDistance = (typeof TABLE_DISTANCES)[number];

/**
 * Ball spin classifications.
 */
export const SPIN_TYPES = [
  "none",
  "topspin",
  "backspin",
  "sidespin-left",
  "sidespin-right",
  "topside-left",
  "topside-right",
  "backside-left",
  "backside-right",
] as const;

export type SpinType = (typeof SPIN_TYPES)[number];

/**
 * Shot types available to the simulation.
 *
 * Whether a player chooses or can effectively execute a shot will later
 * depend on era, attributes, position, incoming ball, tactics, and equipment.
 */
export const SHOT_TYPES = [
  "serve",
  "push",
  "drive",
  "flat-hit",
  "smash",
  "block",
  "chop",
  "counter",
  "flick",
  "lob",
  "drop-shot",
] as const;

export type ShotType = (typeof SHOT_TYPES)[number];

/**
 * Approximate side of the body used to execute a shot.
 */
export const SHOT_SIDES = [
  "forehand",
  "backhand",
  "body",
] as const;

export type ShotSide = (typeof SHOT_SIDES)[number];

/**
 * Table locations that can be targeted by a player.
 */
export const TARGET_ZONES = [
  "short-forehand",
  "short-middle",
  "short-backhand",
  "deep-forehand",
  "deep-middle",
  "deep-backhand",
  "wide-forehand",
  "wide-backhand",
  "elbow",
] as const;

export type TargetZone = (typeof TARGET_ZONES)[number];

/**
 * Possible serve lengths.
 */
export const SERVE_LENGTHS = [
  "very-short",
  "short",
  "half-long",
  "long",
] as const;

export type ServeLength = (typeof SERVE_LENGTHS)[number];

/**
 * Broad equipment surface categories.
 */
export const RUBBER_TYPES = [
  "bare-wood",
  "sandpaper",
  "hard-rubber",
  "short-pips",
  "long-pips",
  "custom",
] as const;

export type RubberType = (typeof RUBBER_TYPES)[number];

/**
 * Racquet handle forms.
 */
export const HANDLE_TYPES = [
  "straight",
  "flared",
  "anatomic",
  "penhold-chinese",
  "penhold-japanese",
  "custom",
] as const;

export type HandleType = (typeof HANDLE_TYPES)[number];

/**
 * Types of equipment records stored by the application.
 */
export const EQUIPMENT_CATEGORIES = [
  "blade",
  "rubber",
  "racquet",
] as const;

export type EquipmentCategory =
  (typeof EQUIPMENT_CATEGORIES)[number];

/**
 * Match structures.
 */
export const MATCH_TYPES = [
  "singles",
  "doubles",
  "team",
] as const;

export type MatchType = (typeof MATCH_TYPES)[number];

/**
 * Tournament structures supported by the planned tournament engine.
 */
export const TOURNAMENT_FORMATS = [
  "single-elimination",
  "double-elimination",
  "round-robin",
  "group-knockout",
  "swiss",
  "league",
] as const;

export type TournamentFormat =
  (typeof TOURNAMENT_FORMATS)[number];

/**
 * Current status of a match.
 */
export const MATCH_STATUSES = [
  "not-started",
  "in-progress",
  "paused",
  "completed",
  "abandoned",
] as const;

export type MatchStatus = (typeof MATCH_STATUSES)[number];

/**
 * Current phase within a rally.
 */
export const RALLY_PHASES = [
  "pre-serve",
  "serve",
  "return",
  "third-ball",
  "open-rally",
  "defensive-scramble",
  "point-ended",
] as const;

export type RallyPhase = (typeof RALLY_PHASES)[number];

/**
 * Outcome of a shot or point-ending event.
 */
export const SHOT_OUTCOMES = [
  "continued",
  "clean-winner",
  "forced-error",
  "unforced-error",
  "failed-return",
  "service-error",
  "net",
  "long",
  "wide",
  "edge",
  "weak-return",
  "neutral-return",
  "strong-return",
] as const;

export type ShotOutcome = (typeof SHOT_OUTCOMES)[number];