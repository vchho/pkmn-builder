import { Accordion } from "@/components/ui/accordion";
import useStore from "@/store/store";
import { useParams } from "react-router-dom";
import { AccordionInfo } from "./accordion-info";

export function AccordionContainer() {
  const { id } = useParams() as { id: string };

  const currentTeam = useStore((state) => {
    return state.teams.find((team) => team.teamId === id);
  });

  return (
    <Accordion type="single" collapsible className="my-4 w-full">
      {currentTeam && currentTeam.team.length > 0 ? (
        currentTeam.team.map((t, index) => {
          return (
            <AccordionInfo
              pokemonId={t.id}
              pokeDetail={t}
              teamId={id}
              orderIndex={index}
              currentGeneration={currentTeam.generation}
            />
          );
        })
      ) : (
        <p>No Pokemon added</p>
      )}
    </Accordion>
  );
}
