import { useState } from "react";

import { TPokemon } from "@/constants/pokemon";
import { ComboboxDemo } from "./combobox";
import { Card } from "./ui/card";

const PokemonCard = ({
  field,
  filteredPokemon,
}: {
  field: any;
  filteredPokemon: TPokemon[];
}) => {
  const [pokemon, selectPokemon] = useState();

  return (
    <Card className="mb-3 flex h-full flex-col">
      <p key={field.value}>{field.value}</p>
      <ComboboxDemo filteredPokemon={filteredPokemon} />
    </Card>
  );
};

export default PokemonCard;
