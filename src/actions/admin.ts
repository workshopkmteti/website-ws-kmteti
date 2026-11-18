"use server";

import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { sendRegistrationConfirmedEmail } from "@/lib/sendgrid";
import {
  archiveBinaryFilesInDrive,
  exportBackupToSheets,
  uploadMaterialToDrive,
} from "@/lib/google";
import { isValidMaterialFileSize } from "@/features/lms/eligibility";
import type { ActionResult, DeletableTable, PaymentApprovalStatus } from "@/types/backend";

async function requireAdmin(): Promise<{ userId: string } | { error: string }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  const admin = createSupabaseAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Forbidden" };
  }

  return { userId: user.id };
}

export async function verifyPaymentAction(
  registrationId: string,
  status: PaymentApprovalStatus,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if ("error" in gate) return { ok: false, error: gate.error };

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("registrations")
    .update({ payment_status: status })
    .eq("id", registrationId);

  if (error) {
    return { ok: false, error: error.message };
  }

  if (status === "approved") {
    const { data: participant } = await admin
      .from("profiles")
      .select("email, full_name")
      .eq("id", gate.userId)
      .single();

    if (participant?.email) {
      try {
        await sendRegistrationConfirmedEmail({
          to: participant.email,
          participantName: participant.full_name || "Peserta",
          programTitle: "Workshop KMTETI",
          whatsappGroupUrl: process.env.DEFAULT_WHATSAPP_GROUP_URL ?? "https://chat.whatsapp.com/",
        });
      } catch {
        // Email delivery is skipped gracefully until SMTP/SendGrid credentials are configured.
      }
    }
  }

  return { ok: true };
}

export async function recordAttendanceAction(
  registrationId: string,
  sessionNumber: number,
  present: boolean,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if ("error" in gate) return { ok: false, error: gate.error };

  if (sessionNumber < 1 || sessionNumber > 6) {
    return { ok: false, error: "Nomor sesi harus 1 sampai 6." };
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("attendance_records").upsert({
    registration_id: registrationId,
    session_number: sessionNumber,
    present,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export async function uploadMaterialAction(formData: FormData): Promise<ActionResult> {
  const gate = await requireAdmin();
  if ("error" in gate) return { ok: false, error: gate.error };

  const title = String(formData.get("title") ?? "").trim();
  const meetUrl = String(formData.get("meetUrl") ?? "").trim();
  const programTitle = String(formData.get("programTitle") ?? "Workshop KMTETI").trim();
  const sessionNumber = Number(formData.get("sessionNumber") ?? 1);
  const file = formData.get("file");

  if (!title || !(file instanceof File)) {
    return { ok: false, error: "Judul dan file materi wajib diisi." };
  }

  if (!isValidMaterialFileSize(file.size)) {
    return { ok: false, error: "Ukuran file materi maksimal 20 MB." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadMaterialToDrive({
    filename: file.name,
    mimeType: file.type || "application/octet-stream",
    buffer,
  });

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("materials").insert({
    program_title: programTitle,
    session_number: sessionNumber,
    title,
    meet_url: meetUrl,
    drive_file_id: uploaded.fileId,
    drive_url: uploaded.webViewLink,
    file_size_bytes: file.size,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export async function runManualBackupAction(
  idempotencyKey: string,
): Promise<ActionResult<{ spreadsheetUrl?: string }>> {
  const gate = await requireAdmin();
  if ("error" in gate) return { ok: false, error: gate.error };

  const admin = createSupabaseAdminClient();
  const { data: existingLog } = await admin
    .from("admin_logs")
    .select("id, metadata")
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();

  if (existingLog) {
    return { ok: true, data: {} };
  }

  const { data: registrations } = await admin
    .from("registrations")
    .select("id, program_title, payment_status, created_at, profiles(full_name, email)");

  const rows: string[][] = [
    ["Registration ID", "Nama", "Email", "Program", "Status Pembayaran", "Tanggal Daftar"],
  ];
  if (Array.isArray(registrations)) {
    for (const row of registrations) {
      const profileRaw = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
      const profile = (profileRaw ?? {}) as { full_name?: string; email?: string };
      rows.push([
        String(row.id ?? ""),
        String(profile.full_name ?? ""),
        String(profile.email ?? ""),
        String(row.program_title ?? ""),
        String(row.payment_status ?? ""),
        String(row.created_at ?? ""),
      ]);
    }
  }

  const { data: materials } = await admin.from("materials").select("drive_file_id");
  const fileIds = Array.isArray(materials)
    ? materials.map((m) => String(m.drive_file_id ?? "")).filter(Boolean)
    : [];

  const sheet = await exportBackupToSheets({
    title: `Workshop-KMTETI-Backup-${new Date().toISOString().slice(0, 10)}`,
    rows,
  });

  const archive = await archiveBinaryFilesInDrive({
    backupFolderName: `Backup-${new Date().toISOString().slice(0, 10)}`,
    fileIds,
  });

  const { error } = await admin.from("admin_logs").insert({
    idempotency_key: idempotencyKey,
    action_type: "backup",
    target: "all",
    actor_id: gate.userId,
    metadata: {
      spreadsheetId: sheet.spreadsheetId,
      spreadsheetUrl: sheet.spreadsheetUrl,
      movedCount: archive.movedCount,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: { spreadsheetUrl: sheet.spreadsheetUrl } };
}

export async function deleteDataByTypeAction(
  target: DeletableTable,
  idempotencyKey: string,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if ("error" in gate) return { ok: false, error: gate.error };

  const admin = createSupabaseAdminClient();
  const { data: existingLog } = await admin
    .from("admin_logs")
    .select("id")
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();

  if (existingLog) {
    return { ok: true };
  }

  const { error: deleteError } = await admin
    .from(target)
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    return { ok: false, error: deleteError.message };
  }

  const { error: logError } = await admin.from("admin_logs").insert({
    idempotency_key: idempotencyKey,
    action_type: "delete",
    target,
    actor_id: gate.userId,
  });

  if (logError) {
    return { ok: false, error: logError.message };
  }

  return { ok: true };
}
