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
import { Link } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useMemo, useState } from "react";
import { POKEMON } from "@/constants/pokemon";

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

export const CreateTeamValidator = z.object({
  gameVersion: z.string().min(3).max(150),
});

export type CreateTeamValidatorType = z.infer<typeof CreateTeamValidator>;

const TeamCreate = () => {
  const [currentGame, setGame] = useState("1");

  const form = useForm<CreateTeamValidatorType>({
    resolver: zodResolver(CreateTeamValidator),
    defaultValues: {
      gameVersion: "",
    },
  });

  const onSubmit = (content: z.infer<typeof CreateTeamValidator>) => {
    console.log(content);
  };

  const filteredPokemon = useMemo(() => {
    const filtered = POKEMON.filter((pokemon) =>
      Number(currentGame) > 0
        ? Number(pokemon.generation) <= Number(currentGame)
        : true,
    );

    return filtered;
  }, [currentGame]);

  console.log("filteredPokemon", filteredPokemon);

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
              Game Version
            </Label>
            <Select onValueChange={(value) => setGame(value)}>
              <SelectTrigger className="my-5">
                <SelectValue placeholder="Select a game" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Games</SelectLabel>
                  {GAMES.map((game) => {
                    return (
                      <SelectItem
                        value={game.generation.toString()}
                        key={game.key}
                      >
                        {game.text}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Link
            to="/create/"
            className={cn(
              buttonVariants({ variant: "destructive" }),
              // "text-md tracking-tighter",
              "my-3",
            )}
          >
            Add Pokemon
          </Link>

          <Separator className="my-5" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="my-5">
              {/* <FormField
                control={form.control}
                name="gameVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Version</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a game" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Games</SelectLabel>
                            {GAMES.map((game) => {
                              return (
                                <SelectItem
                                  value={game.generation.toString()}
                                  key={game.key}
                                >
                                  {game.text}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              /> */}

              {/* <FormField
                control={form.control}
                name="gameVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pokemon</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a game" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Games</SelectLabel>
                            {GAMES.map((game) => {
                              return (
                                <SelectItem value={game.value} key={game.key}>
                                  {game.text}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              /> */}

              <Button className="my-5">Create</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Shell>
  );
};

export default TeamCreate;
