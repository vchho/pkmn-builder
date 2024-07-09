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

export function AccordionInfo({
  pokemonId,
  pokeDetail,
  teamId,
  orderIndex,
}: {
  pokemonId: number;
  pokeDetail: PokemonDetail;
  teamId: string;
  orderIndex?: number;
}) {
  const pokemon = POKEMAP.get(pokemonId);

  const accordionKey = pokemon?.text! + pokemon?.value!;

  return (
    <AccordionItem value={`${accordionKey}`}>
      <AccordionTrigger>{pokemon?.text}</AccordionTrigger>
      <AccordionContent>
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
        <NatureSelect
          natures={NATURES}
          teamId={teamId}
          pokemonIndex={orderIndex!}
          nature={pokeDetail?.nature ?? ""}
          pokeDetail={pokeDetail}
        />

        <AbilitiesSelect
          abilities={ABILITIES}
          teamId={teamId}
          pokemonIndex={orderIndex!}
          nature={pokeDetail?.ability ?? ""}
          pokeDetail={pokeDetail}
        />
        <div className="mt-5 flex justify-center">
          <Button
            className="w-full"
            variant={"destructive"}
            // onClick={() => handleDeleteTeamMember(id, orderIndex)}
          >
            Delete
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
