const EVENTS = [
  "Pelatihan Ganjil",
  "Teti Programing Week",
  "Pelatihan Genap",
  "Bootcamp",
];

export default function OurEvents() {
  return (
    <section className="flex flex-col items-center gap-12 px-6 py-24">
      <h2 className="font-sans text-5xl font-semibold text-[#ebe6f0] sm:text-7xl">OUR EVENTS</h2>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {EVENTS.map((title) => (
          <div
            key={title}
            className="flex h-[420px] w-[320px] flex-col items-center gap-10 rounded-[32px] border border-[#ebe6f0] bg-gradient-to-br from-[#ebe6f0]/50 to-[#a38cba]/50 px-8 py-10 shadow-[0_0_16px_2px_rgba(23,2,44,0.75)]"
          >
            <div className="h-[220px] w-full rounded-3xl border border-[#ebe6f0] bg-[#5e3786]/50 shadow-[0_2px_16px_2px_rgba(30,3,57,0.25)]" />
            <p className="text-center font-mono text-2xl font-bold tracking-[0.02em] text-[#17022c]">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
