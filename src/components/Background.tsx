// Reproduces the three stacked radial-gradient panels from the Figma
// background (node 591:108), stacked top-to-bottom in their exact
// proportions of the full 5828px design height. Panels overlap their
// neighbors and fade via a mask so the seams between them cross-blend
// instead of cutting hard at the boundary.
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "35%",
          background:
            "radial-gradient(150% 150% at 20.76% -15.47%, rgba(54,38,167,1) 0%, rgba(54,22,136,1) 24.62%, rgba(54,5,104,1) 49.24%, rgba(42,4,81,1) 74.62%, rgba(30,3,57,1) 100%)",
          maskImage: "linear-gradient(180deg, #000 0%, #000 78%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 78%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0"
        style={{
          top: "20%",
          height: "72%",
          background:
            "radial-gradient(150% 150% at 87.66% 53.65%, rgba(54,5,104,1) 0%, rgba(49,5,95,1) 25%, rgba(38,4,74,1) 50%, rgba(30,3,57,1) 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, #000 10%, #000 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, #000 10%, #000 88%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "20%",
          background:
            "radial-gradient(150% 150% at 50% 52.3%, rgba(49,5,95,1) 0%, rgba(38,4,74,1) 50%, rgba(30,3,57,1) 100%)",
          maskImage: "linear-gradient(180deg, transparent 0%, #000 22%, #000 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 22%, #000 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "#1e0339", zIndex: -1 }}
      />
      <div className="starfield" />
    </div>
  );
}
