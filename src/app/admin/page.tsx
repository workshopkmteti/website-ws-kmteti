import DashboardShell from "@/components/DashboardShell";
import AdminDashboardView from "@/features/admin/AdminDashboardView";

export default function AdminPage() {
  return (
    <DashboardShell activeHref="/admin" userName="Admin KMTETI" userRole="Admin">
      <AdminDashboardView />
    </DashboardShell>
  );
}
