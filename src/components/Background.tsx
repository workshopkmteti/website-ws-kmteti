const imgMascots =
  "https://www.figma.com/api/mcp/asset/552bb710-f26e-4390-bc4d-5327f13c0c23";

// Approximates the layered radial gradients from the Figma background
// (deep indigo at the very top, fading through violet into near-black purple).
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #3626a7 0%, #36166b 12%, #360568 24%, #31055f 38%, #2a0451 55%, #26044a 70%, #1e0339 100%)",
        }}
      />
      <div className="starfield" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgMascots}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-lighten"
      />
    </div>
  );
}
