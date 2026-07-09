import Logo from "./Logo";

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`flex flex-col items-center bg-[#0a060d] px-6 py-12 sm:px-16 lg:px-32 ${className}`}>
      <div className="flex w-full max-w-6xl flex-col">
        <div className="relative mx-auto mb-6 h-24 w-[88%] text-[#ebe6f0] sm:h-28">
          <div className="absolute top-0 left-0 flex flex-col gap-1 font-mono text-xs tracking-[0.02em] sm:text-sm">
            <p className="font-bold">
              KMTETI
              <br />
              WORKSHOP
            </p>
            <p>All Right Reserved</p>
          </div>
          <div className="absolute top-0 left-[78.3%] flex flex-col gap-2 font-mono text-xs tracking-[0.02em] sm:text-sm">
            <div>
              <p className="font-bold">Our Social Media</p>
              <p>@w.santuyyy</p>
            </div>
            <div>
              <p className="font-bold">Contact</p>
              <p>ws@gmail.com</p>
            </div>
          </div>
        </div>
        <Logo className="mx-auto aspect-1248/459 w-[88%]" />
      </div>
    </footer>
  );
}
