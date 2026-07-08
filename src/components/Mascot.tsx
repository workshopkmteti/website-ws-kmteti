"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { mascotPoses, type MascotPoseName, type MascotGradient, type MascotHand, type MascotHandEllipse } from "./mascot-poses";

type MascotProps = {
  pose?: MascotPoseName;
  tilt?: number;
  className?: string;
};

function handShoulderPivot(hand: MascotHandEllipse, headCx: number, headCy: number) {
  const theta = (hand.rotation * Math.PI) / 180;
  const endA = { x: hand.cx + hand.ry * Math.sin(theta), y: hand.cy - hand.ry * Math.cos(theta) };
  const endB = { x: hand.cx - hand.ry * Math.sin(theta), y: hand.cy + hand.ry * Math.cos(theta) };
  const distA = Math.hypot(endA.x - headCx, endA.y - headCy);
  const distB = Math.hypot(endB.x - headCx, endB.y - headCy);
  return distA < distB ? endA : endB;
}

const WAVE_SWING_DEGREES = 25;

function swingHandAroundShoulder(hand: MascotHandEllipse, headCx: number, headCy: number): MascotHandEllipse {
  const pivot = handShoulderPivot(hand, headCx, headCy);
  const theta = (WAVE_SWING_DEGREES * Math.PI) / 180;
  const dx = hand.cx - pivot.x;
  const dy = hand.cy - pivot.y;
  const cx = pivot.x + dx * Math.cos(theta) - dy * Math.sin(theta);
  const cy = pivot.y + dx * Math.sin(theta) + dy * Math.cos(theta);
  return { cx, cy, rx: hand.rx, ry: hand.ry, rotation: hand.rotation + WAVE_SWING_DEGREES };
}

function GradientDef({ id, gradient }: { id: string; gradient: MascotGradient }) {
  if (gradient.kind === "linear") {
    return (
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={gradient.x1} y1={gradient.y1} x2={gradient.x2} y2={gradient.y2}>
        {gradient.stops.map((stop) => (
          <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
    );
  }

  return (
    <radialGradient id={id} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={gradient.transform}>
      {gradient.stops.map((stop) => (
        <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
      ))}
    </radialGradient>
  );
}

function MascotHandShape({
  hand,
  fill,
  testId,
  isAnimating,
  onAnimationComplete,
  headCx,
  headCy,
}: {
  hand: MascotHand;
  fill: string;
  testId: string;
  isAnimating: boolean;
  onAnimationComplete?: () => void;
  headCx: number;
  headCy: number;
}) {
  const from = "from" in hand ? hand.from : hand;
  const to = "from" in hand ? hand.to : swingHandAroundShoulder(hand, headCx, headCy);

  return (
    <motion.ellipse
      data-testid={testId}
      data-animating={isAnimating ? "wave" : undefined}
      fill={fill}
      initial={false}
      animate={
        isAnimating
          ? { cx: [from.cx, to.cx, from.cx], cy: [from.cy, to.cy, from.cy], rotate: [from.rotation, to.rotation, from.rotation] }
          : { cx: from.cx, cy: from.cy, rotate: from.rotation }
      }
      rx={from.rx}
      ry={from.ry}
      style={{ transformOrigin: `${from.cx}px ${from.cy}px` }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      onAnimationComplete={onAnimationComplete}
    />
  );
}

export default function Mascot({ pose = "idle", tilt, className = "" }: MascotProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const uid = useId();

  const data = mascotPoses[pose];
  const rotation = tilt ?? data.rotation;
  const eyeGlowId = `${uid}-eye-glow`;
  const gradientId = (part: string) => `${uid}-${part}`;

  return (
    <svg
      role="img"
      aria-label="Maskot Workshop KMTETI"
      data-pose={pose}
      className={`h-76.25 w-107.75 ${className}`}
      viewBox={data.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsWaving(true)}
      onClick={() => setIsWinking(true)}
    >
      <g
        data-testid="mascot-group"
        transform={`rotate(${rotation} ${data.head.cx} ${data.head.cy})`}
      >
        <ellipse
          cx={data.head.cx}
          cy={data.head.cy}
          rx={data.head.rx}
          ry={data.head.ry}
          fill={`url(#${gradientId("head")})`}
        />
        <g filter={`url(#${eyeGlowId}-screen)`}>
          <rect
            x={data.screen.x}
            y={data.screen.y}
            width={data.screen.width}
            height={data.screen.height}
            rx={data.screen.rx}
            fill={`url(#${gradientId("screen")})`}
          />
        </g>

        <MascotHandShape
          hand={data.handRight}
          fill={`url(#${gradientId("hand-right")})`}
          testId="mascot-hand-right"
          isAnimating={isWaving}
          onAnimationComplete={() => setIsWaving(false)}
          headCx={data.head.cx}
          headCy={data.head.cy}
        />

        <MascotHandShape
          hand={data.handLeft}
          fill={`url(#${gradientId("hand-left")})`}
          testId="mascot-hand-left"
          isAnimating={isWaving && "from" in data.handLeft}
          headCx={data.head.cx}
          headCy={data.head.cy}
        />

        <g filter={`url(#${eyeGlowId}-right)`}>
          {data.eyeRight.shape === "circle" ? (
            <motion.circle
              data-testid="mascot-eye-right"
              cx={data.eyeRight.cx}
              cy={data.eyeRight.cy}
              r={data.eyeRight.r}
              style={{ transformOrigin: `${data.eyeRight.cx}px ${data.eyeRight.cy}px` }}
              fill={`url(#${gradientId("eye-right")})`}
              animate={isWinking ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onAnimationComplete={() => setIsWinking(false)}
            />
          ) : (
            <path data-testid="mascot-eye-right" d={data.eyeRight.d} fill={`url(#${gradientId("eye-right")})`} />
          )}
        </g>
        <g filter={`url(#${eyeGlowId}-left)`}>
          {data.eyeLeft.shape === "circle" ? (
            <circle
              data-testid="mascot-eye-left"
              cx={data.eyeLeft.cx}
              cy={data.eyeLeft.cy}
              r={data.eyeLeft.r}
              fill={`url(#${gradientId("eye-left")})`}
            />
          ) : (
            <path data-testid="mascot-eye-left" d={data.eyeLeft.d} fill={`url(#${gradientId("eye-left")})`} />
          )}
        </g>
      </g>

      <defs>
        <filter id={`${eyeGlowId}-screen`} filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0901961 0 0 0 0 0.00784314 0 0 0 0 0.172549 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter id={`${eyeGlowId}-right`} filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.639216 0 0 0 0 0.607843 0 0 0 0 0.843137 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_innerShadow" />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.192157 0 0 0 0 0.0196078 0 0 0 0 0.372549 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
        <filter id={`${eyeGlowId}-left`} filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.639216 0 0 0 0 0.607843 0 0 0 0 0.843137 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_innerShadow" />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.192157 0 0 0 0 0.0196078 0 0 0 0 0.372549 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>

        <GradientDef id={gradientId("head")} gradient={data.gradients.head} />
        <GradientDef id={gradientId("screen")} gradient={data.gradients.screen} />
        <GradientDef id={gradientId("hand-right")} gradient={data.gradients.handRight} />
        <GradientDef id={gradientId("hand-left")} gradient={data.gradients.handLeft} />
        <GradientDef id={gradientId("eye-right")} gradient={data.gradients.eyeRight} />
        <GradientDef id={gradientId("eye-left")} gradient={data.gradients.eyeLeft} />
      </defs>
    </svg>
  );
}
