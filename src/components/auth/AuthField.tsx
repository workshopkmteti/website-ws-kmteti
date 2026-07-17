import type { InputHTMLAttributes, ReactNode } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
};

export default function AuthField({ label, id, icon, ...inputProps }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-sm tracking-[0.02em] text-[#c1b2d0]">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#7a6a94]">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`h-12 w-full rounded-xl border border-[#ebe6f0]/30 bg-[#1e0339]/60 ${icon ? "pl-11" : "px-4"} pr-4 font-mono text-sm text-[#ebe6f0] outline-none transition-colors placeholder:text-[#c1b2d0]/40 focus:border-[#33488d] focus:bg-[#1e0339] focus:shadow-[0_0_0_3px_rgba(51,72,141,0.25)]`}
          {...inputProps}
        />
      </div>
    </div>
  );
}
