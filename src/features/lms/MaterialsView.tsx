"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

type MaterialsViewProps = {
  initialMaterials?: TrainingMaterial[];
};

export default function MaterialsView({ initialMaterials }: MaterialsViewProps) {
  const sourceMaterials =
    initialMaterials && initialMaterials.length > 0 ? initialMaterials : INITIAL_MATERIALS;
  const programs = useMemo(
    () => ["All", ...new Set(sourceMaterials.map((m) => m.program))],
    [sourceMaterials],
  );
  const [selectedProgram, setSelectedProgram] = useState("All");

  const visibleMaterials = useMemo(() => {
    if (selectedProgram === "All") return sourceMaterials;
    return sourceMaterials.filter((m) => m.program === selectedProgram);
  }, [selectedProgram, sourceMaterials]);

  return (
    <section className="flex flex-col gap-6 text-[#e6edf4]">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-wide text-[#e6edf4] uppercase sm:text-3xl">
          Materi &amp; Google Meet
        </h1>

        <select
          aria-label="Filter program"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className="h-10 cursor-pointer rounded-[14px] border border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-4 font-[family-name:var(--font-quicksand)] text-xs font-bold text-[#e6edf4] shadow-[0_4px_10px_rgba(0,0,0,0.25)] focus:outline-none"
        >
          {programs.map((program) => (
            <option key={program} value={program} className="bg-[#172b59] text-[#e6edf4]">
              {program}
            </option>
          ))}
        </select>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleMaterials.map((item, idx) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, delay: idx * 0.04 }}
              whileHover={{ y: -2 }}
              className="flex flex-col justify-between gap-5 rounded-[24px] border-2 border-[#c6c6c6]/80 bg-[linear-gradient(142deg,rgba(198,198,198,0.22)_4%,rgba(94,55,134,0.42)_90%)] p-6 shadow-[0_12px_36px_rgba(12,4,28,0.45)] backdrop-blur-md transition-colors hover:border-[#c6c6c6]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-[10px] border border-[#c6c6c6]/50 bg-[#26044a]/70 px-3 py-1 font-[family-name:var(--font-quicksand)] text-xs font-bold text-[#e6edf4]">
                    {item.program}
                  </span>
                  <span className="font-mono text-xs text-[#e6edf4]/70">
                    Sesi {item.session} · {item.fileSizeLabel}
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-montserrat)] text-base font-semibold text-[#e6edf4] sm:text-lg">
                  {item.title}
                </h2>
                <p className="font-[family-name:var(--font-quicksand)] text-xs font-medium text-[#e6edf4]/75">
                  {item.date}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={item.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-4 font-[family-name:var(--font-montserrat)] text-xs font-semibold tracking-wide text-[#e6edf4] shadow-[0_0_14px_2px_rgba(1,29,62,0.36),inset_1px_2px_3px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]"
                >
                  <Video className="size-4 shrink-0" aria-hidden="true" />
                  Gabung Google Meet
                </a>
                <a
                  href={item.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[14px] border border-[#c6c6c6]/70 bg-[#12062b]/65 px-4 font-[family-name:var(--font-montserrat)] text-xs font-semibold tracking-wide text-[#e6edf4] transition-all hover:-translate-y-0.5 hover:bg-[#1e0b42] active:scale-[0.98]"
                >
                  <FileText className="size-4 shrink-0" aria-hidden="true" />
                  Buka Materi
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
