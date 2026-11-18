import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import Background from "@/components/Background";
import LogoUpright from "@/components/LogoUpright";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden p-6 font-sans text-white">
      <Background />

      <header className="absolute top-6 z-20 flex w-full max-w-5xl items-start justify-between px-6 sm:px-8">
        <Link href="/" className="mt-2 w-28 sm:w-36" aria-label="Kembali ke beranda">
          <LogoUpright className="h-auto w-full" />
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold tracking-wide uppercase">Welcome John Doe!</p>
            <Link href="/dashboard" className="text-[11px] text-gray-300 underline underline-offset-4 hover:text-white">
              Ke Dashboard
            </Link>
          </div>
          <div className="h-12 w-12 rounded-full bg-[#3f3f3f]" />
        </div>
      </header>

      <div className="relative z-10 mt-20 flex w-full justify-center">
        <RegisterForm />
      </div>
    </main>
  );
}
