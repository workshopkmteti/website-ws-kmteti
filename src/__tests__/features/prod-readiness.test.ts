import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET as downloadCertificate } from "@/app/api/certificate/route";
import { saveProfileAction } from "@/actions/profile";

const mockGetUser = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(async () => ({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  })),
}));

describe("Production Readiness Endpoints & Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "alya@ugm.ac.id" } },
      error: null,
    });
  });

  it("blocks certificate download when not eligible and serves file when eligible", async () => {
    // Ineligible: no final project
    mockFrom
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: { id: "reg-1", program_title: "MatLab" }, error: null }),
            }),
          }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: null, error: null }),
          }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          eq: async () => ({ data: [{ present: true }], error: null }),
        }),
      });

    const forbiddenRes = await downloadCertificate(
      new Request("http://localhost:3000/api/certificate?registrationId=reg-1"),
    );
    expect(forbiddenRes.status).toBe(403);

    // Eligible: final project submitted & 1 absence
    mockFrom
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: { id: "reg-1", program_title: "MatLab" }, error: null }),
            }),
          }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: { id: "fp-1" }, error: null }),
          }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          eq: async () => ({ data: [{ present: true }, { present: false }], error: null }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: { full_name: "Alya Putri" }, error: null }),
          }),
        }),
      });

    const okRes = await downloadCertificate(
      new Request("http://localhost:3000/api/certificate?registrationId=reg-1"),
    );
    expect(okRes.status).toBe(200);
    expect(okRes.headers.get("Content-Disposition")).toContain("attachment");
    const svg = await okRes.text();
    expect(svg).toContain("Alya Putri");
    expect(svg).toContain("MatLab");
  });

  it("saves profile updates via saveProfileAction", async () => {
    mockFrom.mockReturnValueOnce({
      update: () => ({
        eq: async () => ({ error: null }),
      }),
    });

    const formData = new FormData();
    formData.append("fullName", "Alya Putri");
    formData.append("phone", "08123456789");
    formData.append("nim", "22/499999/TK/54000");

    const res = await saveProfileAction(formData);
    expect(res.ok).toBe(true);
  });
});
