import {
  createDefaultCountryPlayerPool,
  createDefaultCountryRecords,
  createDefaultDomesticCompetition,
  createDefaultNationalTeamProfile,
  describeRating,
  validateCountryPlayerPool,
  validateCountryRecords,
  validateDomesticCompetition,
  validateNationalTeams,
} from "../domain";

export function HomePage() {
  const countryId = "country-melvaria";

  const domestic =
    createDefaultDomesticCompetition(countryId);

  const nationalTeams =
    createDefaultNationalTeamProfile(countryId);

  const playerPool =
    createDefaultCountryPlayerPool();

  const records =
    createDefaultCountryRecords();

  if (domestic.primaryLeague) {
    domestic.primaryLeague.name =
      "Melvarian Premier Table Tennis League";

    domestic.primaryLeague.shortName = "MPTTL";
    domestic.primaryLeague.clubCount = 16;
    domestic.primaryLeague.divisionCount = 2;

    domestic.primaryLeague.professionalism = 91;
    domestic.primaryLeague.competitiveStrength = 88;
    domestic.primaryLeague.internationalPrestige = 84;
    domestic.primaryLeague.matchIntensity = 90;
  }

  domestic.nationalChampionship.name =
    "Melvarian National Championships";

  domestic.nationalChampionship.prestige = 92;
  domestic.juniorCompetitionQuality = 90;
  domestic.annualDomesticMatchVolume = 4_800;

  nationalTeams.selectionQuality = 89;
  nationalTeams.trainingCampQuality = 91;
  nationalTeams.doublesPreparation = 86;
  nationalTeams.travelSupport = 83;

  const primarySquad = nationalTeams.squads[0];

  if (primarySquad) {
    primarySquad.name = "Melvaria National Team";
    primarySquad.cohesion = 84;
    primarySquad.tacticalPreparation = 91;
    primarySquad.morale = 88;
    primarySquad.depth = 87;
  }

  playerPool.registeredPlayerIds = [
    "player-varek",
    "player-seran",
    "player-kolos",
  ];

  playerPool.internationallyEligiblePlayerIds = [
    "player-varek",
    "player-seran",
    "player-kolos",
  ];

  playerPool.prospectPlayerIds = [
    "player-kolos",
  ];

  playerPool.playerPoolDepth = 88;
  playerPool.elitePlayerDepth = 84;
  playerPool.youthProspectQuality = 92;
  playerPool.unmodelledCompetitivePlayers = 24_000;

  records.internationalTeamMatchesPlayed = 120;
  records.internationalTeamMatchesWon = 83;
  records.internationalTeamMatchesLost = 37;

  records.individualWorldTitles = 8;
  records.doublesWorldTitles = 4;
  records.teamWorldTitles = 6;

  records.medals.gold = 18;
  records.medals.silver = 12;
  records.medals.bronze = 15;

  records.highestWorldTeamRanking = 1;
  records.longestTeamWinningStreak = 19;

  const domesticValidation =
    validateDomesticCompetition(domestic);

  const nationalTeamValidation =
    validateNationalTeams(nationalTeams);

  const playerPoolValidation =
    validateCountryPlayerPool(playerPool);

  const recordsValidation =
    validateCountryRecords(records);

  const valid =
    domesticValidation.valid
    && nationalTeamValidation.valid
    && playerPoolValidation.valid
    && recordsValidation.valid;

  const errors = [
    ...domesticValidation.errors,
    ...nationalTeamValidation.errors,
    ...playerPoolValidation.errors,
    ...recordsValidation.errors,
  ];

  return (
    <section className="page">
      <h1>Table Tennis Engine</h1>

      <p>
        Create fictional countries, players, equipment, tournaments,
        and detailed table tennis matches.
      </p>

      <div className="placeholder-panel">
        <h2>Country competition system</h2>

        <p>
          Domestic leagues, national teams, player pools, and country
          records are now represented.
        </p>

        <dl>
          <dt>System valid</dt>
          <dd>{valid ? "Yes" : "No"}</dd>

          <dt>Primary league</dt>
          <dd>{domestic.primaryLeague?.name ?? "None"}</dd>

          <dt>League clubs</dt>
          <dd>{domestic.primaryLeague?.clubCount ?? 0}</dd>

          <dt>League strength</dt>
          <dd>
            {domestic.primaryLeague?.competitiveStrength ?? 0}
            {" — "}
            {describeRating(
              domestic.primaryLeague?.competitiveStrength ?? 0,
            )}
          </dd>

          <dt>National championship</dt>
          <dd>{domestic.nationalChampionship.name}</dd>

          <dt>Junior competition</dt>
          <dd>
            {domestic.juniorCompetitionQuality}
            {" — "}
            {describeRating(domestic.juniorCompetitionQuality)}
          </dd>

          <dt>National squad</dt>
          <dd>{primarySquad?.name ?? "None"}</dd>

          <dt>Squad tactical preparation</dt>
          <dd>
            {primarySquad?.tacticalPreparation ?? 0}
            {" — "}
            {describeRating(
              primarySquad?.tacticalPreparation ?? 0,
            )}
          </dd>

          <dt>Modelled players</dt>
          <dd>{playerPool.registeredPlayerIds.length}</dd>

          <dt>Competitive player pool</dt>
          <dd>
            {playerPool.unmodelledCompetitivePlayers.toLocaleString()}
          </dd>

          <dt>World singles titles</dt>
          <dd>{records.individualWorldTitles}</dd>

          <dt>Team world titles</dt>
          <dd>{records.teamWorldTitles}</dd>

          <dt>Highest team ranking</dt>
          <dd>{records.highestWorldTeamRanking ?? "Unranked"}</dd>
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