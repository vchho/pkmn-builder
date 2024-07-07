import { useState, useEffect } from "react";

import { POKEMAP, TPokemon } from "@/constants/pokemon";
import { ComboboxDemo2 } from "./combobox2";
import { Card } from "./ui/card";
import PokemonImage from "./pokemon-image";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import useStore from "@/store/store";
import { Button } from "./ui/button";
import { NatureSelect } from "./nature-select";
import NATURES from "@/constants/natures";

const PokemonCard2 = ({
  // field,
  filteredPokemon,
  pokemonId,
  orderIndex,
  pokeDetail,
}: {
  // field: any;
  filteredPokemon: TPokemon[];
  pokemonId: number;
  orderIndex: number;
  pokeDetail?: any;
}) => {
  const [pokemon, selectPokemon] = useState("");
  const [realPoke, selectRealPoke] = useState<TPokemon>();

  const { id } = useParams() as { id: string };

  const addPokemonToSlot = useStore((state) => state.addPokemonToSlot);
  const deleteTeamMember = useStore((state) => state.deleteTeamMember);

  const pokemonOne = POKEMAP.get(pokemonId);

  const handleDeleteTeamMember = (teamId: string, orderIndex: number) => {
    deleteTeamMember(teamId, orderIndex);
  };

  useEffect(() => {
    const poke = filteredPokemon.find(
      (fp) => fp.text.toLowerCase() === pokemon,
    );
    // console.log("poke", poke);
    selectRealPoke(poke);

    if (poke) {
      console.log("hit pokemoncard 2");
      addPokemonToSlot(id, orderIndex, poke.value);
    }
  }, [pokemon]);

  return (
    <Card className="mb-3 flex h-full flex-col">
      <ComboboxDemo2
        filteredPokemon={filteredPokemon}
        selectPokemon={selectPokemon}
        pokemonOne={pokemonOne}
      />
      {pokemonOne && (
        <>
          <div className="my-5 flex flex-col self-center">
            <div className="flex">
              <PokemonImage pokemonName={pokemonOne.text} />
            </div>

            <div className="mt-5 flex">
              {pokemonOne.previousType ? (
                <>
                  <Badge>{pokemonOne.previousType}</Badge>
                  {!!pokemonOne.previousDualType && (
                    <Badge>{pokemonOne.previousDualType}</Badge>
                  )}
                </>
              ) : (
                <>
                  <Badge>{pokemonOne.type}</Badge>
                  {!!pokemonOne.dualtype && (
                    <Badge>{pokemonOne.dualtype}</Badge>
                  )}
                </>
              )}
            </div>
            <NatureSelect
              natures={NATURES}
              teamId={id}
              pokemonIndex={orderIndex}
              nature={pokeDetail?.nature}
            />
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
