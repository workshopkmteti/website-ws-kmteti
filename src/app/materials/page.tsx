import DashboardShell from "@/components/DashboardShell";
import MaterialsView from "@/features/lms/MaterialsView";

export default function MaterialsPage() {
  return (
    <DashboardShell activeHref="/materials">
      <MaterialsView />
    </DashboardShell>
  );
}
