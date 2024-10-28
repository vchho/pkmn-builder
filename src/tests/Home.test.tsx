import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import * as storeModule from "@/store/store";
import { AppState, PokemonDetail } from "@/types/AppState";

// Mock the store
vi.mock("@/store/store", () => ({
  default: vi.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    const mockStore = {
      teams: [
        {
          teamId: "123",
          generation: "1",
          notes: "",
          team: [] as PokemonDetail[],
        },
      ],
      setGeneration: vi.fn(),
      setNotes: vi.fn(),
    };

    // Setup the mock implementation of useStore
    vi.mocked(storeModule.default).mockImplementation((selector) =>
      selector({
        ...mockStore,
        addTeamMember: vi.fn(),
        addPokemonToSlot2: vi.fn(),
        addTeam: vi.fn(),
        changeTeamMemberInfo: vi.fn(),
        deleteTeam: vi.fn(),
        deleteTeamMember: vi.fn(),
        updateTeamName: vi.fn(),
        nukeTeams: vi.fn(),
      } as AppState),
    );
  });

  it("renders the welcome message", () => {
    const mockStore = {
      teams: [
        {
          teamId: "123",
          generation: "1",
          notes: "",
          team: [] as PokemonDetail[],
        },
      ],
      setGeneration: vi.fn(),
      setNotes: vi.fn(),
    };
    vi.mocked(storeModule.default).mockImplementation(() => mockStore.teams);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText("Teams")).toBeTruthy();
    expect(screen.getByText("Wanna see your teams?")).toBeTruthy();
  });

  it("displays a message when no teams exist", () => {
    const mockTeams = {
      teams: [],
    };

    vi.mocked(storeModule.default).mockImplementation(() => mockTeams.teams);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText("You haven't created any teams yet.")).toBeTruthy();
  });

  it("displays a list of teams when teams exist", () => {
    const mockTeams = {
      teams: [
        { teamId: "1", generation: "1" },
        { teamId: "2", generation: "2" },
      ],
    };

    vi.mocked(storeModule.default).mockImplementation(() => mockTeams.teams);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/Generation: 1/)).toBeTruthy();
    expect(screen.getByText(/Generation: 2/)).toBeTruthy();
  });

  it("includes a link to create a new team", () => {
    const mockTeams = {
      teams: [
        { teamId: "1", generation: "1" },
        { teamId: "2", generation: "2" },
      ],
    };

    vi.mocked(storeModule.default).mockImplementation(() => mockTeams.teams);
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const createTeamLink = screen.getAllByText("Create Team");
    expect(createTeamLink).toBeTruthy();
    createTeamLink.forEach((link) => {
      expect(link.getAttribute("href")).toMatch(/^\/create\/.+$/);
    });
  });
});
