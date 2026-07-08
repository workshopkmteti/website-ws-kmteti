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
});
