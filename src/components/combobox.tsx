import * as React from "react";
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

export function ComboboxDemo({
  filteredPokemon,
  selectPokemon,
}: {
  filteredPokemon: TPokemon[];
  selectPokemon: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
          {value
            ? filteredPokemon.find((pokemon) => pokemon.text === value)?.text
            : "Select Pokemon..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search Pokemon..." />
          {/* https://github.com/shadcn-ui/ui/issues/607 */}
          <ScrollArea className="h-[220px] overflow-auto">
            <CommandEmpty>No game found.</CommandEmpty>
            <CommandGroup>
              {filteredPokemon.map((pokemon) => (
                <CommandItem
                  key={pokemon.value}
                  value={pokemon.text}
                  onSelect={(currentValue) => {
                    console.log("current VAlue in combo box", currentValue);
                    setValue(currentValue === value ? "" : pokemon.text);
                    selectPokemon(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === pokemon.text ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {pokemon.text}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
