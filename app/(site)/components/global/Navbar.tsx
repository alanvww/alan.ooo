'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../icons/logo.png';
import FloatMenu from './FloatMenu';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

export default function Navbar() {
	return (
		<>
			<header className="mix-blend-exclusion sticky top-0  py-6 md:px-16 px-6 z-30 md:mb-28 mb-20 ">
				<div className=" w-[100px] bg-clip-text text-transparent  bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple  ">
					<MotionLink
						href="/"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<Image
							src={Logo}
							width={100}
							alt="logo"
							className="fill-transparent"
						/>
					</MotionLink>
				</div>
			</header>
			<FloatMenu />
		</>
	);
}
