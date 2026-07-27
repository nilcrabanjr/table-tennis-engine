import {
  createDefaultCountry,
  describeRating,
  getCountryDisplayName,
  validateCountry,
} from "../domain";

export function HomePage() {
  const country = createDefaultCountry(
    "country-melvaria",
  );

  country.identity.officialName =
    "Republic of Melvaria";

  country.identity.shortName =
    "Melvaria";

  country.identity.adjective =
    "Melvarian";

  country.identity.threeLetterCode =
    "MEL";

  country.identity.twoLetterCode =
    "MV";

  country.identity.capital =
    "Aurelis";

  country.geography.region =
    "Central Avium";

  country.geography.areaSquareKm =
    425_000;

  country.demographics.population =
    38_500_000;

  country.demographics.registeredTableTennisPlayers =
    180_000;

  country.federation.name =
    "Melvarian Table Tennis Federation";

  country.federation.abbreviation =
    "MTTF";

  country.federation.foundedYear =
    1928;

  country.federation.reputation =
    86;

  country.coaching.technicalCoaching =
    91;

  country.coaching.serveDevelopment =
    94;

  country.coaching.tacticalCoaching =
    88;

  country.development.youthAcademies =
    93;

  country.development.scoutingNetwork =
    91;

  country.development.pathwayToProfessional =
    90;

  country.culture.tableTennisPopularity =
    94;

  country.culture.governmentSupport =
    87;

  country.culture.internationalAmbition =
    95;

  if (country.domesticCompetition.primaryLeague) {
    country.domesticCompetition.primaryLeague.name =
      "Melvarian Premier Table Tennis League";

    country.domesticCompetition.primaryLeague.shortName =
      "MPTTL";

    country.domesticCompetition.primaryLeague.clubCount =
      16;

    country.domesticCompetition.primaryLeague.competitiveStrength =
      88;

    country.domesticCompetition.primaryLeague.professionalism =
      91;
  }

  country.domesticCompetition.nationalChampionship.name =
    "Melvarian National Championships";

  country.domesticCompetition.nationalChampionship.prestige =
    92;

  country.domesticCompetition.juniorCompetitionQuality =
    90;

  country.playerPool.registeredPlayerIds = [
    "player-varek",
    "player-seran",
    "player-kolos",
  ];

  country.playerPool.internationallyEligiblePlayerIds = [
    "player-varek",
    "player-seran",
    "player-kolos",
  ];

  country.playerPool.prospectPlayerIds = [
    "player-kolos",
  ];

  country.playerPool.playerPoolDepth =
    88;

  country.playerPool.elitePlayerDepth =
    84;

  country.playerPool.youthProspectQuality =
    92;

  country.playerPool.unmodelledCompetitivePlayers =
    24_000;

  const primarySquad =
    country.nationalTeams.squads[0];

  if (primarySquad) {
    primarySquad.name =
      "Melvaria National Team";

    primarySquad.playerIds = [
      "player-varek",
      "player-seran",
      "player-kolos",
    ];

    primarySquad.captainPlayerId =
      "player-varek";

    primarySquad.cohesion =
      84;

    primarySquad.tacticalPreparation =
      91;

    primarySquad.morale =
      88;

    primarySquad.depth =
      87;
  }

  country.records.internationalTeamMatchesPlayed =
    120;

  country.records.internationalTeamMatchesWon =
    83;

  country.records.internationalTeamMatchesLost =
    37;

  country.records.individualWorldTitles =
    8;

  country.records.doublesWorldTitles =
    4;

  country.records.teamWorldTitles =
    6;

  country.records.medals.gold =
    18;

  country.records.medals.silver =
    12;

  country.records.medals.bronze =
    15;

  country.records.highestWorldTeamRanking =
    1;

  country.records.longestTeamWinningStreak =
    19;

  country.records.mostCappedPlayerId =
    "player-varek";

  country.records.mostSuccessfulPlayerId =
    "player-varek";

  const validation =
    validateCountry(country);

  return (
    <section className="page">
      <h1>Table Tennis Engine</h1>

      <p>
        Create fictional countries, players, equipment, tournaments,
        and detailed table tennis matches.
      </p>

      <div className="placeholder-panel">
        <h2>Complete country model</h2>

        <p>
          Identity, demographics, federation, coaching, development,
          culture, competitions, squads, player pools, and records are
          now combined into one country entity.
        </p>

        <dl>
          <dt>Country valid</dt>
          <dd>{validation.valid ? "Yes" : "No"}</dd>

          <dt>Country</dt>
          <dd>{getCountryDisplayName(country.identity)}</dd>

          <dt>Official name</dt>
          <dd>{country.identity.officialName}</dd>

          <dt>Federation</dt>
          <dd>{country.federation.name}</dd>

          <dt>Technical coaching</dt>
          <dd>
            {country.coaching.technicalCoaching}
            {" — "}
            {describeRating(
              country.coaching.technicalCoaching,
            )}
          </dd>

          <dt>Youth academies</dt>
          <dd>
            {country.development.youthAcademies}
            {" — "}
            {describeRating(
              country.development.youthAcademies,
            )}
          </dd>

          <dt>Table tennis popularity</dt>
          <dd>
            {country.culture.tableTennisPopularity}
            {" — "}
            {describeRating(
              country.culture.tableTennisPopularity,
            )}
          </dd>

          <dt>Primary league</dt>
          <dd>
            {country.domesticCompetition.primaryLeague?.name
              ?? "None"}
          </dd>

          <dt>League strength</dt>
          <dd>
            {country.domesticCompetition.primaryLeague
              ?.competitiveStrength ?? 0}
            {" — "}
            {describeRating(
              country.domesticCompetition.primaryLeague
                ?.competitiveStrength ?? 0,
            )}
          </dd>

          <dt>National squad</dt>
          <dd>{primarySquad?.name ?? "None"}</dd>

          <dt>Squad players</dt>
          <dd>{primarySquad?.playerIds.length ?? 0}</dd>

          <dt>Registered player records</dt>
          <dd>{country.playerPool.registeredPlayerIds.length}</dd>

          <dt>Unmodelled competitive players</dt>
          <dd>
            {country.playerPool.unmodelledCompetitivePlayers
              .toLocaleString()}
          </dd>

          <dt>World singles titles</dt>
          <dd>{country.records.individualWorldTitles}</dd>

          <dt>Team world titles</dt>
          <dd>{country.records.teamWorldTitles}</dd>

          <dt>Highest team ranking</dt>
          <dd>
            {country.records.highestWorldTeamRanking
              ?? "Unranked"}
          </dd>
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