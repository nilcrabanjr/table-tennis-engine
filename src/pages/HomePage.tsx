import {
  createDefaultCoaching,
  createDefaultCountryIdentity,
  createDefaultCulture,
  createDefaultDemographicsProfile,
  createDefaultDevelopment,
  createDefaultFederation,
  createDefaultGeographyProfile,
  describeRating,
  getCountryDisplayName,
  validateCoaching,
  validateCountryIdentity,
  validateCulture,
  validateDemographicsProfile,
  validateDevelopment,
  validateFederation,
  validateGeographyProfile,
} from "../domain";

export function HomePage() {
  const identity = createDefaultCountryIdentity(
    "country-melvaria",
  );

  const geography = createDefaultGeographyProfile();
  const demographics = createDefaultDemographicsProfile();

  const federation = createDefaultFederation();
  const coaching = createDefaultCoaching();
  const development = createDefaultDevelopment();
  const culture = createDefaultCulture();

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

  federation.id = "federation-melvaria";
  federation.name = "Melvarian Table Tennis Federation";
  federation.abbreviation = "MTTF";
  federation.foundedYear = 1928;
  federation.reputation = 86;
  federation.administration = 78;
  federation.financialStability = 82;
  federation.internationalInfluence = 79;
  federation.officiatingQuality = 84;
  federation.transparency = 76;

  coaching.technicalCoaching = 91;
  coaching.tacticalCoaching = 88;
  coaching.serveDevelopment = 94;
  coaching.receiveDevelopment = 86;
  coaching.footworkTraining = 89;
  coaching.physicalConditioning = 81;
  coaching.sportsPsychology = 74;
  coaching.talentIdentification = 92;
  coaching.coachEducation = 90;
  coaching.innovation = 88;

  development.youthAcademies = 93;
  development.juniorCompetition = 90;
  development.regionalCentres = 84;
  development.scoutingNetwork = 91;
  development.equipmentAccess = 87;
  development.financialSupport = 82;
  development.sportsScience = 76;
  development.trainingIntensity = 89;
  development.coachAvailability = 88;
  development.pathwayToProfessional = 90;

  culture.tableTennisPopularity = 94;
  culture.youthParticipation = 91;
  culture.schoolPrograms = 88;
  culture.universityPrograms = 79;
  culture.governmentSupport = 87;
  culture.mediaCoverage = 85;
  culture.volunteerBase = 80;
  culture.professionalInterest = 92;
  culture.womenParticipation = 83;
  culture.internationalAmbition = 95;

  const identityValidation =
    validateCountryIdentity(identity);

  const geographyValidation =
    validateGeographyProfile(geography);

  const demographicsValidation =
    validateDemographicsProfile(demographics);

  const federationErrors =
    validateFederation(federation);

  const coachingErrors =
    validateCoaching(coaching);

  const developmentErrors =
    validateDevelopment(development);

  const cultureErrors =
    validateCulture(culture);

  const valid =
    identityValidation.valid
    && geographyValidation.valid
    && demographicsValidation.valid
    && federationErrors.length === 0
    && coachingErrors.length === 0
    && developmentErrors.length === 0
    && cultureErrors.length === 0;

  return (
    <section className="page">
      <h1>Table Tennis Engine</h1>

      <p>
        Create fictional countries, players, equipment, tournaments,
        and detailed table tennis matches.
      </p>

      <div className="placeholder-panel">
        <h2>Country development system</h2>

        <p>
          Federation quality, coaching, development pathways, and
          national table tennis culture are now represented.
        </p>

        <dl>
          <dt>Country valid</dt>
          <dd>{valid ? "Yes" : "No"}</dd>

          <dt>Country</dt>
          <dd>{getCountryDisplayName(identity)}</dd>

          <dt>Federation</dt>
          <dd>{federation.name}</dd>

          <dt>Federation reputation</dt>
          <dd>
            {federation.reputation}
            {" — "}
            {describeRating(federation.reputation)}
          </dd>

          <dt>Technical coaching</dt>
          <dd>
            {coaching.technicalCoaching}
            {" — "}
            {describeRating(coaching.technicalCoaching)}
          </dd>

          <dt>Serve development</dt>
          <dd>
            {coaching.serveDevelopment}
            {" — "}
            {describeRating(coaching.serveDevelopment)}
          </dd>

          <dt>Youth academies</dt>
          <dd>
            {development.youthAcademies}
            {" — "}
            {describeRating(development.youthAcademies)}
          </dd>

          <dt>Scouting network</dt>
          <dd>
            {development.scoutingNetwork}
            {" — "}
            {describeRating(development.scoutingNetwork)}
          </dd>

          <dt>Pathway to professional</dt>
          <dd>
            {development.pathwayToProfessional}
            {" — "}
            {describeRating(development.pathwayToProfessional)}
          </dd>

          <dt>Table tennis popularity</dt>
          <dd>
            {culture.tableTennisPopularity}
            {" — "}
            {describeRating(culture.tableTennisPopularity)}
          </dd>

          <dt>Government support</dt>
          <dd>
            {culture.governmentSupport}
            {" — "}
            {describeRating(culture.governmentSupport)}
          </dd>

          <dt>International ambition</dt>
          <dd>
            {culture.internationalAmbition}
            {" — "}
            {describeRating(culture.internationalAmbition)}
          </dd>

          <dt>Registered players</dt>
          <dd>
            {demographics.registeredTableTennisPlayers.toLocaleString()}
          </dd>
        </dl>

        {!valid && (
          <div>
            <h3>Validation errors</h3>

            <ul>
              {identityValidation.errors.map((error) => (
                <li key={`${error.path}-${error.message}`}>
                  {error.path}: {error.message}
                </li>
              ))}

              {geographyValidation.errors.map((error) => (
                <li key={`${error.path}-${error.message}`}>
                  {error.path}: {error.message}
                </li>
              ))}

              {demographicsValidation.errors.map((error) => (
                <li key={`${error.path}-${error.message}`}>
                  {error.path}: {error.message}
                </li>
              ))}

              {[
                ...federationErrors,
                ...coachingErrors,
                ...developmentErrors,
                ...cultureErrors,
              ].map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}