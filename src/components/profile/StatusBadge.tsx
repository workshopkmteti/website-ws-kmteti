interface StatusBadgeProps {
  label: string;
  color: string;
}

export default function StatusBadge({
  label,
  color,
}: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm font-medium text-white">
      <span
        className={`h-2 w-2 rounded-full ${
          color === "emerald"
            ? "bg-emerald-400"
            : "bg-purple-400"
        }`}
      />
      {label}
    </span>
  );
}