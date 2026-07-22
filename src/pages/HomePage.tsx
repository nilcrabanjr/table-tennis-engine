import {
  DEFAULT_BACKHAND_RUBBER,
  DEFAULT_BLADE,
  DEFAULT_FOREHAND_RUBBER,
  DEFAULT_RACQUET,
  calculateDerivedAttributes,
  calculateEquipmentEffects,
  createDefaultPlayer,
  describeRating,
  getPlayerDisplayName,
  getPrimaryRacquetAssignment,
  validatePlayer,
} from "../domain";

export function HomePage() {
  const player = createDefaultPlayer(
    "player-test-001",
    "country-test-001",
  );

  player.identity.firstName = "Aleksandr";
  player.identity.lastName = "Varek";
  player.identity.nickname = "The Falcon";

  player.attributes.technical.forehandAttack = 86;
  player.attributes.technical.serveQuality = 80;
  player.attributes.technical.serveDeception = 84;

  player.attributes.physical.footwork = 78;
  player.attributes.mental.composure = 82;

  player.personality.riskTaking = 72;
  player.personality.competitiveness = 88;

  const validation = validatePlayer(player);

  const derived = calculateDerivedAttributes(
    player.attributes,
  );

  const primaryRacquet =
    getPrimaryRacquetAssignment(player.equipment);

  const equipmentEffects = calculateEquipmentEffects(
    DEFAULT_RACQUET,
    DEFAULT_BLADE,
    DEFAULT_FOREHAND_RUBBER,
    DEFAULT_BACKHAND_RUBBER,
    primaryRacquet?.familiarity ?? 50,
  );

  return (
    <section className="page">
      <h1>Table Tennis Engine</h1>

      <p>
        Create fictional countries, players, equipment, tournaments,
        and detailed table tennis matches.
      </p>

      <div className="placeholder-panel">
        <h2>Player model</h2>

        <p>
          Identity, attributes, personality, playstyle, equipment,
          career, and availability are now represented.
        </p>

        <dl>
          <dt>Player valid</dt>
          <dd>{validation.valid ? "Yes" : "No"}</dd>

          <dt>Name</dt>
          <dd>{getPlayerDisplayName(player.identity)}</dd>

          <dt>Country ID</dt>
          <dd>{player.countryId}</dd>

          <dt>Grip</dt>
          <dd>{player.biography.grip}</dd>

          <dt>Primary playstyle</dt>
          <dd>{player.playstyle.primaryPlaystyleId}</dd>

          <dt>Overall rating</dt>
          <dd>
            {derived.overall}
            {" — "}
            {describeRating(derived.overall)}
          </dd>

          <dt>Forehand potential</dt>
          <dd>
            {derived.forehandAttackPotential}
            {" — "}
            {describeRating(derived.forehandAttackPotential)}
          </dd>

          <dt>Racquet familiarity</dt>
          <dd>{primaryRacquet?.familiarity ?? "None"}</dd>

          <dt>Equipment control</dt>
          <dd>
            {equipmentEffects.control}
            {" — "}
            {describeRating(equipmentEffects.control)}
          </dd>

          <dt>Availability</dt>
          <dd>{player.availability.status}</dd>
        </dl>

        {!validation.valid && (
          <div>
            <h3>Validation errors</h3>

            <ul>
              {validation.errors.map((error) => (
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