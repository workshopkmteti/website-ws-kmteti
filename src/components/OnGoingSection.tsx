import type { Training } from "@/types/training";

const trainings: Training[] = [
  { id: "1", title: "Image Processing", category: "Pelatihan Gmap", status: "ongoing", date: "00-00 April" },
  { id: "2", title: "MatLab", category: "Pelatihan Gmap", status: "ongoing", date: "00-00 April" },
  { id: "3", title: "Image Processing", category: "Pelatihan Gmap", status: "ongoing", date: "00-00 April" },
  { id: "4", title: "Pratikum", category: "Pelatihan Gmap", status: "ongoing", date: "00-00 April" },
  { id: "5", title: "Image Processing", category: "Pelatihan Gmap", status: "ongoing", date: "00-00 April" },
];

function TrainingCard({ training }: { training: Training }) {
  return (
    <article
      className="shrink-0 w-44 rounded-xl border border-[var(--color-ws-purple-border)] overflow-hidden"
      style={{ background: "var(--color-ws-bg-card)" }}
    >
      <div
        className="w-full h-28"
        style={{ background: "var(--color-ws-purple-glow)" }}
        aria-hidden="true"
      />
      <div className="p-3 flex flex-col gap-1">
        <p className="text-[10px] text-[var(--color-ws-text-muted)]">
          {training.category}
        </p>
        <p className="text-xs font-semibold text-white leading-tight">
          {training.title}
        </p>
        <span className="mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full border border-[var(--color-ws-purple-border)] text-[var(--color-ws-purple-light)]">
          Selengkapnya
        </span>
      </div>
    </article>
  );
}

export default function OnGoingSection() {
  return (
    <section
      id="programs"
      className="py-24"
      style={{ background: "var(--color-ws-bg-section)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          ON GOING
        </h2>

        <div
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
          role="list"
          aria-label="Daftar pelatihan yang sedang berjalan"
        >
          {trainings.map((training) => (
            <div key={training.id} role="listitem">
              <TrainingCard training={training} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
