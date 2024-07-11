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

export function HeldItemSelect({
  items,
  teamId,
  pokemonIndex,
  pokeDetail,
  item,
}: {
  items: {
    key: string;
    text: string;
    value: string;
  }[];
  teamId: string;
  pokemonIndex: number;
  pokeDetail: PokemonDetail;
  item?: string;
}) {
  const [open, setOpen] = useState(false);
  const [setItem, setValue] = useState("");

  const changeTeamMemberInfo = useStore((state) => state.changeTeamMemberInfo);

  useEffect(() => {
    if (item) {
      setValue(item);
    }
  }, [item]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // className="w-{90%} mx-1 justify-between"
          className="w-full justify-between"
        >
          {setItem
            ? items.find((item) => item.text === setItem)?.text
            : "Select Item"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search Item" />
          {/* https://github.com/shadcn-ui/ui/issues/607 */}
          <ScrollArea className="h-[220px] overflow-auto">
            <CommandEmpty>No game found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.text}
                  onSelect={() => {
                    setValue(item.text);
                    changeTeamMemberInfo(teamId, pokemonIndex, {
                      ...pokeDetail,
                      item: item.text,
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      setItem === item.text ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.text}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
