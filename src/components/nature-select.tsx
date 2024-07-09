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
import { Nature } from "@/types/nature";
import { PokemonDetail } from "@/types/AppState";

export function NatureSelect({
  natures,
  teamId,
  pokemonIndex,
  nature,
  pokeDetail,
}: {
  natures: Nature[];
  teamId: string;
  pokemonIndex: number;
  nature?: string;
  pokeDetail: PokemonDetail;
}) {
  const [open, setOpen] = useState(false);
  const [setNature, setValue] = useState("");

  const changeTeamMemberInfo = useStore((state) => state.changeTeamMemberInfo);

  useEffect(() => {
    if (nature) {
      setValue(nature);
    }
  }, [nature]);

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
          {setNature
            ? natures.find((nature) => nature.text === setNature)?.text
            : "Select Nature..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* <PopoverContent className="w-[300px] p-0"> */}
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Nature..." />
          {/* https://github.com/shadcn-ui/ui/issues/607 */}
          {/* <ScrollArea className="h-[220px] overflow-auto"> */}
          <ScrollArea className="h-[220px] overflow-auto">
            <CommandEmpty>No game found.</CommandEmpty>
            <CommandGroup>
              {natures.map((nature) => (
                <CommandItem
                  key={nature.value}
                  onSelect={() => {
                    setValue(nature.text);
                    changeTeamMemberInfo(teamId, pokemonIndex, {
                      ...pokeDetail,
                      nature: nature.text,
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      setNature === nature.text ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {nature.text}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
