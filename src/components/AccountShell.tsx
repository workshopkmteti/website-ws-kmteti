import BackLink from "./BackLink";
import DashboardShell from "./DashboardShell";
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
    <DashboardShell activeHref="/competition">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col pb-12">
        <Mascot
          pose="happy"
          className="pointer-events-none absolute top-[220px] -left-20 hidden w-64 lg:block"
        />

        <BackLink href={back.href} label={back.label} />

        <div className="mt-4 flex items-center justify-end gap-4 sm:gap-6">
          <div className="flex flex-col items-end">
            <h1 className="text-xl font-bold text-white lg:text-3xl">
              WELCOME <em className="italic">{userName}</em>
            </h1>
            <p className="text-sm font-medium text-[#9CA3AF] lg:text-base">{tagline}</p>
          </div>
          <div
            aria-hidden
            className="size-16 shrink-0 rounded-full bg-[#110F2E] border border-white/10 lg:size-20"
          />
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#110F2E] px-5 py-8 sm:px-10 lg:mt-10 lg:px-12 lg:py-12">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          {children}
        </section>
      </div>
    </DashboardShell>
  );
}
