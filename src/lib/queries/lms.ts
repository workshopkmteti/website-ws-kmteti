import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import type { TrainingMaterial } from "@/features/lms/MaterialsView";
import type { ParticipantRow, PaymentStatus } from "@/features/admin/AdminDashboardView";

const STATUS_MAP: Record<string, PaymentStatus> = {
  approved: "Terkonfirmasi",
  rejected: "Ditolak",
  pending: "Menunggu",
};

function formatMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function getCurrentUserSummary(): Promise<{ name: string; role: string }> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { name: "Peserta", role: "Peserta" };

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .maybeSingle();

    const name = profile?.full_name?.trim() || user.email?.split("@")[0] || "Peserta";
    const role = profile?.role === "admin" ? "Admin" : "Peserta";
    return { name, role };
  } catch {
    return { name: "Peserta", role: "Peserta" };
  }
}

export async function getOpenProgramsData(): Promise<string[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("programs")
      .select("tag, title")
      .eq("is_open", true)
      .order("created_at", { ascending: true });

    if (!data?.length) return [];
    return data.map((p) => `${p.tag} - ${p.title}`);
  } catch {
    return [];
  }
}

export async function getMaterialsData(): Promise<TrainingMaterial[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("materials")
      .select("id, program_title, session_number, title, meet_url, drive_url, file_size_bytes")
      .order("session_number", { ascending: true });

    if (!data?.length) return [];
    return data.map((row) => ({
      id: String(row.id),
      program: String(row.program_title),
      session: Number(row.session_number),
      title: String(row.title),
      date: `Sesi ${row.session_number}`,
      meetUrl: String(row.meet_url || "https://meet.google.com"),
      driveUrl: String(row.drive_url || "https://drive.google.com"),
      fileSizeLabel: formatMb(Number(row.file_size_bytes ?? 0)),
    }));
  } catch {
    return [];
  }
}

export async function getCertificateDataForUser(): Promise<{
  registrationId: string;
  programTitle: string;
  submittedUrl: string | null;
  absences: number;
}> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { registrationId: "reg-default", programTitle: "Workshop KMTETI", submittedUrl: null, absences: 0 };
    }

    const { data: reg } = await supabase
      .from("registrations")
      .select("id, program_title")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!reg) {
      return { registrationId: "reg-default", programTitle: "Workshop KMTETI", submittedUrl: null, absences: 0 };
    }

    const { data: project } = await supabase
      .from("final_projects")
      .select("project_url")
      .eq("registration_id", reg.id)
      .maybeSingle();

    const { data: attendance } = await supabase
      .from("attendance_records")
      .select("present")
      .eq("registration_id", reg.id);

    const absences = Array.isArray(attendance)
      ? attendance.filter((r) => r.present === false).length
      : 0;

    return {
      registrationId: String(reg.id),
      programTitle: String(reg.program_title),
      submittedUrl: project?.project_url ? String(project.project_url) : null,
      absences,
    };
  } catch {
    return { registrationId: "reg-default", programTitle: "Workshop KMTETI", submittedUrl: null, absences: 0 };
  }
}

export async function getAdminParticipantsData(): Promise<ParticipantRow[]> {
  try {
    const admin = createSupabaseAdminClient();
    const { data } = await admin
      .from("registrations")
      .select(
        "id, program_title, payment_status, profiles(full_name, email), attendance_records(session_number, present), final_projects(id)",
      )
      .order("created_at", { ascending: false });

    if (!data?.length) return [];

    return data.map((row) => {
      const profileRaw = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
      const profile = (profileRaw ?? {}) as { full_name?: string; email?: string };
      const records = Array.isArray(row.attendance_records) ? row.attendance_records : [];
      const sessions = Array.from({ length: 6 }, (_, idx) => {
        const match = records.find((r) => Number(r.session_number) === idx + 1);
        return Boolean(match?.present);
      });
      const finalProjects = Array.isArray(row.final_projects) ? row.final_projects : [];

      return {
        id: String(row.id),
        name: profile.full_name?.trim() || profile.email || "Peserta",
        email: profile.email || "",
        program: String(row.program_title),
        paymentStatus: STATUS_MAP[String(row.payment_status)] ?? "Menunggu",
        sessions,
        finalProjectSubmitted: finalProjects.length > 0,
      };
    });
  } catch {
    return [];
  }
}
