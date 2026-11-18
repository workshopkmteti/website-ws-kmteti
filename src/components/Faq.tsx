"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Siapa saja yang boleh mendaftar pelatihan Workshop KMTETI?",
    a: "Pelatihan terbuka untuk mahasiswa DTETI (Teknik Elektro dan Teknologi Informasi) serta mahasiswa UGM umum untuk program pelatihan terbuka.",
  },
  {
    q: "Bagaimana aturan commitment fee dan pengembaliannya?",
    a: "Peserta mengunggah bukti commitment fee (maks 1 MB) saat mendaftar. Commitment fee dikembalikan 100% di akhir pelatihan jika peserta memenuhi syarat kehadiran dan mengumpulkan final project.",
  },
  {
    q: "Apa syarat untuk mendapatkan sertifikat kelulusan?",
    a: "Peserta wajib mengumpulkan final project dan memiliki jumlah ketidakhadiran maksimal 2 dari 6 sesi pelatihan.",
  },
  {
    q: "Di mana materi pelatihan dan link Google Meet dibagikan?",
    a: "Setelah login dan terkonfirmasi, peserta dapat mengakses materi dan tautan Google Meet langsung melalui menu Materi di dashboard.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="flex flex-col items-center gap-8 px-6 py-20 sm:px-16 lg:px-32">
      <h2 className="font-sans text-3xl font-semibold text-[#ebe6f0] sm:text-5xl">FAQ</h2>
      <div className="flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-[#ebe6f0] bg-[#360568]/50 px-6 py-8 sm:px-10">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="overflow-hidden rounded-xl">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between bg-gradient-to-l from-[#171046] to-[#26044a] px-5 py-4 text-left sm:px-8"
                aria-expanded={isOpen}
              >
                <span className="font-mono text-sm tracking-[0.02em] text-white sm:text-base">
                  {item.q}
                </span>
                <span
                  className={`ml-4 shrink-0 text-xl text-white transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && item.a && (
                <div className="bg-gradient-to-br from-[#78589a] to-[#a38cba] px-5 py-5 sm:px-8">
                  <p className="font-mono text-sm tracking-[0.02em] text-[#0e0d0d] sm:text-base">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
