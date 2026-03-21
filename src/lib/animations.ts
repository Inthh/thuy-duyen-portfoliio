/**
 * Shared animation variants for consistent, smooth, and impressive transitions.
 * Uses spring physics for natural feel and custom easing for polish.
 */

export const spring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8,
} as const;

export const springBouncy = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 0.8,
} as const;

export const springSmooth = {
  type: "spring",
  stiffness: 80,
  damping: 24,
  mass: 0.6,
} as const;

export const springGentle = {
  type: "spring",
  stiffness: 60,
  damping: 20,
  mass: 0.8,
} as const;

export const tweenSmooth = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const, // easeOutExpo-like
};

export const tweenQuick = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: springSmooth,
};

export const fadeInDown = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0 },
  transition: springSmooth,
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  transition: springSmooth,
};

export const fadeInRight = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  transition: springSmooth,
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: springBouncy,
};

export const floatUp = {
  animate: { y: [0, -8, 0] },
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
};

/** Section reveal when in viewport */
export const sectionReveal = {
  initial: { opacity: 0, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px", amount: 0.2 },
  transition: springSmooth,
};

/** Stagger container - use with staggerChildren */
export const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-60px", amount: 0.1 },
  transition: {
    staggerChildren: 0.08,
    staggerDirection: 1,
  },
};

/** Child for stagger - subtle fade up */
export const staggerChild = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: springGentle,
};

/** Stagger child with scale for cards/badges */
export const staggerChildScale = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  transition: springGentle,
};
