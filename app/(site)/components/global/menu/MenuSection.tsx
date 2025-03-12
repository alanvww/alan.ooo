'use client';

import React from 'react';
import { motion } from 'motion/react';

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * A component to represent a section in the expanded menu
 * Memoized to prevent unnecessary re-renders when parent components update
 */
export const MenuSection = React.memo(function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <motion.span
      layout
      transition={{
        duration: 0.5,
        type: 'linear',
        ease: [0.76, 0, 0.24, 1],
      }}
      className="flex flex-col md:m-2 mx-1 py-2"
    >
      <span className="text-xl mx-4 py-4">{title}</span>
      {children}
    </motion.span>
  );
});
