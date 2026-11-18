import DashboardShell from "@/components/DashboardShell";
import CertificateView from "@/features/lms/CertificateView";

export default function CertificatePage() {
  return (
    <DashboardShell activeHref="/certificate">
      <CertificateView />
    </DashboardShell>
  );
}
