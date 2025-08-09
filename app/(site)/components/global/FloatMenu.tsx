'use client';

import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useMenuVisibility } from '../../hooks/useMenuVisibility';
import { CollapsedMenu } from './menu/CollapsedMenu';
import { ExpandedMenu } from './menu/ExpandedMenu';
import { defaultTransition, DURATION } from '@/app/(site)/utilities/animations';

/**
 * FloatMenu component - handles the floating navigation menu
 * This is now a container component that manages state and 
 * delegates rendering to specialized sub-components
 */
export default function FloatMenu() {
  // Get visibility state from our custom hook
  const { isMenuVisible } = useMenuVisibility();
  
  // Track expanded/collapsed state
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders
  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <AnimatePresence>
      {isMenuVisible && (
        <motion.nav
          layoutRoot
          layout
          transition={{ ...defaultTransition, duration: DURATION.fast }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex min-w-full fixed justify-center bottom-5 md:bottom-16 text-sm z-8888"
        >
          <motion.section
            layout
            transition={{ ...defaultTransition, delayChildren: 0.12 }}
            className="rounded-xl bg-radial-[at_50%_75%] from-theme-green via-gradient-via to-theme-purple p-px"
          >
            {/* Conditionally render the collapsed or expanded menu */}
            {!isExpanded ? (
              <CollapsedMenu onExpand={handleExpand} />
            ) : (
              <ExpandedMenu onCollapse={handleCollapse} />
            )}
          </motion.section>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
