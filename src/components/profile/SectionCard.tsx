import { ReactNode } from "react";

interface SectionCardProps {
    title: string;
    children: ReactNode;
}

export default function SectionCard({
    title,
    children,
}: SectionCardProps) {
    return (
        <section
            className="
        rounded-xl
        border border-[#4A2A73]
        bg-gradient-to-b
        from-[#220B3D]
        via-[#261046]
        to-[#2B154D]
        p-5
        shadow-[0_8px_24px_rgba(0,0,0,0.35)]
      "
        >
            <h2 className="mb-5 text-lg font-semibold text-[#C084FC]">
                {title}
            </h2>

            <div className="space-y-4">
                {children}
            </div>
        </section>
    );
}