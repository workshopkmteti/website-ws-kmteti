import BackLink from "./BackLink";
import Background from "./Background";
import Header from "./Header";
import Mascot from "./Mascot";

export const PRIMARY_BUTTON_CLASS =
  "rounded-3xl border-2 border-[#c6c6c6] bg-gradient-to-b from-[#34478d] to-[#1c0e3d] px-8 py-3 text-center font-semibold text-[#e6edf4] shadow-[0_0_16px_4px_rgba(1,29,62,0.36),inset_2px_4px_4px_0_rgba(0,0,0,0.25)] lg:border-4";

export default function AccountShell({
  userName,
  tagline,
  title,
  back,
  children,
}: {
  userName: string;
  tagline: string;
  title: string;
  back: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Header />
      <Mascot
        pose="happy"
        className="pointer-events-none absolute top-[420px] -left-28 hidden w-80 lg:block"
      />

      <main className="relative mx-auto flex w-[min(1641px,92%)] flex-col pt-32 pb-24 sm:pt-40">
        <BackLink href={back.href} label={back.label} />

        <div className="mt-6 flex items-center justify-end gap-4 sm:gap-6">
          <div className="flex flex-col items-end">
            <h1 className="text-2xl font-bold text-white lg:text-[40px]">
              WELCOME <em className="italic">{userName}</em>
            </h1>
            <p className="text-base font-medium text-white lg:text-[32px]">{tagline}</p>
          </div>
          <div
            aria-hidden
            className="size-20 shrink-0 rounded-full bg-[#d9d9d9] lg:size-[210px]"
          />
        </div>

        <section className="mt-10 rounded-[30px] border-2 border-[#c6c6c6] bg-[linear-gradient(142.42deg,rgba(198,198,198,0.6)_3.6%,rgba(94,55,134,0.6)_90.53%)] px-5 py-8 sm:px-10 lg:mt-14 lg:rounded-[60px] lg:border-4 lg:px-14 lg:py-16">
          <h2 className="text-center text-3xl font-semibold text-[#e6edf4] sm:text-4xl lg:text-[61px]">
            {title}
          </h2>
          {children}
        </section>
      </main>
    </div>
  );
}
