import { useState } from "react";
import Mascot from "@/components/Mascot";
import { type Team } from "../types";

type YourTeamViewProps = {
  team: Team;
  onSubmit: (updatedTeam: Team) => void;
  onLeaveOrDisband: () => void;
};

export default function YourTeamView({
  team,
  onSubmit,
  onLeaveOrDisband,
}: YourTeamViewProps) {
  const [leader, setLeader] = useState(team.leader || "");
  const [members, setMembers] = useState<string[]>([
    team.members[0] || "",
    team.members[1] || "",
  ]);
  const [copied, setCopied] = useState(false);

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(team.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...team,
      leader,
      members,
    });
  };

  return (
    <div className="relative flex w-full max-w-xl flex-col items-center px-4 py-8 md:py-12">
      {/* Title */}
      <h1 className="mb-8 text-center font-sans text-2xl font-bold tracking-[0.05em] text-[#ebe6f0] sm:text-3xl md:text-4xl">
        YOUR TEAM
      </h1>

      {/* Card Container */}
      <div className="relative w-full overflow-hidden rounded-3xl border border-[#5e3786]/35 bg-gradient-to-b from-[#360568]/30 via-[#2a0451]/30 to-[#1e0339]/30 px-6 py-8 shadow-[0_0_50px_10px_rgba(94,55,134,0.15)] sm:px-8">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(235,230,240,0.1)]" />

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-6">
          {/* Card Header (Team Name & Code) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#5e3786]/45 pb-4">
            <h2 className="font-sans text-lg font-bold text-[#ebe6f0] sm:text-xl uppercase tracking-wide">
              {team.name}
            </h2>
            <div className="flex items-center gap-2 self-start sm:self-center font-mono text-sm font-semibold text-[#89C43E]">
              <span>CODE: {team.code}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center justify-center p-1 rounded-md hover:bg-[#89C43E]/10 transition-colors text-[#89C43E] hover:text-[#a0dd4f] outline-none"
                aria-label="Copy team code"
              >
                {copied ? (
                  <span className="text-[10px] uppercase font-sans tracking-wider text-[#89C43E]">Copied!</span>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Leader's Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="leader-name" className="font-sans text-sm font-semibold text-[#c1b2d0] sm:text-base">
              Leader's Name
            </label>
            <input
              id="leader-name"
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              placeholder="Leader's Name"
              className="h-11 w-full rounded-xl border border-[#ebe6f0]/30 bg-[#1e0339]/60 px-4 font-mono text-sm text-[#ebe6f0] outline-none transition-all placeholder:text-[#c1b2d0]/40 focus:border-[#33488d] focus:bg-[#1e0339] focus:shadow-[0_0_0_3px_rgba(51,72,141,0.25)]"
            />
          </div>

          {/* Members' Name Fields */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-sm font-semibold text-[#c1b2d0] sm:text-base">
              Members' Name
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="member-0" className="sr-only">Member 1</label>
                <input
                  id="member-0"
                  type="text"
                  value={members[0]}
                  onChange={(e) => handleMemberChange(0, e.target.value)}
                  aria-label="Member 1"
                  placeholder="Member 1"
                  className="h-11 w-full rounded-xl border border-[#ebe6f0]/30 bg-[#1e0339]/60 px-4 font-mono text-sm text-[#ebe6f0] outline-none transition-all placeholder:text-[#c1b2d0]/40 focus:border-[#33488d] focus:bg-[#1e0339] focus:shadow-[0_0_0_3px_rgba(51,72,141,0.25)]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="member-1" className="sr-only">Member 2</label>
                <input
                  id="member-1"
                  type="text"
                  value={members[1]}
                  onChange={(e) => handleMemberChange(1, e.target.value)}
                  aria-label="Member 2"
                  placeholder="Member 2"
                  className="h-11 w-full rounded-xl border border-[#ebe6f0]/30 bg-[#1e0339]/60 px-4 font-mono text-sm text-[#ebe6f0] outline-none transition-all placeholder:text-[#c1b2d0]/40 focus:border-[#33488d] focus:bg-[#1e0339] focus:shadow-[0_0_0_3px_rgba(51,72,141,0.25)]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onLeaveOrDisband}
              className="h-11 w-full sm:w-auto rounded-xl border border-red-500/30 bg-red-500/10 px-8 font-sans text-sm font-bold tracking-[0.02em] text-red-400 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {team.leader === "Vania Carmia" ? "Disband Team" : "Leave Team"}
            </button>
            <button
              type="submit"
              className="relative flex h-11 w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#33488d] to-[#1c0f3e] px-10 font-sans text-sm font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0px_0px_12px_rgba(1,29,62,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_3px_3px_0px_rgba(0,0,0,0.25)]" />
              <span className="relative">Submit Your Work</span>
            </button>
          </div>
        </form>
      </div>

      {/* Mascot bottom right */}
      <div className="pointer-events-none absolute top-[calc(100%-40px)] left-1/2 -z-10 h-36 w-52 -translate-x-[calc(50%-100px)] sm:h-44 sm:w-60 md:top-[calc(100%-60px)] md:h-52 md:w-72 lg:top-[calc(100%-80px)] lg:h-64 lg:w-88">
        <Mascot pose="wink-left" className="h-full w-full" />
      </div>
    </div>
  );
}
