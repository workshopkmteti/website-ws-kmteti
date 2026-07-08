const EVENTS = [
  "Pelatihan Ganjil",
  "Teti Programing Week",
  "Pelatihan Genap",
  "Bootcamp",
];

export default function OurEvents() {
  return (
    <section className="flex flex-col items-center gap-10 px-6 py-20">
      <h2 className="font-sans text-3xl font-semibold text-[#ebe6f0] sm:text-5xl">OUR EVENTS</h2>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {EVENTS.map((title) => (
          <div
            key={title}
            className="flex h-90 w-70 flex-col items-center gap-6 rounded-2xl border border-[#ebe6f0] bg-gradient-to-br from-[#ebe6f0]/50 to-[#a38cba]/50 px-6 py-8 shadow-[0_0_12px_2px_rgba(23,2,44,0.6)]"
          >
            <div className="h-45 w-full rounded-xl border border-[#ebe6f0] bg-[#5e3786]/50 shadow-[0_2px_12px_2px_rgba(30,3,57,0.2)]" />
            <p className="text-center font-mono text-lg font-bold tracking-[0.02em] text-[#17022c]">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
