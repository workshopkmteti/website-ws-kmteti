import Link from "next/link";
import type { Metadata } from "next";
import Background from "@/components/Background";
import LogoUpright from "@/components/LogoUpright";
import AuthSlider from "@/components/auth/AuthSlider";

export const metadata: Metadata = {
  title: "Masuk — Workshop KMTETI",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Background />
      <Link href="/" className="absolute top-6 left-6 h-9 w-22 sm:top-8 sm:left-8 sm:h-11 sm:w-28">
        <LogoUpright className="h-full w-full" />
      </Link>
      <AuthSlider initialMode="login" />
    </div>
  );
}
