import Link from "next/link";
import type { Announcement } from "@/types/dashboard";
  
const imgArrow = "/Arrow.svg";
const imgIconMegaphone = "/pengumumanicon.svg";
const imgIconCalendar = "/jadwalicon.svg";

type AnnouncementListProps = {
  items: Announcement[];
  showAllHref: string;
};

function AnnouncementItem({ item }: { item: Announcement }) {
  return (
    <li className="announcement-item">
      <div className="announcement-icon-box" aria-hidden="true">
        <img src={item.iconSrc} alt="" className="announcement-icon-img" />
      </div>
      <div className="announcement-body">
        <div className="announcement-meta">
          <strong className="announcement-title">{item.title}</strong>
          <time className="announcement-date" dateTime={item.date}>{item.date}</time>
        </div>
        <p className="announcement-text">{item.body}</p>
      </div>
      <Link
        href={`/pengumuman/${item.id}`}
        className="schedule-arrow-btn"
        aria-label={`Baca selengkapnya: ${item.title}`}
      >
        <img src={imgArrow} alt="" aria-hidden="true" className="schedule-arrow-icon" />
      </Link>
    </li>
  );
}

export default function AnnouncementList({ items, showAllHref }: AnnouncementListProps) {
  return (
    <section className="panel-card" aria-labelledby="announcement-heading">
      <div className="panel-header">
        <h2 id="announcement-heading" className="panel-title">Pengumuman</h2>
        <Link href={showAllHref} className="panel-show-all-btn">Tampilkan Semua</Link>
      </div>
      <ul className="announcement-list" role="list">
        {items.map((item) => (
          <AnnouncementItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="panel-bottom-fade" aria-hidden="true" />
    </section>
  );
}

export { imgIconMegaphone, imgIconCalendar };
