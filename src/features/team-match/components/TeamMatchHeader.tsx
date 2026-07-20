import Link from "next/link";
import LogoUpright from "@/components/LogoUpright";

export default function TeamMatchHeader() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(1400px,94%)] -translate-x-1/2 sm:top-6">
      <div className="relative overflow-hidden rounded-2xl bg-[rgba(163,140,186,0.25)] shadow-[0_0_8px_4px_rgba(38,4,74,0.25)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_4px_1px_rgba(163,155,215,0.25)]" />

        <div className="relative flex items-center justify-start px-5 py-2.5 sm:px-8">
          <Link href="/" className="relative h-9 w-22 shrink-0 sm:h-11 sm:w-28">
            <LogoUpright className="h-full w-full" />
          </Link>
        </div>
      </div>
    </header>
  );
}
