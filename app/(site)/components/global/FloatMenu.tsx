import Link from 'next/link';

export default function FloatMenu() {
	return (
		<section className="mix-blend-overlay flex w-full fixed left-0 justify-center bottom-10 md:relative md:bottom-0 text-sm">
			<ul className=" flex items-center gap-x-8 p-3 rounded-3xl bg-[#1e1e1e]">
				<li>
					<Link
						href="/about"
						className="hover:bg-white hover:text-black rounded-3xl px-3 py-2 duration-300"
					>
						About
					</Link>
				</li>
				<li>
					<Link
						href="/techstack"
						className="hover:bg-white hover:text-black rounded-3xl px-3 py-2 duration-300"
					>
						Tech Stack & Gear
					</Link>
				</li>
				<li>
					<Link
						href="/projects"
						className="hover:bg-white hover:text-black rounded-3xl px-3 py-2 duration-300"
					>
						Projects
					</Link>
				</li>
			</ul>
		</section>
	);
}
