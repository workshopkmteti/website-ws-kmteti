import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CompetitionPage from "@/app/competition/page";
import { COMPETITIONS, findCompetition, formatDue, timeRemaining } from "@/data/competitions";

describe("competition data", () => {
  it("formats the due date the way the design spells it", () => {
    expect(formatDue("2026-02-19T22:00:00+07:00")).toBe("Thursday, 19 February 2026, 10.00 PM");
  });

  it("counts down to the due date and closes once it passes", () => {
    const due = "2026-02-19T22:00:00+07:00";
    const now = new Date("2026-02-17T20:00:00+07:00").getTime();
    expect(timeRemaining(due, now)).toBe("2 days 2 hours remaining");
    expect(timeRemaining(due, new Date(due).getTime())).toBe("Closed");
  });

  it("looks competitions up by id", () => {
    expect(findCompetition("ctf")?.status).toBe("Ongoing");
    expect(findCompetition("nope")).toBeUndefined();
  });
});

describe("CompetitionPage", () => {
  it("lists every competition sorted by due date", () => {
    render(<CompetitionPage />);
    expect(screen.getAllByRole("heading", { name: /competition title/i })).toHaveLength(
      COMPETITIONS.length,
    );
    expect(screen.getByText("Ongoing", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("Closed", { selector: "span" })).toBeInTheDocument();
  });

  it("links an expandable competition to its detail page", () => {
    render(<CompetitionPage />);
    expect(screen.getByRole("link", { name: "REGISTER" })).toHaveAttribute(
      "href",
      "/register",
    );
    expect(screen.getByRole("link", { name: "GO TO COMPETITION" })).toHaveAttribute(
      "href",
      "/competition/innovation",
    );
  });

  it("filters by status", async () => {
    render(<CompetitionPage />);
    fireEvent.change(screen.getByLabelText("Filter"), { target: { value: "Closed" } });
    await waitFor(() =>
      expect(screen.getAllByRole("heading", { name: /competition title/i })).toHaveLength(1),
    );
    expect(screen.queryByText("Ongoing", { selector: "span" })).not.toBeInTheDocument();
  });

  it("tells the user when nothing matches the search", () => {
    render(<CompetitionPage />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "robotics" } });
    expect(screen.getByText("No competitions found.")).toBeInTheDocument();
  });
});
