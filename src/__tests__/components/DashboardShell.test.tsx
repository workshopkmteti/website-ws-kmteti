import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DashboardShell from "@/components/DashboardShell";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

describe("DashboardShell", () => {
  it("renders the search topbar on /dashboard", () => {
    render(
      <DashboardShell activeHref="/dashboard">
        <div>Dashboard Content</div>
      </DashboardShell>,
    );

    expect(screen.getByPlaceholderText("Cari apapun...")).toBeInTheDocument();
  });

  it("renders the Workshop header instead of search bar on non-dashboard pages", () => {
    render(
      <DashboardShell activeHref="/course/register">
        <div>Course Content</div>
      </DashboardShell>,
    );

    expect(screen.queryByPlaceholderText("Cari apapun...")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Workshop KMTETI/i })).toHaveAttribute("href", "/");
  });
});
