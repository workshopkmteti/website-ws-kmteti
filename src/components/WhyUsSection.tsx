const reasons = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
] as const;

export default function WhyUsSection() {
  return (
    <section className="py-24" style={{ background: "var(--color-ws-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-ws-purple-light)] mb-3">
            Mengapa kami
          </p>
        </div>

        <ul className="flex flex-col gap-4" role="list">
          {reasons.map((reason, idx) => (
            <li
              key={idx}
              className="flex items-start gap-4 py-4 border-b border-[var(--color-ws-purple-border)] last:border-b-0"
            >
              <span
                className="mt-1.5 shrink-0 w-1 h-4 rounded-full"
                style={{ background: "var(--color-ws-purple-light)" }}
                aria-hidden="true"
              />
              <p className="text-sm text-[var(--color-ws-text-muted)] leading-relaxed">
                {reason}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden lg:flex justify-end max-w-7xl mx-auto px-6 mt-8">
        <div className="relative w-32 h-32">
          <div
            className="absolute inset-0 rounded-full opacity-20 blur-xl"
            style={{ background: "var(--color-ws-purple-mid)" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
