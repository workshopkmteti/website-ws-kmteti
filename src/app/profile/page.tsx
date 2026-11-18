import ProfileClient from "@/features/profile/ProfileClient";
import { getUserProfileData } from "@/lib/queries/lms";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await getUserProfileData();
  return <ProfileClient initialProfile={profile} />;
}
