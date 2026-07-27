import Link from "next/link";

// Asset URLs from Figma (node 3202-547)
const imgMascot = "/MaskotKecil.svg";
const imgLogoWorkshop = "/logo_putih.svg";

type HeroBannerProps = {
  userName: string;
  greeting: string;
  tagline: string;
  eventTitle: string;
  eventDesc: string;
  eventHref: string;
};

export default function HeroBanner({
  userName,
  greeting,
  tagline,
  eventTitle,
  eventDesc,
  eventHref,
}: HeroBannerProps) {
  return (
    <section className="hero-wrap" aria-label="Selamat datang">
      <div className="hero-left">
        <h1 className="hero-greeting">
          {greeting}, {userName}!
        </h1>
        <p className="hero-tagline">{tagline}</p>
      </div>

      <div className="hero-event-card">
        {/* Mascot */}
        <div className="hero-mascot-wrap" aria-hidden="true">
          <img src={imgMascot} alt="" className="hero-mascot-img" />
        </div>

        <div className="hero-event-info">
          <p className="hero-event-title">{eventTitle}</p>
          <p className="hero-event-desc">{eventDesc}</p>
          <Link href={eventHref} className="hero-cta-btn">
            Register Now
          </Link>
        </div>

        {/* Footer logo */}
        <div className="hero-event-footer" aria-hidden="true">
          <img src={imgLogoWorkshop} alt="Workshop KMTETI FT UGM" className="hero-logo-small" />
          <span className="hero-logo-sub">KMTETI FT UGM</span>
        </div>
      </div>
    </section>
  );
}
