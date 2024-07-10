import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { AppState } from "@/types/AppState";
import { PokemonDetail } from "../types/AppState";

const useStore = create<AppState>()(
  devtools(
    persist(
      immer((set) => ({
        teams: [],
        addTeam: (teamId: string) => {
          const teamState = {
            teamId: teamId,
            generation: "",
            team: [],
            notes: "",
          };

          set((state) => {
            state.teams.push(teamState);
          });
        },
        addTeamMember: (teamId: string) => {
          set((state) => {
            const currentTeam = state.teams.find(
              (team) => team.teamId === teamId,
            );

            const updatedPokemon = {
              moves: [],
            };
            // @ts-ignore
            currentTeam?.team.push(updatedPokemon);
          });
        },

        addPokemonToSlot2: (teamId: string, poke: number) => {
          set((state) => {
            const currentTeam = state.teams.find(
              (team) => team.teamId === teamId,
            );

            const pokemon = {
              id: poke,
              moves: [] as number[],
            };

            if (currentTeam) {
              // @ts-ignore
              currentTeam.team.push(pokemon);
            }
          });
        },
        changeTeamMemberInfo: (
          teamId: string,
          pokemonIndex: number,
          detail: PokemonDetail,
        ) => {
          set((state) => {
            const currentTeam = state.teams.find(
              (team) => team.teamId === teamId,
            );

            if (currentTeam) {
              currentTeam.team[pokemonIndex] = { ...detail };
            }
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
              .find((team) => team.teamId === teamId)
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
        setNotes: (teamId: string, notes: string) => {
          set((state) => {
            state.teams.forEach((team) => {
              if (teamId === team.teamId) {
                team.notes = notes;
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
