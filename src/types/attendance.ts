export type AttendanceStatus = "present" | "absent" | null;

export type Training = {
  id: number;
  title: string;
  period: string;
  day: string;
  date: string;
  attendance: AttendanceStatus[];
};