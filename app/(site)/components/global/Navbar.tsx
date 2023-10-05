import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../icons/logo.png';
import FloatMenu from './FloatMenu';

export default function Navbar() {
	return (
		<header className="sticky top-0   py-6 md:px-16 px-6 z-30 md:mb-28 mb-20 mix-blend-exclusion">
			<div className="max-w-8xl mx-auto flex items-center justify-between">
				<Link href="/" className=" w-sm md:w-5xl">
					<Image src={Logo} width={100} alt="logo" />
				</Link>
				<nav>
					<FloatMenu />
				</nav>
			</div>
		</header>
	);
}
