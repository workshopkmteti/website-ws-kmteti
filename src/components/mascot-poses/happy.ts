import type { MascotPoseData } from "./types";

export const happy: MascotPoseData = {
  viewBox: "0 0 416 540",
  rotation: 5.20915,
  head: { cx: 315.81, cy: 247.985, rx: 128.937, ry: 128.083 },
  screen: { x: 234.54, y: 189.305, width: 163.946, height: 124.667, rx: 34.1555 },
  handRight: { cx: 439.888, cy: 335.041, rx: 25.6166, ry: 41.8404, rotation: -126.165 },
  handLeft: { cx: 138.001, cy: 302.246, rx: 25.6166, ry: 41.8404, rotation: -79.4392 },
  eyeRight: {
    shape: "wink",
    d: "M376.127 257.028C376.369 267.871 375.066 251.336 356.927 251.135C338.788 250.933 337.1 268.749 336.858 257.905C336.615 247.061 345.21 238.074 356.053 237.832C366.897 237.59 375.884 246.184 376.127 257.028Z",
  },
  eyeLeft: {
    shape: "wink",
    d: "M299.298 258.746C299.54 269.59 298.237 253.055 280.098 252.854C261.959 252.652 260.271 270.468 260.029 259.624C259.786 248.78 268.381 239.793 279.224 239.551C290.068 239.308 299.055 247.902 299.298 258.746Z",
  },
  gradients: {
    head: {
      kind: "radial",
      transform: "translate(294.31 211.51) rotate(-94.8545) scale(159.638 160.702)",
      stops: [
        { offset: 0.370255, color: "#FFDAF2" },
        { offset: 0.503457, color: "#FCC7C8" },
        { offset: 0.730802, color: "#F98992" },
        { offset: 1, color: "#760C90" },
      ],
    },
    screen: {
      kind: "radial",
      transform: "translate(316.514 252.492) rotate(90) scale(88.8042 116.784)",
      stops: [
        { offset: 0, color: "#343434" },
        { offset: 1, color: "#151515" },
      ],
    },
    handRight: {
      kind: "radial",
      transform: "translate(458.659 331.524) rotate(174.668) scale(51.5461 91.5313)",
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 0.5, color: "#E89299" },
        { offset: 1, color: "#760C90" },
      ],
    },
    handLeft: {
      kind: "radial",
      transform: "translate(156.771 298.728) rotate(-157.876) scale(51.5461 91.5313)",
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 0.5, color: "#E89299" },
        { offset: 1, color: "#760C90" },
      ],
    },
    eyeRight: {
      kind: "radial",
      transform: "translate(355.958 251.464) rotate(97.0467) scale(27.7714 27.7714)",
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#C1BCE4" },
      ],
    },
    eyeLeft: {
      kind: "radial",
      transform: "translate(279.129 253.182) rotate(97.0467) scale(27.7714 27.7714)",
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#C1BCE4" },
      ],
    },
  },
};
