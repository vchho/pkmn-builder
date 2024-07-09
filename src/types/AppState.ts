export type AppState = {
  teams: { teamId: string; generation: string; team: any[] }[];
  addTeamMember: (teamId: string) => void;
  addPokemonToSlot: (teamId: string, pokemonIndex?: number, poke?: any) => void;
  addTeam: (teamId: string) => void;
  addNatureToSlot: (
    teamId: string,
    nature: string,
    pokemonIndex?: number,
  ) => void;
  deleteTeamMember: (teamId: string, pokemonIndex: number) => void;
  nukeTeams: () => void;
  setGeneration: (generation: string, teamId: string) => void;
};
