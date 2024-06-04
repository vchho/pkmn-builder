export type AppState = {
  teams: { teamId: string; generation: string; team: any[] }[];
  addTeamMember: (pokemonId: number) => void;
  addTeam: (teamId: string) => void;
  nukeTeams: () => void;
  setGeneration: (generation: string, teamId: string) => void;
};
