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
        // TODO: add team member based on object
        // TODO: create update team member where they can add or update pokemon
        addTeamMember: (teamId: string) => {
          set((state) => {
            const currentTeam = state.teams.find(
              (team) => team.teamId === teamId,
            );

            const updatedPokemon = {
              moves: [],
            };
            currentTeam?.team.push(updatedPokemon);
          });
        },
        addPokemonToSlot: (
          teamId: string,
          pokemonIndex?: number,
          poke?: any,
        ) => {
          set((state) => {
            const currentTeam = state.teams.find(
              (team) => team.teamId === teamId,
            );

            let currentPokemon = currentTeam?.team[pokemonIndex!];

            let asdf = {
              ...currentPokemon,
              id: poke,
            };

            console.log("asdf", asdf);
            currentTeam!.team[pokemonIndex!] = asdf;
          });
        },
        addNatureToSlot: (
          teamId: string,
          nature: string,
          pokemonIndex?: number,
        ) => {
          console.log({ teamId, nature, pokemonIndex });
          set((state) => {
            const currentTeam = state.teams.find(
              (team) => team.teamId === teamId,
            );

            let currentPokemon = currentTeam?.team[pokemonIndex!];
            let updatedInfo = {
              ...currentPokemon,
              // TODO: resesarch why text is lowercased
              nature: nature.charAt(0).toUpperCase() + nature.slice(1),
            };

            currentTeam!.team[pokemonIndex!] = updatedInfo;
          });
        },
        deleteTeam: (teamId: string) => {
          set((state) => {
            // state.teams.map((team) => );
          });
        },
        deleteTeamMember: (teamId: string, pokemonIndex: number) => {
          set((state) => {
            state.teams
              .find((team) => (team.teamId = teamId))
              ?.team.splice(pokemonIndex, 1);
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
