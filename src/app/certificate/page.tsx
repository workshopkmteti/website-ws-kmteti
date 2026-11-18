import DashboardShell from "@/components/DashboardShell";
import CertificateView from "@/features/lms/CertificateView";
import { getCertificateDataForUser, getCurrentUserSummary } from "@/lib/queries/lms";

export const dynamic = "force-dynamic";

export default async function CertificatePage() {
  const [user, cert] = await Promise.all([
    getCurrentUserSummary(),
    getCertificateDataForUser(),
  ]);

  return (
    <DashboardShell activeHref="/certificate" userName={user.name} userRole={user.role}>
      <CertificateView
        registrationId={cert.registrationId}
        programTitle={cert.programTitle}
        initialSubmittedUrl={cert.submittedUrl}
        initialAbsences={cert.absences}
      />
    </DashboardShell>
  );
}
