'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import {
	BiBracket,
	BiBriefcase,
	BiCollapse,
	BiDotsVertical,
	BiAtom,
	BiLogoLinkedinSquare,
	BiLogoInstagram,
	BiLogoGithub,
	BiLogoMastodon,
	BiEnvelope,
	BiSolidBong,
} from 'react-icons/bi';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const variants = {
	open: { opacity: 1, x: 0 },
	closed: { opacity: 0, x: '-100%' },
};

export default function FloatMenu() {
	const pathname = usePathname();
	const [isExpanded, setIsExpanded] = useState(false);

	const handleMouseEnter = () => {
		setIsExpanded(true);
	};

	const handleMouseLeave = () => {
		setIsExpanded(false);
	};

	return (
		<motion.nav
			variants={container}
			initial="hidden"
			animate="visible"
			className="flex w-full fixed left-0 justify-center bottom-5 md:bottom-16 text-sm"
		>
			<AnimatePresence>
				<section
					onMouseLeave={handleMouseLeave}
					className="rounded-xl bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple p-px transition-all duration-300"
				>
					{!isExpanded && (
						<>
							<motion.ul
								initial={{ opacity: 0, display: 'auto' }}
								animate={{ opacity: 1, display: 'auto' }}
								exit={{ opacity: 0, display: 'none' }}
								transition={{
									ease: 'linear',
									duration: 0.3,
									x: { duration: 1 },
								}}
								className="flex items-center gap-x-4 md:gap-x-8 px-5 md:px-10 py-2 rounded-xl bg-gray-dark transition-all"
							>
								{/* Other menu items */}
								<li
									className={`md:px-10 px-1 py-2 rounded-xl hover:bg-white hover:text-black duration-300 ${
										pathname === '/about'
											? 'bg-white text-black'
											: 'text-white bg-transparent'
									}`}
								>
									<Link href="/about" className="flex">
										<BiBracket className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">About</span>
									</Link>
								</li>
								<li
									className={`md:px-10 px-1 py-2  rounded-xl   hover:bg-white hover:text-black     duration-300 	${
										pathname == '/projects'
											? 'bg-white text-black '
											: 'text-white bg-transparent'
									}
						`}
								>
									<Link href="/projects" className="flex">
										<BiAtom className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Projects</span>
									</Link>
								</li>
								{/* More menu items */}
								<li className="md:px-10 px-1 py-2 rounded-xl hover:bg-white hover:text-black duration-300 relative">
									<button
										onMouseLeave={handleMouseLeave}
										onClick={() => setIsExpanded(!isExpanded)}
										className="flex"
									>
										<BiDotsVertical className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">More</span>
									</button>
								</li>
							</motion.ul>{' '}
						</>
					)}

					{isExpanded && (
						<motion.section
							initial={{ opacity: 0, display: 'auto' }}
							animate={{ opacity: 1, display: 'auto' }}
							exit={{ opacity: 0, display: 'none' }}
							transition={{
								ease: 'linear',
								duration: 0.3,
								x: { duration: 1 },
							}}
							onMouseEnter={handleMouseEnter}
							className="flex flex-col-reverse items-center min-w-full px-8 md:px-4 py-2 rounded-xl bg-gray-dark transition-all"
						>
							<span className="flex justify-between min-w-full md:mx-2 mx-1 py-2 duration-300">
								<button
									onClick={() => setIsExpanded(!isExpanded)}
									className="flex bg-white text-black rounded-md px-2 py-1 left-0"
								>
									<span className="align-middle">More</span>
								</button>

								<button
									onClick={() => setIsExpanded(!isExpanded)}
									className="flex right-0"
								>
									<BiCollapse className="md:inline my-auto mx-1 text-xl" />
								</button>
							</span>
							{/* Add more popup content as needed */}
							<div className="container flex flex-row gap-x-4 md:gap-x-8 mx-2 w-full rounded-md bg-opacity-95">
								{/* Add more popup content as needed */}
								<span className="flex flex-col    md:m-2 mx-1 py-2 duration-300">
									<span className="text-xl mx-4 py-4">Main Profile</span>
									<Link
										href="/projects"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiAtom className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Projects</span>{' '}
									</Link>
									<Link
										href="/about"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiBracket className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">About</span>
									</Link>
								</span>

								<span className="flex flex-col   md:m-2 mx-1 py-2 duration-300">
									<span className="text-xl mx-4 py-4">Contact Info</span>

									<Link
										href="/"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiLogoLinkedinSquare className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">LinkedIn</span>
									</Link>
									<Link
										href="/"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiLogoInstagram className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Instagram</span>{' '}
									</Link>
									<Link
										href="/"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiLogoGithub className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Github</span>{' '}
									</Link>
									<Link
										href="/"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiLogoMastodon className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Mastodon</span>{' '}
									</Link>
									<Link
										href="/"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiEnvelope className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Email</span>{' '}
									</Link>
								</span>

								<span className="flex flex-col  md:m-2 mx-1 py-2 duration-300">
									<span className="text-xl mx-4 py-4">Fun Stuffs</span>

									<Link
										href="/techstack"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiBriefcase className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Stack & Gear</span>
									</Link>
									<Link
										href="/techstack"
										className="block px-4 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiSolidBong className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">ITP Blog</span>
									</Link>
								</span>
							</div>
						</motion.section>
					)}
				</section>
			</AnimatePresence>
		</motion.nav>
	);
}
