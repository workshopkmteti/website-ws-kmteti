export type MascotEye =
  | { shape: "circle"; cx: number; cy: number; r: number }
  | { shape: "wink"; d: string };

export type MascotGradient =
  | { kind: "radial"; transform: string; stops: { offset: number; color: string }[] }
  | { kind: "linear"; x1: number; y1: number; x2: number; y2: number; stops: { offset: number; color: string }[] };

export type MascotHandEllipse = { cx: number; cy: number; rx: number; ry: number; rotation: number };

export type MascotHand = MascotHandEllipse | { from: MascotHandEllipse; to: MascotHandEllipse };

export type MascotPoseData = {
  viewBox: string;
  rotation: number;
  head: { cx: number; cy: number; rx: number; ry: number };
  screen: { x: number; y: number; width: number; height: number; rx: number };
  handRight: MascotHand;
  handLeft: MascotHand;
  eyeRight: MascotEye;
  eyeLeft: MascotEye;
  gradients: {
    head: MascotGradient;
    screen: MascotGradient;
    handRight: MascotGradient;
    handLeft: MascotGradient;
    eyeRight: MascotGradient;
    eyeLeft: MascotGradient;
  };
};
