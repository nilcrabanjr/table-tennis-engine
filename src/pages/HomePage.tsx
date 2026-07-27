import {
  BUILT_IN_PLAYSTYLES,
  CLASSIC_DEFENDER,
  FOREHAND_ATTACKER,
  describeRating,
  validatePlaystyle,
} from "../domain";

export function HomePage() {
  const defenderValidation =
    validatePlaystyle(CLASSIC_DEFENDER);

  const attackerValidation =
    validatePlaystyle(FOREHAND_ATTACKER);

  const valid =
    defenderValidation.valid
    && attackerValidation.valid;

  const defenderMatchup =
    CLASSIC_DEFENDER.matchups.find(
      (matchup) =>
        matchup.opponentPlaystyleId
        === FOREHAND_ATTACKER.id,
    );

  const attackerMatchup =
    FOREHAND_ATTACKER.matchups.find(
      (matchup) =>
        matchup.opponentPlaystyleId
        === CLASSIC_DEFENDER.id,
    );

  const errors = [
    ...defenderValidation.errors,
    ...attackerValidation.errors,
  ];

  return (
    <section className="page">
      <h1>Table Tennis Engine</h1>

      <p>
        Create fictional countries, players, equipment, tournaments,
        and detailed table tennis matches.
      </p>

      <div className="placeholder-panel">
        <h2>Playstyle system</h2>

        <p>
          Playstyles now define shot selection, preferred distance,
          aggression, rally behaviour, placement, physical demand,
          and matchup comfort.
        </p>

        <dl>
          <dt>System valid</dt>
          <dd>{valid ? "Yes" : "No"}</dd>

          <dt>Built-in playstyles</dt>
          <dd>{BUILT_IN_PLAYSTYLES.length}</dd>

          <dt>Defender style</dt>
          <dd>{CLASSIC_DEFENDER.name}</dd>

          <dt>Preferred distance</dt>
          <dd>{CLASSIC_DEFENDER.preferredDistance}</dd>

          <dt>Defensive patience</dt>
          <dd>
            {CLASSIC_DEFENDER.defensivePatience}
            {" — "}
            {describeRating(
              CLASSIC_DEFENDER.defensivePatience,
            )}
          </dd>

          <dt>Rally preference</dt>
          <dd>
            {CLASSIC_DEFENDER.rallyLengthPreference}
            {" — "}
            {describeRating(
              CLASSIC_DEFENDER.rallyLengthPreference,
            )}
          </dd>

          <dt>Preferred defender shot</dt>
          <dd>
            {CLASSIC_DEFENDER.shotPreferences[0]?.shotType
              ?? "None"}
          </dd>

          <dt>Attacker style</dt>
          <dd>{FOREHAND_ATTACKER.name}</dd>

          <dt>Attacker aggression</dt>
          <dd>
            {FOREHAND_ATTACKER.aggression}
            {" — "}
            {describeRating(
              FOREHAND_ATTACKER.aggression,
            )}
          </dd>

          <dt>Attacker initiative</dt>
          <dd>
            {FOREHAND_ATTACKER.initiativeSeeking}
            {" — "}
            {describeRating(
              FOREHAND_ATTACKER.initiativeSeeking,
            )}
          </dd>

          <dt>Defender comfort vs attacker</dt>
          <dd>
            {defenderMatchup?.comfort ?? 50}
            {" — "}
            {describeRating(
              defenderMatchup?.comfort ?? 50,
            )}
          </dd>

          <dt>Attacker comfort vs defender</dt>
          <dd>
            {attackerMatchup?.comfort ?? 50}
            {" — "}
            {describeRating(
              attackerMatchup?.comfort ?? 50,
            )}
          </dd>
        </dl>

        {!valid && (
          <div>
            <h3>Validation errors</h3>

            <ul>
              {errors.map((error) => (
                <li key={`${error.path}-${error.message}`}>
                  {error.path}: {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}