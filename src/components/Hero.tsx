export default function Hero() {
  return (
    <section id="top" className="relative flex flex-col items-center justify-center gap-10 px-6 py-28 text-center sm:py-36">
      <div className="flex flex-col items-center gap-3">
        <p className="font-mono text-sm tracking-[0.3em] text-[#ebe9f6] sm:text-base">
          TUMBUH BERSAMA
        </p>
        <h1 className="text-balance font-sans text-4xl font-bold text-[#ebe9f6] [text-shadow:0px_4px_8px_rgba(38,4,74,0.5)] sm:text-6xl lg:text-7xl">
          WORKSHOP KMTETI
        </h1>
      </div>
      <p className="max-w-2xl font-mono text-sm leading-relaxed tracking-[0.02em] text-[#c1b2d0] sm:text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
      </p>
      <a
        href="#register"
        className="flex h-12 items-center justify-center rounded-2xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-8 font-mono text-sm tracking-[0.02em] text-[#ebe6f0] transition-transform hover:scale-105"
      >
        Get Started
      </a>
    </section>
  );
}
