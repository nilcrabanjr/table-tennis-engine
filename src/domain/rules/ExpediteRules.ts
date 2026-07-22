/**
 * Defines optional rules intended to prevent excessively long games.
 */
export interface ExpediteRules {
  enabled: boolean;

  /**
   * Number of elapsed game minutes after which expedite may begin.
   */
  activationAfterMinutes?: number;

  /**
   * Expedite does not begin if this many total points have already been
   * scored, unless undefined.
   */
  disabledAfterTotalPoints?: number;

  /**
   * Number of successful returns required for the receiver to win the point
   * under expedite.
   */
  receiverReturnTarget?: number;

  /**
   * Number of serves per turn while expedite is active.
   */
  servesPerTurnDuringExpedite: number;

  /**
   * Whether expedite remains active for the rest of the match after it is
   * introduced.
   */
  remainsActiveForMatch: boolean;
}

/**
 * Runtime state for expedite during a match.
 */
export interface ExpediteState {
  active: boolean;
  activatedInGame?: number;
  activatedAtElapsedSeconds?: number;
}