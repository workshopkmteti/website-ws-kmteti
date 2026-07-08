import type { MascotPoseData } from "./types";

export const wave: MascotPoseData = {
  viewBox: "0 0 265 184",
  rotation: 5.20915,
  head: { cx: 139.622, cy: 83.4878, rx: 51.7494, ry: 51.4067 },
  screen: { x: 95.9858, y: 55.586, width: 65.8005, height: 50.0358, rx: 13.7084 },
  handRight: {
    from: { cx: 209.934, cy: 90.623, rx: 10.2813, ry: 16.7928, rotation: -102.752 },
    to: { cx: 198.735, cy: 120.413, rx: 10.2813, ry: 16.7928, rotation: -77.889 },
  },
  handLeft: {
    from: { cx: 64.051, cy: 43.2306, rx: 10.2813, ry: 16.7928, rotation: -68.9087 },
    to: { cx: 56.6514, cy: 88.9185, rx: 10.2813, ry: 16.7928, rotation: -88.8766 },
  },
  eyeRight: { shape: "circle", cx: 126.266, cy: 80.2486, r: 7.98729 },
  eyeLeft: { shape: "circle", cx: 105.017, cy: 79.1526, r: 7.88236 },
  gradients: {
    head: {
      kind: "radial",
      transform: "translate(139.964 69.4367) rotate(-102.593) scale(66.0179 66.4581)",
      stops: [
        { offset: 0.158717, color: "#FCC7CB" },
        { offset: 0.461605, color: "#FCC7CB" },
        { offset: 0.730802, color: "#F98992" },
        { offset: 1, color: "#760C90" },
      ],
    },
    screen: {
      kind: "radial",
      transform: "translate(128.886 80.9467) rotate(90) scale(35.642 46.8716)",
      stops: [
        { offset: 0, color: "#343434" },
        { offset: 1, color: "#151515" },
      ],
    },
    handRight: {
      kind: "radial",
      transform: "translate(217.467 89.2111) rotate(174.668) scale(20.6883 36.7365)",
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 0.5, color: "#E89299" },
        { offset: 1, color: "#760C90" },
      ],
    },
    handLeft: {
      kind: "linear",
      x1: 74.3323,
      y1: 43.2306,
      x2: 53.7697,
      y2: 43.2306,
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 1, color: "#F64B58" },
      ],
    },
    eyeRight: {
      kind: "linear",
      x1: 126.266,
      y1: 72.2613,
      x2: 126.266,
      y2: 88.2359,
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#A39BD7" },
      ],
    },
    eyeLeft: {
      kind: "linear",
      x1: 105.017,
      y1: 71.2703,
      x2: 105.017,
      y2: 87.035,
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#A39BD7" },
      ],
    },
  },
};
