type AuthCardProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export default function AuthCard({ eyebrow, title, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#c1b2d0] uppercase">{eyebrow}</p>
      <div className="relative overflow-hidden rounded-3xl border border-[#5e3786]/40 bg-gradient-to-b from-[#360568] via-[#2a0451] to-[#1e0339] px-7 py-9 shadow-[0_0_60px_12px_rgba(94,55,134,0.25)] sm:px-10 sm:py-11">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(235,230,240,0.12)]" />
        <div className="relative flex flex-col gap-7">
          <h1 className="text-center font-sans text-2xl font-bold text-[#ebe6f0] sm:text-3xl">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
