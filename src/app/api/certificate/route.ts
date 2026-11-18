import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isCertificateEligible } from "@/features/lms/eligibility";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const registrationId = searchParams.get("registrationId")?.trim();

  if (!registrationId) {
    return NextResponse.json({ error: "registrationId wajib diisi." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: reg } = await supabase
    .from("registrations")
    .select("id, program_title")
    .eq("id", registrationId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!reg) {
    return NextResponse.json({ error: "Pendaftaran tidak ditemukan." }, { status: 404 });
  }

  const { data: project } = await supabase
    .from("final_projects")
    .select("id")
    .eq("registration_id", reg.id)
    .maybeSingle();

  const { data: attendance } = await supabase
    .from("attendance_records")
    .select("present")
    .eq("registration_id", reg.id);

  const absences = Array.isArray(attendance)
    ? attendance.filter((r) => r.present === false).length
    : 0;

  if (!isCertificateEligible(Boolean(project), absences)) {
    return NextResponse.json(
      { error: "Belum memenuhi syarat kelayakan sertifikat." },
      { status: 403 },
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const participantName = escapeXml(
    profile?.full_name?.trim() || user.email || "Peserta Workshop KMTETI",
  );
  const programTitle = escapeXml(String(reg.program_title));
  const issuedDate = new Date().toISOString().slice(0, 10);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e0339"/>
      <stop offset="100%" stop-color="#08071A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect x="36" y="36" width="1128" height="728" rx="24" fill="none" stroke="#7C3AED" stroke-width="4"/>
  <text x="600" y="150" text-anchor="middle" fill="#C4B5FD" font-family="sans-serif" font-size="24" letter-spacing="6">WORKSHOP KMTETI FT UGM</text>
  <text x="600" y="230" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="52" font-weight="bold">SERTIFIKAT KELULUSAN</text>
  <text x="600" y="320" text-anchor="middle" fill="#9CA3AF" font-family="sans-serif" font-size="22">Diberikan kepada:</text>
  <text x="600" y="400" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="48" font-weight="bold">${participantName}</text>
  <text x="600" y="480" text-anchor="middle" fill="#C4B5FD" font-family="sans-serif" font-size="24">Telah menyelesaikan program pelatihan ${programTitle}</text>
  <text x="600" y="660" text-anchor="middle" fill="#9CA3AF" font-family="monospace" font-size="18">Diterbitkan: ${issuedDate}</text>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sertifikat-workshop-kmteti.svg"',
    },
  });
}
