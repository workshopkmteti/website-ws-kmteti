import { Suspense } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import PaymentForm from "@/components/PaymentForm";

export default function CoursePaymentPage() {
  return (
    <DashboardShell activeHref="/course/register">
      <div className="mx-auto flex w-full max-w-[460px] flex-col gap-4 py-4">
        <Link
          href="/course/register"
          className="font-mono text-xs text-[#9CA3AF] underline underline-offset-4 hover:text-white"
        >
          ← Kembali pilih program
        </Link>
        <Suspense fallback={null}>
          <PaymentForm />
        </Suspense>
      </div>
    </DashboardShell>
  );
}
