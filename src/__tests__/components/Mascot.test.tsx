import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Mascot from "@/components/Mascot";

describe("Mascot", () => {
  it("renders as a decorative figure with an accessible label", () => {
    render(<Mascot />);
    expect(screen.getByRole("img", { name: /maskot workshop kmteti/i })).toBeInTheDocument();
  });

  it("renders both eyes", () => {
    render(<Mascot />);
    expect(screen.getByTestId("mascot-eye-left")).toBeInTheDocument();
    expect(screen.getByTestId("mascot-eye-right")).toBeInTheDocument();
  });

  it("renders both hands", () => {
    render(<Mascot />);
    expect(screen.getByTestId("mascot-hand-left")).toBeInTheDocument();
    expect(screen.getByTestId("mascot-hand-right")).toBeInTheDocument();
  });

  it("plays the wave animation on hover", () => {
    render(<Mascot />);
    const figure = screen.getByRole("img", { name: /maskot workshop kmteti/i });

    fireEvent.mouseEnter(figure);

    expect(screen.getByTestId("mascot-hand-right")).toHaveAttribute("data-animating", "wave");
  });

  it("applies the given className to the root element for sizing", () => {
    render(<Mascot className="w-24" />);
    expect(screen.getByRole("img", { name: /maskot workshop kmteti/i })).toHaveClass("w-24");
  });

  it("defaults to the idle pose", () => {
    render(<Mascot />);
    expect(screen.getByRole("img", { name: /maskot workshop kmteti/i })).toHaveAttribute("data-pose", "idle");
  });

  it.each(["idle", "wink-left", "wink-right", "happy", "wave"] as const)(
    "renders the %s pose with both eyes and both hands",
    (pose) => {
      render(<Mascot pose={pose} />);
      expect(screen.getByTestId("mascot-eye-left")).toBeInTheDocument();
      expect(screen.getByTestId("mascot-eye-right")).toBeInTheDocument();
      expect(screen.getByTestId("mascot-hand-left")).toBeInTheDocument();
      expect(screen.getByTestId("mascot-hand-right")).toBeInTheDocument();
    },
  );

  it("applies the given tilt in degrees to the happy pose", () => {
    render(<Mascot pose="happy" tilt={20} />);
    const mascotGroup = screen.getByTestId("mascot-group");
    expect(mascotGroup).toHaveAttribute("transform", expect.stringContaining("rotate(20"));
  });

  it("animates the wave pose's hand between its two Figma-defined positions on hover", () => {
    render(<Mascot pose="wave" />);
    const figure = screen.getByRole("img", { name: /maskot workshop kmteti/i });

    fireEvent.mouseEnter(figure);

    expect(screen.getByTestId("mascot-hand-right")).toHaveAttribute("data-animating", "wave");
  });
});
