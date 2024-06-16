import { useState, useEffect } from "react";

import { TPokemon } from "@/constants/pokemon";
import { ComboboxDemo } from "./combobox";
import { Card } from "./ui/card";
import PokemonImage from "./pokemon-image";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import useStore from "@/store/store";

const PokemonCard = ({
  // field,
  filteredPokemon,
}: {
  // field: any;
  filteredPokemon: TPokemon[];
}) => {
  const [pokemon, selectPokemon] = useState("");
  const [realPoke, selectRealPoke] = useState<TPokemon>();

  const { id } = useParams<{ id: string }>();

  const addTeamMember = useStore((state) => state.addTeamMember);

  console.log("does id show in pokemon card?", id);

  useEffect(() => {
    const poke = filteredPokemon.find(
      (fp) => fp.text.toLowerCase() === pokemon,
    );
    // console.log("poke", poke);
    selectRealPoke(poke);

    if (id && poke) {
      addTeamMember(id, poke);
    }
  }, [pokemon]);

  return (
    <Card className="mb-3 flex h-full flex-col">
      <ComboboxDemo
        filteredPokemon={filteredPokemon}
        selectPokemon={selectPokemon}
      />
      {realPoke && (
        <>
          <div className="my-5 flex flex-col self-center">
            <div className="flex">
              <PokemonImage pokemonName={realPoke.text} />
            </div>

            <div className="mt-5 flex">
              <Badge>{realPoke.type}</Badge>
              <Badge>{realPoke.dualtype && realPoke.dualtype}</Badge>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default PokemonCard;
