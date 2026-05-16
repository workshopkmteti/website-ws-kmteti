import type { Event } from "@/types/training";

const events: Event[] = [
  { id: "1", title: "Pelatihan Genjit", description: "" },
  { id: "2", title: "TeTI Programming Race", description: "" },
  { id: "3", title: "Pelatihan Gmap", description: "" },
  { id: "4", title: "Bootcamp", description: "" },
];

function EventCard({ event }: { event: Event }) {
  return (
    <article
      className="flex flex-col rounded-xl overflow-hidden border border-[var(--color-ws-purple-border)] transition-transform duration-200 hover:-translate-y-1"
      style={{ background: "var(--color-ws-bg-card)" }}
    >
      <div
        className="w-full h-36"
        style={{ background: "var(--color-ws-purple-glow)" }}
        aria-hidden="true"
      />
      <div className="p-4">
        <p className="text-sm font-semibold text-white">{event.title}</p>
      </div>
    </article>
  );
}

export default function OurEventsSection() {
  return (
    <section
      className="py-24"
      style={{ background: "var(--color-ws-bg)" }}
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          id="events-heading"
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        >
          OUR EVENTS
        </h2>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          role="list"
          aria-label="Daftar events"
        >
          {events.map((event) => (
            <div key={event.id} role="listitem">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
