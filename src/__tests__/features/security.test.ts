import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET as oauthCallback } from "@/app/auth/callback/route";
import { submitRegistrationAction } from "@/actions/registration";
import { getAdminParticipantsData } from "@/lib/queries/lms";

const mockGetUser = vi.fn();
const mockExchangeCode = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(async () => ({
    auth: {
      getUser: mockGetUser,
      exchangeCodeForSession: mockExchangeCode,
    },
    from: mockFrom,
  })),
  createSupabaseAdminClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

describe("Security Hardening", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExchangeCode.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "alya@ugm.ac.id" } },
      error: null,
    });
  });

  it("prevents open redirect in OAuth callback", async () => {
    const res = await oauthCallback(
      new Request("https://workshop.ugm.ac.id/auth/callback?code=abc&next=//evil.com"),
    );
    expect(res.headers.get("location")).toBe("https://workshop.ugm.ac.id/dashboard");
  });

  it("rejects SVG uploads as commitment fee proof", async () => {
    const formData = new FormData();
    formData.append("courses", "IMAGE PROCESSING");
    const svgFile = new File(["<svg/>"], "xss.svg", { type: "image/svg+xml" });
    formData.append("proof", svgFile);

    const res = await submitRegistrationAction(formData);
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/JPG, PNG, atau WebP/i);
  });

  it("blocks getAdminParticipantsData when user is not admin", async () => {
    mockFrom.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: { role: "participant" }, error: null }),
        }),
      }),
    });

    const rows = await getAdminParticipantsData();
    expect(rows).toEqual([]);
  });
});
