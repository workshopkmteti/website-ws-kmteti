import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Cta from "@/components/Cta";
import Sidebar from "@/components/Sidebar";
import AuthSlider from "@/components/auth/AuthSlider";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("FE Flow Integration", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("links Cta Get Started button to /auth/register", () => {
    render(<Cta />);
    const link = screen.getByRole("link", { name: /Get Started/i });
    expect(link).toHaveAttribute("href", "/auth/register");
  });

  it("links Sidebar navigation items to existing routes", () => {
    render(
      <Sidebar
        activeHref="/dashboard"
        userName="Bimo"
        userRole="Peserta"
        userInitial="B"
        isOpen={true}
        onClose={() => {}}
      />,
    );

    expect(screen.getByRole("link", { name: /Dashboard/i })).toHaveAttribute("href", "/dashboard");
    expect(screen.getByRole("link", { name: /Pelatihan/i })).toHaveAttribute("href", "/register");
    expect(screen.getByRole("link", { name: /Materi/i })).toHaveAttribute("href", "/materials");
    expect(screen.getByRole("link", { name: /Absensi/i })).toHaveAttribute("href", "/attendance");
    expect(screen.getByRole("link", { name: /Penugasan/i })).toHaveAttribute("href", "/assignment");
    expect(screen.getByRole("link", { name: /Sertifikat/i })).toHaveAttribute("href", "/certificate");
    expect(screen.getByRole("link", { name: /Kompetisi/i })).toHaveAttribute("href", "/competition");
    expect(screen.getByRole("link", { name: /Team Match/i })).toHaveAttribute("href", "/team-match");
    expect(screen.getByRole("link", { name: /Admin/i })).toHaveAttribute("href", "/admin");
    expect(screen.getByRole("link", { name: /Profil/i })).toHaveAttribute("href", "/profile");
  });

  it("navigates to /dashboard on LoginForm submit and /auth/verify on RegisterForm submit", () => {
    const { container } = render(<AuthSlider initialMode="login" />);

    const loginForm = container.querySelector("form");
    expect(loginForm).not.toBeNull();
    fireEvent.submit(loginForm!);
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });
});
