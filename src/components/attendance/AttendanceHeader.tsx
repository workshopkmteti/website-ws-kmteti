export default function AttendanceHeader() {
  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Presensi
        </h1>
        <p className="mt-1 font-mono text-xs text-[#9CA3AF] sm:text-sm">
          Kelola dan pantau kehadiran Anda dalam setiap sesi pelatihan.
        </p>
      </div>
    </header>
  );
}
