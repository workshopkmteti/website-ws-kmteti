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
          Workshop KMTETI menghadirkan program pelatihan terstruktur mulai dari pengolahan citra,
          simulasi rangkaian, sistem tertanam, hingga pengembangan perangkat lunak bagi mahasiswa
          UGM untuk siap menghadapi riset, kompetisi, dan dunia industri.
        </p>
      </div>
    </section>
  );
}
