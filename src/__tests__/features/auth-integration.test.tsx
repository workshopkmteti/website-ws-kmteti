import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AuthSlider from "@/components/auth/AuthSlider";
import VerifyPage from "@/app/auth/verify/page";

const pushMock = vi.fn();
const loginActionMock = vi.fn();
const registerActionMock = vi.fn();
const verifyOtpActionMock = vi.fn();
const resendOtpActionMock = vi.fn();
const signInWithGoogleActionMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams("email=alya@ugm.ac.id"),
}));

vi.mock("@/actions/auth", () => ({
  loginAction: (...args: unknown[]) => loginActionMock(...args),
  registerAction: (...args: unknown[]) => registerActionMock(...args),
  verifyOtpAction: (...args: unknown[]) => verifyOtpActionMock(...args),
  resendOtpAction: (...args: unknown[]) => resendOtpActionMock(...args),
  signInWithGoogleAction: (...args: unknown[]) => signInWithGoogleActionMock(...args),
}));

describe("Auth UI Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows error when loginAction fails and redirects to /dashboard on success", async () => {
    loginActionMock.mockResolvedValueOnce({ ok: false, error: "Email atau password salah." });

    const { container } = render(<AuthSlider initialMode="login" />);
    const form = container.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByRole("alert")[0]).toHaveTextContent(/Email atau password salah/i);
    });
    expect(pushMock).not.toHaveBeenCalled();

    loginActionMock.mockResolvedValueOnce({ ok: true });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("submits registerAction and redirects to /auth/verify with email", async () => {
    registerActionMock.mockResolvedValueOnce({ ok: true });

    render(<AuthSlider initialMode="register" />);
    const confirmInput = screen.getAllByLabelText(/Konfirmasi Password/i)[0];
    const registerForm = confirmInput.closest("form")!;
    const scoped = within(registerForm);

    fireEvent.change(scoped.getByLabelText(/^Email$/i), { target: { value: "alya@ugm.ac.id" } });
    fireEvent.change(scoped.getByLabelText(/^Password$/i), { target: { value: "secret123" } });
    fireEvent.change(confirmInput, { target: { value: "secret123" } });
    fireEvent.submit(registerForm);

    await waitFor(() => {
      expect(registerActionMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/auth/verify?email=alya%40ugm.ac.id");
    });
  });

  it("submits OTP on VerifyPage via verifyOtpAction and redirects to /course/register", async () => {
    verifyOtpActionMock.mockResolvedValueOnce({ ok: true });

    render(<VerifyPage />);
    for (let i = 1; i <= 6; i++) {
      fireEvent.change(screen.getByLabelText(`Digit ${i}`), { target: { value: String(i) } });
    }

    fireEvent.click(screen.getByRole("button", { name: /^Verifikasi$/i }));

    await waitFor(() => {
      expect(verifyOtpActionMock).toHaveBeenCalledWith("alya@ugm.ac.id", "123456");
      expect(pushMock).toHaveBeenCalledWith("/course/register");
    });
  });
});
