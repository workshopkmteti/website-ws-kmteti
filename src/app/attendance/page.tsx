import DashboardShell from "@/components/DashboardShell";
import AttendanceDashboard from "@/components/attendance/AttendanceDashboard";

export default function AttendancePage() {
  return (
    <DashboardShell activeHref="/attendance">
      <AttendanceDashboard />
    </DashboardShell>
  );
}
