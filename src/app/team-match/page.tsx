import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import TeamMatchContainer from "@/features/team-match/components/TeamMatchContainer";

export const metadata: Metadata = {
  title: "Team Match — Workshop KMTETI",
  description: "Buat atau gabung dengan tim Anda dan periksa ketersediaan tim pada program Workshop KMTETI.",
};

export default function TeamMatchPage() {
  return (
    <DashboardShell activeHref="/team-match">
      <TeamMatchContainer />
    </DashboardShell>
  );
}
