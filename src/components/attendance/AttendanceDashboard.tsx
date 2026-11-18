import AttendanceHeader from "./AttendanceHeader";
import AttendanceCard from "./AttendanceCard";
import TrainingRow from "./TrainingRow";

import { trainings } from "@/data/trainings";

export default function AttendanceDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1250px] flex-col gap-6">
      <AttendanceHeader />

      <AttendanceCard />

      <div
        className="overflow-auto rounded-[22px] border border-white/10"
        style={{
          background:
            "linear-gradient(180deg,#2A094E 0%,#18022E 100%)",
          boxShadow:
            "0 12px 35px rgba(0,0,0,.25), inset 0 1px rgba(255,255,255,.05)",
        }}
      >
        <div className="min-w-[1150px]"></div>
        {trainings.map((training, index) => (
          <TrainingRow
            key={training.id}
            training={training}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}