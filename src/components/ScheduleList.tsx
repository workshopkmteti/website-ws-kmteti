import Link from "next/link";
import Image from "next/image";
import type { ScheduleEntry } from "@/types/dashboard";

const imgArrow = "/Arrow.svg";
const imgIconOnline = "/online-icon.svg";
const imgIconOffline = "/offline-icon.svg";

type ScheduleListProps = {
  entries: ScheduleEntry[];
  showAllHref: string;
  title: string;
};

function ScheduleItem({ entry }: { entry: ScheduleEntry }) {
  const modeSrc = entry.mode === "Online" ? imgIconOnline : imgIconOffline;

  return (
    <li className="schedule-item">
      {/* Kolom Kiri: Tanggal & Dot */}
      <div className="schedule-date-wrapper">
        <div className="schedule-date" aria-label={`${entry.date} ${entry.month} ${entry.dayName}`}>
          <span className="schedule-month">{entry.month}</span>
          <strong className="schedule-day">{entry.date}</strong>
          <span className="schedule-dayname">{entry.dayName}</span>
        </div>

        <span
          className={`schedule-dot schedule-dot--${entry.dotColor}`}
          aria-hidden="true"
        />
      </div>

      {/* Kolom Kanan: Seluruh Info & Arrow */}
      <div className="schedule-content">
        <div className="schedule-main-info">
          <div className="schedule-info">
            <strong className="schedule-event-title">{entry.title}</strong>
            <span className="schedule-training-name">{entry.trainingName}</span>
          </div>

          <div className="schedule-meta">
            <span className="schedule-time">{entry.timeStart} - {entry.timeEnd}</span>
            <span className="schedule-mode">
              <Image src={modeSrc} alt="" className="schedule-mode-icon" aria-hidden="true" width={24} height={24} />
              {entry.mode}
            </span>
          </div>
        </div>

        <Link
          href={`/jadwal/${entry.id}`}
          className="schedule-arrow-btn"
          aria-label={`Detail ${entry.title}`}
        >
          <Image src={imgArrow} alt="" aria-hidden="true" className="schedule-arrow-icon" width={24} height={24} />
        </Link>
      </div>
    </li>
  );
}

export default function ScheduleList({ entries, showAllHref, title }: ScheduleListProps) {
  return (
    <section className="panel-card" aria-labelledby="schedule-heading">
      <div className="panel-header">
        <h2 id="schedule-heading" className="panel-title">{title}</h2>
        <Link href={showAllHref} className="panel-show-all-btn">Tampilkan Semua</Link>
      </div>
      <ul className="schedule-list" role="list">
        {entries.map((entry) => (
          <ScheduleItem key={entry.id} entry={entry} />
        ))}
      </ul>
      <div className="panel-bottom-fade" aria-hidden="true" />
    </section>
  );
}