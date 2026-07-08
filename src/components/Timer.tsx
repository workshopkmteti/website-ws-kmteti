"use client";

import { useEffect, useState } from "react";

// Set your real registration deadline here.
const TARGET_DATE = new Date("2026-08-01T00:00:00+07:00");

function getTimeLeft() {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((diff / (1000 * 60)) % 60);
  const second = Math.floor((diff / 1000) % 60);
  return { day, hour, minute, second };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Timer() {
  const [time, setTime] = useState(() => getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { label: string; value: string }[] = [
    { label: "DAY", value: pad(time.day) },
    { label: "HOUR", value: pad(time.hour) },
    { label: "MINUTE", value: pad(time.minute) },
    { label: "SECOND", value: pad(time.second) },
  ];

  return (
    <section className="flex flex-col items-center gap-8 px-6 py-24 text-center">
      <h2 className="font-sans text-3xl font-semibold text-[#ebe6f0] sm:text-5xl">
        DAFTAR [EVENT] SEBELUM DITUTUP
      </h2>
      <div className="flex items-start justify-center gap-1 sm:gap-2">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center">
            <div className="flex w-16 flex-col items-center justify-center sm:w-[140px]">
              <p className="font-sans text-5xl font-bold tracking-[0.05em] text-[#ebe6f0] sm:text-8xl">
                {unit.value}
              </p>
              <p className="font-mono text-sm tracking-[0.02em] text-[#ebe6f0] sm:text-2xl">
                {unit.label}
              </p>
            </div>
            {i < units.length - 1 && (
              <p className="font-sans text-5xl font-bold text-[#ebe6f0] sm:text-8xl">:</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
