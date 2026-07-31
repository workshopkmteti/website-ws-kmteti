interface PasswordButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export default function PasswordButton({
    children,
    onClick,
}: PasswordButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        rounded-md
        border
        border-[#4F5BC4]/40
        bg-gradient-to-b
       from-[#3A4A9A]
via-[#2B3878]
to-[#1D2854]
        px-4
        py-1.5
        text-xs
        font-semibold
        tracking-wide
        text-white
        shadow-[0_4px_10px_rgba(25,35,90,0.45)]
        transition-all
        duration-200
        hover:brightness-110
        active:scale-95
      "
        >
            {children}
        </button>
    );
}