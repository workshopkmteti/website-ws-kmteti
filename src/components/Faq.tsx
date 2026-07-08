"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.",
  },
  { q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", a: "" },
  { q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", a: "" },
  { q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", a: "" },
  { q: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", a: "" },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="flex flex-col items-center gap-10 px-6 py-24 sm:px-16 lg:px-32">
      <h2 className="font-sans text-5xl font-semibold text-[#ebe6f0] sm:text-7xl">FAQ</h2>
      <div className="flex w-full max-w-5xl flex-col gap-8 rounded-[32px] border border-[#ebe6f0] bg-[#360568]/50 px-6 py-10 sm:px-14">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="overflow-hidden rounded-[32px]">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between bg-gradient-to-l from-[#171046] to-[#26044a] px-6 py-6 text-left sm:px-10"
                aria-expanded={isOpen}
              >
                <span className="font-mono text-lg tracking-[0.02em] text-white sm:text-2xl">
                  {item.q}
                </span>
                <span
                  className={`ml-4 shrink-0 text-2xl text-white transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && item.a && (
                <div className="bg-gradient-to-br from-[#78589a] to-[#a38cba] px-6 py-6 sm:px-10">
                  <p className="font-mono text-lg tracking-[0.02em] text-[#0e0d0d] sm:text-2xl">
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
