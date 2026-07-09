import Mascot from "./Mascot";

export default function Hero() {
  return (
    <section id="top" className="relative flex flex-col items-center justify-center gap-10 px-6 py-28 text-center sm:py-36">
      <Mascot
        pose="idle"
        className="pointer-events-none absolute -bottom-18.5 -left-18.5 z-0 h-20 w-29 sm:bottom-10 sm:-left-8 sm:h-32 sm:w-46 md:bottom-14 md:-left-12 md:h-48 md:w-70 lg:bottom-16 lg:-left-8 lg:h-56 lg:w-81"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 z-5 h-[140%] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 50%, rgba(30,3,57,0.85) 0%, rgba(30,3,57,0.55) 45%, rgba(30,3,57,0) 75%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <p className="font-mono text-sm tracking-[0.3em] text-[#ebe9f6] sm:text-base">
          TUMBUH BERSAMA
        </p>
        <h1 className="text-balance font-sans text-4xl font-bold text-[#ebe9f6] [text-shadow:0px_4px_12px_rgba(30,3,57,0.9)] sm:text-6xl lg:text-7xl">
          WORKSHOP KMTETI
        </h1>
      </div>
      <p className="relative z-10 max-w-2xl font-mono text-sm leading-relaxed tracking-[0.02em] text-[#c1b2d0] [text-shadow:0px_2px_8px_rgba(30,3,57,0.9)] sm:text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
      </p>
      <a
        href="#register"
        className="relative z-10 flex h-12 items-center justify-center rounded-2xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-8 font-mono text-sm tracking-[0.02em] text-[#ebe6f0] transition-transform hover:scale-105"
      >
        Get Started
      </a>
    </section>
  );
}
