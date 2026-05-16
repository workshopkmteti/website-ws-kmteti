export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: "var(--color-ws-bg-section)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div
          className="aspect-video rounded-2xl border border-[var(--color-ws-purple-border)]"
          style={{ background: "var(--color-ws-bg-card)" }}
          aria-label="Video profil Workshop KMTETI"
        />

        <div className="flex flex-col gap-6">
          <p className="text-sm text-[var(--color-ws-text-muted)] leading-relaxed">
            <span className="font-semibold text-white">Workshop...</span> Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
            Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
            mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
            tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo,
            non esucipit magna interdum at. Curabitur pellentesque nibh nec erat
            volutpat, at molestie ante fermentum sit amet.
          </p>
        </div>
      </div>
    </section>
  );
}
