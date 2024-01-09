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
	BiFile,
} from 'react-icons/bi';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const item = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
	},
};

const variants = {
	open: { opacity: 1 },
	closed: { opacity: 0 },
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
			layout
			layoutRoot
			className="flex min-w-full fixed left-0 justify-center bottom-5 md:bottom-16 text-sm"
		>
			<motion.section
				layout
				onMouseLeave={handleMouseLeave}
				className="rounded-xl bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple p-px transition-all duration-300"
			>
				<AnimatePresence mode={'wait'} initial={false}>
					{!isExpanded && (
						<>
							<motion.ul
								initial={{ opacity: 0, scale: 0.5, display: 'none' }}
								animate={{ opacity: 1, scale: 1, display: 'flex' }}
								exit={{ opacity: 0, scale: 0.5, display: 'none' }}
								transition={{ duration: 0.3 }}
								layout
								layoutDependency={isExpanded}
								className=" flex items-center md:w-auto md:h-auto w-max gap-x-4 md:gap-x-8  md:px-10 px-4 py-2  rounded-xl bg-gray-dark transition-all"
							>
								{/* Other menu items */}
								<li
									className={`md:px-10 px-2 py-2 rounded-lg hover:bg-white hover:text-black duration-300 ${
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
									className={`md:px-10 px-3 py-2  rounded-lg   hover:bg-white hover:text-black     duration-300 	${
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
								<li className="md:px-10 px-3 py-2 rounded-xl hover:bg-white hover:text-black duration-300 ">
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
				</AnimatePresence>

				<AnimatePresence mode={'wait'} initial={false}>
					{isExpanded && (
						<motion.section
							initial={{ opacity: 0, scale: 0.5, display: 'none' }}
							animate={{ opacity: 1, scale: 1, display: 'flex' }}
							exit={{ opacity: 0, scale: 0.5, display: 'none' }}
							transition={{ duration: 0.3 }}
							layout
							layoutDependency={isExpanded}
							onMouseEnter={handleMouseEnter}
							className="flex flex-col-reverse  items-center md:w-auto w-max md:h-auto h-max px-0 md:px-4 py-2 rounded-xl bg-gray-dark transition-all"
						>
							<span className="flex justify-between md:w-full w-[75vw] mx-2 py-2 duration-300">
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
							<AnimatePresence mode={'wait'}>
								<motion.div
									variants={container}
									initial="hidden"
									animate="visible"
									layout
									layoutRoot
									className=" flex flex-wrap  md:flex-row flex-col md:gap-x-8 mx-2 w-full rounded-md bg-opacity-95"
								>
									{/* Add more popup content as needed */}
									<motion.span
										variants={item}
										layout
										className="flex flex-col text-white   md:m-2 mx-1 py-2 duration-300"
									>
										<span className="text-xl mx-4 py-4">Main Profile</span>
										<Link
											href="/projects"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiAtom className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">Projects</span>{' '}
										</Link>
										<Link
											href="/about"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiFile className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">Resume</span>
										</Link>
										<Link
											href="/about"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiBracket className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">About</span>
										</Link>
									</motion.span>

									<motion.span
										variants={item}
										layout
										className="flex flex-col   md:m-2 mx-1 py-2 duration-300"
									>
										<span className="text-xl mx-4 py-4">Contact Info</span>

										<Link
											href="/"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiLogoLinkedinSquare className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">LinkedIn</span>
										</Link>
										<Link
											href="/"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiLogoInstagram className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">Instagram</span>{' '}
										</Link>
										<Link
											href="/"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiLogoGithub className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">Github</span>{' '}
										</Link>
										<Link
											href="/"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiLogoMastodon className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">Mastodon</span>{' '}
										</Link>
										<Link
											href="/"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiEnvelope className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">Email</span>{' '}
										</Link>
									</motion.span>

									<motion.span
										variants={item}
										layout
										className="flex flex-col   md:m-2 mx-1 py-2 duration-300"
									>
										<span className="text-xl mx-4 py-4">Fun Stuffs</span>

										<Link
											href="/techstack"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiBriefcase className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">Stack & Gear</span>
										</Link>
										<Link
											href="/techstack"
											className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
										>
											<BiSolidBong className="md:inline my-auto mx-1 text-xl" />
											<span className="align-middle">ITP Blog</span>
										</Link>
									</motion.span>
								</motion.div>
							</AnimatePresence>
						</motion.section>
					)}
				</AnimatePresence>
			</motion.section>
		</motion.nav>
	);
}
