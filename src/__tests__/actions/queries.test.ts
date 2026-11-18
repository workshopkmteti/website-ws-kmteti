import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getAdminParticipantsData,
  getCertificateDataForUser,
  getMaterialsData,
} from "@/lib/queries/lms";

const mockGetUser = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(async () => ({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  })),
  createSupabaseAdminClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

describe("Supabase Server Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "alya@ugm.ac.id" } },
      error: null,
    });
  });

  it("maps materials rows from Supabase to TrainingMaterial[]", async () => {
    mockFrom.mockReturnValueOnce({
      select: () => ({
        order: async () => ({
          data: [
            {
              id: "m1",
              program_title: "IMAGE PROCESSING",
              session_number: 1,
              title: "Sesi 1: Intro",
              meet_url: "https://meet.google.com/abc",
              drive_url: "https://drive.google.com/file/d/1",
              file_size_bytes: 2 * 1024 * 1024,
            },
          ],
          error: null,
        }),
      }),
    });

    const materials = await getMaterialsData();
    expect(materials).toHaveLength(1);
    expect(materials[0]).toMatchObject({
      id: "m1",
      program: "IMAGE PROCESSING",
      session: 1,
      fileSizeLabel: "2.0 MB",
    });
  });

  it("computes user certificate eligibility data from registration, project, and attendance", async () => {
    mockFrom
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            order: () => ({
              limit: () => ({
                maybeSingle: async () => ({
                  data: { id: "reg-1", program_title: "MatLab" },
                  error: null,
                }),
              }),
            }),
          }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({
              data: { project_url: "https://github.com/kmteti/matlab" },
              error: null,
            }),
          }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          eq: async () => ({
            data: [{ present: true }, { present: false }, { present: true }],
            error: null,
          }),
        }),
      });

    const cert = await getCertificateDataForUser();
    expect(cert).toEqual({
      registrationId: "reg-1",
      programTitle: "MatLab",
      submittedUrl: "https://github.com/kmteti/matlab",
      absences: 1,
    });
  });

  it("maps admin participants with 6-session attendance array", async () => {
    mockFrom
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: { role: "admin" }, error: null }),
          }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          order: async () => ({
            data: [
              {
                id: "reg-1",
                program_title: "IMAGE PROCESSING",
                payment_status: "approved",
                profiles: { full_name: "Alya", email: "alya@ugm.ac.id" },
                attendance_records: [
                  { session_number: 1, present: true },
                  { session_number: 2, present: false },
                ],
                final_projects: [{ id: "fp-1" }],
              },
            ],
            error: null,
          }),
        }),
      });

    const rows = await getAdminParticipantsData();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      id: "reg-1",
      name: "Alya",
      paymentStatus: "Terkonfirmasi",
      finalProjectSubmitted: true,
    });
    expect(rows[0].sessions).toHaveLength(6);
    expect(rows[0].sessions[0]).toBe(true);
    expect(rows[0].sessions[1]).toBe(false);
  });
});
