"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { springGentle } from "@/lib/animations";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  href?: string;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  href,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] focus:ring-[var(--color-accent)] border-2 border-[var(--color-accent)] shadow-lg shadow-[var(--color-shadow-accent)]",
    outline:
      "border-2 border-[var(--color-accent)] text-[var(--color-text)] bg-[var(--color-card)] hover:bg-[var(--color-bg-secondary)] focus:ring-[var(--color-accent)]",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-base",
  };

  const Component = motion.button;
  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={springGentle}
        className={buttonClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <Component
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={springGentle}
      className={buttonClasses}
    >
      {content}
    </Component>
  );
}
