import type { MascotPoseData } from "./types";

export const idle: MascotPoseData = {
  viewBox: "0 0 497 579",
  rotation: 5.20915,
  head: { cx: 183.033, cy: 268.699, rx: 128.937, ry: 128.083 },
  screen: { x: 104.918, y: 204.208, width: 163.946, height: 124.667, rx: 34.1555 },
  handRight: { cx: 357.575, cy: 312.748, rx: 25.6166, ry: 41.8404, rotation: -102.752 },
  handLeft: { cx: 3.34974, cy: 323.326, rx: 25.6166, ry: 41.8404, rotation: -102.752 },
  eyeRight: { shape: "circle", cx: 226.157, cy: 272.5415, r: 19.6394 },
  eyeLeft: { shape: "circle", cx: 149.625, cy: 272.5415, r: 19.6394 },
  gradients: {
    head: {
      kind: "radial",
      transform: "translate(183.887 233.69) rotate(-102.593) scale(164.488 165.584)",
      stops: [
        { offset: 0.370255, color: "#FFDAF2" },
        { offset: 0.503457, color: "#FCC7C8" },
        { offset: 0.730802, color: "#F98992" },
        { offset: 1, color: "#760C90" },
      ],
    },
    screen: {
      kind: "radial",
      transform: "translate(186.891 267.396) rotate(90) scale(88.8042 116.784)",
      stops: [
        { offset: 0, color: "#343434" },
        { offset: 1, color: "#151515" },
      ],
    },
    handRight: {
      kind: "radial",
      transform: "translate(376.345 309.231) rotate(174.668) scale(51.5461 91.5313)",
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 0.5, color: "#E89299" },
        { offset: 1, color: "#760C90" },
      ],
    },
    handLeft: {
      kind: "radial",
      transform: "translate(22.12 319.808) rotate(-157.876) scale(51.5461 91.5313)",
      stops: [
        { offset: 0, color: "#D9D9D9" },
        { offset: 0.5, color: "#E89299" },
        { offset: 1, color: "#760C90" },
      ],
    },
    eyeRight: {
      kind: "radial",
      transform: "translate(225.757 266.5285) rotate(98.3267) scale(27.7714)",
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#C1BCE4" },
      ],
    },
    eyeLeft: {
      kind: "radial",
      transform: "translate(149.225 266.5285) rotate(98.3267) scale(27.7714)",
      stops: [
        { offset: 0, color: "#EBE6F0" },
        { offset: 1, color: "#C1BCE4" },
      ],
    },
  },
};
