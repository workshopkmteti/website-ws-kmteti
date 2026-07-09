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
    </div>
  );
}
