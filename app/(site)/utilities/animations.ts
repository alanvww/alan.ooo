// Centralized animation settings and reusable variants
// Keep these values consistent across the app for a coherent motion language

export type EasingTuple = [number, number, number, number];

// Standard easing used app-wide
export const EASE_STANDARD: EasingTuple = [0.76, 0, 0.24, 1];

// Standardized durations (in seconds)
export const DURATION = {
  fast: 0.2,
  normal: 0.5,
  slow: 0.7,
} as const;

// Default transition
export const defaultTransition = {
  duration: DURATION.normal,
  ease: EASE_STANDARD,
} as const;

// Common container and item variants for list/grid reveals
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ...defaultTransition,
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ...defaultTransition,
      staggerChildren: 0.12,
      staggerDirection: -1,
    },
  },
} as const;

export const itemVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
} as const;

// Simple presets for common use cases
export const fadeInUpPreset = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
  transition: defaultTransition,
} as const;


