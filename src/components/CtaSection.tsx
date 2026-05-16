import Link from "next/link";
import Image from "next/image";

export default function CtaSection() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--color-ws-bg)" }}
      aria-labelledby="cta-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(107,33,168,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <h2
          id="cta-heading"
          className="text-4xl md:text-5xl font-extrabold text-white"
        >
          UPGRADE TO YOUR NEXT LEVEL
        </h2>

        <Link
          href="#programs"
          className="inline-block px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-ws-purple-light)] focus:ring-offset-2 focus:ring-offset-[var(--color-ws-bg)]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-ws-purple) 0%, var(--color-ws-purple-mid) 100%)",
          }}
        >
          Get Started
        </Link>

        <div className="relative w-40 h-40 mt-4">
          <Image
            src="/mascot.png"
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
