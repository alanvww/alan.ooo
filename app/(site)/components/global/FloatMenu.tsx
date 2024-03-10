'use client';

import Link from 'next/link';
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from 'framer-motion';

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
import { useState, useEffect } from 'react';
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
	exit: {
		opacity: 0,

		transition: {
			staggerChildren: 0.2,
			staggerDirection: -1, // Reverse the order for exiting
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

export default function FloatMenu() {
	const pathname = usePathname();
	const [isExpanded, setIsExpanded] = useState(false);
	const { scrollYProgress } = useScroll();
	const [hasScrollbar, setHasScrollbar] = useState(true);

	useEffect(() => {
		const updateHasScrollbar = () => {
			setHasScrollbar(document.body.scrollHeight > window.innerHeight);
		};

		updateHasScrollbar(); // Initial check
		window.addEventListener('resize', updateHasScrollbar); // Update on resize

		return () => window.removeEventListener('resize', updateHasScrollbar); // Cleanup
	}, []);

	// Adjust opacity based on scrollbar presence and scroll progress
	const opacityPageEnd = useTransform(
		scrollYProgress,
		[0, 0.9, 1],
		hasScrollbar ? [1, 1, 0] : [1, 1, 1]
	);

	const handleMouseEnter = () => {
		setIsExpanded(true);
	};

	const handleMouseLeave = () => {
		setIsExpanded(false);
	};

	return (
		<motion.nav
			layoutRoot
			layout
			transition={{
				duration: 0.5,
				type: 'linear',
				ease: [0.76, 0, 0.24, 1],
			}}
			style={{ opacity: opacityPageEnd }}
			className={`flex min-w-full fixed justify-center bottom-5 md:bottom-16 text-sm z-999`}
		>
			<motion.section
				layout
				transition={{
					duration: 0.5,
					type: 'linear',
					delayChildren: 0.3,
					ease: [0.76, 0, 0.24, 1],
				}}
				onMouseLeave={handleMouseLeave}
				className="rounded-xl bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple p-px "
			>
				<AnimatePresence>
					{!isExpanded && (
						<>
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
								className=" flex items-center md:w-auto md:h-auto w-max gap-x-4 md:gap-x-8  md:px-10 px-4 py-2  rounded-xl bg-gray-dark "
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
							</motion.ul>
						</>
					)}

					{isExpanded && (
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
							onMouseEnter={handleMouseEnter}
							onClick={() => setIsExpanded(!isExpanded)}
							className="flex flex-col-reverse  items-center md:w-auto w-max md:h-auto h-max px-0 md:px-4 py-2 rounded-xl bg-gray-dark "
						>
							<span className="flex justify-between md:w-full w-[75vw] mx-2 py-2 ">
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
								className=" flex flex-wrap  md:flex-row flex-col md:gap-x-8 mx-2 w-full rounded-md bg-opacity-95"
							>
								{/* Add more popup content as needed */}
								<motion.span
									variants={item}
									layout
									transition={{
										duration: 0.5,
										type: 'linear',
										ease: [0.76, 0, 0.24, 1],
									}}
									className="flex flex-col text-white   md:m-2 mx-1 py-2"
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
									transition={{
										duration: 0.5,
										type: 'linear',
										ease: [0.76, 0, 0.24, 1],
									}}
									className="flex flex-col   md:m-2 mx-1 py-2 "
								>
									<span className="text-xl mx-4 py-4">Contact Info</span>

									<Link
										href="https://www.linkedin.com/in/junhao-ren/"
										target="_blank"
										className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiLogoLinkedinSquare className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">LinkedIn</span>
									</Link>
									<Link
										href="https://www.instagram.com/alan.j.ren/"
										target="_blank"
										className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiLogoInstagram className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Instagram</span>{' '}
									</Link>
									<Link
										href="https://github.com/alanvww"
										target="_blank"
										className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiLogoGithub className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Github</span>{' '}
									</Link>
									<Link
										href="https://mas.to/@alanvww"
										target="_blank"
										className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiLogoMastodon className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Mastodon</span>{' '}
									</Link>
									<Link
										href="mailto:hello@me.alan.ooo"
										className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiEnvelope className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">Email</span>{' '}
									</Link>
								</motion.span>

								<motion.span
									variants={item}
									layout
									transition={{
										duration: 0.5,
										type: 'linear',
										ease: [0.76, 0, 0.24, 1],
									}}
									className="flex flex-col   md:m-2 mx-1 py-2"
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
										href="https://itp.alan.ooo"
										target="_blank"
										className="flex flex-row px-2 py-2 ml-8 text-sm text-gray-700 hover:text-theme-green ease-in transition-all duration-100 border-s-2 border-separate border-white hover:border-theme-green"
									>
										<BiSolidBong className="md:inline my-auto mx-1 text-xl" />
										<span className="align-middle">ITP Blog</span>
									</Link>
								</motion.span>
							</motion.div>
						</motion.section>
					)}
				</AnimatePresence>
			</motion.section>
		</motion.nav>
	);
}
