import type { TimelineItem } from "@/types/training";

const timelineItems: TimelineItem[] = [
  { id: "1", title: "Pelatihan Gmap", category: "Pelatihan Gmap", date: "00-00 April" },
  { id: "2", title: "Pelatihan Gmap", category: "Pelatihan Gmap", date: "00-00 April" },
  { id: "3", title: "Pelatihan Gmap", category: "Pelatihan Gmap", date: "00-00 April" },
  { id: "4", title: "Pelatihan Gmap", category: "Pelatihan Gmap", date: "00-00 April" },
  { id: "5", title: "Pelatihan Gmap", category: "Pelatihan Gmap", date: "00-00 April" },
];

export default function TimelineSection() {
  return (
    <section
      className="py-24"
      style={{ background: "var(--color-ws-bg-section)" }}
      aria-label="Timeline pelatihan"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          TIMELINE
        </h2>

        <div className="relative overflow-x-auto pb-4">
          <ol className="flex items-start min-w-max mx-auto gap-0" role="list">
            {timelineItems.map((item, idx) => (
              <li key={item.id} className="relative flex flex-col items-center w-40">
                <div className="flex items-center w-full">
                  <div
                    className={`h-px flex-1 ${idx === 0 ? "opacity-0" : ""}`}
                    style={{ background: "var(--color-ws-purple-light)" }}
                    aria-hidden="true"
                  />
                  <div
                    className="w-3 h-3 rounded-full shrink-0 border-2"
                    style={{
                      background: "var(--color-ws-purple-light)",
                      borderColor: "var(--color-ws-purple-mid)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className={`h-px flex-1 ${idx === timelineItems.length - 1 ? "opacity-0" : ""}`}
                    style={{ background: "var(--color-ws-purple-light)" }}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 text-center px-2">
                  <p className="text-xs text-[var(--color-ws-text-muted)]">
                    {item.category}
                  </p>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    {item.title}
                  </p>
                  <time
                    className="text-[10px] text-[var(--color-ws-text-muted)] mt-0.5 block"
                    dateTime={item.date}
                  >
                    {item.date}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
