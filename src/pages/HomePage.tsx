import {
  createDefaultCountryIdentity,
  createDefaultDemographicsProfile,
  createDefaultGeographyProfile,
  getCountryDisplayName,
  validateCountryIdentity,
  validateDemographicsProfile,
  validateGeographyProfile,
} from "../domain";

export function HomePage() {
  const identity = createDefaultCountryIdentity(
    "country-newland",
  );

  const geography = createDefaultGeographyProfile();
  const demographics = createDefaultDemographicsProfile();

  identity.officialName = "Republic of Melvaria";
  identity.shortName = "Melvaria";
  identity.adjective = "Melvarian";
  identity.threeLetterCode = "MEL";
  identity.twoLetterCode = "MV";
  identity.capital = "Aurelis";

  geography.areaSquareKm = 425_000;
  geography.region = "Central Avium";

  demographics.population = 38_500_000;
  demographics.registeredTableTennisPlayers = 180_000;

  const identityValidation =
    validateCountryIdentity(identity);

  const geographyValidation =
    validateGeographyProfile(geography);

  const demographicsValidation =
    validateDemographicsProfile(demographics);

  const valid =
    identityValidation.valid
    && geographyValidation.valid
    && demographicsValidation.valid;

  return (
    <section className="page">
      <h1>Table Tennis Engine</h1>

      <p>
        Create fictional countries, players, equipment, tournaments,
        and detailed table tennis matches.
      </p>

      <div className="placeholder-panel">
        <h2>Country foundation</h2>

        <dl>
          <dt>Country valid</dt>
          <dd>{valid ? "Yes" : "No"}</dd>

          <dt>Name</dt>
          <dd>{getCountryDisplayName(identity)}</dd>

          <dt>Official name</dt>
          <dd>{identity.officialName}</dd>

          <dt>Adjective</dt>
          <dd>{identity.adjective}</dd>

          <dt>Code</dt>
          <dd>{identity.threeLetterCode}</dd>

          <dt>Capital</dt>
          <dd>{identity.capital}</dd>

          <dt>Region</dt>
          <dd>{geography.region}</dd>

          <dt>Area</dt>
          <dd>{geography.areaSquareKm.toLocaleString()} km²</dd>

          <dt>Population</dt>
          <dd>{demographics.population.toLocaleString()}</dd>

          <dt>Registered players</dt>
          <dd>
            {demographics.registeredTableTennisPlayers.toLocaleString()}
          </dd>
        </dl>
      </div>
    </section>
  );
}