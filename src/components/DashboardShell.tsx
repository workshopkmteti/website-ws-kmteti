"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type DashboardShellProps = {
  activeHref: string;
  userName?: string;
  userRole?: string;
  children: ReactNode;
};

export default function DashboardShell({
  activeHref,
  userName = "John Doe",
  userRole = "Peserta",
  children,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userInitial = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("") || "JD";

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeHref={activeHref}
        userName={userName}
        userRole={userRole}
        userInitial={userInitial}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="dashboard-main">
        <Topbar
          notificationCount={3}
          onMenuClick={() => setSidebarOpen(true)}
          variant={activeHref === "/dashboard" ? "search" : "workshop"}
        />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
