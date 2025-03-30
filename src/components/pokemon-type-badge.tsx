import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Type } from "@/types/move";

const typeColors: Record<Type, string> = {
  NORMAL: "bg-gray-400 hover:bg-gray-500",
  FIRE: "bg-red-500 hover:bg-red-600",
  WATER: "bg-blue-500 hover:bg-blue-600",
  GRASS: "bg-green-500 hover:bg-green-600",
  ELECTRIC: "bg-yellow-400 hover:bg-yellow-500",
  ICE: "bg-cyan-300 hover:bg-cyan-400",
  POISON: "bg-purple-500 hover:bg-purple-600",
  FIGHTING: "bg-orange-600 hover:bg-orange-700",
  GROUND: "bg-yellow-600 hover:bg-yellow-700",
  FLYING: "bg-indigo-400 hover:bg-indigo-500",
  PSYCHIC: "bg-pink-500 hover:bg-pink-600",
  BUG: "bg-lime-500 hover:bg-lime-600",
  ROCK: "bg-yellow-700 hover:bg-yellow-800",
  GHOST: "bg-purple-700 hover:bg-purple-800",
  DARK: "bg-gray-700 hover:bg-gray-800",
  DRAGON: "bg-indigo-600 hover:bg-indigo-700",
  STEEL: "bg-gray-400 hover:bg-gray-500",
};

interface PokemonTypeBadgeProps extends BadgeProps {
  type: Type;
}

export function PokemonTypeBadge({
  type,
  className,
  ...props
}: PokemonTypeBadgeProps) {
  return (
    <Badge
      className={cn(typeColors[type], "font-semibold text-white", className)}
      {...props}
    >
      {type}
    </Badge>
  );
}
