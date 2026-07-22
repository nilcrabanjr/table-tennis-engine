import type {
  Handedness,
  PlayerCategory,
  PlayerTier,
} from "../shared";

/**
 * Core public identity of a player.
 */
export interface PlayerIdentity {
  firstName: string;
  lastName: string;

  nickname?: string;
  displayName?: string;

  category: PlayerCategory;
  handedness: Handedness;

  tier: PlayerTier;
}

/**
 * Returns the name that should normally be displayed in the interface.
 */
export function getPlayerDisplayName(
  identity: PlayerIdentity,
): string {
  if (identity.displayName?.trim()) {
    return identity.displayName.trim();
  }

  const fullName = [
    identity.firstName.trim(),
    identity.lastName.trim(),
  ]
    .filter(Boolean)
    .join(" ");

  if (identity.nickname?.trim()) {
    return `${fullName} “${identity.nickname.trim()}”`;
  }

  return fullName;
}