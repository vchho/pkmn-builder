import { Shell } from "@/components/shell";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { useEffect, useMemo, useState } from "react";
import { POKEMON } from "@/constants/pokemon";
import PokemonCard from "@/components/pokemon-card";

import useStore from "@/store/store";
import PokemonCard2 from "@/components/pokemon-card2";

export const ShowBack = ({ href }: { href: string }) => {
  return (
    <Link
      to={href}
      className={cn(buttonVariants({ variant: "link" }), "w-fit px-0")}
    >
      Go back
    </Link>
  );
};

export const CreateTeamSchema = z.object({
  gameVersion: z.string().min(3).max(150),
  team: z.array(z.object({ value: z.string() })),
});

export type CreateTeamValidatorType = z.infer<typeof CreateTeamSchema>;
// TODO: Have state pull in information from Zustand for teams
const TeamCreate = () => {
  const [generation, setGeneration] = useState("");
  const [teams, setTeam] = useState([]);

  const setGenerationStore = useStore((state) => state.setGeneration);

  const { id } = useParams() as { id: string };
  const currentTeam = useStore((state) => {
    return state.teams.find((team) => team.teamId === id);
  });
  // console.log("team", team);

  // store function must take in a teamId, and a pokemon object
  // store function must find the current team, and insert that pokemon into that team

  // maybe rework how pokemon are added
  // on add pokemon button press, a modal pops up with selectable pokemon
  useEffect(() => {
    if (currentTeam?.generation) {
      setGeneration(currentTeam.generation);
    }
  }, []);

  const form = useForm<CreateTeamValidatorType>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      gameVersion: "",
      // TODO: See if I could use Zustand persist store and load data 🤔
      team: [],
    },
  });

  const { fields, append } = useFieldArray({
    name: "team",
    control: form.control,
  });

  const onSubmit = (content: z.infer<typeof CreateTeamSchema>) => {
    console.log(content);
  };

  const addPokemon = () => {
    append({ value: "Test" });
  };

  const filteredPokemon = useMemo(() => {
    const filtered = POKEMON.filter((pokemon) =>
      Number(generation) > 0
        ? Number(pokemon.generation) <= Number(generation)
        : true,
    );

    return filtered;
  }, [generation]);

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
          </div>

          <Separator className="my-5" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="my-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {fields.map((_, index) => {
                  return (
                    <PokemonCard
                      // field={field}
                      filteredPokemon={filteredPokemon}
                      key={index}
                    />
                  );
                })}
                {currentTeam && currentTeam.team.length > 0 ? (
                  currentTeam.team.map((team, index) => {
                    return (
                      <div>
                        <p>TYPE: {team.type}</p>
                        <p>Name: {team.text}</p>
                        <PokemonCard2
                          filteredPokemon={filteredPokemon}
                          pokemonId={team.value}
                          key={index}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p>no stuff</p>
                )}
              </div>

              <Button
                onClick={() => addPokemon()}
                className={cn(
                  buttonVariants({ variant: "destructive" }),
                  // "text-md tracking-tighter",
                  "my-3",
                )}
                disabled={fields.length === 6 || !Boolean(generation)}
              >
                Add Pokemon
              </Button>

              <Button className="my-5">Create</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Shell>
  );
};

export default TeamCreate;
