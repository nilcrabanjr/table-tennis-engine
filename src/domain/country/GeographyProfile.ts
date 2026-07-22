import type { Rating } from "../shared";

export const CONTINENT_TYPES = [
  "africa",
  "asia",
  "europe",
  "north-america",
  "south-america",
  "oceania",
  "antarctica",
  "fictional",
] as const;

export type ContinentType =
  (typeof CONTINENT_TYPES)[number];

export const CLIMATE_TYPES = [
  "polar",
  "cold",
  "temperate",
  "continental",
  "mediterranean",
  "subtropical",
  "tropical",
  "arid",
  "mixed",
  "fictional",
] as const;

export type ClimateType =
  (typeof CLIMATE_TYPES)[number];

export interface GeographyProfile {
  continent: ContinentType;
  region?: string;

  areaSquareKm: number;

  climate: ClimateType;

  urbanisation: Rating;
  transportQuality: Rating;
  regionalAccessibility: Rating;

  timeZoneCount: number;

  neighbouringCountryIds: string[];
}