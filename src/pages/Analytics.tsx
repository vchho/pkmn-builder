import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { POKEMAP } from "@/constants/pokemon";
import useStore from "@/store/store";
import { Fragment } from "react";

const typeColors = {
  Normal: "bg-gray-400",
  Fire: "bg-red-500",
  Water: "bg-blue-500",
  Electric: "bg-yellow-400",
  Grass: "bg-green-500",
  Ice: "bg-cyan-300",
  Fighting: "bg-red-700",
  Poison: "bg-purple-500",
  Ground: "bg-yellow-700",
  Flying: "bg-indigo-400",
  Psychic: "bg-pink-500",
  Bug: "bg-lime-500",
  Rock: "bg-yellow-800",
  Ghost: "bg-purple-700",
  Dragon: "bg-indigo-700",
  Dark: "bg-gray-700",
  Steel: "bg-gray-500",
  Fairy: "bg-pink-300",
};

const Analytics = () => {
  const teams = useStore((state) => state.teams);

  type GenerationMapStats = Map<number, Record<string, number>>;

  const generationMapStats: GenerationMapStats = new Map();
  const typeMapStats = new Map();
  const itemMapStats = new Map();

  teams.forEach((singleTeam) => {
    const generation = parseInt(singleTeam.generation);
    if (generation) {
      if (!generationMapStats.has(generation)) {
        generationMapStats.set(generation, {}); // Initialize an empty object for the generation if it doesn't exist
      }

      singleTeam.team.forEach((t) => {
        const pokemonId = t.id;
        const pokemon = POKEMAP.get(pokemonId);

        if (!pokemon?.text) {
          console.log(`Pokemon with id ${pokemonId} has no text`);
          return; // Skip this iteration if pokemon or text is undefined
        }

        const currentStats = generationMapStats.get(generation);
        const currentCount = currentStats![pokemon.text] || 0;

        // Update the count for the specific Pokémon text
        currentStats![pokemon.text] = currentCount + 1;

        // Put the updated stats back into the map (this step is technically redundant, as we're updating the object directly)
        generationMapStats.set(generation, currentStats!);
      });
    }
  });

  teams.forEach((singleTeam) => {
    const generation = parseInt(singleTeam.generation);
    if (generation) {
      typeMapStats.set(generation, {}); // Initialize an empty object for the generation if it doesn't exist
    }

    singleTeam.team.forEach((t) => {
      const pokemonId = t.id;
      const pokemon = POKEMAP.get(pokemonId);

      if (!pokemon?.type) {
        console.log(`Pokemon with id ${pokemonId} has no type`);
        return; // Skip this iteration if pokemon or text is undefined
      }

      const currentTypeStats = typeMapStats.get(generation);
      const currentCount = currentTypeStats![pokemon.type] || 0;

      // // Update the count for the specific Pokémon text
      currentTypeStats![pokemon.type] = currentCount + 1;

      // // Put the updated stats back into the map (this step is technically redundant, as we're updating the object directly)
      typeMapStats.set(generation, currentTypeStats!);
    });
  });

  teams.forEach((singleTeam) => {
    const generation = parseInt(singleTeam.generation);
    if (generation === 1) {
      return; // Skip processing for generation 1
    }

    if (!itemMapStats.has(generation)) {
      itemMapStats.set(generation, {});
    }

    singleTeam.team.forEach((t) => {
      if (!t.item) {
        return; // Skip this iteration if pokemon or text is undefined
      }
      const currentTypeStats = itemMapStats.get(generation);
      if (!currentTypeStats) {
        return;
      }

      const currentCount = currentTypeStats[t.item] || 0;

      if (isNaN(currentCount)) {
        console.error(
          `NaN detected for item ${t.item} in generation ${generation}`,
        );
        return;
      }

      // Update the count for the specific Pokémon text
      currentTypeStats![t.item] = currentCount + 1;

      // Put the updated stats back into the map (this step is technically redundant, as we're updating the object directly)
      itemMapStats.set(generation, currentTypeStats!);
    });
  });

  console.log("itemMapStats", itemMapStats);

  // const generationStatsArray = Array.from(generationMapStats.entries());
  const generationStatsArray = Array.from(generationMapStats.entries()).sort(
    ([genA], [genB]) => Number(genA) - Number(genB),
  );
  // generationStatsArray.map(([generation, stats]) =>
  //   Object.entries(stats).map(([pokemon, count]) =>
  //     console.log({ pokemon, count }),
  //   ),
  // );

  return (
    <Shell>
      <Header title="Analytics" description="Stats about all of your teams?" />

      <Card>
        <CardHeader>
          <CardTitle>Total Pokémon by Generation</CardTitle>
          <CardDescription>
            Highest stat totals across all Pokémon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            {generationStatsArray.map(([generation, stats]) => {
              // Sort Pokémon by count in descending order
              const sortedStats = Object.entries(stats).sort(
                ([, countA], [, countB]) => countB - countA,
              );
              return (
                <>
                  <TableHeader>
                    <TableCaption className="flex text-base font-semibold text-black">
                      Generation {generation}
                    </TableCaption>
                    <TableRow>
                      {/* <TableHead> Generation {generation}</TableHead> */}
                      <TableHead>Name</TableHead>
                      {/* <TableHead>Type</TableHead> */}
                      <TableHead>Times Used</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <Fragment key={generation}>
                      {/* <TableRow>
                        <TableCell colSpan={3} style={{ fontWeight: "bold" }}>
                          Generation {generation}
                        </TableCell>
                      </TableRow> */}
                      {sortedStats.map(([pokemon, count]) => (
                        <TableRow key={`${generation}-${pokemon}`}>
                          {/* <TableCell></TableCell>{" "} */}
                          {/* Empty cell for alignment */}
                          <TableCell>{pokemon}</TableCell>
                          <TableCell>{count}</TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  </TableBody>
                </>
              );
            })}
          </Table>
        </CardContent>
      </Card>
    </Shell>
  );
};

export default Analytics;
