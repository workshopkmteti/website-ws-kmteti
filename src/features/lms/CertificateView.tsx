"use client";

import { useState, type FormEvent } from "react";
import {
  MAX_ABSENCES_ALLOWED,
  TOTAL_SESSIONS,
  isCertificateEligible,
  isValidFinalProjectUrl,
} from "./eligibility";

export default function CertificateView() {
  const [projectUrl, setProjectUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [absences] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  const eligible = isCertificateEligible(Boolean(submittedUrl), absences);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidFinalProjectUrl(projectUrl)) {
      setError("Link harus berasal dari Google Drive, YouTube, atau GitHub.");
      return;
    }
    setError(null);
    setSubmittedUrl(projectUrl.trim());
  };

  return (
    <section className="flex flex-col gap-6 text-[#ebe6f0]">
      <header>
        <h1 className="font-sans text-2xl font-bold text-white sm:text-3xl">
          Kelayakan &amp; Sertifikat
        </h1>
        <p className="mt-1 font-mono text-xs text-[#c1b2d0] sm:text-sm">
          Sertifikat otomatis terbuka jika Final Project terkumpul dan absen ≤ {MAX_ABSENCES_ALLOWED} dari {TOTAL_SESSIONS} sesi.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
          <h2 className="font-sans text-lg font-bold text-white">Pengumpulan Final Project</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 font-mono text-xs text-[#c1b2d0]">
              Link Final Project (Google Drive / YouTube / GitHub)
              <input
                type="url"
                aria-label="Link Final Project"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://github.com/username/project"
                className="h-11 rounded-xl border border-white/20 bg-[#1e0339] px-4 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
              />
            </label>

            {error && (
              <p role="alert" className="font-mono text-xs text-red-300">
                {error}
              </p>
            )}

            {submittedUrl && (
              <p className="font-mono text-xs text-emerald-300">
                Terkumpul: {submittedUrl}
              </p>
            )}

            <button
              type="submit"
              className="h-11 cursor-pointer rounded-xl bg-[#5e3786] px-5 font-mono text-xs font-bold text-white transition-colors hover:bg-[#78589a]"
            >
              Kumpulkan Final Project
            </button>
          </form>
        </article>

        <article className="flex flex-col justify-between gap-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
          <div className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-white">Status Kelayakan Sertifikat</h2>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1e0339]/70 px-4 py-3">
                <span>Final Project</span>
                <span className={submittedUrl ? "text-emerald-300" : "text-amber-300"}>
                  {submittedUrl ? "✓ Terkumpul" : "✗ Belum"}
                </span>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1e0339]/70 px-4 py-3">
                <span>Ketidakhadiran</span>
                <span className={absences <= MAX_ABSENCES_ALLOWED ? "text-emerald-300" : "text-red-300"}>
                  {absences} / {TOTAL_SESSIONS} sesi (maks {MAX_ABSENCES_ALLOWED})
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={!eligible}
              onClick={() => setDownloaded(true)}
              className={`h-11 rounded-xl border font-mono text-xs font-bold transition-all ${
                eligible
                  ? "cursor-pointer border-[#ebe6f0] bg-[#5e3786] text-white hover:bg-[#78589a]"
                  : "cursor-not-allowed border-white/15 bg-white/5 text-white/40"
              }`}
            >
              Unduh Sertifikat
            </button>
            {downloaded && (
              <p className="text-center font-mono text-xs text-emerald-300">
                Sertifikat siap diunduh (menunggu koneksi storage backend).
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
