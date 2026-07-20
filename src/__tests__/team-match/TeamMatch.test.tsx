import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TeamMatchPage from "@/app/team-match/page";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    motion: {
      ...actual.motion,
      ellipse: ({ children, ...props }: any) => <ellipse {...props}>{children}</ellipse>,
      circle: ({ children, ...props }: any) => <circle {...props}>{children}</circle>,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe("Team Match Page", () => {
  it("renders the header and main layout initially", () => {
    render(<TeamMatchPage />);

    expect(screen.getByRole("img", { name: /^workshop$/i })).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /create \/ join team/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /team availability/i })).toBeInTheDocument();

    expect(screen.getByText("Create Team")).toBeInTheDocument();
    expect(screen.getByText("Join Team")).toBeInTheDocument();
  });

  it("allows the user to check team availability and open the popup modal", async () => {
    render(<TeamMatchPage />);

    const checkButton = screen.getByRole("button", { name: /check/i });
    fireEvent.click(checkButton);

    const modalHeadings = screen.getAllByRole("heading", { name: /team availability/i });
    expect(modalHeadings.length).toBeGreaterThan(1);

    expect(screen.getByText(/XXX999/i)).toBeInTheDocument();
    expect(screen.getByText(/XXX888/i)).toBeInTheDocument();
    expect(screen.getByText(/XXX990/i)).toBeInTheDocument();
    expect(screen.getByText(/YYY998/i)).toBeInTheDocument();
    expect(screen.getByText(/YYY888/i)).toBeInTheDocument();

    const badges = screen.getAllByText("0/0");
    expect(badges.length).toBe(5);
  });

  it("can select a team from the popup list and click NEXT to transition to the team dashboard", () => {
    render(<TeamMatchPage />);

    fireEvent.click(screen.getByRole("button", { name: /check/i }));

    const teamOption = screen.getByText(/XXX888/i);
    fireEvent.click(teamOption);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(screen.getByRole("heading", { name: /your team/i })).toBeInTheDocument();
    expect(screen.getByText(/XXX888/i)).toBeInTheDocument();
  });

  it("can fill the Create Team form and transition to YOUR TEAM page with a generated code", () => {
    render(<TeamMatchPage />);

    const createInput = screen.getByPlaceholderText(/enter your team name/i);
    fireEvent.change(createInput, { target: { value: "Aether Team" } });

    const createButton = screen.getByRole("button", { name: /^create$/i });
    fireEvent.click(createButton);

    expect(screen.getByRole("heading", { name: /your team/i })).toBeInTheDocument();
    expect(screen.getByText(/Aether Team/i)).toBeInTheDocument();
  });

  it("can fill the Join Team form and transition to YOUR TEAM page showing the team code", () => {
    render(<TeamMatchPage />);

    const joinInput = screen.getByPlaceholderText(/enter your team code/i);
    fireEvent.change(joinInput, { target: { value: "KMT999" } });

    const joinButton = screen.getByRole("button", { name: /^join$/i });
    fireEvent.click(joinButton);

    expect(screen.getByRole("heading", { name: /your team/i })).toBeInTheDocument();
    expect(screen.getByText(/KMT999/i)).toBeInTheDocument();
  });

  it("allows filling and submitting leader/member details inside the YOUR TEAM dashboard", () => {
    render(<TeamMatchPage />);

    const createInput = screen.getByPlaceholderText(/enter your team name/i);
    fireEvent.change(createInput, { target: { value: "Spectra" } });
    fireEvent.click(screen.getByRole("button", { name: /^create$/i }));

    const leaderInput = screen.getByLabelText(/leader's name/i);
    fireEvent.change(leaderInput, { target: { value: "Vania Carmia" } });

    const memberInputs = screen.getAllByLabelText(/member/i);
    expect(memberInputs.length).toBe(2);

    fireEvent.change(memberInputs[0], { target: { value: "Vania Carmia 1" } });
    fireEvent.change(memberInputs[1], { target: { value: "Vania Carmia 2" } });

    const submitButton = screen.getByRole("button", { name: /submit your work/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole("heading", { name: /create \/ join team/i })).toBeInTheDocument();
  });
});
