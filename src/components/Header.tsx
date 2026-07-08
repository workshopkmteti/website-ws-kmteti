const imgLogo =
  "https://www.figma.com/api/mcp/asset/6b812460-0921-44b7-ba63-066023a72176";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Register", href: "#register" },
];

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(1400px,94%)] -translate-x-1/2 sm:top-6">
      <div className="relative flex items-center justify-between overflow-hidden rounded-[32px] bg-[rgba(163,140,186,0.25)] px-6 py-3 shadow-[0_0_8px_4px_rgba(38,4,74,0.25)] backdrop-blur-md sm:px-10">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_4px_1px_rgba(163,155,215,0.25)]" />
        <a href="#top" className="relative h-10 w-24 shrink-0 sm:h-[52px] sm:w-[132px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgLogo}
            alt="Logo Workshop KMTETI"
            className="h-full w-full object-contain"
          />
        </a>
        <nav className="hidden items-center gap-10 font-mono text-lg tracking-[0.5px] text-[#ebe6f0] md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="transition-opacity hover:opacity-70">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#register"
          className="rounded-2xl border border-[#ebe6f0] bg-[#1e0339] px-5 py-2 font-mono text-sm tracking-[0.3px] text-[#ebe6f0] transition-transform hover:scale-105 md:hidden"
        >
          Menu
        </a>
      </div>
    </header>
  );
}
