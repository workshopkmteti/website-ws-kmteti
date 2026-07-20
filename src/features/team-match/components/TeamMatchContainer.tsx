"use client";

import { useState } from "react";
import { type PageMode, type Team } from "../types";
import TeamMatchHeader from "./TeamMatchHeader";
import CreateJoinView from "./CreateJoinView";
import AvailabilityModal from "./AvailabilityModal";
import YourTeamView from "./YourTeamView";

export default function TeamMatchContainer() {
  const [mode, setMode] = useState<PageMode>("create_join");
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [showAvailability, setShowAvailability] = useState(false);

  // Helper to generate a code matching the pattern (e.g. A878XX or KMT999)
  const generateTeamCode = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    let code = "";
    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
      code += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return code;
  };

  const handleCreateTeam = (name: string) => {
    const teamNameUpper = name.toUpperCase() + "'S TEAM";
    setCurrentTeam({
      name: teamNameUpper,
      code: `Code: ${generateTeamCode()}`,
      leader: "Vania Carmia",
      members: ["Vania Carmia 1", "Vania Carmia 2"],
    });
    setMode("your_team");
  };

  const handleJoinTeam = (code: string) => {
    setCurrentTeam({
      name: "JOINED TEAM",
      code: code.toUpperCase(),
      leader: "Vania Carmia",
      members: ["Vania Carmia 1", "Vania Carmia 2"],
    });
    setMode("your_team");
  };

  const handleSelectTeam = (code: string) => {
    setShowAvailability(false);
    setCurrentTeam({
      name: "SELECTED TEAM",
      code: code.toUpperCase(),
      leader: "Vania Carmia",
      members: ["Vania Carmia 1", "Vania Carmia 2"],
    });
    setMode("your_team");
  };

  const handleSubmitWork = (updatedTeam: Team) => {
    // Return to the Create/Join view after completing work submission
    setMode("create_join");
    setCurrentTeam(null);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center pb-24">
      {/* Centered Glassmorphic Navbar */}
      <TeamMatchHeader />

      {/* Main Content Layout */}
      <main className="relative flex flex-1 flex-col items-center justify-center w-full z-10 px-4 pt-24 sm:pt-28 md:pt-32">
        {mode === "create_join" ? (
          <CreateJoinView
            onCreateTeam={handleCreateTeam}
            onJoinTeam={handleJoinTeam}
            onCheckAvailability={() => setShowAvailability(true)}
          />
        ) : (
          currentTeam && (
            <YourTeamView team={currentTeam} onSubmit={handleSubmitWork} />
          )
        )}
      </main>

      {/* Availability Modal */}
      {showAvailability && (
        <AvailabilityModal
          onClose={() => setShowAvailability(false)}
          onSelectTeam={handleSelectTeam}
        />
      )}
    </div>
  );
}
