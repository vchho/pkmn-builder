import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AppState {
  teams: any[];
  addTeamMember: (pokemonId: number) => void;
  addTeam: () => void;
}

const useStore = create<AppState>()(
  devtools(
    persist(
      immer((set) => ({
        teams: [],
        addTeam: () => {
          console.log("hit in zustand");
          const teamState = { id: 123, generation: "" };

          set((state) => {
            state.teams.push(teamState);
          });
        },
        addTeamMember: (pokemonId: number) => {
          set((state) => {
            state.teams.push({ id: pokemonId, moves: [] });
          });
        },
      })),
      {
        name: "pkmn-bldr",
        version: 1,
      },
    ),
  ),
);

export default useStore;
