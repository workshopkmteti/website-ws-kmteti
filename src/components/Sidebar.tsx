"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types/dashboard";

const IMAGES = {
  logo: "/logowsdankmteti.svg",
  dashboard: "/dashboardicon.svg",
  pelatihan: "/pelatihanicon.svg",
  materi: "/materiicon.svg",
  penugasan: "/penugasanicon.svg",
  jadwal: "/jadwalicon.svg",
  kompetisi: "/kompetisiicon.svg",
  pengumuman: "/pengumumanicon.svg",
  settings: "/settingsicon.svg",
  help: "/helpicon.svg",
  logout: "/logouticon.svg",
  mascot: "/Mascot67.svg",
} as const;

const NAV_PRIMARY: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", iconSrc: IMAGES.dashboard, isActive: true },
  { label: "Pelatihan", href: "/register", iconSrc: IMAGES.pelatihan },
  { label: "Absensi", href: "/attendance", iconSrc: IMAGES.materi },
  { label: "Penugasan", href: "/assignment", iconSrc: IMAGES.penugasan },
  { label: "Kompetisi", href: "/competition", iconSrc: IMAGES.kompetisi },
  { label: "Team Match", href: "/team-match", iconSrc: IMAGES.pengumuman },
];

const NAV_SECONDARY: NavItem[] = [
  { label: "Profil", href: "/profile", iconSrc: IMAGES.settings },
];

type SidebarProps = {
  activeHref: string;
  userName: string;
  userRole: string;
  userInitial: string;
  isOpen: boolean;
  onClose: () => void;
};

function NavSection({ items, activeHref }: { items: NavItem[]; activeHref: string }) {
  return (
    <ul className="nav-list" role="list">
      {items.map(({ label, href, iconSrc }) => {
        const active = activeHref === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`nav-item${active ? " nav-item--active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <Image src={iconSrc} alt="" width={20} height={20} className="nav-icon" aria-hidden="true" />
              <span className="flex-1">{label}</span>
              {active && <span className="nav-dot" aria-hidden="true" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({ activeHref, userName, userRole, userInitial, isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`sidebar flex flex-col${isOpen ? " sidebar--open" : ""}`}>
        {/* Tombol CLOSE */}
        <button className="sidebar-close" onClick={onClose} aria-label="Tutup menu">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-0">
          <Image
            src={IMAGES.logo}
            alt="Workshop KMTETI FT UGM"
            width={110}
            height={32}
            className="h-auto w-28 object-contain"
            priority
          />

          <div className="relative -mt-10 -mb-10" aria-hidden="true">
            <Image
              src={IMAGES.mascot}
              alt=""
              width={200}
              height={200}
              className="h-48 w-48 object-contain"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav flex flex-col gap-2 py-0">
          <NavSection items={NAV_PRIMARY} activeHref={activeHref} />
          <div className="border-t border-white/10" />
          <NavSection items={NAV_SECONDARY} activeHref={activeHref} />
        </nav>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-2">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--accent-purple) text-xs font-bold text-white">
              {userInitial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold text-white">{userName}</div>
              <div className="text-xs text-white/70">{userRole}</div>
            </div>
            <div className="h-2 w-2 shrink-0 rounded-full bg-(--accent-green)" />
          </div>

          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
            aria-label="Logout"
          >
            <Image src={IMAGES.logout} alt="" width={20} height={20} className="h-5 w-5" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}