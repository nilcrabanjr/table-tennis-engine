import type { Rating } from "../shared";

/**
 * Persistent technical abilities belonging to a player.
 *
 * These values normally change only through training, ageing,
 * development, injury, or career progression.
 */
export interface TechnicalAttributes {
  /**
   * Ability to produce effective attacking forehand shots.
   */
  forehandAttack: Rating;

  /**
   * Ability to attack using the backhand side.
   */
  backhandAttack: Rating;

  /**
   * Ability to control forehand shots under normal pressure.
   */
  forehandControl: Rating;

  /**
   * Ability to control backhand shots under normal pressure.
   */
  backhandControl: Rating;

  /**
   * Reliability of repeated forehand execution.
   */
  forehandConsistency: Rating;

  /**
   * Reliability of repeated backhand execution.
   */
  backhandConsistency: Rating;

  /**
   * Quality of ordinary serves, including placement and contact.
   */
  serveQuality: Rating;

  /**
   * Ability to disguise spin, speed, length, and placement.
   */
  serveDeception: Rating;

  /**
   * Breadth of effective serve options.
   */
  serveVariation: Rating;

  /**
   * Ability to execute serves under pressure.
   */
  serveConsistency: Rating;

  /**
   * Ability to return serves with control.
   */
  returnQuality: Rating;

  /**
   * Ability to identify incoming serve spin.
   */
  serveReading: Rating;

  /**
   * Ability to cope with changing serve patterns.
   */
  returnAdaptability: Rating;

  /**
   * Ability to generate spin.
   */
  spinGeneration: Rating;

  /**
   * Ability to recognise and respond to incoming spin.
   */
  spinReading: Rating;

  /**
   * Ability to place the ball accurately.
   */
  placement: Rating;

  /**
   * Quality of delicate, low-force ball control.
   */
  touch: Rating;

  /**
   * Quality of pushing strokes.
   */
  push: Rating;

  /**
   * Quality of driving strokes.
   */
  drive: Rating;

  /**
   * Quality of flat attacking hits.
   */
  flatHit: Rating;

  /**
   * Ability to finish high or weak balls.
   */
  smash: Rating;

  /**
   * Quality of defensive chopping.
   */
  chop: Rating;

  /**
   * Ability to absorb and redirect attacking shots.
   */
  block: Rating;

  /**
   * Ability to counterattack against incoming pace.
   */
  counterAttack: Rating;

  /**
   * Ability to attack short balls over the table.
   */
  flick: Rating;

  /**
   * Ability to defend through high, deep returns.
   */
  lob: Rating;

  /**
   * Ability to execute disguised short or soft shots.
   */
  dropShot: Rating;

  /**
   * Ability to recover technical control from awkward positions.
   */
  emergencyControl: Rating;
}