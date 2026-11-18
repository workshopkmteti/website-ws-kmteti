import type { Metadata } from "next";
import Background from "@/components/Background";
import TeamMatchContainer from "@/features/team-match/components/TeamMatchContainer";

export const metadata: Metadata = {
  title: "Team Match — Workshop KMTETI",
  description: "Buat atau gabung dengan tim Anda dan periksa ketersediaan tim pada program Workshop KMTETI.",
};

export default function TeamMatchPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Decorative stars and gradients background */}
      <Background />
      
      {/* Interactive team match state container */}
      <TeamMatchContainer />
    </div>
  );
}
