"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isCertificateEligible, isValidFinalProjectUrl } from "@/features/lms/eligibility";
import type { ActionResult } from "@/types/backend";

export async function submitFinalProjectAction(
  registrationId: string,
  projectUrl: string,
): Promise<ActionResult> {
  if (!registrationId || !isValidFinalProjectUrl(projectUrl)) {
    return { ok: false, error: "Gunakan link Google Drive, YouTube, atau GitHub yang valid." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { ok: false, error: "Unauthorized" };
  }

  const { error } = await supabase.from("final_projects").upsert({
    registration_id: registrationId,
    project_url: projectUrl.trim(),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export async function getCertificateEligibilityAction(
  registrationId: string,
): Promise<ActionResult<{ eligible: boolean; absences: number; finalProjectSubmitted: boolean }>> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { ok: false, error: "Unauthorized" };
  }

  const { data: project } = await supabase
    .from("final_projects")
    .select("id")
    .eq("registration_id", registrationId)
    .maybeSingle();

  const { data: records } = await supabase
    .from("attendance_records")
    .select("present")
    .eq("registration_id", registrationId);

  const absences = Array.isArray(records)
    ? records.filter((r) => r.present === false).length
    : 0;
  const finalProjectSubmitted = Boolean(project);

  return {
    ok: true,
    data: {
      eligible: isCertificateEligible(finalProjectSubmitted, absences),
      absences,
      finalProjectSubmitted,
    },
  };
}
