export type AppState = {
  teams: {
    teamId: string;
    generation: string;
    team: PokemonDetail[];
    notes: string;
  }[];
  addTeamMember: (teamId: string) => void;
  addPokemonToSlot2: (teamId: string, poke: any) => void;
  addTeam: (teamId: string) => void;
  changeTeamMemberInfo: (
    teamId: string,
    pokemonIndex: number,
    detail: PokemonDetail,
  ) => void;
  deleteTeam: (teamIndex: number) => void;
  deleteTeamMember: (teamId: string, pokemonIndex: number) => void;
  nukeTeams: () => void;
  setGeneration: (generation: string, teamId: string) => void;
  setNotes: (teamId: string, notes: string) => void;
};

export type PokemonDetail = {
  ability?: string;
  id: number;
  item?: string;
  moves: number[];
  nature?: string;
};
