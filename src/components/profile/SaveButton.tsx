interface SaveButtonProps {
    onClick?: () => void;
}

export default function SaveButton({
    onClick,
}: SaveButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        rounded-[6px]
        border border-[#4556A8]/30
        bg-gradient-to-b
       from-[#3E4F9F]
via-[#29397A]
to-[#18224F]
        px-12
        py-2
        text-lg
        font-bold
        tracking-wide
        text-white
        shadow-[0_4px_12px_rgba(20,30,70,0.45)]
        transition-all
        duration-200
        hover:brightness-110
        active:scale-95
      "
        >
            SAVE
        </button>
    );
}