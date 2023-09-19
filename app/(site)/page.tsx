import { getProfile } from '@/sanity/sanity.query';
import type { ProfileType } from '@/types';
import Job from './components/Job';
import HeroSvg from './icons/HeroSvg';

import dynamic from 'next/dynamic';

import { IsClientCtxProvider } from './utilities/is-client-ctx';
import Link from 'next/link';

const HydraCanvas = dynamic(() => import('./components/HydraCanvas'), {
	ssr: false,
});

export default async function Home() {
	const profile: ProfileType[] = await getProfile();

	return (
		<IsClientCtxProvider>
			<HydraCanvas />
			<main className=" z-10  mx-auto  flex md:flex-row flex-col items-center justify-center w-screen h-screen left-0 border-double border-8 md:border-[3rem] border-white mix-blend-exclusion">
				<h1 className="lg:px-16 px-6  text-4xl md:text-[10rem] font-extrabold">
					Alan Ren
				</h1>
				<div className="my-4 text-center md:text-left flex flex-col gap-y-5 lg:px-16 px-6 text-2xl md:text-9xl font-extrabold text-white z-[10]">
					<Link href="/about" className="hover:underline">
						About
					</Link>
					<Link href="/projects" className="hover:underline">
						Projects
					</Link>
					<Link href="" className="hover:underline">
						Contact
					</Link>
				</div>
			</main>
		</IsClientCtxProvider>
	);
}
