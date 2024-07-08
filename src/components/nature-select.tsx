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
import { TPokemon } from "@/constants/pokemon";
import { ScrollArea } from "./ui/scroll-area";
import useStore from "@/store/store";
import { Nature } from "@/types/nature";

export function NatureSelect({
  natures,
  teamId,
  pokemonIndex,
  nature,
}: {
  natures: Nature[];
  teamId: string;
  pokemonIndex: number;
  nature?: string;
}) {
  const [open, setOpen] = useState(false);
  const [setNature, setValue] = useState("");

  const addNatureToSlot = useStore((state) => state.addNatureToSlot);

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
          className="w-{90%} mx-1 justify-between"
        >
          {setNature
            ? natures.find((nature) => nature.text === setNature)?.text
            : "Select Nature..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search Nature..." />
          {/* https://github.com/shadcn-ui/ui/issues/607 */}
          <ScrollArea className="h-[220px] overflow-auto">
            <CommandEmpty>No game found.</CommandEmpty>
            <CommandGroup>
              {natures.map((nature) => (
                <CommandItem
                  key={nature.value}
                  value={nature.text}
                  onSelect={(currentValue) => {
                    setValue(currentValue === setNature ? "" : nature.text);
                    addNatureToSlot(teamId, currentValue, pokemonIndex);
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
