import Image from "next/image";

import StatusBadge from "./StatusBadge";
import { ProfileUser } from "@/types/profile";

interface ProfileHeaderProps {
    user: ProfileUser;
}

export default function ProfileHeader({
    user,
}: ProfileHeaderProps) {
    return (
        <header className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:flex-row">
            {/* Avatar */}
            <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#120D1F] via-[#22143D] to-[#341B59] text-6xl font-bold text-white shadow-[0_0_35px_rgba(0,0,0,0.45)]">          {user.initials}
                </div>

                <button
                    type="button"
                    aria-label="Ubah foto profil"
                    className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1E172E] transition hover:scale-105"        >
                    <Image
                        src="/Type-Photo.svg"
                        alt="Camera"
                        width={22}
                        height={22}
                        className="brightness-0 invert"
                    />
                </button>
            </div>

            {/* User Info */}
            <div className="flex flex-1 flex-col gap-3 text-center md:text-left">
                <div>
                    <p className="text-sm text-gray-300">
                        Welcome,
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        {user.name}
                    </h1>
                </div>

                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                    {user.badges.map((badge) => (
                        <StatusBadge
                            key={badge.label}
                            {...badge}
                        />
                    ))}
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-300 md:justify-start">
                    <Image
                        src="/Type-University.svg"
                        alt="University"
                        width={20}
                        height={20}
                    />

                    <span>{user.university}</span>
                </div>
            </div>
        </header>
    );
}