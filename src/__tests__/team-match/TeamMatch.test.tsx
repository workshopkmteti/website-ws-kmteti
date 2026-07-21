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
    expect(screen.getByText(/KMT999/i)).toBeInTheDocument();

    expect(screen.getAllByText("3/3 Full").length).toBe(2);
    expect(screen.getAllByText("2/3").length).toBe(3);
    expect(screen.getAllByText("1/3").length).toBe(1);
  });

  it("can select a team from the popup list and click NEXT to transition to the team dashboard", () => {
    render(<TeamMatchPage />);

    fireEvent.click(screen.getByRole("button", { name: /check/i }));

    const teamOption = screen.getByText(/XXX888/i);
    fireEvent.click(teamOption);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(screen.getByRole("heading", { name: /your team/i })).toBeInTheDocument();
    expect(screen.getByText(/XXX888/i)).toBeInTheDocument();
  });

  it("can fill the Create Team form and transition to YOUR TEAM page with a generated code", () => {
    render(<TeamMatchPage />);

    const createInput = screen.getByPlaceholderText(/enter your team name/i);
    fireEvent.change(createInput, { target: { value: "Aether Team" } });

    const createButton = screen.getByRole("button", { name: /^create$/i });
    fireEvent.click(createButton);

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(screen.getByRole("heading", { name: /your team/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /AETHER TEAM'S TEAM/i })).toBeInTheDocument();
  });

  it("can fill the Join Team form and transition to YOUR TEAM page showing the team code", () => {
    render(<TeamMatchPage />);

    const joinInput = screen.getByPlaceholderText(/enter your team code/i);
    fireEvent.change(joinInput, { target: { value: "KMT999" } });

    const joinButton = screen.getByRole("button", { name: /^join$/i });
    fireEvent.click(joinButton);

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(screen.getByRole("heading", { name: /your team/i })).toBeInTheDocument();
    expect(screen.getByText(/KMT999/i)).toBeInTheDocument();
  });

  it("allows filling and submitting leader/member details inside the YOUR TEAM dashboard", () => {
    render(<TeamMatchPage />);

    const createInput = screen.getByPlaceholderText(/enter your team name/i);
    fireEvent.change(createInput, { target: { value: "Spectra" } });
    fireEvent.click(screen.getByRole("button", { name: /^create$/i }));

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

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

  it("shows an error when trying to create a team with an invalid name", () => {
    render(<TeamMatchPage />);

    const createInput = screen.getByPlaceholderText(/enter your team name/i);
    fireEvent.change(createInput, { target: { value: "ab" } }); // too short

    const createButton = screen.getByRole("button", { name: /^create$/i });
    fireEvent.click(createButton);

    expect(screen.getByText(/team name must be between 3 and 25 characters/i)).toBeInTheDocument();
  });

  it("shows an error when trying to join with an invalid code format", () => {
    render(<TeamMatchPage />);

    const joinInput = screen.getByPlaceholderText(/enter your team code/i);
    fireEvent.change(joinInput, { target: { value: "123XYZ" } }); // invalid format

    const joinButton = screen.getByRole("button", { name: /^join$/i });
    fireEvent.click(joinButton);

    expect(screen.getByText(/team code must be 3 letters followed by 3 numbers/i)).toBeInTheDocument();
  });

  it("shows an error when trying to join an unregistered team code", () => {
    render(<TeamMatchPage />);

    const joinInput = screen.getByPlaceholderText(/enter your team code/i);
    fireEvent.change(joinInput, { target: { value: "ZZZ999" } }); // valid format but unregistered

    const joinButton = screen.getByRole("button", { name: /^join$/i });
    fireEvent.click(joinButton);

    expect(screen.getByText(/team code not found/i)).toBeInTheDocument();
  });

  it("shows an error when trying to join a team that is already full", () => {
    render(<TeamMatchPage />);

    const joinInput = screen.getByPlaceholderText(/enter your team code/i);
    fireEvent.change(joinInput, { target: { value: "XXX999" } }); // full team (3/3)

    const joinButton = screen.getByRole("button", { name: /^join$/i });
    fireEvent.click(joinButton);

    expect(screen.getByText(/this team is already full/i)).toBeInTheDocument();
  });

  it("allows cancelling the create/join team confirmation dialog", () => {
    render(<TeamMatchPage />);

    const createInput = screen.getByPlaceholderText(/enter your team name/i);
    fireEvent.change(createInput, { target: { value: "Cancel Team" } });

    const createButton = screen.getByRole("button", { name: /^create$/i });
    fireEvent.click(createButton);

    expect(screen.getByText(/Are you sure you want to create the team/i)).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(screen.queryByText(/Are you sure you want to create the team/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /create \/ join team/i })).toBeInTheDocument();
  });

  it("allows a leader to disband the team from the dashboard", () => {
    render(<TeamMatchPage />);

    const createInput = screen.getByPlaceholderText(/enter your team name/i);
    fireEvent.change(createInput, { target: { value: "Disband Team Test" } });
    fireEvent.click(screen.getByRole("button", { name: /^create$/i }));
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    const disbandButton = screen.getByRole("button", { name: /disband team/i });
    fireEvent.click(disbandButton);

    expect(screen.getByText(/Are you sure you want to disband the team/i)).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(screen.getByRole("heading", { name: /create \/ join team/i })).toBeInTheDocument();
  });

  it("allows a member to leave the team from the dashboard", () => {
    render(<TeamMatchPage />);

    const joinInput = screen.getByPlaceholderText(/enter your team code/i);
    fireEvent.change(joinInput, { target: { value: "XXX888" } });
    fireEvent.click(screen.getByRole("button", { name: /^join$/i }));
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    const leaveButton = screen.getByRole("button", { name: /leave team/i });
    fireEvent.click(leaveButton);

    expect(screen.getByText(/Are you sure you want to leave the team/i)).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(screen.getByRole("heading", { name: /create \/ join team/i })).toBeInTheDocument();
  });
});
