import AttendanceDashboard from "@/components/attendance/AttendanceDashboard";

export default function AttendancePage() {
  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 90% 0%, rgba(92,55,255,0.45) 0%, transparent 35%),
          radial-gradient(circle at 50% 100%, rgba(115,34,255,0.15) 0%, transparent 45%),
          linear-gradient(135deg, #160022 0%, #22003B 45%, #34108A 100%)
        `,
      }}
    >
      <AttendanceDashboard />
    </main>
  );
}