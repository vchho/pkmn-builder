import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainContainer from "../pages/MainContainer";
import { describe, expect, test } from "vitest";

describe("MainContainer", () => {
  const renderWithRouter = (route: string) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <MainContainer />
      </MemoryRouter>,
    );
  };

  test("renders Home page on root route", () => {
    renderWithRouter("/");
    expect(screen.getByText(/teams/i)).toBeTruthy();
  });

  test("renders Chat page on /analytics route", () => {
    renderWithRouter("/analytics");
    expect(screen.findAllByText(/analytics/i)).toBeTruthy();
  });

  test("renders Settings page on /settings route", () => {
    renderWithRouter("/settings");
    expect(screen.findAllByText(/settings/i)).toBeTruthy();
  });
});
