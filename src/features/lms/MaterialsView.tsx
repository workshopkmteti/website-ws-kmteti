"use client";

import { useMemo, useState } from "react";
import { FileText, Video } from "lucide-react";

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
    <section className="flex flex-col gap-6 text-white">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Materi &amp; Google Meet
        </h1>

        <select
          aria-label="Filter program"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className="h-10 rounded-[10px] border border-white/10 bg-[#110F2E] px-4 font-mono text-xs text-white transition-colors focus:border-[#7C3AED] focus:outline-none"
        >
          {PROGRAMS.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {visibleMaterials.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between gap-5 rounded-[10px] border border-white/6 bg-[#110F2E] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7C3AED]/50"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-[#6B21A8]/50 bg-[#7C3AED]/20 px-3 py-1 font-mono text-[11px] font-semibold text-[#C4B5FD]">
                  {item.program}
                </span>
                <span className="font-mono text-xs text-[#9CA3AF]">
                  Sesi {item.session} · {item.fileSizeLabel}
                </span>
              </div>
              <h2 className="font-sans text-base font-bold text-white">{item.title}</h2>
              <p className="font-mono text-xs text-[#9CA3AF]">{item.date}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={item.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#7C3AED] px-4 font-mono text-xs font-semibold text-white transition-all hover:bg-[#6B21A8] active:scale-[0.98]"
              >
                <Video className="size-4 shrink-0" aria-hidden="true" />
                Gabung Google Meet
              </a>
              <a
                href={item.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-[#0D0B24] px-4 font-mono text-xs font-semibold text-[#C4B5FD] transition-all hover:border-white/25 hover:bg-white/5 active:scale-[0.98]"
              >
                <FileText className="size-4 shrink-0" aria-hidden="true" />
                Buka Materi
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
