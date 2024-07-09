import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import useStore from "@/store/store";
import { PokemonDetail } from "@/types/AppState";

export function AbilitiesSelect({
  abilities,
  teamId,
  pokemonIndex,
  ability,
  pokeDetail,
}: {
  abilities: {
    id: string;
    name: string;
    description: string;
    generation: string;
  }[];
  teamId: string;
  pokemonIndex: number;
  ability?: string;
  pokeDetail: PokemonDetail;
}) {
  const [open, setOpen] = useState(false);
  const [setAbility, setValue] = useState("");

  const changeTeamMemberInfo = useStore((state) => state.changeTeamMemberInfo);

  useEffect(() => {
    if (ability) {
      setValue(ability);
    }
  }, [ability]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // className="w-[300px] justify-between"
          className="w-full justify-between"
          // className="w-{90%} mx-1 justify-between"
        >
          {setAbility
            ? abilities.find((ability) => ability.name === setAbility)?.name
            : "Select Ability..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* <PopoverContent className="w-[300px] p-0"> */}
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Ability..." />
          {/* https://github.com/shadcn-ui/ui/issues/607 */}
          {/* <ScrollArea className="h-[220px] overflow-auto"> */}
          <ScrollArea className="h-[220px] overflow-auto">
            <CommandEmpty>No game found.</CommandEmpty>
            <CommandGroup>
              {abilities.map((ability) => (
                <CommandItem
                  key={ability.name}
                  onSelect={() => {
                    setValue(ability.name);
                    changeTeamMemberInfo(teamId, pokemonIndex, {
                      ...pokeDetail,
                      ability: ability.name,
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      setAbility === ability.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {ability.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
