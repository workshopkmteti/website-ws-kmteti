import { useState } from "react";
import Mascot from "@/components/Mascot";

type CreateJoinViewProps = {
  onCreateTeam: (name: string) => void;
  onJoinTeam: (code: string) => void;
  onCheckAvailability: () => void;
  createError?: string | null;
  joinError?: string | null;
};

export default function CreateJoinView({
  onCreateTeam,
  onJoinTeam,
  onCheckAvailability,
  createError,
  joinError,
}: CreateJoinViewProps) {
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = teamName.trim();
    if (!trimmed) {
      setNameError("Team name cannot be empty.");
      return;
    }
    if (trimmed.length < 3 || trimmed.length > 25) {
      setNameError("Team name must be between 3 and 25 characters.");
      return;
    }
    const nameRegex = /^[a-zA-Z0-9\s-]+$/;
    if (!nameRegex.test(trimmed)) {
      setNameError("Team name can only contain letters, numbers, spaces, and dashes.");
      return;
    }
    setNameError(null);
    onCreateTeam(trimmed);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = teamCode.trim();
    if (!trimmed) {
      setCodeError("Team code cannot be empty.");
      return;
    }
    const codeRegex = /^[a-zA-Z]{3}\d{3}$/;
    if (!codeRegex.test(trimmed)) {
      setCodeError("Team code must be 3 letters followed by 3 numbers (e.g. ABC123).");
      return;
    }
    setCodeError(null);
    onJoinTeam(trimmed);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
    if (nameError) setNameError(null);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamCode(e.target.value);
    if (codeError) setCodeError(null);
  };

  return (
    <div className="relative flex w-full max-w-xl flex-col items-center px-4 py-8 md:py-12">
      {/* Title */}
      <h1 className="mb-8 text-center font-sans text-2xl font-bold tracking-[0.05em] text-[#ebe6f0] sm:text-3xl md:text-4xl">
        CREATE / JOIN TEAM
      </h1>

      {/* Forms Stack */}
      <div className="flex w-full flex-col gap-6">
        {/* Create Team Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[#5e3786]/35 bg-gradient-to-b from-[#360568]/30 via-[#2a0451]/30 to-[#1e0339]/30 px-6 py-7 shadow-[0_0_50px_10px_rgba(94,55,134,0.15)] sm:px-8">
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(235,230,240,0.1)]" />
          <form onSubmit={handleCreateSubmit} className="relative flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-[#ebe6f0] sm:text-xl">
              Create Team
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={teamName}
                onChange={handleNameChange}
                placeholder="Enter your team name"
                aria-label="Team name"
                className={`h-11 flex-1 rounded-xl border bg-[#1e0339]/60 px-4 font-mono text-sm text-[#ebe6f0] outline-none transition-all placeholder:text-[#c1b2d0]/40 focus:bg-[#1e0339] focus:shadow-[0_0_0_3px_rgba(51,72,141,0.25)] ${
                  nameError || createError
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-[#ebe6f0]/30 focus:border-[#33488d]"
                }`}
              />
              <button
                type="submit"
                className="relative flex h-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#33488d] to-[#1c0f3e] px-7 font-sans text-sm font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0px_0px_12px_rgba(1,29,62,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_3px_3px_0px_rgba(0,0,0,0.25)]" />
                <span className="relative">Create</span>
              </button>
            </div>
            {(nameError || createError) && (
              <p className="text-xs font-semibold text-red-400 font-sans" role="alert">
                {nameError || createError}
              </p>
            )}
          </form>
        </div>

        {/* Join Team Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[#5e3786]/35 bg-gradient-to-b from-[#360568]/30 via-[#2a0451]/30 to-[#1e0339]/30 px-6 py-7 shadow-[0_0_50px_10px_rgba(94,55,134,0.15)] sm:px-8">
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(235,230,240,0.1)]" />
          <form onSubmit={handleJoinSubmit} className="relative flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-[#ebe6f0] sm:text-xl">
              Join Team
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={teamCode}
                onChange={handleCodeChange}
                placeholder="Enter your team code"
                aria-label="Team code"
                className={`h-11 flex-1 rounded-xl border bg-[#1e0339]/60 px-4 font-mono text-sm text-[#ebe6f0] outline-none transition-all placeholder:text-[#c1b2d0]/40 focus:bg-[#1e0339] focus:shadow-[0_0_0_3px_rgba(51,72,141,0.25)] ${
                  codeError || joinError
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-[#ebe6f0]/30 focus:border-[#33488d]"
                }`}
              />
              <button
                type="submit"
                className="relative flex h-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#33488d] to-[#1c0f3e] px-7 font-sans text-sm font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0px_0px_12px_rgba(1,29,62,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_3px_3px_0px_rgba(0,0,0,0.25)]" />
                <span className="relative">Join</span>
              </button>
            </div>
            {(codeError || joinError) && (
              <p className="text-xs font-semibold text-red-400 font-sans" role="alert">
                {codeError || joinError}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Team Availability Check & Mascot Section */}
      <div className="relative mt-12 flex w-full flex-col items-center justify-center min-h-[140px]">
        {/* Centered stack */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <h2 className="font-sans text-lg font-bold tracking-[0.05em] text-[#ebe6f0] sm:text-xl">
            TEAM AVAILABILITY
          </h2>
          <button
            type="button"
            onClick={onCheckAvailability}
            className="relative flex h-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#33488d] to-[#1c0f3e] px-8 font-sans text-sm font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0px_0px_12px_rgba(1,29,62,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_3px_3px_0px_rgba(0,0,0,0.25)]" />
            <span className="relative">CHECK</span>
          </button>
        </div>

        {/* Mascot to the side (absolute positioning relative to center line) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-46 -translate-y-[calc(50%-10px)] translate-x-[100px] sm:translate-x-[120px] md:translate-x-[140px] lg:translate-x-[160px] sm:h-36 sm:w-52 md:h-40 md:w-56 lg:h-48 lg:w-68 flex items-center justify-center">
          <Mascot pose="idle" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
