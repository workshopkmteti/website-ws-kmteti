import { idle } from "./idle";
import { winkLeft } from "./wink-left";
import { winkRight } from "./wink-right";
import { happy } from "./happy";
import { wave } from "./wave";
import type { MascotPoseData } from "./types";

export type MascotPoseName = "idle" | "wink-left" | "wink-right" | "happy" | "wave";

export const mascotPoses: Record<MascotPoseName, MascotPoseData> = {
  idle,
  "wink-left": winkLeft,
  "wink-right": winkRight,
  happy,
  wave,
};

export type { MascotPoseData, MascotEye, MascotGradient, MascotHand, MascotHandEllipse } from "./types";
