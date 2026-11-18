import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitRegistrationAction } from "@/actions/registration";
import { submitFinalProjectAction } from "@/actions/lms";
import {
  verifyPaymentAction,
  uploadMaterialAction,
  runManualBackupAction,
  deleteDataByTypeAction,
} from "@/actions/admin";

const mockGetUser = vi.fn();
const mockFrom = vi.fn();
const mockStorageFrom = vi.fn();
const mockSendRegEmail = vi.fn();
const mockUploadDrive = vi.fn();
const mockExportSheets = vi.fn();
const mockArchiveDrive = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(async () => ({
    auth: { getUser: mockGetUser },
    from: mockFrom,
    storage: { from: mockStorageFrom },
  })),
  createSupabaseAdminClient: vi.fn(() => ({
    from: mockFrom,
    storage: { from: mockStorageFrom },
  })),
}));

vi.mock("@/lib/sendgrid", () => ({
  sendRegistrationConfirmedEmail: (...args: unknown[]) => mockSendRegEmail(...args),
}));

vi.mock("@/lib/google", () => ({
  uploadMaterialToDrive: (...args: unknown[]) => mockUploadDrive(...args),
  exportBackupToSheets: (...args: unknown[]) => mockExportSheets(...args),
  archiveBinaryFilesInDrive: (...args: unknown[]) => mockArchiveDrive(...args),
}));

function makeAdminQueryChain() {
  const chain = {
    select: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    single: vi.fn(async () => ({
      data: {
        role: "admin",
        user_id: "peserta-1",
        program_title: "IMAGE PROCESSING",
        email: "peserta@ugm.ac.id",
        full_name: "Alya",
      },
      error: null,
    })),
    update: vi.fn(() => chain),
    insert: vi.fn(async () => ({ error: null })),
    upsert: vi.fn(async () => ({ error: null })),
    delete: vi.fn(() => chain),
    neq: vi.fn(async () => ({ error: null })),
    maybeSingle: vi.fn(async () => ({ data: null, error: null })),
  };
  return chain;
}

describe("Backend Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "user@ugm.ac.id" } },
      error: null,
    });
    mockFrom.mockImplementation(() => makeAdminQueryChain());
    mockStorageFrom.mockReturnValue({
      upload: vi.fn(async () => ({ data: { path: "proofs/user-1.png" }, error: null })),
    });
    mockSendRegEmail.mockResolvedValue({ ok: true });
    mockUploadDrive.mockResolvedValue({ fileId: "drive-1", webViewLink: "https://drive.google.com/file/d/drive-1" });
    mockExportSheets.mockResolvedValue({ spreadsheetId: "sheet-1", spreadsheetUrl: "https://docs.google.com/spreadsheets/d/sheet-1" });
    mockArchiveDrive.mockResolvedValue({ movedCount: 2 });
  });

  it("rejects commitment fee proof larger than 1 MB server-side", async () => {
    const formData = new FormData();
    formData.append("courses", "IMAGE PROCESSING");
    const bigFile = new File(["x"], "proof.png", { type: "image/png" });
    Object.defineProperty(bigFile, "size", { value: 1024 * 1024 + 1 });
    formData.append("proof", bigFile);

    const res = await submitRegistrationAction(formData);
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/1 MB/i);
  });

  it("accepts valid commitment fee proof <= 1 MB", async () => {
    const formData = new FormData();
    formData.append("courses", "IMAGE PROCESSING");
    const validFile = new File(["img"], "proof.png", { type: "image/png" });
    formData.append("proof", validFile);

    const res = await submitRegistrationAction(formData);
    expect(res.ok).toBe(true);
  });

  it("validates final project URL in submitFinalProjectAction", async () => {
    const bad = await submitFinalProjectAction("reg-1", "https://evil.example.com/file");
    expect(bad.ok).toBe(false);

    const good = await submitFinalProjectAction("reg-1", "https://github.com/kmteti/ws");
    expect(good.ok).toBe(true);
  });

  it("approves payment and sends SendGrid WhatsApp group email", async () => {
    const res = await verifyPaymentAction("reg-1", "approved");
    expect(res.ok).toBe(true);
    expect(mockSendRegEmail).toHaveBeenCalledTimes(1);
  });

  it("rejects material uploads larger than 20 MB", async () => {
    const formData = new FormData();
    formData.append("title", "Sesi 1");
    formData.append("meetUrl", "https://meet.google.com/abc-defg-hij");
    const hugeFile = new File(["x"], "slides.pdf", { type: "application/pdf" });
    Object.defineProperty(hugeFile, "size", { value: 20 * 1024 * 1024 + 1 });
    formData.append("file", hugeFile);

    const res = await uploadMaterialAction(formData);
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/20 MB/i);
  });

  it("runs idempotent manual backup and logs delete operation", async () => {
    const backupRes = await runManualBackupAction("backup-key-1");
    expect(backupRes.ok).toBe(true);
    expect(mockExportSheets).toHaveBeenCalledTimes(1);
    expect(mockArchiveDrive).toHaveBeenCalledTimes(1);

    const deleteRes = await deleteDataByTypeAction("attendance_records", "del-key-1");
    expect(deleteRes.ok).toBe(true);
  });
});
