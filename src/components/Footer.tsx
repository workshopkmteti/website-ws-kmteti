import Link from "next/link";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Register", href: "#register" },
] as const;

const socialLinks = [
  { label: "Not Social Media", href: "#" },
  { label: "Not Social Media", href: "#" },
  { label: "Contact", href: "#" },
  { label: "contact.ws@mail.com", href: "mailto:contact.ws@mail.com" },
] as const;

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-ws-purple-border)]"
      style={{ background: "var(--color-ws-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-white">
              Workshop
              <br />
              KMTETI
            </p>
            <p className="text-[10px] text-[var(--color-ws-text-muted)]">
              All Rights Reserved
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs text-[var(--color-ws-text-muted)] hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ul className="flex flex-col gap-2" role="list">
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-xs text-[var(--color-ws-text-muted)] hover:text-white transition-colors duration-200"
                    {...(href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-ws-purple-border)] pt-6">
          <p
            className="text-center font-extrabold tracking-widest select-none"
            style={{
              fontSize: "clamp(3rem, 12vw, 8rem)",
              background: "linear-gradient(180deg, rgba(168,85,247,0.4) 0%, transparent 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            aria-hidden="true"
          >
            Workshop
          </p>
        </div>
      </div>
    </footer>
  );
}
