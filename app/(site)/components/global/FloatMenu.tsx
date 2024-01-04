'use client';

import Link from 'next/link';
import { BiBracket, BiBriefcase, BiAtom } from 'react-icons/bi';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function FloatMenu() {
	const pathname = usePathname();
	const [isExpanded, setIsExpanded] = useState(false); // State for expandable section

	return (
		<nav className=" flex w-full fixed left-0 justify-center bottom-5  md:bottom-16	 text-sm">
			<section className="rounded-3xl bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple p-px">
				<ul className=" flex items-center pace gap-x-4 md:gap-x-8 px-8 md:px-16 py-3 rounded-3xl bg-gray-dark transition-all">
					<li
						className={`md:px-10 px-1 py-2  rounded-xl   hover:bg-white hover:text-black     duration-300 	${
							pathname == '/about'
								? 'bg-white text-black '
								: 'text-white bg-transparent'
						}
						`}
					>
						<Link href="/about" className="flex">
							<BiBracket className="md:inline my-auto mx-1 text-xl" />
							<span className="align-middle">About</span>
						</Link>
					</li>

					<li
						className={`md:px-10 px-1  py-2  rounded-xl   hover:bg-white hover:text-black     duration-300 	${
							pathname == '/techstack'
								? 'bg-white text-black '
								: 'text-white bg-transparent'
						}
						`}
					>
						<Link href="/techstack" className="flex">
							<BiBriefcase className="md:inline my-auto mx-1 text-xl" />
							<span className="align-middle">Stack & Gear</span>
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

					<li className="md:px-10 px-1 py-2 rounded-xl hover:bg-white hover:text-black duration-300">
						<button onClick={() => setIsExpanded(!isExpanded)} className="flex">
							<span className="align-middle">More</span>
						</button>
						{isExpanded && (
							<div className="absolute bg-white p-4 rounded shadow-lg z-10">
								{/* Content of your popup */}
								<p>Popup content here...</p>
							</div>
						)}
					</li>
				</ul>
			</section>
		</nav>
	);
}
