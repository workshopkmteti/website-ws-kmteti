"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Program } from "./DetailPrograms";

const TARGET_DATE = new Date("2026-08-01T00:00:00+07:00");

function getTimeLeft() {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

const pad = (n: number) => n.toString().padStart(2, "0");

interface DetailPelatihanProps {
  program: Program | null;
  onClose: () => void;
}

export default function DetailPelatihan({ program, onClose }: DetailPelatihanProps) {
  const [activeTab, setActiveTab] = useState<"info" | "syllabus" | "benefits">("info");
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

  // Global countdown timer tick
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!program) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [program, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!program) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-55 flex items-center justify-center bg-[#130125]/90 p-4 backdrop-blur-md transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-5xl rounded-[32px] border border-[#5e3786]/30 bg-[#1e0339] overflow-hidden flex flex-col md:flex-row shadow-[0_0_64px_15px_rgba(94,55,134,0.4)] min-h-[500px] md:h-[650px] animate-in fade-in-0 zoom-in-95 duration-200">

        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div className="flex flex-col flex-1">
            {/* Title */}
            <h3
              id="modal-title"
              className="font-sans text-2xl md:text-3xl font-extrabold tracking-wider text-[#ebe6f0] text-center mb-6 uppercase"
            >
              {program.title}
            </h3>

            {/* Description Card */}
            <div className="flex-1 border border-white/60 rounded-[20px] p-5 md:p-6 bg-white/5 overflow-y-auto min-h-[150px] max-h-[250px] md:max-h-[300px]">
              <p className="font-sans text-xs md:text-sm leading-relaxed text-[#ebe6f0]/90">
                {program.description}
              </p>
            </div>
          </div>

          {/* Countdown & Get Started Button */}
          <div className="mt-6 flex flex-col items-center">
            {/* Countdown Timer */}
            <div className="flex items-start justify-center text-3xl md:text-4xl font-extrabold font-sans text-white mb-6">
              <div className="flex flex-col items-center w-12 md:w-16">
                <span className="tracking-wider">{pad(timeLeft.d)}</span>
                <span className="font-mono text-[9px] tracking-widest text-[#c1b2d0] mt-1 uppercase">DAY</span>
              </div>
              <span className="text-2xl md:text-3xl mt-0.5">:</span>
              <div className="flex flex-col items-center w-12 md:w-16">
                <span className="tracking-wider">{pad(timeLeft.h)}</span>
                <span className="font-mono text-[9px] tracking-widest text-[#c1b2d0] mt-1 uppercase">HOUR</span>
              </div>
              <span className="text-2xl md:text-3xl mt-0.5">:</span>
              <div className="flex flex-col items-center w-12 md:w-16">
                <span className="tracking-wider">{pad(timeLeft.m)}</span>
                <span className="font-mono text-[9px] tracking-widest text-[#c1b2d0] mt-1 uppercase">MINUTES</span>
              </div>
              <span className="text-2xl md:text-3xl mt-0.5">:</span>
              <div className="flex flex-col items-center w-12 md:w-16">
                <span className="tracking-wider">{pad(timeLeft.s)}</span>
                <span className="font-mono text-[9px] tracking-widest text-[#c1b2d0] mt-1 uppercase">SECONDS</span>
              </div>
              <span className="text-2xl md:text-3xl mt-0.5">:</span>
            </div>

            {/* Get Started Button */}
            <a
              href="/auth/register"
              onClick={onClose}
              className="flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#2a0451] via-[#5e3786] to-[#2a0451] border border-white/20 hover:border-white px-10 font-mono text-sm tracking-[0.02em] text-[#ebe6f0] transition-all hover:scale-105 shadow-[0_4px_20px_0_rgba(94,55,134,0.4)] cursor-pointer"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-[#130125]/30">

          {/* Header inside modal */}
          <div className="flex items-center justify-between mb-8">
            <Logo className="h-6 md:h-8 w-auto" wordmarkColor="#FFFFFF" wedgeColor="#5e3786" />

            {/* 4 squares decoration / Tab switchers / Close Button */}
            <div className="flex gap-2">
              {/* Square 1: Info Tab */}
              <button
                onClick={() => setActiveTab("info")}
                aria-label="Informasi Pelatihan"
                className={`size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${activeTab === "info"
                  ? "bg-[#5e3786] text-white shadow-[0_0_8px_rgba(94,55,134,0.6)]"
                  : "bg-white/10 text-[#c1b2d0] hover:bg-white/20"
                  }`}
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Square 2: Syllabus Tab */}
              <button
                onClick={() => setActiveTab("syllabus")}
                aria-label="Silabus Pelatihan"
                className={`size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${activeTab === "syllabus"
                  ? "bg-[#5e3786] text-white shadow-[0_0_8px_rgba(94,55,134,0.6)]"
                  : "bg-white/10 text-[#c1b2d0] hover:bg-white/20"
                  }`}
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </button>

              {/* Square 3: Benefit Tab */}
              <button
                onClick={() => setActiveTab("benefits")}
                aria-label="Benefit Pelatihan"
                className={`size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${activeTab === "benefits"
                  ? "bg-[#5e3786] text-white shadow-[0_0_8px_rgba(94,55,134,0.6)]"
                  : "bg-white/10 text-[#c1b2d0] hover:bg-white/20"
                  }`}
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.242.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.17 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.773-.569-.374-1.81.588-1.81h4.906a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>

              {/* Square 4: Close Button */}
              <button
                onClick={onClose}
                aria-label="Tutup"
                className="size-8 rounded-lg bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <span className="text-xs font-sans font-bold">✕</span>
              </button>
            </div>
          </div>

          {/* Conditional views */}
          {activeTab === "info" && (
            <>
              {/* Rows: Lokasi & Deskripsi Pelatihan */}
              <div className="flex flex-col gap-6 my-auto">
                {/* Row 1: Lokasi */}
                <div className="flex items-center gap-4">
                  <div className="size-11 shrink-0 rounded-full bg-white/10 flex items-center justify-center border border-[#5e3786]/20 shadow-[0_0_12px_rgba(94,55,134,0.25)]">
                    <svg className="size-5 text-[#c1b2d0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 h-12 rounded-xl border border-white/20 bg-white/5 px-5 flex items-center">
                    <span className="font-sans text-xs md:text-sm text-[#ebe6f0]">
                      Google Meet / Lab Komputer
                    </span>
                  </div>
                </div>

                {/* Row 2: Deskripsi (Schedule/Jadwal) */}
                <div className="flex items-center gap-4">
                  <div className="size-11 shrink-0 rounded-full bg-white/10 flex items-center justify-center border border-[#5e3786]/20 shadow-[0_0_12px_rgba(94,55,134,0.25)]">
                    <svg className="size-5 text-[#c1b2d0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 h-12 rounded-xl border border-white/20 bg-white/5 px-5 flex items-center">
                    <span className="font-sans text-xs md:text-sm text-[#ebe6f0] truncate">
                      {program.schedule}
                    </span>
                  </div>
                </div>

                {/* Row 3: Prasyarat */}
                <div className="flex items-center gap-4">
                  <div className="size-11 shrink-0 rounded-full bg-white/10 flex items-center justify-center border border-[#5e3786]/20 shadow-[0_0_12px_rgba(94,55,134,0.25)]">
                    <svg className="size-5 text-[#c1b2d0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1 h-12 rounded-xl border border-white/20 bg-white/5 px-5 flex items-center">
                    <span className="font-sans text-xs md:text-sm text-[#ebe6f0] truncate">
                      Prasyarat: {program.prerequisites}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom: Contact Person */}
              <div className="flex flex-col gap-2 mt-8">
                <span className="font-sans text-sm font-semibold text-[#ebe6f0] tracking-wide">
                  Contact Person
                </span>
                <div className="h-12 rounded-xl border border-white/20 bg-[#1e0339] px-5 flex items-center justify-between text-xs md:text-sm text-[#ebe6f0]">
                  <span className="font-mono text-xs text-[#c1b2d0]">WA: +62 812-3456-7890 (Admin)</span>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#37CD85] hover:text-[#52e29e] hover:underline font-mono cursor-pointer transition-colors"
                  >
                    Chat Now
                  </a>
                </div>
              </div>
            </>
          )}

          {activeTab === "syllabus" && (
            <div className="flex-1 flex flex-col justify-between my-auto">
              <div className="flex flex-col gap-4">
                <h4 className="font-sans text-xl font-bold text-center text-[#ebe6f0] mb-4">
                  Silabus
                </h4>

                {/* Syllabus List */}
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2">
                  {program.syllabus.map((session, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="size-8 shrink-0 rounded-full bg-white/10 flex items-center justify-center border border-[#5e3786]/20 shadow-[0_0_8px_rgba(94,55,134,0.15)]">
                        <span className="font-mono text-xs font-bold text-[#c1b2d0]">{idx + 1}</span>
                      </div>
                      <span className="font-sans text-sm text-[#ebe6f0]">
                        {session}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="flex-1 flex flex-col justify-between my-auto">
              <div className="flex flex-col gap-4">
                <h4 className="font-sans text-xl font-bold text-center text-[#ebe6f0] mb-4">
                  Benefit Pelatihan
                </h4>

                {/* Benefits List */}
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2">
                  {program.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="size-8 shrink-0 rounded-full bg-white/10 flex items-center justify-center border border-[#5e3786]/20 shadow-[0_0_8px_rgba(94,55,134,0.15)]">
                        <svg className="size-4 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-sans text-sm text-[#ebe6f0]">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
