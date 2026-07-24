"use client";

import { useEffect, useRef, useState } from "react";
import DetailPelatihan from "./TampilanProgram";
import { Program, PROGRAMS } from "./DetailPrograms";

const imgArrowIcon =
  "https://www.figma.com/api/mcp/asset/2290ca83-805f-47b0-be17-0d987dc24fb6";

const CARD_WIDTH = 300;
const CARD_GAP = 24;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const TRACK_PADDING = 24;
const MIN_SCALE = 0.88;
const MAX_SCALE = 1.12;
const FALLOFF_PX = 220;
const PX_PER_SECOND = CARD_STEP * (PROGRAMS.length / 25);

function ProgramCard({
  tag,
  title,
  cardRef,
  onOpenDetails,
}: {
  tag: string;
  title: string;
  cardRef: (el: HTMLDivElement | null) => void;
  onOpenDetails: () => void;
}) {
  return (
    <div
      ref={cardRef}
      className="flex h-90 w-75 shrink-0 flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-b from-[#360568] via-[#2a0451] to-[#1e0339] px-8 py-8 shadow-[0_0_32px_10px_rgba(94,55,134,0.2)] will-change-transform"
    >
      <div className="size-35 rounded-xl bg-[#5e3786]" />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-mono text-xs tracking-[0.02em] text-[#c1b2d0]">{tag}</p>
        <p className="font-mono text-lg font-bold tracking-[0.02em] text-[#ebe6f0]">{title}</p>
      </div>
      <button
        onClick={onOpenDetails}
        className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#ebe6f0] bg-[#1e0339] px-5 font-mono text-xs tracking-[0.02em] text-[#ebe6f0] transition-transform hover:scale-105 cursor-pointer"
      >
        Selengkapnya
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgArrowIcon} alt="" className="size-3.5" />
      </button>
    </div>
  );
}

export default function OnGoing() {
  const track = [...PROGRAMS, ...PROGRAMS, ...PROGRAMS, ...PROGRAMS];
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setLength = PROGRAMS.length * CARD_STEP;

    let frameId: number;
    let offset = 0;
    let lastTime: number | null = null;
    let paused = false;

    const viewport = viewportRef.current;
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    viewport?.addEventListener("mouseenter", onEnter);
    viewport?.addEventListener("mouseleave", onLeave);

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!paused && !prefersReducedMotion) {
        offset = (offset + PX_PER_SECOND * dt) % setLength;
      }

      const trackEl = trackRef.current;
      const viewportEl = viewportRef.current;
      if (trackEl) {
        trackEl.style.transform = `translateX(${-offset}px)`;
      }

      if (viewportEl) {
        const viewportCenter = TRACK_PADDING + viewportEl.clientWidth / 2 - CARD_WIDTH / 2;

        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const cardLeft = TRACK_PADDING + i * CARD_STEP - offset;
          const distance = Math.abs(cardLeft - viewportCenter);
          const proximity = Math.max(0, 1 - distance / FALLOFF_PX);
          const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * proximity;
          card.style.transform = `scale(${scale})`;
          card.style.zIndex = String(Math.round(proximity * 10));
        });
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      viewport?.removeEventListener("mouseenter", onEnter);
      viewport?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="programs" className="flex flex-col items-center gap-12 py-20">
      <h2 className="font-sans text-3xl font-semibold text-[#ebe9f6] sm:text-5xl">ON GOING</h2>
      <div ref={viewportRef} className="w-full overflow-x-hidden overflow-y-visible py-6">
        <div ref={trackRef} className="flex w-max gap-6 px-6">
          {track.map((p, i) => (
            <ProgramCard
              key={i}
              tag={p.tag}
              title={p.title}
              onOpenDetails={() => {
                setSelectedProgram(p);
              }}
              cardRef={(el) => {
                cardsRef.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* Program Detail Modal */}
      <DetailPelatihan
        key={selectedProgram?.title}
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </section>
  );
}
