"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type MascotProps = {
  className?: string;
};

export default function Mascot({ className = "" }: MascotProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [isWinking, setIsWinking] = useState(false);

  return (
    <svg
      role="img"
      aria-label="Maskot Workshop KMTETI"
      className={`h-76.25 w-107.75 ${className}`}
      viewBox="0 0 497 579"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsWaving(true)}
      onClick={() => setIsWinking(true)}
    >
      <g id="Mascot">
        <ellipse
          cx="183.033"
          cy="268.699"
          rx="128.937"
          ry="128.083"
          transform="rotate(5.20915 183.033 268.699)"
          fill="url(#paint0_radial_2_4)"
        />
        <g filter="url(#filter0_i_2_4)">
          <rect
            x="108.918"
            y="201.208"
            width="163.946"
            height="124.667"
            rx="34.1555"
            transform="rotate(5.20915 108.918 201.208)"
            fill="url(#paint1_radial_2_4)"
          />
        </g>

        <motion.ellipse
          data-testid="mascot-hand-right"
          data-animating={isWaving ? "wave" : undefined}
          cx="357.575"
          cy="312.748"
          rx="25.6166"
          ry="41.8404"
          transform="rotate(-102.752 357.575 312.748)"
          style={{ transformOrigin: "357.575px 312.748px" }}
          fill="url(#paint2_radial_2_4)"
          animate={isWaving ? { rotate: [0, -20, 15, -15, 0] } : { rotate: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          onAnimationComplete={() => setIsWaving(false)}
        />

        <ellipse
          data-testid="mascot-hand-left"
          cx="3.34974"
          cy="323.326"
          rx="25.6166"
          ry="41.8404"
          transform="rotate(-102.752 3.34974 323.326)"
          fill="url(#paint3_radial_2_4)"
        />

        <g filter="url(#filter1_di_2_4)">
          <motion.circle
            data-testid="mascot-eye-right"
            cx="222.384"
            cy="282.719"
            r="19.6394"
            transform="rotate(5.20915 222.384 282.719)"
            style={{ transformOrigin: "222.384px 282.719px" }}
            fill="url(#paint4_radial_2_4)"
            animate={isWinking ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onAnimationComplete={() => setIsWinking(false)}
          />
        </g>
        <g filter="url(#filter2_di_2_4)">
          <circle
            data-testid="mascot-eye-left"
            cx="145.852"
            cy="275.742"
            r="19.6394"
            transform="rotate(5.20915 145.852 275.742)"
            fill="url(#paint5_radial_2_4)"
          />
        </g>
      </g>

      <defs>
        <filter id="filter0_i_2_4" x="100.557" y="204.166" width="168.672" height="133.122" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0901961 0 0 0 0 0.00784314 0 0 0 0 0.172549 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_4" />
        </filter>
        <filter id="filter1_di_2_4" x="186.743" y="247.078" width="71.2813" height="71.2813" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.639216 0 0 0 0 0.607843 0 0 0 0 0.843137 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_4" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_4" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_innerShadow_2_4" />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.192157 0 0 0 0 0.0196078 0 0 0 0 0.372549 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2_4" />
        </filter>
        <filter id="filter2_di_2_4" x="110.212" y="240.101" width="71.2813" height="71.2813" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.639216 0 0 0 0 0.607843 0 0 0 0 0.843137 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_4" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_4" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_innerShadow_2_4" />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.192157 0 0 0 0 0.0196078 0 0 0 0 0.372549 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2_4" />
        </filter>
        <radialGradient id="paint0_radial_2_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(183.887 233.69) rotate(-102.593) scale(164.488 165.584)">
          <stop offset="0.370255" stopColor="#FFDAF2" />
          <stop offset="0.503457" stopColor="#FCC7C8" />
          <stop offset="0.730802" stopColor="#F98992" />
          <stop offset="1" stopColor="#760C90" />
        </radialGradient>
        <radialGradient id="paint1_radial_2_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(190.891 264.396) rotate(90) scale(88.8042 116.784)">
          <stop stopColor="#343434" />
          <stop offset="1" stopColor="#151515" />
        </radialGradient>
        <radialGradient id="paint2_radial_2_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(376.345 309.231) rotate(174.668) scale(51.5461 91.5313)">
          <stop stopColor="#D9D9D9" />
          <stop offset="0.5" stopColor="#E89299" />
          <stop offset="1" stopColor="#760C90" />
        </radialGradient>
        <radialGradient id="paint3_radial_2_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.12 319.808) rotate(-157.876) scale(51.5461 91.5313)">
          <stop stopColor="#D9D9D9" />
          <stop offset="0.5" stopColor="#E89299" />
          <stop offset="1" stopColor="#760C90" />
        </radialGradient>
        <radialGradient id="paint4_radial_2_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(221.984 276.706) rotate(98.3267) scale(27.7714)">
          <stop stopColor="#EBE6F0" />
          <stop offset="1" stopColor="#C1BCE4" />
        </radialGradient>
        <radialGradient id="paint5_radial_2_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(145.452 269.729) rotate(98.3267) scale(27.7714)">
          <stop stopColor="#EBE6F0" />
          <stop offset="1" stopColor="#C1BCE4" />
        </radialGradient>
      </defs>
    </svg>
  );
}
