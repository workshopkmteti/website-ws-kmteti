"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  loginAction,
  registerAction,
  signInWithGoogleAction,
} from "@/actions/auth";
import AuthButton from "./AuthButton";
import AuthField from "./AuthField";
import GoogleButton from "./GoogleButton";
import { LockIcon, MailIcon, UserIcon } from "./icons";

type AuthSliderProps = {
  initialMode: "login" | "register";
};

export default function AuthSlider({ initialMode }: AuthSliderProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // Sync the address bar without triggering a Next.js route transition, which
  // would remount this component mid-animation and cut the slide short.
  const switchTo = (next: "login" | "register") => {
    setMode(next);
    setLoginError(null);
    setRegisterError(null);
    window.history.replaceState(null, "", `/auth/${next}`);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null);
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await loginAction(formData);
      if (!res.ok) {
        setLoginError(res.error ?? "Gagal masuk.");
        return;
      }
      router.push("/dashboard");
    } finally {
      setPending(false);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterError(null);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setRegisterError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    setPending(true);
    try {
      const res = await registerAction(formData);
      if (!res.ok) {
        setRegisterError(res.error ?? "Gagal mendaftar.");
        return;
      }
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    } finally {
      setPending(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoginError(null);
    const res = await signInWithGoogleAction(window.location.origin);
    if (!res.ok || !res.data?.url) {
      setLoginError(res.error ?? "Gagal memulai login Google.");
      return;
    }
    window.location.assign(res.data.url);
  };

  const registerActive = mode === "register";

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-[#5e3786]/40 bg-gradient-to-b from-[#360568] via-[#2a0451] to-[#1e0339] shadow-[0_0_70px_16px_rgba(94,55,134,0.25)]">
      <div className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(235,230,240,0.12)]" />

      {/* Mobile: single form, toggled directly (no slide) */}
      <div className="p-8 sm:hidden">
        {registerActive ? (
          <RegisterForm
            onSwitch={() => switchTo("login")}
            onSubmit={handleRegister}
            error={registerError}
            pending={pending}
          />
        ) : (
          <LoginForm
            onSwitch={() => switchTo("register")}
            onSubmit={handleLogin}
            onGoogleClick={handleGoogleAuth}
            error={loginError}
            pending={pending}
          />
        )}
      </div>

      {/* Desktop: sliding dual-panel -- mirrors auth-reference's translateX mechanism:
          both form panels sit at left:0 and slide via transform, independent of the
          overlay, which also slides via transform inside its own clipped window. */}
      <div className="relative hidden min-h-165 sm:block">
        <div
          className={`absolute inset-y-0 left-0 z-10 flex w-1/2 flex-col justify-center overflow-y-auto px-10 py-10 transition-[transform,opacity] duration-600 ease-in-out lg:px-14 ${
            registerActive ? "pointer-events-none" : ""
          }`}
          style={registerActive ? { transform: "translateX(100%)", opacity: 0 } : undefined}
        >
          <LoginForm
            onSwitch={() => switchTo("register")}
            onSubmit={handleLogin}
            onGoogleClick={handleGoogleAuth}
            error={loginError}
            pending={pending}
          />
        </div>
        <div
          className={`absolute inset-y-0 left-0 z-10 flex w-1/2 flex-col justify-center overflow-y-auto px-10 py-10 opacity-0 transition-[transform,opacity] duration-600 ease-in-out lg:px-14 ${
            registerActive ? "" : "pointer-events-none"
          }`}
          style={
            registerActive
              ? { transform: "translateX(100%)", opacity: 1, zIndex: 5 }
              : { transform: "translateX(0%)", opacity: 0 }
          }
        >
          <RegisterForm
            onSwitch={() => switchTo("login")}
            onSubmit={handleRegister}
            error={registerError}
            pending={pending}
          />
        </div>

        {/* Sliding overlay window, clipped to the inactive half.
            pointer-events-none on the window lets clicks reach the form beneath;
            re-enabled on the inner gradient so its own buttons stay clickable. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-1/2 overflow-hidden transition-transform duration-600 ease-in-out"
          style={registerActive ? { transform: "translateX(-100%)" } : undefined}
        >
          <div
            className="pointer-events-auto relative h-full w-[200%] bg-gradient-to-br from-[#33488d] to-[#1c0f3e] transition-transform duration-600 ease-in-out"
            style={{ left: "-100%", transform: registerActive ? "translateX(50%)" : "translateX(0%)" }}
          >
            {/* Left half: shown when login is active */}
            <div
              className="absolute inset-y-0 left-0 flex w-1/2 flex-col items-center justify-center gap-4 px-10 text-center transition-transform duration-600 ease-in-out"
              style={{ transform: registerActive ? "translateX(0%)" : "translateX(-20%)" }}
            >
              <h2 className="font-sans text-2xl font-bold text-[#ebe6f0] lg:text-3xl">Halo, Sobat Workshop!</h2>
              <p className="max-w-xs font-mono text-sm leading-relaxed text-[#c1b2d0]">
                Sudah punya akun? Masuk untuk melanjutkan perjalanan belajar Anda.
              </p>
              <button
                type="button"
                onClick={() => switchTo("login")}
                className="mt-2 flex h-11 items-center justify-center rounded-full border-[1.2px] border-[#ebe6f0] px-8 font-mono text-xs tracking-[0.15em] text-[#ebe6f0] uppercase transition-all hover:scale-105 hover:bg-[#ebe6f0]/10"
              >
                Masuk
              </button>
            </div>

            {/* Right half: shown when register is active */}
            <div
              className="absolute inset-y-0 right-0 flex w-1/2 flex-col items-center justify-center gap-4 px-10 text-center transition-transform duration-600 ease-in-out"
              style={{ transform: registerActive ? "translateX(20%)" : "translateX(0%)" }}
            >
              <h2 className="font-sans text-2xl font-bold text-[#ebe6f0] lg:text-3xl">Selamat Datang Kembali!</h2>
              <p className="max-w-xs font-mono text-sm leading-relaxed text-[#c1b2d0]">
                Belum punya akun? Daftar dan mulai perjalanan belajar bersama Workshop KMTETI.
              </p>
              <button
                type="button"
                onClick={() => switchTo("register")}
                className="mt-2 flex h-11 items-center justify-center rounded-full border-[1.2px] border-[#ebe6f0] px-8 font-mono text-xs tracking-[0.15em] text-[#ebe6f0] uppercase transition-all hover:scale-105 hover:bg-[#ebe6f0]/10"
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({
  onSwitch,
  onSubmit,
  onGoogleClick,
  error,
  pending,
}: {
  onSwitch: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onGoogleClick: () => void;
  error: string | null;
  pending: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <h1 className="mb-1 text-center font-sans text-2xl font-bold text-[#ebe6f0] sm:text-3xl">Masuk</h1>
      <AuthField
        id="login-email"
        name="email"
        label="Email"
        type="email"
        placeholder="nama@email.com"
        autoComplete="email"
        icon={<MailIcon />}
        required
      />
      <AuthField
        id="login-password"
        name="password"
        label="Password"
        type="password"
        placeholder="Masukkan password Anda"
        autoComplete="current-password"
        icon={<LockIcon />}
        required
      />
      {error && (
        <p role="alert" className="font-mono text-xs text-rose-300">
          {error}
        </p>
      )}
      <AuthButton className="mt-1 w-full" disabled={pending}>
        {pending ? "Memproses..." : "Masuk"}
      </AuthButton>
      <Divider />
      <GoogleButton onClick={onGoogleClick} />
      <p className="text-center font-mono text-xs tracking-[0.02em] text-[#c1b2d0]">
        Belum punya akun?{" "}
        <button type="button" onClick={onSwitch} className="text-[#ebe6f0] underline underline-offset-4">
          Daftar
        </button>
      </p>
    </form>
  );
}

function RegisterForm({
  onSwitch,
  onSubmit,
  error,
  pending,
}: {
  onSwitch: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string | null;
  pending: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-3.5">
      <h1 className="mb-1 text-center font-sans text-2xl font-bold text-[#ebe6f0] sm:text-3xl">Buat Akun</h1>
      <AuthField
        id="register-username"
        name="username"
        label="Username"
        type="text"
        placeholder="Pilih username Anda"
        autoComplete="username"
        icon={<UserIcon />}
        required
      />
      <AuthField
        id="register-email"
        name="email"
        label="Email"
        type="email"
        placeholder="nama@email.com"
        autoComplete="email"
        icon={<MailIcon />}
        required
      />
      <AuthField
        id="register-password"
        name="password"
        label="Password"
        type="password"
        placeholder="Buat password Anda"
        autoComplete="new-password"
        icon={<LockIcon />}
        required
      />
      <AuthField
        id="register-confirm-password"
        name="confirmPassword"
        label="Konfirmasi Password"
        type="password"
        placeholder="Ulangi password Anda"
        autoComplete="new-password"
        icon={<LockIcon />}
        required
      />
      {error && (
        <p role="alert" className="font-mono text-xs text-rose-300">
          {error}
        </p>
      )}
      <AuthButton className="mt-1 w-full" disabled={pending}>
        {pending ? "Memproses..." : "Daftar"}
      </AuthButton>
      <p className="text-center font-mono text-xs tracking-[0.02em] text-[#c1b2d0]">
        Sudah punya akun?{" "}
        <button type="button" onClick={onSwitch} className="text-[#ebe6f0] underline underline-offset-4">
          Masuk
        </button>
      </p>
    </form>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 text-[#c1b2d0]/50">
      <span className="h-px flex-1 bg-[#ebe6f0]/15" />
      <span className="font-mono text-[10px] tracking-[0.2em]">ATAU</span>
      <span className="h-px flex-1 bg-[#ebe6f0]/15" />
    </div>
  );
}
