import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-14"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107,33,168,0.35) 0%, transparent 70%), var(--color-ws-bg)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--color-ws-purple)" }}
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-ws-text-muted)]">
            Tumbuh Bersama
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white">
            Workshop
            <br />
            KMTETI
          </h1>
          <p className="text-base text-[var(--color-ws-text-muted)] max-w-md leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna.
          </p>
          <div>
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
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-72 h-72">
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-2xl"
              style={{ background: "var(--color-ws-purple-mid)" }}
              aria-hidden="true"
            />
            <Image
              src="/mascot.png"
              alt="Workshop KMTETI mascot"
              fill
              className="object-contain relative z-10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
