import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Register", href: "#register" },
] as const;

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-3 sm:px-6">
      <nav
        className="mx-auto flex h-12 max-w-3xl items-center justify-between rounded-full border border-(--color-ws-purple-border) bg-[rgba(17,15,46,0.92)] px-5 shadow-[0_0_30px_rgba(124,58,237,0.2)] backdrop-blur-xl"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          aria-label="Workshop KMTETI"
        >
          <Image
            src="/logows.svg"
            alt="Workshop KMTETI"
            width={173}
            height={68}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <ul className="flex items-center gap-4 sm:gap-6" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-[11px] font-medium tracking-[0.14em] text-(--color-ws-text-muted) transition-colors duration-200 hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
