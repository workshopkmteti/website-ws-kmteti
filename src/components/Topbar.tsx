const imgSubtract3 = "/search-icon.svg";
const imgBell2 = "/bell-icon.svg";
const imgUnion = "/profile-icon.svg";

type TopbarProps = {
  notificationCount: number;
};

export default function Topbar({ notificationCount }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="search-wrapper">
        <img src={imgSubtract3} alt="" className="search-icon" aria-hidden="true" />
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
          <img src={imgBell2} alt="" aria-hidden="true" className="topbar-btn-icon" />
        </button>
        <button type="button" className="icon-btn" aria-label="Profil saya">
          <img src={imgUnion} alt="" aria-hidden="true" className="topbar-btn-icon" />
        </button>
      </div>
    </header>
  );
}
