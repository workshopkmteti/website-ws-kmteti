"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { submitRegistrationAction } from "@/actions/registration";
import Mascot from "./Mascot";

export default function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCourses = searchParams.get("courses");
  const selectedCourses = rawCourses
    ? rawCourses
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.size > 1024 * 1024) {
      setError("Ukuran file maksimal 1 MB!");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Hanya boleh upload gambar!");
      return;
    }

    setError(null);
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Silakan upload bukti pembayaran terlebih dahulu.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      const formData = new FormData();
      formData.append("courses", selectedCourses.join(",") || "Workshop KMTETI");
      formData.append("proof", selectedFile);

      const res = await submitRegistrationAction(formData);
      if (!res.ok) {
        setError(res.error ?? "Gagal mengirim bukti pembayaran.");
        return;
      }
      router.push("/dashboard");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="relative mx-auto flex w-full max-w-[420px] flex-col items-center rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-10">
      <div className="pointer-events-none absolute -top-[80px] -left-[250px] z-50 hidden scale-[0.55] sm:block">
        <Mascot pose="happy" tilt={-15} />
      </div>

      <h1 className="relative z-10 mb-4 text-xl font-bold tracking-[0.25em] text-white">
        PAYMENT
      </h1>

      {selectedCourses.length > 0 && (
        <ul className="relative z-10 mb-5 flex w-full flex-col gap-1.5 rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-xs text-[#ebe6f0]">
          {selectedCourses.map((course) => (
            <li key={course} className="truncate font-mono">
              {course}
            </li>
          ))}
        </ul>
      )}

      <div className="relative z-10 mb-8 flex aspect-[4/5.5] w-full items-center justify-center overflow-hidden rounded-xl bg-white p-2">
        <Image
          src="/QRIS.jpeg"
          alt="QRIS Barcode"
          fill
          className="scale-[1] rounded-xl object-cover"
        />
      </div>

      <div className="relative z-10 mb-6 flex w-full flex-col items-center">
        <div className="z-10 w-full rounded-t-xl border border-white/10 bg-gradient-to-b from-[#1c234a] to-[#0c102a] py-3 text-center text-[11px] font-bold tracking-wider text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          UPLOAD THE PROOFING PAYMENT
        </div>

        <input
          type="file"
          accept="image/*"
          aria-label="Upload bukti pembayaran"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className="relative -mt-1 flex h-28 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-b-xl bg-[#e5e7eb] text-[#8e8e8e] transition-colors hover:bg-[#d1d5db]"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Proof preview"
              fill
              className="object-cover"
            />
          ) : (
            <>
              <span className="mb-1 text-3xl">+</span>
              <span className="text-[10px] font-medium uppercase">Upload or drag the proof here</span>
            </>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="relative z-10 mb-4 text-center font-mono text-xs text-red-300">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={pending}
        className="relative z-10 flex h-10 w-[70%] cursor-pointer items-center justify-center rounded-xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] font-mono text-xs font-bold tracking-[0.1em] text-[#ebe6f0] shadow-[0_0_15px_rgba(30,3,57,0.5)] transition-all hover:scale-105 disabled:opacity-60"
      >
        {pending ? "UPLOADING..." : "SUBMIT"}
      </button>
    </section>
  );
}
