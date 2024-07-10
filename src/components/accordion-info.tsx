import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { POKEMAP } from "@/constants/pokemon";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import NATURES from "@/constants/natures";
import { Button } from "./ui/button";
import { PokemonDetail } from "@/types/AppState";
import ABILITIES from "@/constants/abilities";

import { NatureSelect } from "./nature-select";
import { AbilitiesSelect } from "./abilities-select";
import { ITEMS2 } from "@/constants/items";
import { HeldItemSelect } from "./held-item-select";
import useStore from "@/store/store";
import { useParams } from "react-router-dom";
import { MoveSelect } from "./move-select";
import { MOVES } from "@/constants/moves";
import { useMemo } from "react";
import PokemonImage from "./pokemon-image";
import { Separator } from "./ui/separator";

export function AccordionInfo({
  pokemonId,
  pokeDetail,
  teamId,
  orderIndex,
  currentGeneration,
}: {
  pokemonId: number;
  pokeDetail: PokemonDetail;
  teamId: string;
  orderIndex: number;
  currentGeneration?: string;
}) {
  const { id } = useParams() as { id: string };
  const pokemon = POKEMAP.get(pokemonId);

  const accordionKey = pokemon?.text! + pokemon?.value!;

  const deleteTeamMember = useStore((state) => state.deleteTeamMember);

  const filteredMoves = useMemo(() => {
    const filtered = MOVES.filter((pokemon) =>
      Number(currentGeneration) > 0
        ? Number(pokemon.gen) <= Number(currentGeneration)
        : true,
    );

    return filtered;
  }, [currentGeneration]);

  return (
    <AccordionItem value={`${accordionKey}`}>
      <AccordionTrigger>{pokemon?.text}</AccordionTrigger>
      <AccordionContent>
        <div className="m-2">
          <PokemonImage pokemonName={pokemon?.text!} />
        </div>
        <div className="flex">
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            TYPE (S):
          </Label>
          {pokemon &&
            (pokemon.previousType ? (
              <>
                <Badge>{pokemon.previousType}</Badge>
                {!!pokemon.previousDualType && (
                  <Badge>{pokemon.previousDualType}</Badge>
                )}
              </>
            ) : (
              <>
                <Badge>{pokemon.type}</Badge>
                {!!pokemon.dualtype && <Badge>{pokemon.dualtype}</Badge>}
              </>
            ))}
        </div>

        <div className="my-4 flex"></div>
        {currentGeneration !== "1" && currentGeneration !== "2" ? (
          <>
            <NatureSelect
              natures={NATURES}
              teamId={teamId}
              pokemonIndex={orderIndex}
              nature={pokeDetail?.nature ?? ""}
              pokeDetail={pokeDetail}
            />
            <AbilitiesSelect
              abilities={ABILITIES}
              teamId={teamId}
              pokemonIndex={orderIndex}
              ability={pokeDetail.ability ?? ""}
              pokeDetail={pokeDetail}
            />
            <HeldItemSelect
              items={ITEMS2}
              teamId={teamId}
              pokemonIndex={orderIndex}
              item={pokeDetail.item ?? ""}
              pokeDetail={pokeDetail}
            />
          </>
        ) : null}
        <Separator className="my-4" />
        <MoveSelect
          moves={filteredMoves}
          teamId={teamId}
          pokemonIndex={orderIndex}
          item={String(pokeDetail.moves[0]) ?? ""}
          pokeDetail={pokeDetail}
          moveInformation={[
            pokeDetail.moves[1],
            pokeDetail.moves[2],
            pokeDetail.moves[3],
          ]}
          moveIndex={0}
        />
        <MoveSelect
          moves={filteredMoves}
          teamId={teamId}
          pokemonIndex={orderIndex}
          item={String(pokeDetail.moves[1]) ?? ""}
          pokeDetail={pokeDetail}
          moveInformation={[
            pokeDetail.moves[0],
            pokeDetail.moves[2],
            pokeDetail.moves[3],
          ]}
          moveIndex={1}
        />
        <MoveSelect
          moves={filteredMoves}
          teamId={teamId}
          pokemonIndex={orderIndex}
          item={String(pokeDetail.moves[2]) ?? ""}
          pokeDetail={pokeDetail}
          moveInformation={[
            pokeDetail.moves[0],
            pokeDetail.moves[1],
            pokeDetail.moves[3],
          ]}
          moveIndex={2}
        />
        <MoveSelect
          moves={filteredMoves}
          teamId={teamId}
          pokemonIndex={orderIndex}
          item={String(pokeDetail.moves[3]) ?? ""}
          pokeDetail={pokeDetail}
          moveInformation={[
            pokeDetail.moves[0],
            pokeDetail.moves[1],
            pokeDetail.moves[2],
          ]}
          moveIndex={3}
        />

        <div className="mt-5 flex justify-center">
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={() => deleteTeamMember(id, orderIndex)}
          >
            Delete
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
