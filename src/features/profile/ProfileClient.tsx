"use client";

import { useState } from "react";
import { saveProfileAction } from "@/actions/profile";
import DashboardShell from "@/components/DashboardShell";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SectionCard from "@/components/profile/SectionCard";
import InputField from "@/components/profile/InputField";
import SaveButton from "@/components/profile/SaveButton";
import PasswordButton from "@/components/profile/PasswordButton";
import { DUMMY_USER, PERSONAL_FIELDS, ACADEMIC_FIELDS } from "@/data/profile";

type ProfileClientProps = {
  initialProfile: {
    fullName: string;
    email: string;
    phone: string;
    nim: string;
    role: string;
  };
};

export default function ProfileClient({ initialProfile }: ProfileClientProps) {
  const [form, setForm] = useState({
    fullName: initialProfile.fullName || DUMMY_USER.fullName,
    email: initialProfile.email || DUMMY_USER.email,
    phone: initialProfile.phone || DUMMY_USER.phone,
    university: DUMMY_USER.university,
    major: DUMMY_USER.major,
    batch: initialProfile.nim || DUMMY_USER.batch,
    password: DUMMY_USER.password,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSave = async () => {
    setStatusMessage(null);
    setErrorMessage(null);
    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("phone", form.phone);
    formData.append("nim", form.batch);

    const res = await saveProfileAction(formData);
    if (!res.ok) {
      setErrorMessage(res.error ?? "Gagal menyimpan profil.");
      return;
    }
    setStatusMessage("Profil berhasil disimpan.");
  };

  return (
    <DashboardShell
      activeHref="/profile"
      userName={form.fullName}
      userRole={initialProfile.role}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />
          <div className="absolute right-0 top-80 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-5">
          <ProfileHeader
            user={{
              ...DUMMY_USER,
              name: form.fullName,
              initials:
                form.fullName
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((p) => p[0].toUpperCase())
                  .join("") || "JD",
              university: form.university,
            }}
          />

          <SectionCard title="INFORMASI PERSONAL">
            <div className="space-y-4">
              {PERSONAL_FIELDS.map((field) => (
                <InputField
                  key={field.key}
                  label={field.label}
                  type={field.type}
                  value={form[field.key]}
                  onChange={update(field.key)}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="INFORMASI AKADEMIK">
            <div className="space-y-4">
              {ACADEMIC_FIELDS.map((field) => (
                <InputField
                  key={field.key}
                  label={field.label}
                  type={field.type}
                  value={form[field.key]}
                  onChange={update(field.key)}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="KEAMANAN">
            <div className="space-y-4">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={update("password")}
              />

              <div className="flex flex-wrap gap-3">
                <PasswordButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? "Sembunyikan" : "Lihat Password"}
                </PasswordButton>

                <PasswordButton>Ubah Password</PasswordButton>
              </div>
            </div>
          </SectionCard>

          {errorMessage && (
            <p role="alert" className="text-center font-mono text-xs text-rose-300">
              {errorMessage}
            </p>
          )}
          {statusMessage && (
            <p className="text-center font-mono text-xs text-[#10b981]">
              {statusMessage}
            </p>
          )}

          <div className="flex justify-center pt-4">
            <SaveButton onClick={handleSave} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
