import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RegisterForm from "@/components/RegisterForm";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("RegisterForm Component", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("renders the registration form correctly", () => {
    render(<RegisterForm />);

    expect(screen.getByText("CHOOSE THE COURSE/COMPETITION")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /SUBMIT/i })).toBeInTheDocument();
  });

  it("filters courses when searching and navigates to /payment with selected courses", () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    const searchInput = screen.getByRole("searchbox", { name: /Cari program/i });
    fireEvent.change(searchInput, { target: { value: "STM32" } });

    expect(screen.getByText("Pelatihan Genap - STM32")).toBeInTheDocument();
    expect(screen.queryByText("TETI Programming Week - CTF")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Pelatihan Genap - STM32"));
    fireEvent.click(screen.getByRole("button", { name: /SUBMIT/i }));

    expect(pushMock).toHaveBeenCalledWith(
      "/course/payment?courses=Pelatihan%20Genap%20-%20STM32",
    );
  });

  it("filters by category and sorts courses", () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: /Filter/i }));
    expect(screen.getByRole("button", { name: /Filter: Bootcamp/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Sort By/i }));
    expect(screen.getByRole("button", { name: /Sort By: Z-A/i })).toBeInTheDocument();
  });

  it("marks selected course row with aria-pressed and supports pagination", () => {
    render(<RegisterForm />);

    const firstRow = screen.getByRole("button", { name: /TETI Programming Week - CTF/i });
    expect(firstRow).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(firstRow);
    expect(firstRow).toHaveAttribute("aria-pressed", "true");

    const nextPageBtn = screen.getByRole("button", { name: /^NEXT$/i });
    fireEvent.click(nextPageBtn);
    expect(screen.getByText("Bootcamp - Data Science")).toBeInTheDocument();
  });
});
