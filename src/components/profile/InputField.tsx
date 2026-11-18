import { ChangeEvent, ReactNode } from "react";

interface InputFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    rightSlot?: ReactNode;
}

export default function InputField({
    label,
    type = "text",
    value,
    onChange,
    rightSlot,
}: InputFieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
                {label}
            </label>

            <div
                className={`flex ${rightSlot ? "flex-col gap-3 md:flex-row md:items-center" : ""
                    }`}
            >
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-lg border border-[#5E3C87] bg-[#4A3566]/70 px-4 py-2 text-sm text-white outline-none transition focus:border-[#A855F7]"
                />
                {rightSlot && (
                    <div className="flex flex-wrap gap-2">
                        {rightSlot}
                    </div>
                )}
            </div>
        </div>
    );
}