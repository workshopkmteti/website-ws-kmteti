import { redirect } from "next/navigation";

export default function LegacyPaymentRedirectPage() {
  redirect("/payment");
}
