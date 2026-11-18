import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PaymentForm from "@/components/PaymentForm";

const pushMock = vi.fn();
const submitRegistrationMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams("courses=Pelatihan%20Genap%20-%20STM32"),
}));

vi.mock("@/actions/registration", () => ({
  submitRegistrationAction: (...args: unknown[]) => submitRegistrationMock(...args),
}));

describe("PaymentForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-preview");
    submitRegistrationMock.mockResolvedValue({ ok: true });
  });

  it("renders selected courses and rejects submit without proof image", () => {
    render(<PaymentForm />);

    expect(screen.getByText("PAYMENT")).toBeInTheDocument();
    expect(screen.getByText("Pelatihan Genap - STM32")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /SUBMIT/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/upload bukti pembayaran/i);
    expect(submitRegistrationMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("submits via submitRegistrationAction and navigates to /dashboard on success", async () => {
    render(<PaymentForm />);

    const fileInput = screen.getByLabelText(/Upload bukti pembayaran/i);
    const validFile = new File(["img"], "proof.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [validFile] } });

    fireEvent.click(screen.getByRole("button", { name: /SUBMIT/i }));

    await waitFor(() => {
      expect(submitRegistrationMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
