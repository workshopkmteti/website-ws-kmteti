"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface CountdownTimerProps {
  targetDate: Date;
  eventName: string;
}

export default function CountdownTimer({
  targetDate,
  eventName,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "DAY", value: timeLeft.days },
    { label: "HOUR", value: timeLeft.hours },
    { label: "MINUTE", value: timeLeft.minutes },
    { label: "SECOND", value: timeLeft.seconds },
  ] as const;

  return (
    <section
      className="py-24"
      style={{ background: "var(--color-ws-bg)" }}
      aria-label={`Countdown pendaftaran ${eventName}`}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-[var(--color-ws-text-muted)] mb-2">
          Daftar
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
          [{eventName}] SEBELUM DITUTUP
        </h2>

        <div
          className="flex items-center justify-center gap-2 md:gap-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {units.map(({ label, value }, idx) => (
            <div key={label} className="flex items-center gap-2 md:gap-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-extrabold tabular-nums text-white">
                  {pad(value)}
                </span>
                <span className="text-[10px] tracking-widest text-[var(--color-ws-text-muted)] mt-1">
                  {label}
                </span>
              </div>
              {idx < units.length - 1 && (
                <span
                  className="text-3xl md:text-5xl font-bold text-[var(--color-ws-purple-light)] mb-4"
                  aria-hidden="true"
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
