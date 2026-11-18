"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resendOtpAction, verifyOtpAction } from "@/actions/auth";
import Background from "@/components/Background";
import LogoUpright from "@/components/LogoUpright";
import AuthCard from "@/components/auth/AuthCard";
import AuthButton from "@/components/auth/AuthButton";
import OtpInput from "@/components/auth/OtpInput";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setPending(true);
    try {
      const res = await verifyOtpAction(email, otp);
      if (!res.ok) {
        setError(res.error ?? "Kode OTP tidak valid.");
        return;
      }
      router.push("/course/register");
    } finally {
      setPending(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    const res = await resendOtpAction(email);
    if (!res.ok) {
      setError(res.error ?? "Gagal mengirim ulang kode.");
      return;
    }
    setInfo("Kode verifikasi baru telah dikirim ke email Anda.");
  };

  return (
    <AuthCard eyebrow="Verifikasi" title="Kode Verifikasi">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <p className="text-center font-mono text-sm tracking-[0.02em] text-[#c1b2d0]">
          Masukkan kode yang dikirim ke {email || "email Anda"}
        </p>
        <OtpInput onChange={setOtp} />
        {error && (
          <p role="alert" className="text-center font-mono text-xs text-rose-300">
            {error}
          </p>
        )}
        {info && (
          <p className="text-center font-mono text-xs text-[#37CD85]">{info}</p>
        )}
        <AuthButton className="mx-auto w-full max-w-56" disabled={pending}>
          {pending ? "Memverifikasi..." : "Verifikasi"}
        </AuthButton>
        <p className="text-center font-mono text-xs tracking-[0.02em] text-[#c1b2d0]">
          Tidak menerima kode?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-[#ebe6f0] underline underline-offset-4 hover:text-[#7d94dd]"
          >
            Kirim ulang
          </button>
        </p>
      </form>
    </AuthCard>
  );
}

export default function VerifyPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Background />
      <Link href="/" className="absolute top-6 left-6 h-9 w-22 sm:top-8 sm:left-8 sm:h-11 sm:w-28">
        <LogoUpright className="h-full w-full" />
      </Link>
      <Suspense fallback={null}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
