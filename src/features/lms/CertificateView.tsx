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
    <section className="flex flex-col gap-6 text-[#e6edf4]">
      <header>
        <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-wide text-[#e6edf4] uppercase sm:text-3xl">
          Sertifikat
        </h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="flex flex-col justify-between gap-5 rounded-[24px] border-2 border-[#c6c6c6]/80 bg-[linear-gradient(142deg,rgba(198,198,198,0.22)_4%,rgba(94,55,134,0.42)_90%)] p-6 shadow-[0_12px_36px_rgba(12,4,28,0.45)] backdrop-blur-md">
          <div className="flex flex-col gap-4">
            <h2 className="font-[family-name:var(--font-montserrat)] text-lg font-semibold text-[#e6edf4]">
              Final Project
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 font-[family-name:var(--font-quicksand)] text-xs font-bold text-[#e6edf4]/85">
                Link Final Project
                <input
                  type="url"
                  aria-label="Link Final Project"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="h-11 rounded-[14px] border border-[#c6c6c6]/50 bg-[#12062b]/65 px-4 font-mono text-sm font-normal text-[#e6edf4] placeholder:text-[#e6edf4]/40 focus:border-[#e6edf4] focus:outline-none"
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
                className="h-11 cursor-pointer rounded-[14px] border-[1.5px] border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-5 font-[family-name:var(--font-montserrat)] text-xs font-semibold tracking-wider text-[#e6edf4] shadow-[0_0_14px_2px_rgba(1,29,62,0.36),inset_1px_2px_3px_rgba(0,0,0,0.25)] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              >
                {pending ? "Menyimpan..." : "Kumpulkan Final Project"}
              </button>
            </form>
          </div>
        </article>

        <article className="flex flex-col justify-between gap-5 rounded-[24px] border-2 border-[#c6c6c6]/80 bg-[linear-gradient(142deg,rgba(198,198,198,0.22)_4%,rgba(94,55,134,0.42)_90%)] p-6 shadow-[0_12px_36px_rgba(12,4,28,0.45)] backdrop-blur-md">
          <div className="flex items-center justify-between rounded-[14px] border border-[#c6c6c6]/45 bg-[#12062b]/60 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-[12px] border border-[#c6c6c6]/40 bg-[#26044a]/80 text-[#e6edf4]">
                {eligible ? (
                  <Award className="size-5 text-[#10b981]" />
                ) : (
                  <Lock className="size-5 text-[#C4B5FD]" />
                )}
              </div>
              <div>
                <p className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-[#e6edf4]">
                  {programTitle}
                </p>
                <p className="font-[family-name:var(--font-quicksand)] text-xs text-[#e6edf4]/70">
                  {eligible ? "Siap diunduh" : "Belum memenuhi syarat"}
                </p>
              </div>
            </div>
            {eligible && <CheckCircle2 className="size-5 text-[#10b981]" aria-hidden="true" />}
          </div>

          <ul className="flex flex-col gap-2.5 font-[family-name:var(--font-quicksand)] text-xs font-bold">
            <li className="flex items-center justify-between rounded-[14px] border border-[#c6c6c6]/45 bg-[#12062b]/60 px-4 py-3">
              <span>Final Project</span>
              <span className={submittedUrl ? "text-[#10b981]" : "text-[#FACC15]"}>
                {submittedUrl ? "✓ Terkumpul" : "✗ Belum"}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-[14px] border border-[#c6c6c6]/45 bg-[#12062b]/60 px-4 py-3">
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
              className={`h-11 rounded-[14px] border-[1.5px] font-[family-name:var(--font-montserrat)] text-xs font-semibold tracking-wider transition-all ${
                eligible
                  ? "cursor-pointer border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] text-[#e6edf4] shadow-[0_0_14px_2px_rgba(1,29,62,0.36),inset_1px_2px_3px_rgba(0,0,0,0.25)] hover:brightness-110 active:scale-[0.98]"
                  : "cursor-not-allowed border-[#c6c6c6]/30 bg-[#12062b]/50 text-[#e6edf4]/40"
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
