'use client';

import React from 'react';
import { motion } from 'motion/react';
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
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};

interface ExpandedMenuProps {
  onCollapse: () => void;
}

/**
 * Component for the expanded state of the floating menu
 * Memoized to prevent unnecessary re-renders when parent components update
 */
export const ExpandedMenu = React.memo(function ExpandedMenu({ onCollapse }: ExpandedMenuProps) {
  return (
    <motion.section
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
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.5,
          type: 'linear',
          ease: [0.76, 0, 0.24, 1],
        }}
        className="flex flex-wrap md:flex-row flex-col md:gap-x-8 mx-2 w-full rounded-md bg-opacity-95"
      >
        {/* Main Profile Section */}
        <motion.div variants={item}>
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
        <motion.div variants={item}>
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
        <motion.div variants={item}>
          <MenuSection title="Fun Stuffs">
            <MenuLink href="/techstack" icon={<Briefcase />}>
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
