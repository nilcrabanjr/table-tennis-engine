import type { EntityId } from "../shared";
import type { ExpediteState } from "../rules";

import type { MatchCompetitor } from "./MatchCompetitor";
import type { MatchMetadata } from "./MatchMetadata";
import type { PointEvent } from "./PointEvent";
import type { RallyState } from "./RallyState";
import type { MatchScoreState } from "./ScoreState";

export interface MatchState {
  metadata: MatchMetadata;

  firstCompetitor: MatchCompetitor;
  secondCompetitor: MatchCompetitor;

  score: MatchScoreState;

  currentRally?: RallyState;

  pointHistory: PointEvent[];

  expedite: ExpediteState;

  /**
   * IDs of players who have changed ends during the current game.
   */
  currentEndAssignments: {
    nearEndPlayerId: EntityId;
    farEndPlayerId: EntityId;
  };

  paused: boolean;

  /**
   * Used to ensure all state changes occur in a predictable order.
   */
  revision: number;
}