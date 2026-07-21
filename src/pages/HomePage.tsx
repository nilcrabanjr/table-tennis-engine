import {
  DEFAULT_BACKHAND_RUBBER,
  DEFAULT_BLADE,
  DEFAULT_FOREHAND_RUBBER,
  DEFAULT_RACQUET,
  calculateEquipmentEffects,
  describeRating,
  validateBlade,
  validateRacquet,
  validateRubber,
} from "../domain";

export function HomePage() {
  const equipmentEffects = calculateEquipmentEffects(
    DEFAULT_RACQUET,
    DEFAULT_BLADE,
    DEFAULT_FOREHAND_RUBBER,
    DEFAULT_BACKHAND_RUBBER,
  );

  const bladeValidation = validateBlade(DEFAULT_BLADE);
  const forehandValidation = validateRubber(
    DEFAULT_FOREHAND_RUBBER,
  );
  const backhandValidation = validateRubber(
    DEFAULT_BACKHAND_RUBBER,
  );
  const racquetValidation = validateRacquet(DEFAULT_RACQUET);

  const equipmentValid =
    bladeValidation.valid
    && forehandValidation.valid
    && backhandValidation.valid
    && racquetValidation.valid;

  return (
    <section className="page">
      <h1>Table Tennis Engine</h1>

      <p>
        Create fictional countries, players, equipment, tournaments.
      </p>

      <div className="placeholder-panel">
        <h2>Equipment system</h2>

        <p>
          Blades, playing surfaces, complete racquets, and derived
          equipment effects are now represented.
        </p>

        <dl>
          <dt>Equipment valid</dt>
          <dd>{equipmentValid ? "Yes" : "No"}</dd>

          <dt>Total weight</dt>
          <dd>{equipmentEffects.totalWeightGrams} g</dd>

          <dt>Speed</dt>
          <dd>
            {equipmentEffects.speed}
            {" — "}
            {describeRating(equipmentEffects.speed)}
          </dd>

          <dt>Control</dt>
          <dd>
            {equipmentEffects.control}
            {" — "}
            {describeRating(equipmentEffects.control)}
          </dd>

          <dt>Spin generation</dt>
          <dd>
            {equipmentEffects.spinGeneration}
            {" — "}
            {describeRating(equipmentEffects.spinGeneration)}
          </dd>

          <dt>Flat-hit support</dt>
          <dd>
            {equipmentEffects.flatHitSupport}
            {" — "}
            {describeRating(equipmentEffects.flatHitSupport)}
          </dd>

          <dt>Chop support</dt>
          <dd>
            {equipmentEffects.chopSupport}
            {" — "}
            {describeRating(equipmentEffects.chopSupport)}
          </dd>

          <dt>Physical demand</dt>
          <dd>
            {equipmentEffects.physicalDemand}
            {" — "}
            {describeRating(equipmentEffects.physicalDemand)}
          </dd>
        </dl>
      </div>
    </section>
  );
}