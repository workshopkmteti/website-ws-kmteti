"use client";

import { useState, type FormEvent } from "react";
import {
  deleteDataByTypeAction,
  recordAttendanceAction,
  runManualBackupAction,
  uploadMaterialAction,
  verifyPaymentAction,
} from "@/actions/admin";
import {
  TOTAL_SESSIONS,
  isCertificateEligible,
  isValidMaterialFileSize,
} from "@/features/lms/eligibility";
import type { DeletableTable } from "@/types/backend";

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

const DELETE_TARGET_MAP: Record<string, DeletableTable> = {
  "Bukti Pembayaran": "registrations",
  "Log Absensi": "attendance_records",
  "Data Peserta": "registrations",
};

const DELETE_TARGETS = Object.keys(DELETE_TARGET_MAP);

export default function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<AdminTab>("participants");
  const [participants, setParticipants] = useState<ParticipantRow[]>(INITIAL_PARTICIPANTS);
  const [materialTitle, setMaterialTitle] = useState("");
  const [meetUrl, setMeetUrl] = useState("");
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [materialError, setMaterialError] = useState<string | null>(null);
  const [materialMessage, setMaterialMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string>(DELETE_TARGETS[0]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const pendingCount = participants.filter((p) => p.paymentStatus === "Menunggu").length;
  const eligibleCount = participants.filter((p) =>
    isCertificateEligible(p.finalProjectSubmitted, p.sessions.filter((s) => !s).length),
  ).length;

  const appendLog = (entry: string) => {
    setLogs((prev) => [entry, ...prev]);
  };

  const updatePaymentStatus = async (id: string, status: PaymentStatus) => {
    const apiStatus = status === "Terkonfirmasi" ? "approved" : "rejected";
    const res = await verifyPaymentAction(id, apiStatus);
    if (!res.ok) {
      appendLog(`Gagal mengubah status ${id}: ${res.error ?? "error"}`);
      return;
    }
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, paymentStatus: status } : p)),
    );
    appendLog(`${id} → ${status}`);
  };

  const toggleSession = async (id: string, sessionIndex: number) => {
    const target = participants.find((p) => p.id === id);
    if (!target) return;
    const nextPresent = !target.sessions[sessionIndex];

    const res = await recordAttendanceAction(id, sessionIndex + 1, nextPresent);
    if (!res.ok) {
      appendLog(`Gagal update absensi ${id}: ${res.error ?? "error"}`);
      return;
    }

    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              sessions: p.sessions.map((present, i) => (i === sessionIndex ? nextPresent : present)),
            }
          : p,
      ),
    );
  };

  const handleMaterialFileChange = (file: File | undefined) => {
    if (!file) return;
    if (!isValidMaterialFileSize(file.size)) {
      setMaterialError("Maksimal 20 MB.");
      setMaterialMessage(null);
      setMaterialFile(null);
      return;
    }
    setMaterialError(null);
    setMaterialFile(file);
    setMaterialMessage(`${file.name} siap diunggah.`);
  };

  const handleMaterialSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!materialTitle.trim() || !meetUrl.trim()) {
      setMaterialError("Judul dan link Meet wajib diisi.");
      return;
    }

    if (materialFile) {
      const formData = new FormData();
      formData.append("title", materialTitle.trim());
      formData.append("meetUrl", meetUrl.trim());
      formData.append("file", materialFile);
      const res = await uploadMaterialAction(formData);
      if (!res.ok) {
        setMaterialError(res.error ?? "Gagal mengunggah materi.");
        return;
      }
    }

    setMaterialError(null);
    setMaterialMessage(`"${materialTitle.trim()}" tersimpan.`);
    appendLog(`Materi: ${materialTitle.trim()}`);
    setMaterialTitle("");
    setMeetUrl("");
    setMaterialFile(null);
  };

  const handleBackup = async () => {
    const res = await runManualBackupAction(`backup-${Date.now()}`);
    if (!res.ok) {
      appendLog(`Backup gagal: ${res.error ?? "error"}`);
      return;
    }
    appendLog("Backup ke Google Sheets & Drive berhasil.");
  };

  const handleConfirmDelete = async () => {
    const table = DELETE_TARGET_MAP[deleteTarget] ?? "attendance_records";
    const res = await deleteDataByTypeAction(table, `delete-${table}-${Date.now()}`);
    setConfirmOpen(false);
    if (!res.ok) {
      appendLog(`Hapus gagal: ${res.error ?? "error"}`);
      return;
    }
    appendLog(`Data berhasil dihapus: ${deleteTarget}.`);
  };

  return (
    <section className="flex flex-col gap-6 text-white">
      <header className="flex flex-col gap-4">
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Dashboard Admin
        </h1>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-[10px] border border-white/6 bg-[#110F2E] px-4 py-3">
            <p className="font-sans text-xl font-bold text-white sm:text-2xl">{participants.length}</p>
            <p className="font-mono text-[11px] text-[#9CA3AF]">Peserta</p>
          </div>
          <div className="rounded-[10px] border border-white/6 bg-[#110F2E] px-4 py-3">
            <p className="font-sans text-xl font-bold text-[#FACC15] sm:text-2xl">{pendingCount}</p>
            <p className="font-mono text-[11px] text-[#9CA3AF]">Menunggu</p>
          </div>
          <div className="rounded-[10px] border border-white/6 bg-[#110F2E] px-4 py-3">
            <p className="font-sans text-xl font-bold text-[#10b981] sm:text-2xl">{eligibleCount}</p>
            <p className="font-mono text-[11px] text-[#9CA3AF]">Layak Sertifikat</p>
          </div>
        </div>
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
            className={`cursor-pointer rounded-[10px] px-4 py-2 font-mono text-xs font-semibold transition-all active:scale-[0.98] ${
              activeTab === tab.id
                ? "bg-[#7C3AED] text-white"
                : "border border-white/6 bg-[#110F2E] text-[#9CA3AF] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "participants" && (
        <div className="overflow-x-auto rounded-[10px] border border-white/6 bg-[#110F2E] p-5">
          <table className="w-full min-w-[600px] text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[#9CA3AF]">
                <th className="py-3 pr-4">Peserta</th>
                <th className="py-3 pr-4">Program</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id} className="border-b border-white/6">
                  <td className="py-3 pr-4">
                    <div className="font-sans text-sm font-semibold text-white">{p.name}</div>
                    <div className="text-[#9CA3AF]">{p.email}</div>
                  </td>
                  <td className="py-3 pr-4 text-[#C4B5FD]">{p.program}</td>
                  <td className="py-3 pr-4">{p.paymentStatus}</td>
                  <td className="flex flex-wrap gap-2 py-3">
                    <button
                      type="button"
                      onClick={() => updatePaymentStatus(p.id, "Terkonfirmasi")}
                      className="cursor-pointer rounded-lg border border-[#10b981]/40 bg-[#10b981]/15 px-3 py-1.5 text-[#10b981] transition-all hover:bg-[#10b981]/25 active:scale-[0.98]"
                    >
                      Setujui
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePaymentStatus(p.id, "Ditolak")}
                      className="cursor-pointer rounded-lg border border-rose-400/30 bg-rose-500/15 px-3 py-1.5 text-rose-300 transition-all hover:bg-rose-500/25 active:scale-[0.98]"
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
        <div className="overflow-x-auto rounded-[10px] border border-white/6 bg-[#110F2E] p-5">
          <table className="w-full min-w-[640px] text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[#9CA3AF]">
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
                  <tr key={p.id} className="border-b border-white/6">
                    <td className="py-3 pr-4 font-sans text-sm font-semibold text-white">
                      {p.name}
                    </td>
                    {p.sessions.map((present, idx) => (
                      <td key={idx} className="py-3 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => toggleSession(p.id, idx)}
                          aria-label={`Toggle sesi ${idx + 1} ${p.name}`}
                          className={`h-7 w-7 cursor-pointer rounded-md border font-bold transition-all active:scale-95 ${
                            present
                              ? "border-[#10b981]/40 bg-[#10b981]/20 text-[#10b981]"
                              : "border-rose-400/30 bg-rose-500/15 text-rose-300"
                          }`}
                        >
                          {present ? "✓" : "✗"}
                        </button>
                      </td>
                    ))}
                    <td className="py-3 pl-4">
                      {eligible ? "Layak" : `Absen ${absences}/6`}
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
          className="flex max-w-xl flex-col gap-4 rounded-[10px] border border-white/6 bg-[#110F2E] p-6"
        >
          <label className="flex flex-col gap-2 font-mono text-xs text-[#9CA3AF]">
            Judul Materi
            <input
              type="text"
              value={materialTitle}
              onChange={(e) => setMaterialTitle(e.target.value)}
              placeholder="Sesi 3 - Spatial Filtering"
              className="h-11 rounded-[10px] border border-white/10 bg-[#0D0B24] px-4 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 font-mono text-xs text-[#9CA3AF]">
            Link Google Meet
            <input
              type="url"
              value={meetUrl}
              onChange={(e) => setMeetUrl(e.target.value)}
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              className="h-11 rounded-[10px] border border-white/10 bg-[#0D0B24] px-4 text-sm text-white focus:border-[#7C3AED] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 font-mono text-xs text-[#9CA3AF]">
            File Materi (maks 20 MB)
            <input
              type="file"
              aria-label="File Materi"
              onChange={(e) => handleMaterialFileChange(e.target.files?.[0])}
              className="rounded-[10px] border border-white/10 bg-[#0D0B24] p-3 text-xs text-white"
            />
          </label>
          {materialError && (
            <p role="alert" className="font-mono text-xs text-rose-300">
              {materialError}
            </p>
          )}
          {materialMessage && (
            <p className="font-mono text-xs text-[#10b981]">{materialMessage}</p>
          )}
          <button
            type="submit"
            className="h-11 cursor-pointer rounded-[10px] bg-[#7C3AED] px-5 font-mono text-xs font-bold text-white transition-all hover:bg-[#6B21A8] active:scale-[0.98]"
          >
            Simpan Materi
          </button>
        </form>
      )}

      {activeTab === "backup" && (
        <div className="flex flex-col gap-5 rounded-[10px] border border-white/6 bg-[#110F2E] p-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleBackup}
              className="h-11 cursor-pointer rounded-[10px] bg-[#7C3AED] px-5 font-mono text-xs font-bold text-white transition-all hover:bg-[#6B21A8] active:scale-[0.98]"
            >
              Backup Manual
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Pilih data yang dihapus"
                value={deleteTarget}
                onChange={(e) => setDeleteTarget(e.target.value)}
                className="h-11 rounded-[10px] border border-white/10 bg-[#0D0B24] px-3 font-mono text-xs text-white"
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
                className="h-11 cursor-pointer rounded-[10px] border border-rose-400/30 bg-rose-500/15 px-5 font-mono text-xs font-bold text-rose-300 transition-all hover:bg-rose-500/25 active:scale-[0.98]"
              >
                Hapus Data
              </button>
            </div>
          </div>

          {logs.length > 0 && (
            <ul className="flex flex-col gap-2 font-mono text-xs text-[#9CA3AF]">
              {logs.map((entry, idx) => (
                <li key={idx} className="rounded-lg border border-white/6 bg-[#0D0B24] px-4 py-2">
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
          <div className="flex w-full max-w-md flex-col gap-4 rounded-[10px] border border-white/10 bg-[#110F2E] p-6">
            <h2 id="confirm-delete-title" className="font-sans text-lg font-bold text-white">
              Konfirmasi Hapus
            </h2>
            <p className="font-mono text-xs text-[#9CA3AF]">
              Hapus {deleteTarget}?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="h-10 cursor-pointer rounded-[10px] border border-white/10 px-4 font-mono text-xs text-white"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="h-10 cursor-pointer rounded-[10px] border border-rose-400/30 bg-rose-500/20 px-4 font-mono text-xs font-bold text-rose-200 hover:bg-rose-500/30"
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
