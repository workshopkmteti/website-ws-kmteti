const REASONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function WhyUs() {
  return (
    <section id="why-us" className="flex flex-col items-center gap-2 px-6 py-24 sm:px-16 lg:px-32">
      <h2 className="font-sans text-2xl font-semibold text-[#ebe6f0] sm:text-3xl">
        Mengapa kami
      </h2>
      <div className="flex w-full max-w-5xl flex-col gap-8 py-8">
        {REASONS.map((reason, i) => (
          <div
            key={i}
            className="flex w-full items-center rounded-3xl bg-gradient-to-br from-[#5e3786]/60 via-[#421e68]/60 to-[#26044a]/60 px-8 py-5 shadow-[0_0_72px_24px_rgba(49,5,95,0.5)] sm:px-20"
          >
            <p className="font-mono text-lg tracking-[0.02em] text-[#ebe9f6] sm:text-2xl">
              {reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
