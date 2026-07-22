/**
 * Defines how games and matches are won.
 */
export interface ScoringRules {
  /**
   * Number of points normally required to win one game.
   */
  pointsToWinGame: number;

  /**
   * Minimum lead required to win after reaching the target score.
   *
   * Normally this is two.
   */
  minimumWinningMargin: number;

  /**
   * Maximum number of games that may be played.
   *
   * This must be a positive odd number for normal best-of formats.
   */
  bestOfGames: number;

  /**
   * Optional score cap.
   *
   * When present, the first player reaching this score wins even without
   * achieving the ordinary winning margin.
   */
  gameScoreCap?: number;

  /**
   * Whether players change ends during the deciding game.
   */
  changeEndsInFinalGame: boolean;

  /**
   * Score reached by the first player that triggers the change of ends in
   * the deciding game.
   */
  finalGameChangeEndsAt: number;
}

/**
 * Calculates the number of games needed to win a match.
 */
export function gamesRequiredToWin(
  rules: ScoringRules,
): number {
  return Math.floor(rules.bestOfGames / 2) + 1;
}

/**
 * Determines whether the supplied score completes a game.
 */
export function isGameComplete(
  firstScore: number,
  secondScore: number,
  rules: ScoringRules,
): boolean {
  const highestScore = Math.max(firstScore, secondScore);
  const margin = Math.abs(firstScore - secondScore);

  if (
    rules.gameScoreCap !== undefined
    && highestScore >= rules.gameScoreCap
  ) {
    return firstScore !== secondScore;
  }

  return (
    highestScore >= rules.pointsToWinGame
    && margin >= rules.minimumWinningMargin
  );
}