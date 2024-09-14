import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TeamBuilder from "../components/TeamCreate/TeamBuilder";
import * as storeModule from "@/store/store";
import { AppState, PokemonDetail } from "@/types/AppState";

// Mock the entire store module
vi.mock("@/store/store", () => ({
  default: vi.fn(),
}));

describe("TeamBuilder", () => {
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

  it("renders the component", () => {
    render(
      <MemoryRouter initialEntries={["/team/123"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamBuilder />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Create team")).toBeTruthy();
    expect(screen.getByText("Game Generation")).toBeTruthy();
    expect(screen.getByText("Notes")).toBeTruthy();
  });

  // it("updates notes when textarea changes", async () => {
  //   const setNotesMock = vi.fn();

  //   const mockTeams = {
  //     teamId: "123",
  //     generation: "1",
  //     notes: "",
  //     team: [
  //       {
  //         id: 157,
  //         moves: [53, 9, 70, 91],
  //         item: "Charcoal",
  //       },
  //     ],
  //   };

  //   vi.mocked(storeModule.default).mockImplementation(() => mockTeams);

  //   render(
  //     <MemoryRouter initialEntries={["/team/123"]}>
  //       <Routes>
  //         <Route path="/team/:id" element={<TeamBuilder />} />
  //       </Routes>
  //     </MemoryRouter>,
  //   );

  //   const textarea = screen.getAllByRole("textbox");
  //   textarea.forEach((ta) => {
  //     fireEvent.change(ta, { target: { value: "New notes" } });
  //   });
  //   // fireEvent.change(textarea, { target: { value: "New notes" } });

  //   await waitFor(
  //     () => {
  //       expect(setNotesMock).toHaveBeenCalledWith("123", "New notes");
  //     },
  //     { timeout: 1500 }, // Increased timeout due to debounce
  //   );
  // });

  // it("updates generation when selected", async () => {
  //   const setGenerationMock = vi.fn();

  //   const mockTeams = {
  //     teamId: "123",
  //     generation: "",
  //     notes: "",
  //     team: [
  //       {
  //         id: 157,
  //         moves: [53, 9, 70, 91],
  //         item: "Charcoal",
  //       },
  //     ],
  //   };

  //   vi.mocked(storeModule.default).mockImplementation(() => mockTeams);

  //   render(
  //     <MemoryRouter initialEntries={["/team/123"]}>
  //       <Routes>
  //         <Route path="/team/:id" element={<TeamBuilder />} />
  //       </Routes>
  //     </MemoryRouter>,
  //   );

  //   const selectTrigger = screen.getAllByText("Select a generation");
  //   selectTrigger.forEach((select) => {
  //     fireEvent.click(select);
  //   });

  //   const option = screen.getByText("Gen 1 (Red, Blue and Yellow)");
  //   fireEvent.click(option);

  //   await waitFor(() => {
  //     expect(setGenerationMock).toHaveBeenCalledWith("1", "123");
  //   });
  // });

  it("updates generation when selected", async () => {
    const setGenerationMock = vi.fn();

    const mockStore = {
      teams: [
        {
          teamId: "123",
          generation: "",
          notes: "",
          team: [
            {
              id: 157,
              moves: [53, 9, 70, 91],
              item: "Charcoal",
            },
          ],
        },
      ],
      setGeneration: setGenerationMock, // Use the mock function here
    };

    // Update the mock implementation to use the new mockStore
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
        setNotes: vi.fn(),
      } as AppState),
    );

    render(
      <MemoryRouter initialEntries={["/team/123"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamBuilder />} />
        </Routes>
      </MemoryRouter>,
    );

    const selectTrigger = screen.getByText("Select a generation");
    fireEvent.click(selectTrigger);

    const option = screen.getByText("Gen 1 (Red, Blue and Yellow)");
    fireEvent.click(option);

    // TODO: not done

    // await waitFor(
    //   () => {
    //     console.log("setGenerationMock calls:", setGenerationMock.mock.calls);
    //     expect(setGenerationMock).toHaveBeenCalledWith("1", "123");
    //   },
    //   { timeout: 2000 },
    // );

    // if (setGenerationMock.mock.calls.length === 0) {
    //   console.log("setGenerationMock was not called");
    //   console.log("Component output:", screen.debug());
    // }

    // await waitFor(() => {
    //   expect(setGenerationMock).toHaveBeenCalledWith("1", "123");
    // });
  });
});

// it("filters Pokemon based on selected generation", () => {
//   vi.mocked(storeModule.default).mockReturnValue({
//     teams: [
//       {
//         teamId: "123",
//         generation: "1",
//         notes: "",
//         team: [
//           {
//             id: 157,
//             moves: [53, 9, 70, 91],
//             item: "Charcoal",
//           },
//           {
//             id: 71,
//             moves: [230, 75, 188, 79],
//             item: "Miracle Seed",
//           },
//           {
//             id: 214,
//             moves: [15, 249, 224, 89],
//           },
//         ],
//       },
//     ],
//     setGeneration: vi.fn(),
//     setNotes: vi.fn(),
//   });

//   render(
//     <MemoryRouter initialEntries={["/team/123"]}>
//       <Routes>
//         <Route path="/team/:id" element={<TeamBuilder />} />
//       </Routes>
//     </MemoryRouter>,
//   );

//   // You might need to mock the AddPokemonModal component to check this
//   // or use a more complex setup to open the modal and check its content
//   // This test is more conceptual and might need adjustment based on your actual implementation
//   expect(screen.getByText("Create team")).toBeTruthy();
//   // Add assertions to check if the filtered Pokemon list is correct
// })
