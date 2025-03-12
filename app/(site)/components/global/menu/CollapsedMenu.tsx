'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { BiBracket, BiAtom, BiDotsVertical } from 'react-icons/bi';
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

  return (
    <motion.ul
      layout
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{
        duration: 0.5,
        delayChildren: 0.3,
        type: 'linear',
        ease: [0.76, 0, 0.24, 1],
      }}
      className="flex items-center md:w-auto md:h-auto w-max gap-x-4 md:gap-x-8 md:px-10 px-4 py-2 rounded-xl bg-gray-dark"
    >
      {/* About link */}
      <li
        className={`md:px-10 px-2 py-2 rounded-lg hover:bg-white hover:text-black duration-300 ${
          pathname === '/about' ? 'bg-white text-black' : 'text-white bg-transparent'
        }`}
      >
        <Link href="/about" className="flex">
          <BiBracket className="md:inline my-auto mx-1 text-xl" />
          <span className="align-middle">About</span>
        </Link>
      </li>

      {/* Projects link */}
      <li
        className={`md:px-10 px-3 py-2 rounded-lg hover:bg-white hover:text-black duration-300 ${
          pathname === '/projects' ? 'bg-white text-black' : 'text-white bg-transparent'
        }`}
      >
        <Link href="/projects" className="flex">
          <BiAtom className="md:inline my-auto mx-1 text-xl" />
          <span className="align-middle">Projects</span>
        </Link>
      </li>

      {/* More button */}
      <li className="md:px-10 px-3 py-2 rounded-xl hover:bg-white hover:text-black duration-300">
        <button onClick={onExpand} className="flex">
          <BiDotsVertical className="md:inline my-auto mx-1 text-xl" />
          <span className="align-middle">More</span>
        </button>
      </li>
    </motion.ul>
  );
});
