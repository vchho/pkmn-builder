import { Type } from "./moves";

export type TypeColor = {
  [key in Type]: string;
};

export const TYPE_COLOR: TypeColor = {
  NORMAL: "#929BA3",
  FIRE: "#FF983F",
  WATER: "#3393DD",
  GRASS: "#35C04A",
  ELECTRIC: "#FBD200",
  ICE: "#4BD2C1",
  POISON: "#B667CF",
  FIGHTING: "#E12C6A",
  GROUND: "#E97333",
  FLYING: "#8AACE4",
  PSYCHIC: "#FF6676",
  BUG: "#84C400",
  ROCK: "#C9B787",
  GHOST: "#4B6AB3",
  DARK: "#5B5366",
  DRAGON: "#0070CA",
  STEEL: "#598FA3",
  FAIRY: "#FB8AEC",
};
