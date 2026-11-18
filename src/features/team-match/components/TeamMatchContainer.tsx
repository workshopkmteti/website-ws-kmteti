"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type PageMode, type Team } from "../types";
import TeamMatchHeader from "./TeamMatchHeader";
import CreateJoinView from "./CreateJoinView";
import AvailabilityModal from "./AvailabilityModal";
import YourTeamView from "./YourTeamView";
import ConfirmationModal from "./ConfirmationModal";
import Toast from "./Toast";
import { INITIAL_MOCK_TEAMS } from "../mockData";

export default function TeamMatchContainer() {
  const [mode, setMode] = useState<PageMode>("create_join");
  const [teams, setTeams] = useState<Record<string, Team>>(INITIAL_MOCK_TEAMS);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    type: "create" | "join" | "leave" | "disband";
    payload: string;
  } | null>(null);

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
    setCreateError(null);
    setJoinError(null);

    const normalizedNewName = name.trim().toUpperCase() + "'S TEAM";
    const nameExists = Object.values(teams).some(
      (t) => t.name.toUpperCase() === normalizedNewName
    );

    if (nameExists) {
      setCreateError("A team with this name already exists.");
      return;
    }

    setPendingAction({ type: "create", payload: name });
  };

  const executeCreateTeam = (name: string) => {
    let code = generateTeamCode();
    while (teams[code]) {
      code = generateTeamCode();
    }

    const newTeam: Team = {
      name: name.toUpperCase() + "'S TEAM",
      code: code,
      leader: "Vania Carmia",
      members: [], // Starts with 0 members (1 leader = 1/3 capacity)
    };

    setTeams((prev) => ({ ...prev, [code]: newTeam }));
    setCurrentTeam(newTeam);
    setMode("your_team");
    setPendingAction(null);
    setToast({
      message: `Team "${newTeam.name}" created successfully!`,
      type: "success",
    });
  };

  const handleJoinTeam = (code: string) => {
    setCreateError(null);
    setJoinError(null);

    const uppercaseCode = code.toUpperCase();
    const targetTeam = teams[uppercaseCode];

    if (!targetTeam) {
      setJoinError("Team code not found.");
      return;
    }

    const totalMembers = 1 + targetTeam.members.length;
    if (totalMembers >= 3) {
      setJoinError("This team is already full.");
      return;
    }

    setPendingAction({ type: "join", payload: code });
  };

  const executeJoinTeam = (code: string) => {
    const uppercaseCode = code.toUpperCase();
    const targetTeam = teams[uppercaseCode];

    if (targetTeam) {
      const updatedMembers = [...targetTeam.members, `Vania Carmia ${targetTeam.members.length + 1}`];
      const updatedTeam = {
        ...targetTeam,
        members: updatedMembers,
      };

      setTeams((prev) => ({ ...prev, [uppercaseCode]: updatedTeam }));
      setCurrentTeam(updatedTeam);
      setMode("your_team");
      setToast({
        message: `Successfully joined team "${targetTeam.name}"!`,
        type: "success",
      });
    }
    setPendingAction(null);
  };

  const handleSelectTeam = (code: string) => {
    const uppercaseCode = code.toUpperCase();
    const targetTeam = teams[uppercaseCode];

    if (targetTeam) {
      const totalMembers = 1 + targetTeam.members.length;
      if (totalMembers >= 3) {
        return; // Modal should prevent selecting this, but act as guard
      }

      setPendingAction({ type: "join", payload: code });
    }
    setShowAvailability(false);
  };

  const handleCheckAvailability = () => {
    setCreateError(null);
    setJoinError(null);
    setShowAvailability(true);
  };

  const handleLeaveOrDisband = (code: string) => {
    const targetTeam = teams[code];
    if (!targetTeam) return;

    if (targetTeam.leader === "Vania Carmia") {
      setPendingAction({ type: "disband", payload: code });
    } else {
      setPendingAction({ type: "leave", payload: code });
    }
  };

  const executeDisbandTeam = (code: string) => {
    setTeams((prev) => {
      const copy = { ...prev };
      delete copy[code];
      return copy;
    });
    setMode("create_join");
    setCurrentTeam(null);
    setPendingAction(null);
    setToast({
      message: "Team disbanded successfully.",
      type: "success",
    });
  };

  const executeLeaveTeam = (code: string) => {
    setTeams((prev) => {
      const targetTeam = prev[code];
      if (!targetTeam) return prev;

      const updatedMembers = targetTeam.members.filter(
        (m) => !m.startsWith("Vania Carmia")
      );

      return {
        ...prev,
        [code]: {
          ...targetTeam,
          members: updatedMembers,
        },
      };
    });
    setMode("create_join");
    setCurrentTeam(null);
    setPendingAction(null);
    setToast({
      message: "Left team successfully.",
      type: "success",
    });
  };

  const handleSubmitWork = (updatedTeam: Team) => {
    setTeams((prev) => ({ ...prev, [updatedTeam.code]: updatedTeam }));
    setMode("create_join");
    setCurrentTeam(null);
    setToast({
      message: "Work submitted successfully!",
      type: "success",
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center pb-24">
      {/* Centered Glassmorphic Navbar */}
      <TeamMatchHeader />

      {/* Main Content Layout */}
      <main className="relative flex flex-1 flex-col items-center justify-center w-full z-10 px-4 pt-24 sm:pt-28 md:pt-32">
        <AnimatePresence mode="wait">
          {mode === "create_join" ? (
            <motion.div
              key="create_join"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              <CreateJoinView
                onCreateTeam={handleCreateTeam}
                onJoinTeam={handleJoinTeam}
                onCheckAvailability={handleCheckAvailability}
                createError={createError}
                joinError={joinError}
              />
            </motion.div>
          ) : (
            currentTeam && (
              <motion.div
                key="your_team"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full flex justify-center"
              >
                <YourTeamView
                  key={currentTeam.code}
                  team={currentTeam}
                  onSubmit={handleSubmitWork}
                  onLeaveOrDisband={() => handleLeaveOrDisband(currentTeam.code)}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>

      {/* Availability Modal */}
      <AnimatePresence>
        {showAvailability && (
          <AvailabilityModal
            teams={teams}
            onClose={() => setShowAvailability(false)}
            onSelectTeam={handleSelectTeam}
          />
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {pendingAction && (
          <ConfirmationModal
            title={
              pendingAction.type === "create"
                ? "Create Team"
                : pendingAction.type === "join"
                ? "Join Team"
                : pendingAction.type === "disband"
                ? "Disband Team"
                : "Leave Team"
            }
            message={
              pendingAction.type === "create"
                ? `Are you sure you want to create the team "${pendingAction.payload.toUpperCase()}'S TEAM"?`
                : pendingAction.type === "join"
                ? `Are you sure you want to join the team "${teams[pendingAction.payload.toUpperCase()]?.name}" (Code: ${pendingAction.payload.toUpperCase()})?`
                : pendingAction.type === "disband"
                ? `Are you sure you want to disband the team "${teams[pendingAction.payload]?.name}"? This action cannot be undone.`
                : `Are you sure you want to leave the team "${teams[pendingAction.payload]?.name}"?`
            }
            onConfirm={() => {
              if (pendingAction.type === "create") {
                executeCreateTeam(pendingAction.payload);
              } else if (pendingAction.type === "join") {
                executeJoinTeam(pendingAction.payload);
              } else if (pendingAction.type === "disband") {
                executeDisbandTeam(pendingAction.payload);
              } else if (pendingAction.type === "leave") {
                executeLeaveTeam(pendingAction.payload);
              }
            }}
            onCancel={() => setPendingAction(null)}
          />
        )}
      </AnimatePresence>

      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
