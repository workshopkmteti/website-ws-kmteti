import Image from "next/image";

import type { AttendanceStatus } from "@/types/attendance";

type AttendanceDotProps = {
  status: AttendanceStatus;
};

export default function AttendanceDot({
  status,
}: AttendanceDotProps) {
  const img =
    status === "present"
      ? "/Type-Checked.svg"
      : status === "absent"
      ? "/Type-Crossed.svg"
      : "/Type-Unchecked.svg";

  return (
   <img
  src={img}
  alt="Attendance Status"
  className="h-[46px] w-[46px]"
/>
  );
}