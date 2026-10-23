"use client";

import { motion } from "motion/react";

export function DiyaFlame({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 64 72" className="h-14 w-14 text-marigold">
        <ellipse cx="32" cy="58" rx="22" ry="8" fill="currentColor" opacity="0.35" />
        <path
          d="M18 58h28l-4 10H22l-4-10z"
          fill="currentColor"
          className="text-sandal"
        />
        <motion.path
          d="M32 18c-6 10-10 18-10 26a10 10 0 0 0 20 0c0-8-4-16-10-26z"
          fill="currentColor"
          animate={{ opacity: [0.7, 1, 0.75], scaleY: [0.95, 1.05, 0.98] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
