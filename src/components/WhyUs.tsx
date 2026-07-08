const REASONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function WhyUs() {
  return (
    <section id="why-us" className="flex flex-col items-center gap-2 px-6 py-20 sm:px-12 lg:px-24">
      <h2 className="font-sans text-3xl font-semibold text-[#ebe6f0] sm:text-4xl">
        Mengapa kami
      </h2>
      <div className="flex w-full max-w-4xl flex-col gap-4 py-8">
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
