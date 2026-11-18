import { useState } from "react";
import { motion } from "framer-motion";
import Mascot from "@/components/Mascot";
import { type Team } from "../types";

type AvailabilityModalProps = {
  teams: Record<string, Team>;
  onClose: () => void;
  onSelectTeam: (code: string) => void;
};

export default function AvailabilityModal({
  teams,
  onClose,
  onSelectTeam,
}: AvailabilityModalProps) {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  // Get list of teams sorted by code, filtering out test-only codes if needed or showing all.
  // We sort them so they appear consistently.
  const teamsList = Object.values(teams).sort((a, b) => a.code.localeCompare(b.code));

  const handleNext = () => {
    if (selectedCode) {
      onSelectTeam(selectedCode);
    } else {
      // Default to close if nothing selected
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e0339]/80 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Background click handler to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Content Container */}
      <motion.div
        initial={{ scale: 0.9, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative flex w-full max-w-lg flex-col items-center"
      >
        {/* Title above the modal frame */}
        <h1
          id="modal-title"
          className="mb-6 text-center font-sans text-xl font-bold tracking-[0.05em] text-[#ebe6f0] sm:text-2xl"
        >
          TEAM AVAILABILITY
        </h1>

        {/* Modal Frame */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-[#5e3786]/35 bg-gradient-to-b from-[#360568]/45 via-[#2a0451]/45 to-[#1e0339]/45 px-6 py-8 shadow-[0_0_60px_15px_rgba(94,55,134,0.25)] sm:px-8">
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(235,230,240,0.12)]" />

          {/* Peeking Mascot at the top right */}
          <div className="pointer-events-none absolute -top-12 -right-4 z-10 h-24 w-34 sm:-top-16 sm:-right-6 sm:h-28 sm:w-40 md:-top-20 md:-right-8 md:h-32 md:w-44">
            <Mascot pose="happy" className="h-full w-full" />
          </div>

          {/* Teams List */}
          <div className="relative z-10 flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
            {teamsList.map((team) => {
              const isSelected = selectedCode === team.code;
              const membersCount = 1 + team.members.length;
              const isFull = membersCount >= 3;

              return (
                <button
                  key={team.code}
                  type="button"
                  disabled={isFull}
                  onClick={() => setSelectedCode(team.code)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all outline-none ${
                    isFull
                      ? "border-[#ebe6f0]/10 bg-[#1e0339]/20 opacity-50 cursor-not-allowed"
                      : isSelected
                      ? "border-[#89C43E] bg-[#89C43E]/10 shadow-[0_0_12px_rgba(137,196,62,0.25)]"
                      : "border-[#ebe6f0]/20 bg-[#1e0339]/50 hover:border-[#ebe6f0]/40"
                  }`}
                >
                  <span className="font-sans text-sm font-medium text-[#ebe6f0] sm:text-base">
                    Team <span className="font-mono text-[#c1b2d0]">(Code: {team.code})</span>
                  </span>
                  <span className={`rounded-full border px-3 py-1 font-mono text-xs font-bold ${
                    isFull
                      ? "bg-red-500/20 border-red-500/30 text-red-400"
                      : "bg-[#1e0339]/80 border-[#ebe6f0]/10 text-[#c1b2d0]"
                  }`}>
                    {membersCount}/3 {isFull && "Full"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="relative z-10 mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleNext}
              className="relative flex h-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#33488d] to-[#1c0f3e] px-12 font-sans text-sm font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0px_0px_12px_rgba(1,29,62,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_3px_3px_0px_rgba(0,0,0,0.25)]" />
              <span className="relative">NEXT</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
