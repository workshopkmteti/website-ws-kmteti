import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdminDashboardView from "@/features/admin/AdminDashboardView";

describe("AdminDashboardView", () => {
  it("approves participant payment and logs confirmation", () => {
    render(<AdminDashboardView />);

    const approveButtons = screen.getAllByRole("button", { name: /Setujui/i });
    fireEvent.click(approveButtons[0]);

    expect(screen.getAllByText(/Terkonfirmasi/i).length).toBeGreaterThan(0);
  });

  it("validates 20 MB material upload limit", () => {
    render(<AdminDashboardView />);

    fireEvent.click(screen.getByRole("tab", { name: /Materi & Meet/i }));

    const fileInput = screen.getByLabelText(/File Materi/i);
    const oversizedFile = new File(["x"], "huge.pdf", { type: "application/pdf" });
    Object.defineProperty(oversizedFile, "size", { value: 21 * 1024 * 1024 });

    fireEvent.change(fileInput, { target: { files: [oversizedFile] } });
    expect(screen.getByRole("alert")).toHaveTextContent(/20 MB/i);
  });

  it("triggers manual backup and requires confirmation dialog before deleting data", () => {
    render(<AdminDashboardView />);

    fireEvent.click(screen.getByRole("tab", { name: /Backup & Hapus/i }));

    fireEvent.click(screen.getByRole("button", { name: /Backup Manual/i }));
    expect(screen.getByText(/Backup ke Google Sheets & Drive berhasil/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Hapus Data/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Konfirmasi Hapus/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByText(/Data berhasil dihapus/i)).toBeInTheDocument();
  });
});
