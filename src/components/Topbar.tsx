const imgSubtract3 = "/search-icon.svg";
const imgBell2 = "/bell-icon.svg";
const imgUnion = "/profile-icon.svg";
import Image from 'next/image';

type TopbarProps = {
  notificationCount: number;
};

export default function Topbar({ notificationCount }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="search-wrapper">
        <Image src={imgSubtract3} alt="" className="search-icon" aria-hidden="true" width={24} height={24} />
        <input
          type="search"
          placeholder="Cari apapun..."
          className="search-input"
          aria-label="Cari konten"
        />
      </div>
      <div className="topbar-actions">
        <button
          type="button"
          className="icon-btn"
          aria-label={`${notificationCount} notifikasi belum dibaca`}
        >
          <Image src={imgBell2} alt="" aria-hidden="true" className="topbar-btn-icon" width={24} height={24} />
        </button>
        <button type="button" className="icon-btn" aria-label="Profil saya">
          <Image src={imgUnion} alt="" aria-hidden="true" className="topbar-btn-icon" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}
