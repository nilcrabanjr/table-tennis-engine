import type {
  EntityId,
  HexColour,
  Year,
} from "../shared";

export interface CountryIdentity {
  id: EntityId;

  officialName: string;
  shortName: string;
  adjective: string;

  threeLetterCode: string;
  twoLetterCode?: string;

  capital: string;

  primaryColour: HexColour;
  secondaryColour: HexColour;
  accentColour?: HexColour;

  flagImage?: string;

  foundedYear?: Year;
  dissolvedYear?: Year;

  builtIn: boolean;
}

export function getCountryDisplayName(
  identity: CountryIdentity,
): string {
  return identity.shortName.trim() || identity.officialName.trim();
}