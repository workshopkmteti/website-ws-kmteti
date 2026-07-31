"use client";

import { useState } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import SectionCard from "@/components/profile/SectionCard";
import InputField from "@/components/profile/InputField";
import SaveButton from "@/components/profile/SaveButton";
import PasswordButton from "@/components/profile/PasswordButton";

import {
    DUMMY_USER,
    PERSONAL_FIELDS,
    ACADEMIC_FIELDS,
} from "@/data/profile";

export default function ProfilePage() {
    const [form, setForm] = useState({
        fullName: DUMMY_USER.fullName,
        email: DUMMY_USER.email,
        phone: DUMMY_USER.phone,
        university: DUMMY_USER.university,
        major: DUMMY_USER.major,
        batch: DUMMY_USER.batch,
        password: DUMMY_USER.password,
    });

    const [showPassword, setShowPassword] = useState(false);

    const update =
        (key: keyof typeof form) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setForm((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                }));
            };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#1A0033] px-6 py-10">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute right-0 top-80 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
            </div>

            <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-5">
                <ProfileHeader user={DUMMY_USER} />

                <SectionCard title="Informasi Pribadi">
                    {PERSONAL_FIELDS.map((field) => (
                        <InputField
                            key={field.id}
                            label={field.label}
                            type={field.type}
                            value={form[field.key]}
                            onChange={update(field.key)}
                        />
                    ))}
                </SectionCard>

                <SectionCard title="Informasi Akademik">
                    {ACADEMIC_FIELDS.map((field) => (
                        <InputField
                            key={field.id}
                            label={field.label}
                            type={field.type}
                            value={form[field.key]}
                            onChange={update(field.key)}
                        />
                    ))}
                </SectionCard>

                <SectionCard title="Akun">
                    <div className="space-y-2">
                        <label className="mb-2 block text-sm font-medium text-white">
                            Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={update("password")}
                            className="w-full rounded-lg border border-[#5E3C87] bg-[#4A3566]/70 px-4 py-2 text-sm text-white outline-none focus:border-[#A855F7]"
                        />

                        <div className="mt-4 flex justify-end gap-3">
                            <PasswordButton
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "Sembunyikan" : "Lihat Password"}
                            </PasswordButton>

                            <PasswordButton>
                                Ubah Password
                            </PasswordButton>
                        </div>
                    </div>
                </SectionCard>

                <div className="flex justify-center pt-4">
                    <SaveButton />
                </div>
            </div>
        </main>
    );
}