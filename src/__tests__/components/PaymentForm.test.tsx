import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PaymentForm from "@/components/PaymentForm";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams("courses=Pelatihan%20Genap%20-%20STM32"),
}));

describe("PaymentForm Component", () => {
  beforeEach(() => {
    pushMock.mockReset();
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-preview");
  });

  it("renders selected courses and rejects submit without proof image", () => {
    render(<PaymentForm />);

    expect(screen.getByText("PAYMENT")).toBeInTheDocument();
    expect(screen.getByText("Pelatihan Genap - STM32")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /SUBMIT/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/upload bukti pembayaran/i);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("navigates to /dashboard when submitting with a valid image under 1 MB", () => {
    render(<PaymentForm />);

    const fileInput = screen.getByLabelText(/Upload bukti pembayaran/i);
    const validFile = new File(["img"], "proof.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [validFile] } });

    fireEvent.click(screen.getByRole("button", { name: /SUBMIT/i }));
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });
});
