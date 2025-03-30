import { useState } from "react";
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { TM, gen1Tms, gen2Tms, gen3TMs, gen4TMs, gen5TMs } from "@/lib/tms";
import { PokemonTypeBadge } from "@/components/pokemon-type-badge";

type PokemonGames = {
  name: string;
  generation: number;
  releaseYear: number;
  tms: TM[];
  hiddenItems: any[];
};

type HiddenItem = {
  id: string;
  name: string;
  location: string;
};

type GameContentProps = {
  game: {
    name: string;
    generation: number;
    releaseYear: number;
    tms: TM[];
    hiddenItems: HiddenItem[];
  };
};

const pokemonGames: PokemonGames[] = [
  {
    name: "Pokémon Red, Blue, Yellow",
    generation: 1,
    releaseYear: 1996,
    tms: gen1Tms,
    hiddenItems: [
      { id: "HI001", name: "Rare Candy", location: "Cerulean Cave" },
      { id: "HI002", name: "Nugget", location: "Route 11" },
      { id: "HI003", name: "Max Ether", location: "Power Plant" },
    ],
  },
  {
    name: "Pokémon Gold, Silver, Crystal",
    generation: 2,
    releaseYear: 1999,
    tms: gen2Tms,
    hiddenItems: [
      { id: "HI001", name: "Nugget", location: "Route 33" },
      { id: "HI002", name: "Max Potion", location: "Victory Road" },
      { id: "HI003", name: "Rare Candy", location: "Lake of Rage" },
    ],
  },
  {
    name: "Pokémon Ruby, Sapphire, Emerald",
    generation: 3,
    releaseYear: 2002,
    tms: gen3TMs,
    hiddenItems: [
      { id: "HI001", name: "Poké Ball", location: "Cabo Poco" },
      { id: "HI002", name: "Potion", location: "Mesagoza" },
      { id: "HI003", name: "Antidote", location: "South Province (Area One)" },
    ],
  },
  {
    name: "Pokémon Diamond, Pearl, Platinum",
    generation: 4,
    releaseYear: 2008,
    tms: gen4TMs,
    hiddenItems: [
      { id: "HI001", name: "Poké Ball", location: "Cabo Poco" },
      { id: "HI002", name: "Potion", location: "Mesagoza" },
      { id: "HI003", name: "Antidote", location: "South Province (Area One)" },
    ],
  },
  {
    name: "Pokémon Black, White, Black 2, White 2",
    generation: 5,
    releaseYear: 2010,
    tms: gen5TMs,
    hiddenItems: [
      { id: "HI001", name: "Poké Ball", location: "Cabo Poco" },
      { id: "HI002", name: "Potion", location: "Mesagoza" },
      { id: "HI003", name: "Antidote", location: "South Province (Area One)" },
    ],
  },
];

function GameContent({
  game,
}: {
  game: {
    name: string;
    generation: number;
    releaseYear: number;
    tms: TM[];
    hiddenItems: {
      id: string;
      name: string;
      location: string;
    }[];
  };
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterTMs = (tms: TM[]) => {
    return tms.filter((tm) =>
      [
        tm.name.toLowerCase(),
        tm.number.toLowerCase(),
        ...(tm.locations || []).map((loc: string) => loc.toLowerCase()),
      ].some((field) => field.includes(searchTerm.toLowerCase())),
    );
  };

  const filterHiddenItems = (items: HiddenItem[]) => {
    return items.filter((item) =>
      [
        item.name.toLowerCase(),
        item.id.toLowerCase(),
        item.location.toLowerCase(),
      ].some((field) => field.includes(searchTerm.toLowerCase())),
    );
  };

  return (
    <div>
      <div className="relative mb-4">
        <Input
          type="search"
          placeholder={`Search TMs or hidden items in ${game.name}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
      </div>
      <Tabs defaultValue="tms">
        <TabsList>
          <TabsTrigger value="tms">TMs</TabsTrigger>
          <TabsTrigger value="hidden-items">Hidden Items</TabsTrigger>
        </TabsList>
        <TabsContent value="tms">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTMs(game.tms).map((tm) => (
              <Card key={tm.number}>
                <CardContent className="p-4">
                  <h3 className="font-bold">{tm.name}</h3>
                  <span className="text-sm text-gray-600">TM {tm.number}</span>
                  <PokemonTypeBadge type={tm.type} className="text-sm">
                    {tm.type}
                  </PokemonTypeBadge>
                  <p className="text-sm">
                    Location:{" "}
                    {tm.locations.map((location, index) => (
                      <span key={location + index}>
                        {location}
                        {index < tm.locations.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="hidden-items">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterHiddenItems(game.hiddenItems).map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.id}</p>
                  <p className="text-sm">Location: {item.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Guides = () => {
  return (
    <Shell>
      <Header title="Guides" />
      <div className="container mx-auto p-4">
        <Accordion type="single" collapsible className="w-full">
          {pokemonGames.map((game) => (
            <AccordionItem key={game.name} value={game.name}>
              <AccordionTrigger>
                <div className="flex items-center">
                  <span>{game.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    Gen {game.generation}
                  </Badge>
                  <span className="text-muted-foreground ml-2 text-sm">
                    ({game.releaseYear})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <GameContent game={game} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Shell>
  );
};

export default Guides;
