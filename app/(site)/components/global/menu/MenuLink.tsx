import { Link } from 'next-view-transitions'
import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowSquareOut } from '@phosphor-icons/react';

interface MenuLinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  isExternal?: boolean;
  className?: string;
}

/**
 * A reusable link component for navigation menus
 * Memoized to prevent unnecessary re-renders when parent components update
 */
export const MenuLink = React.memo(function MenuLink({ 
  href, 
  icon, 
  children, 
  isExternal = false,
  className = "flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] border-s-2 border-separate border-white hover:border-theme-green"
}: MenuLinkProps) {
  const linkProps = isExternal ? { 
    target: "_blank", 
    rel: "noopener noreferrer" 
  } : {};

  return (
    <Link
      href={href}
      className={`${className} items-center`}
      {...linkProps}
    >
      <span className="md:inline my-auto mx-1 text-xl">{icon}</span>
      <div className="inline-flex items-center">
        <span>{children}</span>
        {isExternal && <ArrowSquareOut className="ml-1 text-sm" weight="bold" />}
      </div>
    </Link>
  );
});
