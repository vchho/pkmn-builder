import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { AppState } from "@/types/AppState";

const useStore = create<AppState>()(
  devtools(
    persist(
      immer((set) => ({
        teams: [],
        addTeam: (teamId: string) => {
          const teamState = { teamId: teamId, generation: "", team: [] };

          set((state) => {
            state.teams.push(teamState);
          });
        },
        addTeamMember: (teamId: string, pokemon: any) => {
          console.log({ teamId, pokemon });
          set((state) => {
            const currentTeam = state.teams.find(
              (team) => team.teamId === teamId,
            );
            currentTeam?.team.push(pokemon);
          });
        },
        deleteTeam: (teamId: string) => {
          set((state) => {
            // state.teams.map((team) => );
          });
        },
        // Development function
        nukeTeams: () => {
          set((state) => {
            state.teams = [];
          });
        },
        setGeneration: (generation: string, teamId: string) => {
          set((state) => {
            state.teams.forEach((team) => {
              if (teamId === team.teamId) {
                team.generation = generation;
              }
            });
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
