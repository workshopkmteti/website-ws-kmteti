const REASONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

import Mascot from "./Mascot";

export default function WhyUs() {
  return (
    <section id="why-us" className="relative flex flex-col items-center gap-2 px-6 py-20 sm:px-12 lg:px-24">
      <Mascot
        pose="happy"
        className="pointer-events-none absolute -bottom-4 -right-9.5 z-0 h-20 w-29 sm:bottom-6 sm:-right-11.5 sm:h-32 sm:w-46 md:bottom-8 md:-right-15.5 md:h-48 md:w-70 lg:bottom-10 lg:-right-11.5 lg:h-56 lg:w-81"
      />
      <h2 className="relative z-10 font-sans text-3xl font-semibold text-[#ebe6f0] [text-shadow:0px_4px_12px_rgba(30,3,57,0.9)] sm:text-4xl">
        Mengapa kami
      </h2>
      <div className="relative z-10 flex w-full max-w-4xl flex-col gap-4 py-8">
        {REASONS.map((reason, i) => (
          <div
            key={i}
            className="flex w-full items-center rounded-2xl bg-gradient-to-br from-[#5e3786]/60 via-[#421e68]/60 to-[#26044a]/60 px-6 py-4 shadow-[0_0_32px_8px_rgba(49,5,95,0.35)] sm:px-10"
          >
            <p className="font-mono text-sm tracking-[0.02em] text-[#ebe9f6] sm:text-base">
              {reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
