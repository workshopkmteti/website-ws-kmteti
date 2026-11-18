"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/backend";

const MAX_PROOF_SIZE_BYTES = 1024 * 1024;
const ALLOWED_PROOF_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function submitRegistrationAction(
  formData: FormData,
): Promise<ActionResult<{ registrationId?: string }>> {
  const coursesRaw = String(formData.get("courses") ?? "").trim();
  const proof = formData.get("proof");

  if (!coursesRaw) {
    return { ok: false, error: "Pilih minimal satu program." };
  }

  if (!(proof instanceof File) || proof.size === 0) {
    return { ok: false, error: "Bukti commitment fee wajib diunggah." };
  }

  if (proof.size > MAX_PROOF_SIZE_BYTES) {
    return { ok: false, error: "Ukuran file maksimal 1 MB." };
  }

  if (!ALLOWED_PROOF_TYPES.has(proof.type)) {
    return { ok: false, error: "Bukti pembayaran harus berupa gambar JPG, PNG, atau WebP." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { ok: false, error: "Unauthorized" };
  }

  const safeName = proof.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `${user.id}/${Date.now()}-${safeName}`;
  const { error: uploadError } = await supabase.storage
    .from("commitment_proofs")
    .upload(storagePath, proof, { contentType: proof.type, upsert: false });

  if (uploadError) {
    return { ok: false, error: uploadError.message };
  }

  const courses = coursesRaw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  for (const programTitle of courses) {
    const { error: insertError } = await supabase.from("registrations").insert({
      user_id: user.id,
      program_title: programTitle,
      proof_path: storagePath,
      payment_status: "pending",
    });

    if (insertError) {
      return { ok: false, error: insertError.message };
    }
  }

  return { ok: true, data: {} };
}
