'use client';

import React from 'react';
import { Link } from 'next-view-transitions'
import { motion } from 'motion/react';
import { defaultTransition } from '@/app/(site)/utilities/animations';
import { Code, Atom, DotsThreeVertical } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';

interface CollapsedMenuProps {
  onExpand: () => void;
}

/**
 * Component for the collapsed state of the floating menu
 * Memoized to prevent unnecessary re-renders when parent components update
 */
export const CollapsedMenu = React.memo(function CollapsedMenu({ onExpand }: CollapsedMenuProps) {
  const pathname = usePathname();

  const baseLinkClasses = 'flex md:px-10 px-2 py-2 rounded-lg hover:bg-white hover:text-black duration-300';
  const activeLinkClasses = 'bg-white text-black';
  const inactiveLinkClasses = 'text-white bg-transparent';

  return (
    <motion.ul
      layout
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ ...defaultTransition, delayChildren: 0.12 }}
      className="flex items-center md:w-auto md:h-auto w-max gap-x-4 md:gap-x-8 md:px-10 px-4 py-2 rounded-xl bg-gray-dark cursor-pointer"
    >
      {/* About link */}
      <li>
        <Link
          href="/about"
          className={`${baseLinkClasses} ${pathname === '/about' ? activeLinkClasses : inactiveLinkClasses
            }`}
        >
          <Code className="md:inline my-auto mx-1 text-xl" />
          <span className="align-middle">About</span>
        </Link>
      </li>

      {/* Projects link */}
      <li>
        <Link
          href="/projects"
          className={`${baseLinkClasses} ${ // Use baseLinkClasses for consistent padding
            pathname === '/projects' ? activeLinkClasses : inactiveLinkClasses
            }`}
        >
          <Atom className="md:inline my-auto mx-1 text-xl" />
          <span className="align-middle">Projects</span>
        </Link>
      </li>

      {/* More button */}
      {/* Use px-2 for consistency */}
      <li>
        <button onClick={onExpand} className={`${baseLinkClasses}`}>
          <DotsThreeVertical className="md:inline my-auto mx-1 text-xl" />
          <span className="align-middle">More</span>
        </button>
      </li>
    </motion.ul>
  );
});
