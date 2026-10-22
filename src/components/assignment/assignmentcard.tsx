
import type { Assignment, AssignmentStatus } from "@/data/assignment";

type AssignmentCardProps = {
  assignment: Assignment;
  onClick?: (assignment: Assignment) => void;
};

const statusStyles: Record<AssignmentStatus, string> = {
  "Not Started": "border-[#C6C6C6] bg-[#17022C]/70",
  "In Progress": "border-[#A98242] bg-[#42334B]/80",
  Submitted: "border-[#528F78] bg-[#24374A]/80",
};

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5 shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        d="M12 7v5l3.5 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        d="m9 6 6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AssignmentCard({
  assignment,
  onClick,
}: AssignmentCardProps) {
  return (
    <article
      className="relative flex min-h-[124px] w-full items-center justify-between gap-5 rounded-[35px] border-2 px-5 py-3 text-white sm:min-h-[124px] sm:px-[43px] sm:py-3"
      style={{
        background:
          "linear-gradient(110deg, #17022C 0%, #2A3559 100%) padding-box, linear-gradient(110deg, #C6C6C6 0%, #5E3786 100%) border-box",
      }}
    >
      {/* Assignment information */}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[28px] font-bold leading-[1.2] tracking-normal sm:text-[40px]">
          {assignment.title}
        </h2>

        <p className="mt-1 text-[18px] font-normal leading-[1.2] tracking-normal sm:text-[25px]">
          Course: {assignment.course}
        </p>

        <div className="mt-1 flex items-center gap-[5px] text-[16px] font-normal leading-[1.2] tracking-normal sm:text-[22px]">
          <ClockIcon />
          <p className="min-w-0">{`Due: ${assignment.dueDate}`}</p>
        </div>
      </div>

      {/* Status and detail button */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span
          className={`flex min-h-[42px] min-w-[130px] items-center justify-center rounded-[18px] border px-4 py-1.5 text-sm font-semibold sm:min-h-[44px] sm:min-w-[207px] sm:text-[20px] ${statusStyles[assignment.status]}`}
        >
          {assignment.status}
        </span>

        <button
          type="button"
          aria-label={`View details for ${assignment.title}`}
          onClick={() => onClick?.(assignment)}
          className="flex h-[32px] w-[64px] items-center justify-center rounded-full border border-[#C6C6C6]/80 bg-[#17022C]/50 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 sm:h-[36px] sm:w-[96px]"
        >
          <ArrowIcon />
        </button>
      </div>
    </article>
  );
}
