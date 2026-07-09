"use client";

import { useState } from "react";
import LogoUpright from "./LogoUpright";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Register", href: "#register" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(1400px,94%)] -translate-x-1/2 sm:top-6">
      <div className="relative overflow-hidden rounded-2xl bg-[rgba(163,140,186,0.25)] shadow-[0_0_8px_4px_rgba(38,4,74,0.25)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_4px_1px_rgba(163,155,215,0.25)]" />
        <div className="relative flex items-center justify-between px-5 py-2.5 sm:px-8">
          <a href="#top" className="relative h-9 w-22 shrink-0 sm:h-11 sm:w-28">
            <LogoUpright className="h-full w-full" />
          </a>
          <nav className="hidden items-center gap-8 font-mono text-sm tracking-[0.5px] text-[#ebe6f0] md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="transition-opacity hover:opacity-70">
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-5 bg-[#ebe6f0] transition-transform ${
                isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-[#ebe6f0] transition-transform ${
                isMenuOpen ? "translate-y-[-3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
        <nav
          id="mobile-nav"
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
            isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="flex flex-col items-center gap-1 overflow-hidden font-mono text-sm tracking-[0.5px] text-[#ebe6f0]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-5 py-3 text-center transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
