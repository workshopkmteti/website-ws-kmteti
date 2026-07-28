import Link from "next/link";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 self-start rounded-2xl border border-[#c6c6c6] bg-[#18022c] px-5 py-2 text-sm text-[#e6edf4] shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] transition-colors hover:bg-[#2a0451] sm:text-base"
    >
      <svg viewBox="0 0 18 18" fill="none" className="size-4 shrink-0" aria-hidden>
        <path
          d="M11.25 13.5L6.75 9L11.25 4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </Link>
  );
}
