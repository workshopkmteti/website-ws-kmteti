import type { ButtonHTMLAttributes } from "react";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// Gradient and shadow sampled from Figma node 268:264 ("Buttons" / SAVE reference).
export default function AuthButton({ className = "", children, ...buttonProps }: AuthButtonProps) {
  return (
    <button
      type="submit"
      className={`relative flex h-13 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#33488d] to-[#1c0f3e] px-8 font-sans text-base font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0px_0px_16px_4px_rgba(1,29,62,0.36)] transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      {...buttonProps}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      <span className="relative">{children}</span>
    </button>
  );
}
