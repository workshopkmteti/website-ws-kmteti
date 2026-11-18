"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
const imgSubtract3 = "/search-icon.svg";
const imgBell2 = "/bell-icon.svg";
const imgUnion = "/profile-icon.svg";
import Image from 'next/image';

type TopbarProps = {
  notificationCount: number;
  onMenuClick?: () => void;
  onSearch?: (query: string) => void;
};

export default function Topbar({ notificationCount, onMenuClick, onSearch }: TopbarProps) {
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