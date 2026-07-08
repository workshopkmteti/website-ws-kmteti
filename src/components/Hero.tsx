export default function Hero() {
  return (
    <section id="top" className="relative flex flex-col items-center justify-center gap-12 px-6 py-40 text-center sm:py-52">
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-lg tracking-[0.3em] text-[#ebe9f6] sm:text-2xl">
          TUMBUH BERSAMA
        </p>
        <h1 className="font-sans text-5xl font-bold text-[#ebe9f6] [text-shadow:0px_4px_8px_rgba(38,4,74,0.5)] sm:text-7xl lg:text-8xl">
          WORKSHOP KMTETI
        </h1>
      </div>
      <p className="max-w-3xl font-mono text-lg tracking-[0.02em] text-[#c1b2d0] sm:text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
      </p>
      <a
        href="#register"
        className="flex h-[59px] items-center justify-center rounded-2xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-8 font-mono text-lg tracking-[0.02em] text-[#ebe6f0] transition-transform hover:scale-105"
      >
        Get Started
      </a>
    </section>
  );
}
