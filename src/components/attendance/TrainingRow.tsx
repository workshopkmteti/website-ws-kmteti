import AttendanceDot from "./AttendanceDot";

import type { Training } from "@/types/attendance";

type TrainingRowProps = {
  training: Training;
  index: number;
};

export default function TrainingRow({
  training,
  index,
}: TrainingRowProps) {
  const present = training.attendance.filter(
    (item) => item === "present"
  ).length;

  const absent = training.attendance.filter(
    (item) => item === "absent"
  ).length;

  const total = training.attendance.length;

  const percentage = Math.round((present / total) * 100);

  const percentageColor =
    absent <= 2 ? "text-[#74F2AE]" : "text-[#FF7B8E]";

  return (
    <div className="flex min-h-28 items-center gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/3">
      <div className="w-6 shrink-0 text-base font-bold text-white">
        {index + 1}.
      </div>

      <div className="w-[200px] shrink-0">
        <p className="text-[22px] font-bold leading-tight text-white">
          {training.title}
        </p>

        <p className="text-[15px] font-medium text-[#A58BC9]">
          {training.period}
        </p>
      </div>

      <div className="flex w-[190px] shrink-0 flex-col items-center text-center">
        <p className="text-[22px] font-bold text-white">
          {training.day}
        </p>

        <p className="text-[15px] font-medium text-[#A58BC9]">
          {training.date}
        </p>
      </div>

      <div className="flex w-[430px] justify-between">
        {[1, 2, 3, 4, 5, 6, 7].map((number, i) => (
          <div
            key={number}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[13px] font-medium text-white/35">
              {number}
            </span>

            <AttendanceDot
              status={training.attendance[i]}
            />
          </div>
        ))}
      </div>

      <div className="ml-2 flex w-[110px] flex-col items-center">
        <span
          className={`text-[34px] font-bold leading-none ${percentageColor}`}
        >
          {percentage}%
        </span>

        <span className="text-center text-[14px] text-white/80">
          {present} dari {total}
        </span>
      </div>

    <div className="ml-3">
      <button
        className="
          h-[42px]
          w-[110px]
          rounded-lg
          border
          border-[#8FA7D8]
          text-[15px]
          font-semibold
          text-white
          transition
          hover:-translate-y-[1px]
          hover:brightness-110
        "
        style={{
          background:
            "linear-gradient(180deg,#354A8F 0%,#17022C 100%)",
          boxShadow:
            "inset 0 1px rgba(255,255,255,.15), inset 0 -1px rgba(0,0,0,.25)",
        }}
      >
        Presensi
      </button>
    </div>
    </div>
  );
}