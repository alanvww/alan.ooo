import { getProfile } from '@/sanity/sanity.query';
import type { ProfileType } from '@/types';
import Job from './components/Job';
import HeroSvg from './icons/HeroSvg';

import Image from 'next/image';
import LongLogo from './icons/logo_long.png';

import dynamic from 'next/dynamic';

import { IsClientCtxProvider } from './utilities/is-client-ctx';
import Link from 'next/link';

const HydraCanvas = dynamic(() => import('./components/HydraCanvas'), {
	ssr: false,
});

export default async function Home() {
	return (
		<IsClientCtxProvider>
			<HydraCanvas />
			<main className="select-none fixed z-10  mx-auto  flex md:flex-row flex-col items-center justify-center w-screen h-screen left-0 border-double border-8 md:border-[3rem] border-white mix-blend-exclusion">
				<div className="relative mx-5 px-10 py-5 max-w-3xl object-contain">
					<Image src={LongLogo} width={1000} alt="logo" priority={true} />
				</div>

				<div className="my-4 text-center md:text-left flex flex-col gap-y-10 lg:px-16 px-6 text-2xl md:text-7xl font-extrabold text-white z-[10]">
					<Link
						href="/about"
						className="bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-[#D45797] to-[#845EEE] "
					>
						About
					</Link>
					<Link
						href="/projects"
						className="bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-[#D45797] to-[#845EEE] "
					>
						Projects
					</Link>
					<Link
						href=""
						className="bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-[#D45797] to-[#845EEE] "
					>
						Contact
					</Link>
				</div>
			</main>
		</IsClientCtxProvider>
	);
}
