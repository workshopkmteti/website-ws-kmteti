"use client";

import { useRef, useState } from "react";

const DIGIT_COUNT = 5;

type OtpInputProps = {
  onComplete?: (code: string) => void;
};

export default function OtpInput({ onComplete }: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const commit = (next: string[]) => {
    setDigits(next);
    if (next.every((d) => d !== "")) onComplete?.(next.join(""));
  };

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    commit(next);
    if (digit && index < DIGIT_COUNT - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < DIGIT_COUNT - 1) inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGIT_COUNT);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(DIGIT_COUNT).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    commit(next);
    inputsRef.current[Math.min(pasted.length, DIGIT_COUNT - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-16 w-13 rounded-2xl border border-[#ebe6f0]/30 bg-[#1e0339]/60 text-center font-mono text-2xl text-[#ebe6f0] outline-none transition-colors focus:border-[#33488d] focus:bg-[#1e0339] focus:shadow-[0_0_0_3px_rgba(51,72,141,0.25)]"
        />
      ))}
    </div>
  );
}
