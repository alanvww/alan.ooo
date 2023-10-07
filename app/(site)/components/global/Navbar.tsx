import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../icons/logo.png';
import FloatMenu from './FloatMenu';

export default function Navbar() {
	return (
		<>
			<header className="mix-blend-exclusion sticky top-0  py-6 md:px-16 px-6 z-30 md:mb-28 mb-20 ">
				<div className=" bg-clip-text text-transparent  bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-theme-green via-gradient-via to-theme-purple  ">
					<Link href="/" className=" w-sm md:w-5xl">
						<Image
							src={Logo}
							width={100}
							alt="logo"
							className="fill-transparent"
						/>
					</Link>
				</div>
			</header>
			<FloatMenu />
		</>
	);
}
