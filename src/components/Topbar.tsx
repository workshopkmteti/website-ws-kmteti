"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import LogoUpright from "./LogoUpright";

const imgSubtract3 = "/search-icon.svg";
const imgBell2 = "/bell-icon.svg";
const imgUnion = "/profile-icon.svg";

type TopbarProps = {
  notificationCount: number;
  onMenuClick?: () => void;
  onSearch?: (query: string) => void;
  variant?: "search" | "workshop";
};

export default function Topbar({
  notificationCount,
  onMenuClick,
  onSearch,
  variant = "search",
}: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk eksekusi pencarian
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    console.log("Mencari:", searchQuery);
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="topbar">
      {/* Hamburger — hanya muncul di mobile/tablet */}
      <button
        className="sidebar-hamburger"
        onClick={onMenuClick}
        aria-label="Buka menu"
      >
        <Menu size={20} />
      </button>

      {variant === "workshop" ? (
        <div className="relative flex-1 max-w-[680px] overflow-hidden rounded-2xl bg-[rgba(163,140,186,0.25)] shadow-[0_0_8px_4px_rgba(38,4,74,0.25)] backdrop-blur-md">
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_4px_1px_rgba(163,155,215,0.25)]" />
          <div className="relative flex items-center justify-between px-4 py-2 sm:px-7">
            <Link
              href="/"
              aria-label="Workshop KMTETI"
              className="relative h-8 w-20 shrink-0 sm:h-9 sm:w-24"
            >
              <LogoUpright className="h-full w-full" />
            </Link>
            <nav
              aria-label="Navigasi Workshop"
              className="hidden items-center gap-6 font-mono text-xs tracking-[0.5px] text-[#ebe6f0] md:flex"
            >
              <Link href="/#about" className="transition-opacity hover:opacity-70">
                About Us
              </Link>
              <Link href="/#programs" className="transition-opacity hover:opacity-70">
                Programs
              </Link>
              <Link href="/dashboard" className="transition-opacity hover:opacity-70">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      ) : (
        <div className="search-wrapper">
          <Image
            src={imgSubtract3}
            alt="Cari"
            className="search-icon"
            aria-hidden="true"
            width={24}
            height={24}
            onClick={handleSearch}
          />
          <input
            type="search"
            placeholder="Cari apapun..."
            className="search-input"
            aria-label="Cari konten"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      )}

      <div className="topbar-actions">
        <button
          type="button"
          className="icon-btn"
          aria-label={`${notificationCount} notifikasi belum dibaca`}
        >
          <Image src={imgBell2} alt="" aria-hidden="true" className="topbar-btn-icon" width={24} height={24} />
        </button>
        <button type="button" className="icon-btn" aria-label="Profil saya">
          <Image src={imgUnion} alt="" aria-hidden="true" className="topbar-btn-icon" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}