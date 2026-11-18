"use client";

import { useState, type FormEvent } from "react";
import {
  TOTAL_SESSIONS,
  isCertificateEligible,
  isValidMaterialFileSize,
} from "@/features/lms/eligibility";

type PaymentStatus = "Menunggu" | "Terkonfirmasi" | "Ditolak";
type AdminTab = "participants" | "attendance" | "materials" | "backup";

interface ParticipantRow {
  id: string;
  name: string;
  email: string;
  program: string;
  paymentStatus: PaymentStatus;
  sessions: boolean[];
  finalProjectSubmitted: boolean;
}

const INITIAL_PARTICIPANTS: ParticipantRow[] = [
  {
    id: "p1",
    name: "Alya Putri",
    email: "alya@mail.ugm.ac.id",
    program: "IMAGE PROCESSING",
    paymentStatus: "Menunggu",
    sessions: [true, true, true, true, false, true],
    finalProjectSubmitted: true,
  },
  {
    id: "p2",
    name: "Rafi Pratama",
    email: "rafi@mail.ugm.ac.id",
    program: "MatLab",
    paymentStatus: "Terkonfirmasi",
    sessions: [true, false, true, false, false, true],
    finalProjectSubmitted: true,
  },
];

const DELETE_TARGETS = [
  "Bukti Pembayaran",
  "Log Absensi",
  "Data Peserta",
] as const;

