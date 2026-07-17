"use client";

import Link from "next/link";
import Background from "@/components/Background";
import LogoUpright from "@/components/LogoUpright";
import AuthCard from "@/components/auth/AuthCard";
import AuthButton from "@/components/auth/AuthButton";
import OtpInput from "@/components/auth/OtpInput";

export default function VerifyPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Background />
      <Link href="/" className="absolute top-6 left-6 h-9 w-22 sm:top-8 sm:left-8 sm:h-11 sm:w-28">
        <LogoUpright className="h-full w-full" />
      </Link>
      <AuthCard eyebrow="Verifikasi" title="Kode Verifikasi">
        <div className="flex flex-col gap-7">
          <p className="text-center font-mono text-sm tracking-[0.02em] text-[#c1b2d0]">
            Masukkan kode yang dikirim ke email Anda
          </p>
          <OtpInput />
          <AuthButton className="mx-auto w-full max-w-56">Verifikasi</AuthButton>
          <p className="text-center font-mono text-xs tracking-[0.02em] text-[#c1b2d0]">
            Tidak menerima kode?{" "}
            <button type="button" className="text-[#ebe6f0] underline underline-offset-4 hover:text-[#7d94dd]">
              Kirim ulang
            </button>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
