import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../icons/logo.png';

export default function Navbar() {
	return (
		<header className="py-6 md:px-16 px-6 border-b border-zinc-800 z-30 md:mb-28 mb-20">
			<div className="max-w-8xl mx-auto flex items-center justify-between">
				<Link href="/" className="w-sm md:w-5xl">
					<Image src={Logo} width={100} alt="logo" />
				</Link>
				<nav>
					<ul className="flex items-center gap-x-8">
						<li>
							<Link
								href="/about"
								className="hover:text-purple-400 duration-300"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/techstack"
								className="hover:text-purple-400 duration-300"
							>
								Tech Stack & Gear
							</Link>
						</li>
						<li>
							<Link
								href="/projects"
								className="hover:text-purple-400 duration-300"
							>
								Projects
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
