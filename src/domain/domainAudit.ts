import {
  DEFAULT_BACKHAND_RUBBER,
  DEFAULT_BLADE,
  DEFAULT_FOREHAND_RUBBER,
  DEFAULT_RACQUET,
  validateBlade,
  validateRacquet,
  validateRubber,
} from "./equipment";

import {
  createDefaultCountry,
  validateCountry,
} from "./country";

import {
  createDefaultMatchState,
  validateMatchState,
} from "./match";

import {
  createDefaultPlayer,
  validatePlayer,
} from "./player";

import {
  BUILT_IN_PLAYSTYLES,
  validatePlaystyle,
} from "./playstyle";

import {
  FICTIONAL_1936_RULESET,
  INTERWAR_HARD_BAT_ERA,
  validateEra,
  validateRuleSet,
} from "./rules";

import {
  createDefaultTournament,
  validateTournament,
} from "./tournament";

export interface DomainAuditItem {
  name: string;
  valid: boolean;
  errorCount: number;
  errors: string[];
}

export interface DomainAuditResult {
  valid: boolean;
  checkedSystems: number;
  totalErrors: number;
  items: DomainAuditItem[];
}

function createAuditItem(
  name: string,
  valid: boolean,
  errors: Array<{
    path: string;
    message: string;
  }>,
): DomainAuditItem {
  return {
    name,
    valid,
    errorCount: errors.length,
    errors: errors.map(
      (error) => `${error.path}: ${error.message}`,
    ),
  };
}

export function runDomainAudit(): DomainAuditResult {
  const items: DomainAuditItem[] = [];

  const bladeValidation =
    validateBlade(DEFAULT_BLADE);

  items.push(
    createAuditItem(
      "Default blade",
      bladeValidation.valid,
      bladeValidation.errors,
    ),
  );

  const forehandRubberValidation =
    validateRubber(DEFAULT_FOREHAND_RUBBER);

  items.push(
    createAuditItem(
      "Default forehand rubber",
      forehandRubberValidation.valid,
      forehandRubberValidation.errors,
    ),
  );

  const backhandRubberValidation =
    validateRubber(DEFAULT_BACKHAND_RUBBER);

  items.push(
    createAuditItem(
      "Default backhand rubber",
      backhandRubberValidation.valid,
      backhandRubberValidation.errors,
    ),
  );

  const racquetValidation =
    validateRacquet(DEFAULT_RACQUET);

  items.push(
    createAuditItem(
      "Default racquet",
      racquetValidation.valid,
      racquetValidation.errors,
    ),
  );

  const player = createDefaultPlayer(
    "audit-player",
    "audit-country",
  );

  const playerValidation =
    validatePlayer(player);

  items.push(
    createAuditItem(
      "Default player",
      playerValidation.valid,
      playerValidation.errors,
    ),
  );

  const country =
    createDefaultCountry("audit-country");

  const countryValidation =
    validateCountry(country);

  items.push(
    createAuditItem(
      "Default country",
      countryValidation.valid,
      countryValidation.errors,
    ),
  );

  for (const playstyle of BUILT_IN_PLAYSTYLES) {
    const validation =
      validatePlaystyle(playstyle);

    items.push(
      createAuditItem(
        `Playstyle: ${playstyle.name}`,
        validation.valid,
        validation.errors,
      ),
    );
  }

  const eraValidation =
    validateEra(INTERWAR_HARD_BAT_ERA);

  items.push(
    createAuditItem(
      "Interwar era",
      eraValidation.valid,
      eraValidation.errors,
    ),
  );

  const ruleSetValidation =
    validateRuleSet(FICTIONAL_1936_RULESET);

  items.push(
    createAuditItem(
      "1936 ruleset",
      ruleSetValidation.valid,
      ruleSetValidation.errors,
    ),
  );

  const match = createDefaultMatchState({
    matchId: "audit-match",
    matchName: "Domain Audit Match",

    firstPlayerId: "audit-player-one",
    firstPlayerName: "Audit Player One",
    firstCountryId: "audit-country-one",
    firstCountryName: "Audit Country One",
    firstPlaystyleId: "balanced-all-rounder",
    firstRacquetId: DEFAULT_RACQUET.id,

    secondPlayerId: "audit-player-two",
    secondPlayerName: "Audit Player Two",
    secondCountryId: "audit-country-two",
    secondCountryName: "Audit Country Two",
    secondPlaystyleId: "classic-defender",
    secondRacquetId: DEFAULT_RACQUET.id,

    ruleSetId: FICTIONAL_1936_RULESET.id,

    year: 1936,
    randomSeed: 123456,
  });

  const matchValidation =
    validateMatchState(match);

  items.push(
    createAuditItem(
      "Default match state",
      matchValidation.valid,
      matchValidation.errors,
    ),
  );

  const tournament =
    createDefaultTournament("audit-tournament");

  tournament.identity.hostCountryId =
    "audit-country";

  tournament.identity.hostCity =
    "Audit City";

  tournament.identity.venue =
    "Audit Hall";

  const tournamentValidation =
    validateTournament(tournament);

  items.push(
    createAuditItem(
      "Default tournament",
      tournamentValidation.valid,
      tournamentValidation.errors,
    ),
  );

  const totalErrors = items.reduce(
    (sum, item) => sum + item.errorCount,
    0,
  );

  return {
    valid: totalErrors === 0,
    checkedSystems: items.length,
    totalErrors,
    items,
  };
}