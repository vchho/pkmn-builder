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
import { Label } from "@/components/ui/label";
import { AbilitiesSelect } from "./abilities-select";
import ABILITIES from "@/constants/abilities";
import { PokemonDetail } from "@/types/AppState";

const PokemonCard2 = ({
  filteredPokemon,
  pokemonId,
  orderIndex,
  pokeDetail,
}: {
  filteredPokemon: TPokemon[];
  pokemonId: number;
  orderIndex: number;
  pokeDetail?: PokemonDetail;
}) => {
  const [pokemon, selectPokemon] = useState("");

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

    if (poke) {
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
          {/* <div className="my-5 flex flex-col self-center"> */}
          <div className="my-5 flex flex-col ">
            <div className="m-2 flex ">
              <PokemonImage pokemonName={pokemonOne.text} />
            </div>

            <div className="my-2 mt-5 flex justify-center">
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
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Nature
            </Label>
            <NatureSelect
              natures={NATURES}
              teamId={id}
              pokemonIndex={orderIndex}
              nature={pokeDetail?.nature ?? ""}
              pokeDetail={pokeDetail!}
            />

            <AbilitiesSelect
              abilities={ABILITIES}
              teamId={id}
              pokemonIndex={orderIndex}
              ability={pokeDetail?.ability ?? ""}
              pokeDetail={pokeDetail!}
            />

            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Moves
            </Label>

            <div className="mt-5 flex justify-center">
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
