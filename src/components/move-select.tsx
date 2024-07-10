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
import { Move } from "@/types/move";

export function MoveSelect({
  moves,
  teamId,
  pokemonIndex,
  pokeDetail,
  moveIndex,
  moveInformation,
  item,
}: {
  moves: Move[];
  teamId: string;
  pokemonIndex: number;
  pokeDetail: PokemonDetail;
  moveIndex: number;
  moveInformation: number[];
  item?: string;
}) {
  const [open, setOpen] = useState(false);
  const [existingMove, setMove] = useState("");

  const changeTeamMemberInfo = useStore((state) => state.changeTeamMemberInfo);

  useEffect(() => {
    if (item) {
      const foundMove = moves.find((move) => String(move.id) === item);

      if (foundMove) {
        setMove(foundMove.name);
      }
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
          {existingMove
            ? moves.find((item) => item.name === existingMove)?.name
            : "Select a move"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search for a move" />
          {/* https://github.com/shadcn-ui/ui/issues/607 */}
          <ScrollArea className="h-[220px] overflow-auto">
            <CommandEmpty>No move found.</CommandEmpty>
            <CommandGroup>
              {moves.map((move) => (
                <CommandItem
                  key={move.name}
                  value={move.name}
                  onSelect={() => {
                    setMove(move.name);
                    changeTeamMemberInfo(teamId, pokemonIndex, {
                      ...pokeDetail,
                      // Adding move based on the set moveIndex so we can appropriately set our moves
                      moves: [
                        ...moveInformation.slice(0, moveIndex),
                        move.id,
                        ...moveInformation.slice(moveIndex),
                      ],
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      existingMove === move.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {move.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
