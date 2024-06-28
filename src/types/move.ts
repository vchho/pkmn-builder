export type Type =
  | "NORMAL"
  | "FIRE"
  | "WATER"
  | "GRASS"
  | "ELECTRIC"
  | "ICE"
  | "POISON"
  | "FIGHTING"
  | "GROUND"
  | "FLYING"
  | "PSYCHIC"
  | "BUG"
  | "ROCK"
  | "GHOST"
  | "DARK"
  | "DRAGON"
  | "STEEL"
  | "FAIRY";

type Category = "Physical" | "Special" | "Status" | "???";

export type Move = {
  accuracy: string;
  category: Category;
  contest: string;
  gen: number;
  name: string;
  id: number;
  power: string;
  pp: string;
  type: Type;
};
