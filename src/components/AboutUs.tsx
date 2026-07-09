export default function AboutUs() {
  return (
    <section id="about" className="relative flex flex-col items-center justify-center gap-12 px-6 py-20">
      <div className="relative aspect-video w-full max-w-4xl rounded-2xl bg-[#31055f] shadow-[0_0_48px_12px_rgba(49,5,95,0.4)]" />
      <div className="relative w-full max-w-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 -m-6 sm:-m-8"
          style={{
            background:
              "radial-gradient(60% 90% at 50% 50%, rgba(30,3,57,0.85) 0%, rgba(30,3,57,0.5) 50%, rgba(30,3,57,0) 80%)",
          }}
        />
        <p className="relative z-10 text-center font-mono text-sm leading-relaxed tracking-[0.02em] text-[#c1b2d0] [text-shadow:0px_2px_8px_rgba(30,3,57,0.9)] sm:text-base">
          Workshop... lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam
          in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
          ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
          auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
          maximus ante fermentum sit amet.
        </p>
      </div>
    </section>
  );
}
