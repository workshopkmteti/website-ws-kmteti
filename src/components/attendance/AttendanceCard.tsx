import Image from "next/image";
import { summaryStats } from "@/data/summaryStats";

export default function AttendanceCard() {
  return (
    <section
      className="relative overflow-hidden rounded-[24px] border border-white/10"
      style={{
        background:
          "linear-gradient(90deg,#34105B 0%,#2A0B4A 45%,#23053D 100%)",
        boxShadow:
          "0 18px 40px rgba(0,0,0,.28), inset 0 1px rgba(255,255,255,.08)",
      }}
    >
      {/* Glow kanan */}
      <div
        className="absolute right-[-140px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,108,255,.35) 0%, rgba(168,108,255,.08) 45%, transparent 72%)",
        }}
      />

      <div className="relative flex items-center justify-between px-8 py-6">
        {/* Statistik */}
        <div className="flex flex-1 items-center">
          <StatItem
            icon="/Book.svg"
            title="Pelatihan"
            value={summaryStats.active}
            subtitle="Aktif"
          />

          <Divider />

          <StatItem
            icon="/Type-Hadir.svg"
            title="Kehadiran"
            value={`${summaryStats.attended}/${summaryStats.attendedTotal}`}
            subtitle={`${summaryStats.attendedPct}%`}
          />

          <Divider />

          <StatItem
            icon="/Type-Tidak Hadir.svg"
            title="Tidak Hadir"
            value={`${summaryStats.absent}/${summaryStats.absentTotal}`}
            subtitle={`${summaryStats.absentPct}%`}
          />
        </div>

        {/* Bagian kanan */}
        <div className="ml-6 flex items-end gap-4">
          <Image
  src="/Mascot.svg"
  alt="Mascot"
  width={120}
  height={120}
/>

<Image
  src="/logo workshop.svg"
  alt="Workshop"
  width={140}
  height={55}
/>
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="mx-8 h-16 w-px bg-white/10" />
  );
}

type StatItemProps = {
  icon: string;
  title: string;
  value: string | number;
  subtitle: string;
};

function StatItem({
  icon,
  title,
  value,
  subtitle,
}: StatItemProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex h-[62px] w-[62px] items-center justify-center rounded-xl bg-[#6B3C9D]/60">
  <Image
    src={icon}
    alt={title}
    width={42}
    height={42}
  />
</div>

      <div>
        <p className="text-[16px] font-medium text-white/75">
          {title}
        </p>

        <p className="mt-1 text-[34px] font-extrabold leading-none text-white">
          {value}
        </p>

        <p className="mt-1 text-[15px] text-white/55">
          {subtitle}
        </p>
      </div>
    </div>
  );
}