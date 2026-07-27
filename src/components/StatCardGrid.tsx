import type { StatCard } from "@/types/dashboard";
  
const imgIconPelatihan = "/IconPelatihan.svg";
const imgIconTasks = "/IconTasks.svg";
const imgIconJadwal = "/IconJadwal.svg";
const imgIconProgress = "/IconProgress.svg";

const STAT_CARDS: StatCard[] = [
  { iconSrc: imgIconPelatihan, label: "Pelatihan", value: "2", sub: "Aktif" },
  { iconSrc: imgIconTasks, label: "Completed Tasks", value: "12 / 67", sub: "Minggu ini" },
  { iconSrc: imgIconJadwal, label: "Kelas Mendatang", value: "3", sub: "Dalam 7 hari" },
  { iconSrc: imgIconProgress, label: "Progress", value: "55%", sub: "Pelatihan" },
];

export default function StatCardGrid() {
  return (
    <div className="stat-grid" role="list" aria-label="Statistik pelatihan">
      {STAT_CARDS.map(({ iconSrc, label, value, sub }) => (
        <article key={label} className="stat-card" role="listitem">
          <div className="stat-icon-box" aria-hidden="true">
            <img src={iconSrc} alt="" className="stat-icon-img" />
          </div>
          <div className="stat-body">
            <span className="stat-label">{label}</span>
            <strong className="stat-value">{value}</strong>
            <span className="stat-sub">{sub}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
