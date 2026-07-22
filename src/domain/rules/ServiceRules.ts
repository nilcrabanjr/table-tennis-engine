/**
 * Defines service rotation and service-related rules.
 */
export interface ServiceRules {
  /**
   * Number of consecutive points served before service normally changes.
   */
  servesPerTurn: number;

  /**
   * Score at which deuce service rotation begins.
   *
   * For a game to 21 with win-by-two, this would normally be 20.
   */
  deuceStartsAt: number;

  /**
   * Number of consecutive serves after deuce begins.
   */
  deuceServesPerTurn: number;

  /**
   * Whether the server must begin with the ball resting on an open palm.
   */
  openPalmRequired: boolean;

  /**
   * Whether the ball must be projected upward during service.
   */
  upwardProjectionRequired: boolean;

  /**
   * Minimum legal vertical projection in centimetres.
   *
   * Undefined means the ruleset does not impose a precise minimum.
   */
  minimumProjectionCm?: number;

  /**
   * Whether the server may conceal contact from the receiver.
   */
  hiddenServeAllowed: boolean;

  /**
   * Whether a legal serve touching the net is replayed.
   */
  netServeIsLet: boolean;

  /**
   * Maximum number of consecutive service lets.
   *
   * Undefined means no special maximum.
   */
  maximumConsecutiveLets?: number;

  /**
   * Whether a player loses the point for an illegal serve.
   */
  illegalServeAwardsPoint: boolean;
}

/**
 * Returns the number of serves in one service turn at the current score.
 */
export function getServesPerTurn(
  firstScore: number,
  secondScore: number,
  rules: ServiceRules,
): number {
  const inDeuce =
    firstScore >= rules.deuceStartsAt
    && secondScore >= rules.deuceStartsAt;

  return inDeuce
    ? rules.deuceServesPerTurn
    : rules.servesPerTurn;
}

/**
 * Determines which player should serve.
 *
 * initialServerIndex must be 0 or 1.
 */
export function getServerIndex(
  firstScore: number,
  secondScore: number,
  initialServerIndex: 0 | 1,
  rules: ServiceRules,
): 0 | 1 {
  const totalPoints = firstScore + secondScore;

  const deuceStartTotal = rules.deuceStartsAt * 2;

  let serviceChanges: number;

  if (totalPoints < deuceStartTotal) {
    serviceChanges = Math.floor(
      totalPoints / rules.servesPerTurn,
    );
  } else {
    const changesBeforeDeuce = Math.floor(
      deuceStartTotal / rules.servesPerTurn,
    );

    const pointsAfterDeuce =
      totalPoints - deuceStartTotal;

    const changesAfterDeuce = Math.floor(
      pointsAfterDeuce / rules.deuceServesPerTurn,
    );

    serviceChanges =
      changesBeforeDeuce + changesAfterDeuce;
  }

  return serviceChanges % 2 === 0
    ? initialServerIndex
    : initialServerIndex === 0
      ? 1
      : 0;
}