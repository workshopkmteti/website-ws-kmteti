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
    <section className="relative mx-auto flex w-full max-w-[680px] flex-col items-center rounded-[32px] border-[2.5px] border-[#c6c6c6] bg-[linear-gradient(142deg,rgba(198,198,198,0.6)_3.6%,rgba(94,55,134,0.6)_90.5%)] px-4 py-8 shadow-[0_20px_60px_rgba(12,4,28,0.55)] backdrop-blur-md sm:rounded-[40px] sm:px-10 sm:py-10">
      <div className="pointer-events-none absolute -top-14 -left-16 z-30 hidden scale-[0.52] sm:block">
        <Mascot pose="happy" tilt={-15} />
      </div>

      <h1 className="relative z-10 mb-5 text-center font-[family-name:var(--font-montserrat)] text-2xl font-semibold tracking-wider text-[#e6edf4] sm:text-[36px]">
        PAYMENT
      </h1>

      {selectedCourses.length > 0 && (
        <ul className="relative z-10 mb-5 flex w-full max-w-[380px] flex-col gap-1 rounded-[14px] border border-[#c6c6c6]/40 bg-[#12062b]/45 px-4 py-2.5 text-xs text-[#e6edf4]">
          {selectedCourses.map((course) => (
            <li key={course} className="truncate font-mono">
              {course}
            </li>
          ))}
        </ul>
      )}

      <div className="relative z-10 mb-6 flex aspect-square w-full max-w-[380px] items-center justify-center overflow-hidden rounded-[16px] bg-[#d9d9d9] p-3 shadow-md">
        <Image
          src="/QRIS.jpeg"
          alt="QRIS Barcode"
          fill
          className="rounded-[12px] object-contain p-2"
        />
      </div>

      <div className="relative z-10 mb-6 flex w-full max-w-[380px] flex-col items-center overflow-hidden rounded-[16px] bg-[#d9d9d9] pb-3 shadow-md">
        <div className="z-10 w-full rounded-[16px] border-[2.5px] border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-4 py-2.5 text-center font-[family-name:var(--font-montserrat)] text-xs font-semibold tracking-wide text-[#e6edf4] shadow-[0_0_16px_4px_rgba(1,29,62,0.36),inset_2px_4px_4px_rgba(0,0,0,0.25)] sm:text-sm">
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
          className="relative mx-3 mt-2.5 flex h-28 w-[calc(100%-24px)] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[14px] border border-[#c3c3c3] bg-[#d9d9d9] text-[#011d3e]/40 transition-colors hover:bg-[#cfcfcf]"
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
              <span className="text-4xl leading-none font-normal">+</span>
              <span className="mt-1 font-[family-name:var(--font-montserrat)] text-xs">
                Upload or drag the proof here
              </span>
            </>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="relative z-10 mb-4 text-center font-mono text-xs text-red-200">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={pending}
        className="relative z-10 flex h-12 min-w-[200px] cursor-pointer items-center justify-center rounded-[16px] border-[2.5px] border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-8 font-[family-name:var(--font-montserrat)] text-lg font-semibold tracking-wider text-[#e6edf4] shadow-[0_0_16px_4px_rgba(1,29,62,0.36),inset_2px_4px_4px_rgba(0,0,0,0.25)] transition-all hover:scale-[1.02] hover:brightness-110 disabled:opacity-60 sm:min-w-[240px] sm:text-[24px]"
      >
        {pending ? "UPLOADING..." : "SUBMIT"}
      </button>
    </section>
  );
}
