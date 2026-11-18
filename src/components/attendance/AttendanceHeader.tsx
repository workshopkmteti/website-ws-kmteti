import Image from "next/image";

export default function AttendanceHeader() {
  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="text-[45px] font-bold leading-none tracking-tight text-white">
          Presensi
        </h1>

       <p className="mt-2 text-[16px] font-medium text-white/60">
          Kelola dan pantau kehadiran Anda dalam setiap sesi pelatihan.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition hover:bg-white/10">
          <Image
            src="/Notification.svg"
            alt="Notification"
            width={22}
            height={22}
          />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition hover:bg-white/10">
          <Image
            src="/Profile.svg"
            alt="Profile"
            width={24}
            height={24}
          />
        </button>
      </div>
    </header>
  );
}