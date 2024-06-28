import { useState, useEffect } from "react";

import { POKEMAP, TPokemon } from "@/constants/pokemon";
import { ComboboxDemo } from "./combobox";
import { ComboboxDemo2 } from "./combobox2";
import { Card } from "./ui/card";
import PokemonImage from "./pokemon-image";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import useStore from "@/store/store";
import { Button } from "./ui/button";

const PokemonCard2 = ({
  // field,
  filteredPokemon,
  pokemonId,
  orderIndex,
}: {
  // field: any;
  filteredPokemon: TPokemon[];
  pokemonId: number;
  orderIndex: number;
}) => {
  const [pokemon, selectPokemon] = useState("");
  const [realPoke, selectRealPoke] = useState<TPokemon>();

  const { id } = useParams() as { id: string };

  const addTeamMember = useStore((state) => state.addTeamMember);
  const deleteTeamMember = useStore((state) => state.deleteTeamMember);

  console.log("pokemonId", pokemonId);
  const pokemonOne = POKEMAP.get(pokemonId);
  console.log("pokemonOne", pokemonOne);

  const handleDeleteTeamMember = (teamId: string, orderIndex: number) => {
    deleteTeamMember(teamId, orderIndex);
  };

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
      {pokemonOne && (
        <>
          <div className="my-5 flex flex-col self-center">
            <div className="flex">
              <PokemonImage pokemonName={pokemonOne?.text!} />
            </div>

            <div className="mt-5 flex">
              <Badge>{pokemonOne.type}</Badge>
              <Badge>{pokemonOne.dualtype && pokemonOne.dualtype}</Badge>
            </div>
            <div className="mt-5 flex">
              <Button
                variant={"destructive"}
                onClick={() => handleDeleteTeamMember(id, orderIndex)}
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default PokemonCard2;