export default function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<AdminTab>("participants");
  const [participants, setParticipants] = useState<ParticipantRow[]>(INITIAL_PARTICIPANTS);
  const [materialTitle, setMaterialTitle] = useState("");
  const [meetUrl, setMeetUrl] = useState("");
  const [materialError, setMaterialError] = useState<string | null>(null);
  const [materialMessage, setMaterialMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string>(DELETE_TARGETS[0]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const appendLog = (entry: string) => {
    setLogs((prev) => [entry, ...prev]);
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, paymentStatus: status } : p)),
    );
    appendLog(`Status peserta ${id} diubah ke ${status} (siap kirim email SendGrid).`);
  };

  const toggleSession = (id: string, sessionIndex: number) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              sessions: p.sessions.map((present, i) => (i === sessionIndex ? !present : present)),
            }
          : p,
      ),
    );
  };

  const handleMaterialFileChange = (file: File | undefined) => {
    if (!file) return;
    if (!isValidMaterialFileSize(file.size)) {
      setMaterialError("Ukuran file materi maksimal 20 MB.");
      setMaterialMessage(null);
      return;
    }
    setMaterialError(null);
    setMaterialMessage(`File "${file.name}" siap diunggah ke Google Drive.`);
  };

  const handleMaterialSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!materialTitle.trim() || !meetUrl.trim()) {
      setMaterialError("Judul materi dan link Google Meet wajib diisi.");
      return;
    }
    setMaterialError(null);
    setMaterialMessage(`Materi "${materialTitle.trim()}" dan link Meet tersimpan.`);
    appendLog(`Materi "${materialTitle.trim()}" diperbarui.`);
    setMaterialTitle("");
    setMeetUrl("");
  };

  const handleBackup = () => {
    appendLog("Backup ke Google Sheets & Drive berhasil dijalankan.");
  };

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    appendLog(`Data berhasil dihapus: ${deleteTarget}.`);
  };

  return (
    <section className="flex flex-col gap-6 text-[#ebe6f0]">
      <header>
        <h1 className="font-sans text-2xl font-bold text-white sm:text-3xl">
          Dashboard Admin
        </h1>
        <p className="mt-1 font-mono text-xs text-[#c1b2d0] sm:text-sm">
          Kelola peserta, absensi 6 sesi, materi Google Drive, email SendGrid, serta backup/hapus data.
        </p>
      </header>

      <div role="tablist" aria-label="Menu Admin" className="flex flex-wrap gap-2">
        {(
          [
            { id: "participants", label: "Peserta & Pembayaran" },
            { id: "attendance", label: "Absensi (6 Sesi)" },
            { id: "materials", label: "Materi & Meet" },
            { id: "backup", label: "Backup & Hapus" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? "bg-[#5e3786] text-white"
                : "border border-white/15 bg-white/5 text-[#c1b2d0] hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "participants" && (
        <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/5 p-5">
          <table className="w-full min-w-[600px] text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/15 text-[#c1b2d0]">
                <th className="py-3 pr-4">Peserta</th>
                <th className="py-3 pr-4">Program</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id} className="border-b border-white/10">
                  <td className="py-3 pr-4">
                    <div className="font-sans text-sm font-semibold text-white">{p.name}</div>
                    <div className="text-[#c1b2d0]">{p.email}</div>
                  </td>
                  <td className="py-3 pr-4">{p.program}</td>
                  <td className="py-3 pr-4">{p.paymentStatus}</td>
                  <td className="flex flex-wrap gap-2 py-3">
                    <button
                      type="button"
                      onClick={() => updatePaymentStatus(p.id, "Terkonfirmasi")}
                      className="cursor-pointer rounded-lg bg-emerald-700/80 px-3 py-1.5 text-white hover:bg-emerald-600"
                    >
                      Setujui
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePaymentStatus(p.id, "Ditolak")}
                      className="cursor-pointer rounded-lg bg-rose-700/80 px-3 py-1.5 text-white hover:bg-rose-600"
                    >
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/5 p-5">
          <table className="w-full min-w-[640px] text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/15 text-[#c1b2d0]">
                <th className="py-3 pr-4">Peserta</th>
                {Array.from({ length: TOTAL_SESSIONS }, (_, i) => (
                  <th key={i} className="py-3 px-2 text-center">
                    S{i + 1}
                  </th>
                ))}
                <th className="py-3 pl-4">Sertifikat</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => {
                const absences = p.sessions.filter((present) => !present).length;
                const eligible = isCertificateEligible(p.finalProjectSubmitted, absences);
                return (
                  <tr key={p.id} className="border-b border-white/10">
                    <td className="py-3 pr-4 font-sans text-sm font-semibold text-white">
                      {p.name}
                    </td>
                    {p.sessions.map((present, idx) => (
                      <td key={idx} className="py-3 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => toggleSession(p.id, idx)}
                          aria-label={`Toggle sesi ${idx + 1} ${p.name}`}
                          className={`h-7 w-7 cursor-pointer rounded-md font-bold ${
                            present ? "bg-emerald-600 text-white" : "bg-rose-700/80 text-white"
                          }`}
                        >
                          {present ? "✓" : "✗"}
                        </button>
                      </td>
                    ))}
                    <td className="py-3 pl-4">
                      {eligible ? "Layak" : `Tidak (absen ${absences})`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "materials" && (
        <form
          onSubmit={handleMaterialSubmit}
          className="flex max-w-xl flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-6"
        >
          <label className="flex flex-col gap-2 font-mono text-xs text-[#c1b2d0]">
            Judul Materi
            <input
              type="text"
              value={materialTitle}
              onChange={(e) => setMaterialTitle(e.target.value)}
              placeholder="Contoh: Sesi 3 - Spatial Filtering"
              className="h-11 rounded-xl border border-white/20 bg-[#1e0339] px-4 text-sm text-white focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 font-mono text-xs text-[#c1b2d0]">
            Link Google Meet
            <input
              type="url"
              value={meetUrl}
              onChange={(e) => setMeetUrl(e.target.value)}
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              className="h-11 rounded-xl border border-white/20 bg-[#1e0339] px-4 text-sm text-white focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 font-mono text-xs text-[#c1b2d0]">
            File Materi (Google Drive, maks 20 MB)
            <input
              type="file"
              aria-label="File Materi"
              onChange={(e) => handleMaterialFileChange(e.target.files?.[0])}
              className="rounded-xl border border-white/20 bg-[#1e0339] p-3 text-xs text-white"
            />
          </label>
          {materialError && (
            <p role="alert" className="font-mono text-xs text-red-300">
              {materialError}
            </p>
          )}
          {materialMessage && (
            <p className="font-mono text-xs text-emerald-300">{materialMessage}</p>
          )}
          <button
            type="submit"
            className="h-11 cursor-pointer rounded-xl bg-[#5e3786] px-5 font-mono text-xs font-bold text-white hover:bg-[#78589a]"
          >
            Simpan Materi
          </button>
        </form>
      )}

      {activeTab === "backup" && (
        <div className="flex flex-col gap-5 rounded-2xl border border-white/15 bg-white/5 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleBackup}
              className="h-11 cursor-pointer rounded-xl bg-[#5e3786] px-5 font-mono text-xs font-bold text-white hover:bg-[#78589a]"
            >
              Backup Manual
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Pilih data yang dihapus"
                value={deleteTarget}
                onChange={(e) => setDeleteTarget(e.target.value)}
                className="h-11 rounded-xl border border-white/20 bg-[#1e0339] px-3 font-mono text-xs text-white"
              >
                {DELETE_TARGETS.map((target) => (
                  <option key={target} value={target}>
                    {target}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="h-11 cursor-pointer rounded-xl bg-rose-700/80 px-5 font-mono text-xs font-bold text-white hover:bg-rose-600"
              >
                Hapus Data
              </button>
            </div>
          </div>

          {logs.length > 0 && (
            <ul className="flex flex-col gap-2 font-mono text-xs text-[#c1b2d0]">
              {logs.map((entry, idx) => (
                <li key={idx} className="rounded-lg border border-white/10 bg-[#1e0339]/70 px-4 py-2">
                  {entry}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {confirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-white/20 bg-[#1e0339] p-6">
            <h2 id="confirm-delete-title" className="font-sans text-lg font-bold text-white">
              Konfirmasi Hapus Data
            </h2>
            <p className="font-mono text-xs text-[#c1b2d0]">
              Yakin ingin menghapus {deleteTarget}? Tindakan ini akan dicatat di log sistem.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="h-10 cursor-pointer rounded-xl border border-white/20 px-4 font-mono text-xs text-white"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="h-10 cursor-pointer rounded-xl bg-rose-700 px-4 font-mono text-xs font-bold text-white hover:bg-rose-600"
              >
                Konfirmasi Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
