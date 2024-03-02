'use client';

import Image from 'next/image';
import LongLogo from '../../icons/logo_long.png';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

const MotionLink = motion(Link);

export default function HomeMenu() {
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.7 }}
			className="select-none fixed z-10  mx-auto  flex  flex-col items-center justify-center w-screen h-screen left-0 border-double border-0  md:border-[0] 	 border-white mix-blend-exclusion"
		>
			<div className="relative mx-5 px-10 py-5 max-w-3xl object-contain select-none	">
				<Image
					draggable="false"
					src={LongLogo}
					width={1000}
					alt="logo"
					priority={true}
				/>
			</div>

			<MotionLink
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className="select-none my-4 text-center md:text-left flex flex-col gap-y-10 lg:px-16 px-6 text-2xl md:text-5xl font-extrabold text-white z-[10] "
				href="/about"
			>
				<span className="bg-clip-text flex items-center  my-auto  hover:bg-gradient-to-r from-[#D45797] to-[#845EEE]  align-baseline py-2 font-mono">{`<enter />`}</span>
			</MotionLink>
		</motion.main>
	);
}
