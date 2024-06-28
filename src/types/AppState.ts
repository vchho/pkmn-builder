export type AppState = {
  teams: { teamId: string; generation: string; team: any[] }[];
  addTeamMember: (teamId: string, pokemon: any) => void;
  addTeam: (teamId: string) => void;
  deleteTeamMember: (teamId: string, pokemonIndex: number) => void;
  nukeTeams: () => void;
  setGeneration: (generation: string, teamId: string) => void;
};
