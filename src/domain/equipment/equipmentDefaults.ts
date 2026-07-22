import type { Blade } from "./Blade";
import type { Racquet } from "./Racquet";
import type { Rubber } from "./Rubber";

export const DEFAULT_BLADE: Blade = {
  id: "default-classic-wood-blade",

  name: "Classic Five-Ply Wood",
  manufacturer: "Generic",
  description:
    "A balanced traditional wooden blade suitable for general play.",

  introducedYear: 1920,
  handleType: "straight",

  plies: 5,
  weightGrams: 85,

  speed: 48,
  control: 72,
  stiffness: 48,
  flexibility: 58,
  vibration: 62,
  sweetSpot: 60,
  powerTransfer: 50,
  touchSupport: 70,

  builtIn: true,
};

export const DEFAULT_FOREHAND_RUBBER: Rubber = {
  id: "default-hard-rubber-forehand",

  name: "Traditional Hard Rubber",
  manufacturer: "Generic",
  description:
    "A traditional hard-rubber surface with moderate speed and good control.",

  type: "hard-rubber",

  introducedYear: 1920,

  thicknessMm: 1.5,
  weightGrams: 30,

  speed: 48,
  spin: 38,
  control: 72,
  hardness: 78,
  grip: 44,
  spinSensitivity: 36,
  spinReversal: 12,
  disruption: 10,
  flatHitSupport: 66,
  chopSupport: 56,
  blockSupport: 68,

  builtIn: true,
};

export const DEFAULT_BACKHAND_RUBBER: Rubber = {
  ...DEFAULT_FOREHAND_RUBBER,

  id: "default-hard-rubber-backhand",
  name: "Traditional Hard Rubber — Backhand",
};

export const DEFAULT_RACQUET: Racquet = {
  id: "default-balanced-racquet",

  name: "Balanced Traditional Racquet",
  description:
    "A balanced 1930s-style racquet using hard rubber on both sides.",

  composition: {
    bladeId: DEFAULT_BLADE.id,
    forehandRubberId: DEFAULT_FOREHAND_RUBBER.id,
    backhandRubberId: DEFAULT_BACKHAND_RUBBER.id,
  },

  condition: 100,

  builtIn: true,
};