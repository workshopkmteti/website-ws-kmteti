"use client";

import { useMemo, useState } from "react";

export interface TrainingMaterial {
  id: string;
  program: string;
  session: number;
  title: string;
  date: string;
  meetUrl: string;
  driveUrl: string;
  fileSizeLabel: string;
}

const INITIAL_MATERIALS: TrainingMaterial[] = [
  {
    id: "img-1",
    program: "IMAGE PROCESSING",
    session: 1,
    title: "Sesi 1: Setup & Intro to Image Processing",
    date: "Sabtu, 09:00 - 12:00 WIB",
    meetUrl: "https://meet.google.com/abc-defg-hij",
    driveUrl: "https://drive.google.com/drive/folders/image-processing-s1",
    fileSizeLabel: "4.2 MB",
  },
  {
    id: "img-2",
    program: "IMAGE PROCESSING",
    session: 2,
    title: "Sesi 2: Color Models, Resizing & Geometric Transforms",
    date: "Sabtu, 09:00 - 12:00 WIB",
    meetUrl: "https://meet.google.com/abc-defg-hij",
    driveUrl: "https://drive.google.com/drive/folders/image-processing-s2",
    fileSizeLabel: "6.8 MB",
  },
  {
    id: "matlab-1",
    program: "MatLab",
    session: 1,
    title: "Sesi 1: Introduction to Matlab and Syntax",
    date: "Sabtu, 13:00 - 16:00 WIB",
    meetUrl: "https://meet.google.com/klm-nopq-rst",
    driveUrl: "https://drive.google.com/drive/folders/matlab-s1",
    fileSizeLabel: "3.5 MB",
  },
  {
    id: "proteus-1",
    program: "Proteus #2",
    session: 1,
    title: "Sesi 1: Skematik Rangkaian & Simulasi Digital",
    date: "Minggu, 09:00 - 12:00 WIB",
    meetUrl: "https://meet.google.com/uvw-xyza-bcd",
    driveUrl: "https://drive.google.com/drive/folders/proteus-s1",
    fileSizeLabel: "8.1 MB",
  },
];

const PROGRAMS = ["All", ...new Set(INITIAL_MATERIALS.map((m) => m.program))];

export default function MaterialsView() {
  const [selectedProgram, setSelectedProgram] = useState("All");

  const visibleMaterials = useMemo(() => {
    if (selectedProgram === "All") return INITIAL_MATERIALS;
    return INITIAL_MATERIALS.filter((m) => m.program === selectedProgram);
  }, [selectedProgram]);

  return (
    <section className="flex flex-col gap-6 text-[#ebe6f0]">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-white sm:text-3xl">
            Materi &amp; Google Meet
          </h1>
          <p className="mt-1 font-mono text-xs text-[#c1b2d0] sm:text-sm">
            Akses modul materi pelatihan (Google Drive) dan tautan Google Meet per sesi.
          </p>
        </div>

        <label className="flex items-center gap-2 font-mono text-xs text-[#c1b2d0]">
          <span>Program:</span>
          <select
            aria-label="Filter program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="rounded-xl border border-white/20 bg-[#2a0451] px-3 py-2 text-xs text-white focus:border-white/50 focus:outline-none"
          >
            {PROGRAMS.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {visibleMaterials.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#5e3786]/60 px-3 py-1 font-mono text-[11px] font-semibold text-white">
                  {item.program}
                </span>
                <span className="font-mono text-xs text-[#c1b2d0]">
                  Sesi {item.session} • {item.fileSizeLabel}
                </span>
              </div>
              <h2 className="font-sans text-base font-bold text-white">{item.title}</h2>
              <p className="font-mono text-xs text-[#c1b2d0]">{item.date}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={item.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#5e3786] px-4 font-mono text-xs font-semibold text-white transition-colors hover:bg-[#78589a]"
              >
                Gabung Google Meet
              </a>
              <a
                href={item.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 items-center justify-center rounded-xl border border-white/25 bg-[#1e0339] px-4 font-mono text-xs font-semibold text-[#ebe6f0] transition-colors hover:bg-white/10"
              >
                Buka Materi
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
