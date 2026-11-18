import DashboardShell from "@/components/DashboardShell";
import RegisterForm from "@/components/RegisterForm";
import { getCurrentUserSummary, getOpenProgramsData } from "@/lib/queries/lms";

export const dynamic = "force-dynamic";

export default async function CourseRegisterPage() {
  const [user, courses] = await Promise.all([
    getCurrentUserSummary(),
    getOpenProgramsData(),
  ]);

  return (
    <DashboardShell activeHref="/course/register" userName={user.name} userRole={user.role}>
      <div className="relative z-10 flex w-full justify-center py-4">
        <RegisterForm initialCourses={courses} />
      </div>
    </DashboardShell>
  );
}
