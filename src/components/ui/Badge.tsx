"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.8 }}
      className={`badge-glow inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--color-badge-bg)] text-[var(--color-text)] border border-[var(--color-border)] animate-[badge-glow-pulse_4s_ease-in-out_infinite] transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.span>
  );
}
