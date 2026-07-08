const imgArrowIcon =
  "https://www.figma.com/api/mcp/asset/2290ca83-805f-47b0-be17-0d987dc24fb6";

const PROGRAMS = [
  { tag: "Pelatihan Genap", title: "IMAGE PROCESSING" },
  { tag: "Pelatihan Genap", title: "MatLab" },
  { tag: "Pelatihan Genap", title: "Proteus" },
  { tag: "Pelatihan Genap", title: "IMAGE PROCESSING" },
];

function ProgramCard({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex h-90 w-75 shrink-0 flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-b from-[#360568] via-[#2a0451] to-[#1e0339] px-8 py-8 shadow-[0_0_32px_10px_rgba(94,55,134,0.2)]">
      <div className="size-35 rounded-xl bg-[#5e3786]" />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-mono text-xs tracking-[0.02em] text-[#c1b2d0]">{tag}</p>
        <p className="font-mono text-lg font-bold tracking-[0.02em] text-[#ebe6f0]">{title}</p>
      </div>
      <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#ebe6f0] bg-[#1e0339] px-5 font-mono text-xs tracking-[0.02em] text-[#ebe6f0] transition-transform hover:scale-105">
        Selengkapnya
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgArrowIcon} alt="" className="size-3.5" />
      </button>
    </div>
  );
}

export default function OnGoing() {
  const track = [...PROGRAMS, ...PROGRAMS];
  return (
    <section id="programs" className="flex flex-col items-center gap-12 py-20">
      <h2 className="font-sans text-3xl font-semibold text-[#ebe9f6] sm:text-5xl">ON GOING</h2>
      <div className="w-full overflow-hidden">
        <div className="marquee-track flex w-max gap-6 px-6">
          {track.map((p, i) => (
            <ProgramCard key={i} tag={p.tag} title={p.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
