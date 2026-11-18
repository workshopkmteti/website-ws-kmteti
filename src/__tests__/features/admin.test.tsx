import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminDashboardView from "@/features/admin/AdminDashboardView";

const verifyPaymentMock = vi.fn();
const recordAttendanceMock = vi.fn();
const uploadMaterialMock = vi.fn();
const runManualBackupMock = vi.fn();
const deleteDataByTypeMock = vi.fn();

vi.mock("@/actions/admin", () => ({
  verifyPaymentAction: (...args: unknown[]) => verifyPaymentMock(...args),
  recordAttendanceAction: (...args: unknown[]) => recordAttendanceMock(...args),
  uploadMaterialAction: (...args: unknown[]) => uploadMaterialMock(...args),
  runManualBackupAction: (...args: unknown[]) => runManualBackupMock(...args),
  deleteDataByTypeAction: (...args: unknown[]) => deleteDataByTypeMock(...args),
}));

describe("AdminDashboardView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    verifyPaymentMock.mockResolvedValue({ ok: true });
    recordAttendanceMock.mockResolvedValue({ ok: true });
    uploadMaterialMock.mockResolvedValue({ ok: true });
    runManualBackupMock.mockResolvedValue({ ok: true, data: {} });
    deleteDataByTypeMock.mockResolvedValue({ ok: true });
  });

  it("approves participant payment via verifyPaymentAction and logs confirmation", async () => {
    render(<AdminDashboardView />);

    const approveButtons = screen.getAllByRole("button", { name: /Setujui/i });
    fireEvent.click(approveButtons[0]);

    await waitFor(() => {
      expect(verifyPaymentMock).toHaveBeenCalledWith("p1", "approved");
      expect(screen.getAllByText(/Terkonfirmasi/i).length).toBeGreaterThan(0);
    });
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

  it("triggers manual backup and requires confirmation dialog before deleting data", async () => {
    render(<AdminDashboardView />);

    fireEvent.click(screen.getByRole("tab", { name: /Backup & Hapus/i }));

    fireEvent.click(screen.getByRole("button", { name: /Backup Manual/i }));
    await waitFor(() => {
      expect(runManualBackupMock).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Backup ke Google Sheets & Drive berhasil/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Hapus Data/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Konfirmasi Hapus/i }));
    await waitFor(() => {
      expect(deleteDataByTypeMock).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(screen.getByText(/Data berhasil dihapus/i)).toBeInTheDocument();
    });
  });
});
