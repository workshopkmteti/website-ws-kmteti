import DashboardShell from "@/components/DashboardShell";
import AdminDashboardView from "@/features/admin/AdminDashboardView";
import { getAdminParticipantsData, getCurrentUserSummary } from "@/lib/queries/lms";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [user, participants] = await Promise.all([
    getCurrentUserSummary(),
    getAdminParticipantsData(),
  ]);

  return (
    <DashboardShell activeHref="/admin" userName={user.name} userRole={user.role}>
      <AdminDashboardView initialParticipants={participants} />
    </DashboardShell>
  );
}
