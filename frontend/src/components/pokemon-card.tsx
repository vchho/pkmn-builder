import { useState, useEffect } from "react";

import { TPokemon } from "@/constants/pokemon";
import { ComboboxDemo } from "./combobox";
import { Card } from "./ui/card";

const PokemonCard = ({
  // field,
  filteredPokemon,
}: {
  // field: any;
  filteredPokemon: TPokemon[];
}) => {
  const [pokemon, selectPokemon] = useState("");
  const [realPoke, selectRealPoke] = useState<TPokemon>();

  useEffect(() => {
    const poke = filteredPokemon.find(
      (fp) => fp.text.toLowerCase() === pokemon,
    );
    console.log("poke", poke);
    selectRealPoke(poke);
  }, [pokemon]);

  return (
    <Card className="mb-3 flex h-full flex-col">
      {/* <p key={field.value}>{field.value}</p> */}
      <ComboboxDemo
        filteredPokemon={filteredPokemon}
        selectPokemon={selectPokemon}
      />
      {realPoke && (
        <>
          <p>{realPoke?.text}</p>
          <p>{realPoke.type}</p>
          <p>{realPoke.dualtype && realPoke.dualtype}</p>
          <div
            // className={`pkm-${getParsedName(name)}`}
            className={`pkm pkm-${realPoke.text.toLowerCase()}`}
            role="img"
            style={{ transform: "scale(1.25)" }}
          />
        </>
      )}
    </Card>
  );
};

export default PokemonCard;
