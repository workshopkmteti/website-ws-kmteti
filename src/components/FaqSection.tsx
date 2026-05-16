"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/training";

const faqs: FaqItem[] = [
  {
    id: "1",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.",
  },
  {
    id: "2",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
  },
  {
    id: "3",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
  },
  {
    id: "4",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
  },
  {
    id: "5",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
  },
];

function FaqItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[var(--color-ws-purple-border)] last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-white hover:text-[var(--color-ws-purple-light)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-ws-purple-light)] rounded-lg px-1"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{item.question}</span>
        <span
          className="shrink-0 ml-4 text-[var(--color-ws-purple-light)] transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="pb-4 px-1">
          <p className="text-sm text-[var(--color-ws-text-muted)] leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section
      className="py-24"
      style={{ background: "var(--color-ws-bg-section)" }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2
          id="faq-heading"
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        >
          FAQ
        </h2>

        <div
          className="rounded-2xl border border-[var(--color-ws-purple-border)] px-6 py-2"
          style={{ background: "var(--color-ws-bg-card)" }}
        >
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
