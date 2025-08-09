'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { defaultTransition, containerVariants, itemVariants } from '@/app/(site)/utilities/animations';
import { useOnClickOutside } from 'usehooks-ts';
import {
  Code,
  Atom,
  ArrowsIn,
  Briefcase,
  LinkedinLogo,
  InstagramLogo,
  GithubLogo,
  Envelope,
  File,
  MastodonLogo,
  CirclesThreePlus
} from '@phosphor-icons/react';

import { MenuSection } from './MenuSection';
import { MenuLink } from './MenuLink';

// Animation variants - defined outside component to prevent recreation
// Use centralized variants

interface ExpandedMenuProps {
  onCollapse: () => void;
}

/**
 * Component for the expanded state of the floating menu
 * Memoized to prevent unnecessary re-renders when parent components update
 */
export const ExpandedMenu = React.memo(function ExpandedMenu({ onCollapse }: ExpandedMenuProps) {
  const menuRef = useRef<HTMLElement>(null); // Create a ref for the menu container

  // Call the hook to detect clicks outside the menu
  // Use type assertion because useOnClickOutside expects RefObject<HTMLElement>, not RefObject<HTMLElement | null>
  useOnClickOutside(menuRef as React.RefObject<HTMLElement>, onCollapse);

  return (
    <motion.section
      ref={menuRef} // Attach the ref to the main section element
      layout
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ ...defaultTransition, delayChildren: 0.12 }}
      className="flex flex-col-reverse items-center md:w-auto w-max md:h-auto h-max px-0 md:px-4 py-2 rounded-xl bg-gray-dark"
    >
      {/* Control buttons */}
      <span className="flex justify-between md:w-full w-[75vw] mx-2 py-2">
        <button
          onClick={onCollapse}
          className="flex bg-white text-black rounded-md px-2 py-1 left-0"
        >
          <span className="align-middle">More</span>
        </button>

        <button
          onClick={onCollapse}
          className="flex right-0 cursor-pointer"
        >
          <ArrowsIn className="md:inline my-auto mx-3 text-xl" />
        </button>
      </span>

      {/* Menu sections container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={defaultTransition}
        className="flex flex-wrap md:flex-row flex-col md:gap-x-8 mx-2 w-full rounded-md bg-opacity-95"
      >
        {/* Main Profile Section */}
        <motion.div variants={itemVariants}>
          <MenuSection title="Main Profile">
            <MenuLink href="/projects" icon={<Atom />}>
              Projects
            </MenuLink>
            <MenuLink href="https://link.alan.ooo/resume" icon={<File />} isExternal>
              Resume
            </MenuLink>
            <MenuLink href="/about" icon={<Code />}>
              About
            </MenuLink>
          </MenuSection>
        </motion.div>

        {/* Contact Info Section */}
        <motion.div variants={itemVariants}>
          <MenuSection title="Contact Info">
            <MenuLink href="https://www.linkedin.com/in/junhao-ren/" icon={<LinkedinLogo />} isExternal>
              LinkedIn
            </MenuLink>
            <MenuLink href="https://www.instagram.com/alan.j.ren/" icon={<InstagramLogo />} isExternal>
              Instagram
            </MenuLink>
            <MenuLink href="https://github.com/alanvww" icon={<GithubLogo />} isExternal>
              Github
            </MenuLink>
            <MenuLink href="https://mas.to/@alanvww" icon={<MastodonLogo />} isExternal>
              Mastodon
            </MenuLink>
            <MenuLink href="mailto:hello@me.alan.ooo" icon={<Envelope />}>
              Email
            </MenuLink>
          </MenuSection>
        </motion.div>

        {/* Fun Stuff Section */}
        <motion.div variants={itemVariants}>
          <MenuSection title="Fun Stuffs">
            <MenuLink href="/tech-and-gear" icon={<Briefcase />}>
              Stack & Gear
            </MenuLink>
            <MenuLink href="https://100days.alan.ooo" icon={<CirclesThreePlus />} isExternal>
              100 Days of Design Engineering
            </MenuLink>
          </MenuSection>
        </motion.div>
      </motion.div>
    </motion.section>
  );
});
