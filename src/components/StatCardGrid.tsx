import type { StatCard } from "@/types/dashboard";
import Image from 'next/image';
type StatCardGridProps = {
  cards: StatCard[];
};

export default function StatCardGrid({ cards }: StatCardGridProps) {
  return (
    <div className="stat-grid" role="list" aria-label="Statistik pelatihan">
      {cards.map(({ iconSrc, label, value, sub }) => (
        <article key={label} className="stat-card" role="listitem">
          <div className="stat-icon-box" aria-hidden="true">
            <Image src={iconSrc} alt="" className="stat-icon-img" width={24} height={24} />
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
