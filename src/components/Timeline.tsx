const EVENTS = [
  { title: "Pelatihan Genap", date: "00-00 April" },
  { title: "Pelatihan Genap", date: "00-00 April" },
  { title: "Pelatihan Genap", date: "00-00 April" },
  { title: "Pelatihan Genap", date: "00-00 April" },
  { title: "Pelatihan Genap", date: "00-00 April" },
];

export default function Timeline() {
  return (
    <section className="flex flex-col items-center gap-12 px-6 py-16">
      <h2 className="font-sans text-3xl font-semibold text-[#ebe6f0] sm:text-5xl">TIMELINE</h2>

      {/* Vertical rail on mobile, horizontal rail from sm up */}
      <div className="relative flex w-full max-w-6xl flex-col items-start gap-8 sm:hidden">
        <div className="absolute top-0 bottom-0 left-1.75 w-px bg-[#ebe6f0]/40" />
        {EVENTS.map((event, i) => (
          <div key={i} className="relative z-10 flex items-center gap-4 pl-0">
            <span className="size-4 shrink-0 rounded-full border-2 border-[#ebe6f0] bg-[#5e3786]" />
            <div className="flex flex-col gap-0.5">
              <p className="font-mono text-sm font-bold tracking-[0.02em] text-[#ebe6f0]">
                {event.title}
              </p>
              <p className="font-mono text-sm tracking-[0.02em] text-[#ebe6f0]/70">{event.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden w-full max-w-6xl overflow-x-auto sm:block">
        <div className="relative flex min-w-225 items-start justify-between px-6 py-8">
          <div className="absolute left-0 right-0 top-11 h-px bg-[#ebe6f0]/40" />
          {EVENTS.map((event, i) => (
            <div key={i} className="relative z-10 flex w-47.5 flex-col items-center gap-3">
              <span className="mb-1 size-4 rounded-full border-2 border-[#ebe6f0] bg-[#5e3786]" />
              <p className="text-center font-mono text-sm font-bold tracking-[0.02em] text-[#ebe6f0]">
                {event.title}
              </p>
              <p className="text-center font-mono text-sm tracking-[0.02em] text-[#ebe6f0]">
                {event.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
