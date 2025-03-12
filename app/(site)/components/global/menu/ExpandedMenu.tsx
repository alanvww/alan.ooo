'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  BiBracket,
  BiAtom,
  BiCollapse,
  BiBriefcase,
  BiLogoLinkedinSquare,
  BiLogoInstagram,
  BiLogoGithub,
  BiLogoMastodon,
  BiEnvelope,
  BiSolidBong,
  BiFile,
} from 'react-icons/bi';
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
          className="flex right-0"
        >
          <BiCollapse className="md:inline my-auto mx-1 text-xl" />
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
            <MenuLink href="/projects" icon={<BiAtom />}>
              Projects
            </MenuLink>
            <MenuLink href="/about" icon={<BiFile />}>
              Resume
            </MenuLink>
            <MenuLink href="/about" icon={<BiBracket />}>
              About
            </MenuLink>
          </MenuSection>
        </motion.div>

        {/* Contact Info Section */}
        <motion.div variants={item}>
          <MenuSection title="Contact Info">
            <MenuLink href="https://www.linkedin.com/in/junhao-ren/" icon={<BiLogoLinkedinSquare />} isExternal>
              LinkedIn
            </MenuLink>
            <MenuLink href="https://www.instagram.com/alan.j.ren/" icon={<BiLogoInstagram />} isExternal>
              Instagram
            </MenuLink>
            <MenuLink href="https://github.com/alanvww" icon={<BiLogoGithub />} isExternal>
              Github
            </MenuLink>
            <MenuLink href="https://mas.to/@alanvww" icon={<BiLogoMastodon />} isExternal>
              Mastodon
            </MenuLink>
            <MenuLink href="mailto:hello@me.alan.ooo" icon={<BiEnvelope />}>
              Email
            </MenuLink>
          </MenuSection>
        </motion.div>

        {/* Fun Stuff Section */}
        <motion.div variants={item}>
          <MenuSection title="Fun Stuffs">
            <MenuLink href="/techstack" icon={<BiBriefcase />}>
              Stack & Gear
            </MenuLink>
            <MenuLink href="https://itp.alan.ooo" icon={<BiSolidBong />} isExternal>
              ITP Blog
            </MenuLink>
          </MenuSection>
        </motion.div>
      </motion.div>
    </motion.section>
  );
});
