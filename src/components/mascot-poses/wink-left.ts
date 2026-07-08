import type { MascotPoseData } from "./types";

export const winkLeft: MascotPoseData = {
  viewBox: "0 0 735 644",
  rotation: -0.993878,
  head: { cx: 377.554, cy: 295.85, rx: 154.724, ry: 153.7 },
  screen: { x: 280.385, y: 224.944, width: 196.735, height: 149.601, rx: 40.9866 },
  handRight: { cx: 591.489, cy: 325.768, rx: 30.7399, ry: 50.2085, rotation: -108.955 },
  handLeft: { cx: 164.953, cy: 338.739, rx: 30.7399, ry: 50.2085, rotation: -79.7379 },
  eyeRight: { shape: "circle", cx: 421.956, cy: 305.029, r: 19.6394 },
  eyeLeft: {
    shape: "wink",
    d: "M357.675 308.664C357.901 321.678 356.436 301.828 334.671 301.478C312.906 301.128 310.773 322.496 310.548 309.482C310.322 296.468 320.689 285.735 333.703 285.509C346.716 285.284 357.449 295.65 357.675 308.664Z",
  },
  gradients: {
    head: {
      kind: "radial",
      transform: "translate(378.579 253.839) rotate(-102.593) scale(197.385 198.701)",
      stops: [
        { offset: 0.370255, color: "#FFDAF2" },
        { offset: 0.503457, color: "#FCC7C8" },
        { offset: 0.730802, color: "#F98992" },
        { offset: 1, color: "#760C90" },
      ],
    },
    screen: {
      kind: "radial",
      transform: "translate(378.753 300.77) rotate(90) scale(106.565 140.14)",
      stops: [
        { offset: 0, color: "#343434" },
        { offset: 1, color: "#151515" },
      ],
    },
    handRight: {
      kind: "radial",
      transform: "translate(614.014 321.546) rotate(174.668) scale(61.8553 109.838)",
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 0.5, color: "#E89299" },
        { offset: 1, color: "#760C90" },
      ],
    },
    handLeft: {
      kind: "radial",
      transform: "translate(187.477 334.517) rotate(178.991) scale(57.4711 102.053)",
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 0.5, color: "#E89299" },
        { offset: 1, color: "#760C90" },
      ],
    },
    eyeRight: {
      kind: "radial",
      transform: "translate(421.556 299.016) rotate(98.3267) scale(27.7714)",
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#C1BCE4" },
      ],
    },
    eyeLeft: {
      kind: "radial",
      transform: "translate(333.506 301.867) rotate(97.3328) scale(33.3257 33.3257)",
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#C1BCE4" },
      ],
    },
  },
};
