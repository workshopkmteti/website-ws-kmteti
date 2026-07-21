import { motion } from "framer-motion";
import Mascot from "@/components/Mascot";

type ConfirmationModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e0339]/80 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      {/* Click outside to cancel */}
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />

      {/* Frame container */}
      <motion.div
        initial={{ scale: 0.9, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#5e3786]/35 bg-gradient-to-b from-[#360568]/45 via-[#2a0451]/45 to-[#1e0339]/45 px-6 py-8 shadow-[0_0_60px_15px_rgba(94,55,134,0.25)] sm:px-8"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(235,230,240,0.12)]" />

        {/* Mascot top-right */}
        <div className="pointer-events-none absolute -top-10 -right-2 z-10 h-20 w-28">
          <Mascot pose="happy" className="h-full w-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2
            id="confirm-title"
            className="mb-4 font-sans text-xl font-bold tracking-[0.03em] text-[#ebe6f0] uppercase"
          >
            {title}
          </h2>
          <p className="mb-8 font-sans text-sm text-[#c1b2d0] leading-relaxed">
            {message}
          </p>

          <div className="flex w-full justify-center gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="h-10 rounded-xl border border-[#ebe6f0]/20 bg-[#1e0339]/40 px-6 font-sans text-sm font-semibold text-[#ebe6f0] transition-colors hover:bg-[#1e0339]/60 hover:border-[#ebe6f0]/40"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="relative flex h-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#33488d] to-[#1c0f3e] px-8 font-sans text-sm font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0px_0px_12px_rgba(1,29,62,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_3px_3px_0px_rgba(0,0,0,0.25)]" />
              <span className="relative">Confirm</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
