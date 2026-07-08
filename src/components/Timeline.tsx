const EVENTS = [
  { title: "Pelatihan Genap", date: "00-00 April" },
  { title: "Pelatihan Genap", date: "00-00 April" },
  { title: "Pelatihan Genap", date: "00-00 April" },
  { title: "Pelatihan Genap", date: "00-00 April" },
  { title: "Pelatihan Genap", date: "00-00 April" },
];

export default function Timeline() {
  return (
    <section className="flex flex-col items-center gap-16 px-6 py-16">
      <h2 className="font-sans text-5xl font-semibold text-[#ebe6f0] sm:text-7xl">TIMELINE</h2>
      <div className="w-full max-w-6xl overflow-x-auto">
        <div className="relative flex min-w-[900px] items-start justify-between px-6 py-10">
          <div className="absolute left-0 right-0 top-[52px] h-px bg-[#ebe6f0]/40" />
          {EVENTS.map((event, i) => (
            <div key={i} className="relative z-10 flex w-[190px] flex-col items-center gap-4">
              <span className="mb-2 size-[22px] rounded-full border-2 border-[#ebe6f0] bg-[#5e3786]" />
              <p className="text-center font-mono text-lg font-bold tracking-[0.02em] text-[#ebe6f0]">
                {event.title}
              </p>
              <p className="text-center font-mono text-lg tracking-[0.02em] text-[#ebe6f0]">
                {event.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
