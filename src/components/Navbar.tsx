"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Register", href: "#register" },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-ws-bg)]/80 backdrop-blur-md border-b border-[var(--color-ws-purple-border)]">
      <nav
        className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-lg tracking-tight"
        >
          <span className="text-[var(--color-ws-purple-light)]">Workshop</span>
          <span className="text-xs font-normal text-[var(--color-ws-text-muted)] leading-none mt-0.5">
            KMTETI
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-sm text-[var(--color-ws-text-muted)] hover:text-white transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-ws-purple-light)]"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[var(--color-ws-bg-card)] border-t border-[var(--color-ws-purple-border)]">
          <ul className="flex flex-col px-6 py-4 gap-4" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm text-[var(--color-ws-text-muted)] hover:text-white transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
