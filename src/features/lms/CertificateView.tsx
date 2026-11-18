"use client";

import { useState, type FormEvent } from "react";
import { Award, CheckCircle2, Lock } from "lucide-react";
import { submitFinalProjectAction } from "@/actions/lms";
import {
  MAX_ABSENCES_ALLOWED,
  TOTAL_SESSIONS,
  isCertificateEligible,
  isValidFinalProjectUrl,
} from "./eligibility";

type CertificateViewProps = {
  registrationId?: string;
  programTitle?: string;
  initialSubmittedUrl?: string | null;
  initialAbsences?: number;
};

export default function CertificateView({
  registrationId = "reg-default",
  programTitle = "IMAGE PROCESSING",
  initialSubmittedUrl = null,
  initialAbsences = 1,
}: CertificateViewProps) {
  const [projectUrl, setProjectUrl] = useState(initialSubmittedUrl ?? "");
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(initialSubmittedUrl);
  const [absences] = useState(initialAbsences);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const eligible = isCertificateEligible(Boolean(submittedUrl), absences);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidFinalProjectUrl(projectUrl)) {
      setError("Gunakan link Google Drive, YouTube, atau GitHub.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      const trimmed = projectUrl.trim();
      const res = await submitFinalProjectAction(registrationId, trimmed);
      if (!res.ok) {
        setError(res.error ?? "Gagal mengumpulkan final project.");
        return;
      }
      setSubmittedUrl(trimmed);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 text-white">
      <header>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Sertifikat
        </h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="flex flex-col justify-between gap-5 rounded-[10px] border border-white/6 bg-[#110F2E] p-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-white">Final Project</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 font-mono text-xs text-[#9CA3AF]">
                Link Final Project
                <input
                  type="url"
                  aria-label="Link Final Project"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="h-11 rounded-[10px] border border-white/10 bg-[#0D0B24] px-4 text-sm text-white placeholder:text-[#9CA3AF]/50 focus:border-[#7C3AED] focus:outline-none"
                />
              </label>

              {error && (
                <p role="alert" className="font-mono text-xs text-rose-300">
                  {error}
                </p>
              )}

              {submittedUrl && (
                <p className="truncate font-mono text-xs text-[#10b981]">
                  ✓ {submittedUrl}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="h-11 cursor-pointer rounded-[10px] bg-[#7C3AED] px-5 font-mono text-xs font-bold text-white transition-all hover:bg-[#6B21A8] active:scale-[0.98] disabled:opacity-60"
              >
                {pending ? "Menyimpan..." : "Kumpulkan Final Project"}
              </button>
            </form>
          </div>
        </article>

        <article className="flex flex-col justify-between gap-5 rounded-[10px] border border-white/6 bg-[#110F2E] p-6">
          <div className="flex items-center justify-between rounded-[10px] border border-white/6 bg-[#0D0B24] p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-[10px] bg-[#7C3AED]/20 text-white">
                {eligible ? (
                  <Award className="size-5 text-[#10b981]" />
                ) : (
                  <Lock className="size-5 text-[#C4B5FD]" />
                )}
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-white">{programTitle}</p>
                <p className="font-mono text-xs text-[#9CA3AF]">
                  {eligible ? "Siap diunduh" : "Belum memenuhi syarat"}
                </p>
              </div>
            </div>
            {eligible && <CheckCircle2 className="size-5 text-[#10b981]" aria-hidden="true" />}
          </div>

          <ul className="flex flex-col gap-2.5 font-mono text-xs">
            <li className="flex items-center justify-between rounded-[10px] border border-white/6 bg-[#0D0B24] px-4 py-3">
              <span>Final Project</span>
              <span className={submittedUrl ? "text-[#10b981]" : "text-[#FACC15]"}>
                {submittedUrl ? "✓ Terkumpul" : "✗ Belum"}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-[10px] border border-white/6 bg-[#0D0B24] px-4 py-3">
              <span>Absen</span>
              <span className={absences <= MAX_ABSENCES_ALLOWED ? "text-[#10b981]" : "text-rose-300"}>
                {absences}/{TOTAL_SESSIONS} (maks {MAX_ABSENCES_ALLOWED})
              </span>
            </li>
          </ul>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={!eligible}
              onClick={() => {
                setDownloaded(true);
                window.location.assign(
                  `/api/certificate?registrationId=${encodeURIComponent(registrationId)}`,
                );
              }}
              className={`h-11 rounded-[10px] border font-mono text-xs font-bold transition-all ${
                eligible
                  ? "cursor-pointer border-[#7C3AED] bg-[#7C3AED] text-white hover:bg-[#6B21A8] active:scale-[0.98]"
                  : "cursor-not-allowed border-white/10 bg-[#0D0B24] text-[#9CA3AF]/50"
              }`}
            >
              Unduh Sertifikat
            </button>
            {downloaded && (
              <p className="text-center font-mono text-xs text-[#10b981]">
                Sertifikat siap diunduh.
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
