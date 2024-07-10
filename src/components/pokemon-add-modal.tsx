import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TPokemon } from "@/constants/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import PokemonImage from "./pokemon-image";
import useStore from "@/store/store";

export default function AddPokemonModal({
  filteredPokemon,
  teamId,
}: {
  filteredPokemon: TPokemon[];
  teamId: string;
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addPokemonToSlot2 = useStore((state) => state.addPokemonToSlot2);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="mt-5">
          Add Pokemon
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() => setSearchTerm("")}
        className="flex h-[80vh] w-full flex-col sm:max-w-[600px]"
      >
        <DialogHeader>
          <DialogTitle>Pokemon List</DialogTitle>
          <DialogDescription>Add a Pokemon!</DialogDescription>
        </DialogHeader>
        <div className="border-b p-4">
          <Input
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredPokemon
              .filter((p) =>
                p.text.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((p) => (
                <Card
                  key={p.text}
                  className="cursor-pointer"
                  onClick={() => {
                    addPokemonToSlot2(teamId, p.value);
                    setOpen(false);
                  }}
                >
                  <CardContent className="flex flex-col items-center gap-2 pt-5">
                    <PokemonImage pokemonName={p.text} />
                    <h3 className="text-lg font-semibold">{p.text}</h3>
                    {/* <p className="text-sm text-muted-foreground">{p.description}</p> */}
                  </CardContent>
                </Card>
              ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
