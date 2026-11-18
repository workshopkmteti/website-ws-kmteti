import DashboardShell from "@/components/DashboardShell";
import MaterialsView from "@/features/lms/MaterialsView";
import { getCurrentUserSummary, getMaterialsData } from "@/lib/queries/lms";

export const dynamic = "force-dynamic";

export default async function MaterialsPage() {
  const [user, materials] = await Promise.all([
    getCurrentUserSummary(),
    getMaterialsData(),
  ]);

  return (
    <DashboardShell activeHref="/materials" userName={user.name} userRole={user.role}>
      <MaterialsView initialMaterials={materials} />
    </DashboardShell>
  );
}
