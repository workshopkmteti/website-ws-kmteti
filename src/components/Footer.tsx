const imgLogoBottom =
  "https://www.figma.com/api/mcp/asset/fcba72c5-efd6-4b60-9cdc-f36b44bd9784";
const imgLogoTop =
  "https://www.figma.com/api/mcp/asset/634c60a3-313c-4536-8cac-6d4047bf8968";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-16 bg-[#0a060d] px-6 py-12 sm:px-16 lg:px-32">
      <div className="flex w-full max-w-6xl flex-col items-start justify-between gap-8 text-[#ebe6f0] sm:flex-row">
        <div className="flex flex-col gap-2 font-mono text-lg tracking-[0.02em]">
          <p className="font-bold">
            KMTETI
            <br />
            WORKSHOP
          </p>
          <p>All Right Reserved</p>
        </div>
        <div className="flex flex-col gap-8 font-mono text-lg tracking-[0.02em] sm:items-end">
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
      <div className="relative h-[240px] w-full max-w-6xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgLogoBottom}
          alt=""
          className="absolute inset-x-0 bottom-0 h-full w-full object-contain opacity-90"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgLogoTop}
          alt="Logo besar Workshop KMTETI"
          className="absolute inset-x-0 bottom-0 h-full w-full object-contain"
        />
      </div>
    </footer>
  );
}
