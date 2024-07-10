import { useEffect, useMemo, useState } from "react";

import { Shell } from "@/components/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GAMES } from "@/constants/games";
import { Label } from "@/components/ui/label";
import { POKEMON } from "@/constants/pokemon";

import useStore from "@/store/store";
import { AccordionContainer } from "@/components/accordion-container";
import AddPokemonModal from "@/components/pokemon-add-modal";
import { ShowBack } from "@/components/show-back";
import { Textarea } from "@/components/ui/textarea";

const TeamCreate = () => {
  const [_, setGeneration] = useState("");

  const setGenerationStore = useStore((state) => state.setGeneration);
  const setNotes = useStore((state) => state.setNotes);

  const { id } = useParams() as { id: string };
  const currentTeam = useStore((state) => {
    return state.teams.find((team) => team.teamId === id);
  });

  const teamSize = currentTeam?.team.length;

  useEffect(() => {
    if (currentTeam?.generation) {
      setGeneration(currentTeam.generation);
    }
  }, [currentTeam?.generation]);

  const filteredPokemon = useMemo(() => {
    const filtered = POKEMON.filter((pokemon) =>
      Number(currentTeam?.generation) > 0
        ? Number(pokemon.generation) <= Number(currentTeam?.generation)
        : true,
    );

    return filtered;
  }, [currentTeam?.generation]);

  return (
    <Shell>
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <ShowBack href="/" />
          <CardTitle>Create team</CardTitle>
          <CardDescription className="line-clamp-2">
            Keep track of your current team and their moves!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Game Generation
            </Label>
            <Select
              defaultValue={currentTeam?.generation ?? currentTeam?.generation}
              onValueChange={(value) => {
                setGeneration(value);
                setGenerationStore(value, id!);
              }}
            >
              <SelectTrigger className="my-5">
                <SelectValue placeholder="Select a generation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Generations</SelectLabel>
                  {GAMES.map((game) => {
                    return (
                      <SelectItem
                        value={game.generation.toString()}
                        key={game.key}
                        onClick={() => console.log(game.generation.toString())}
                      >
                        {game.text}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Notes
            </Label>
            <Textarea
              onChange={(e) => {
                // TODO: Figure out how to debounce this text
                setNotes(id, e.target.value);
              }}
              value={currentTeam?.notes ?? currentTeam?.notes}
            />
            <p className="flex text-sm text-slate-500 dark:text-slate-400">
              Have some finer details of your team you might not be able to
              remember? Write it down!
            </p>
          </div>

          <AccordionContainer />

          <AddPokemonModal
            filteredPokemon={filteredPokemon}
            teamId={id}
            teamSize={teamSize!}
          />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default TeamCreate;
