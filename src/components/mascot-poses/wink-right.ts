import type { MascotPoseData } from "./types";

export const winkRight: MascotPoseData = {
  viewBox: "0 0 346 302",
  rotation: 5.20915,
  head: { cx: 160.821, cy: 186.822, rx: 74.0007, ry: 73.5107 },
  screen: { x: 117.749, y: 146.48, width: 94.0937, height: 71.5504, rx: 19.6028 },
  handRight: { cx: 274.346, cy: 195.417, rx: 14.7021, ry: 24.0135, rotation: -102.752 },
  handLeft: { cx: 52.756, cy: 164.463, rx: 14.7021, ry: 24.0135, rotation: -68.9087 },
  eyeRight: { shape: "circle", cx: 138.946, cy: 189.257, r: 11.2716 },
  eyeLeft: {
    shape: "wink",
    d: "M172.557 184.786C174.595 189.619 179.378 193.013 184.953 193.013C188.795 193.012 192.26 191.4 194.71 188.817C193.531 193.994 188.447 197.617 182.731 197.096C176.532 196.531 171.941 191.306 172.477 185.426C172.497 185.21 172.524 184.997 172.557 184.786Z",
  },
  gradients: {
    head: {
      kind: "radial",
      transform: "translate(161.311 166.729) rotate(-102.593) scale(94.4046 95.0339)",
      stops: [
        { offset: 0.158717, color: "#FCC7CB" },
        { offset: 0.461605, color: "#FCC7CB" },
        { offset: 0.730802, color: "#F98992" },
        { offset: 1, color: "#760C90" },
      ],
    },
    screen: {
      kind: "radial",
      transform: "translate(164.795 182.745) rotate(90) scale(50.9674 67.0256)",
      stops: [
        { offset: 0, color: "#343434" },
        { offset: 1, color: "#151515" },
      ],
    },
    handRight: {
      kind: "radial",
      transform: "translate(285.119 193.399) rotate(174.668) scale(29.5839 52.5326)",
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 0.5, color: "#E89299" },
        { offset: 1, color: "#760C90" },
      ],
    },
    handLeft: {
      kind: "linear",
      x1: 67.4581,
      y1: 164.463,
      x2: 38.0538,
      y2: 164.463,
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 1, color: "#F64B58" },
      ],
    },
    eyeRight: {
      kind: "linear",
      x1: 138.946,
      y1: 177.985,
      x2: 138.946,
      y2: 200.528,
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#A39BD7" },
      ],
    },
    eyeLeft: {
      kind: "linear",
      x1: 184.673,
      y1: 175.802,
      x2: 182.732,
      y2: 197.096,
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#A39BD7" },
      ],
    },
  },
};
