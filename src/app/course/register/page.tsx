import DashboardShell from "@/components/DashboardShell";
import RegisterForm from "@/components/RegisterForm";

export default function CourseRegisterPage() {
  return (
    <DashboardShell activeHref="/course/register">
      <div className="relative z-10 flex w-full justify-center py-4">
        <RegisterForm />
      </div>
    </DashboardShell>
  );
}
