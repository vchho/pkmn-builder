import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AppState {
  teams: any[];
}

const useStore = create<AppState>()(
  persist(
    immer((set) => ({
      teams: [],
      addTeam: (team: any) => {
        set((state) => {
          state.teams.push(team);
        });
      },
    })),
    {
      name: "pkmn-bldr",
      version: 1,
    }
  )
);

export default useStore;
