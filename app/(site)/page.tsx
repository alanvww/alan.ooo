import { getProfile } from '@/sanity/sanity.query';
import type { ProfileType } from '@/types';
import Job from './components/Job';
import HeroSvg from './icons/HeroSvg';

import dynamic from 'next/dynamic';

import { IsClientCtxProvider } from './utilities/is-client-ctx';

const HydraCanvas = dynamic(() => import('./components/HydraCanvas'), {
	ssr: false,
});

export default async function Home() {
	const profile: ProfileType[] = await getProfile();

	return (
		<IsClientCtxProvider>
			<HydraCanvas />
			<main className=" z-10  mx-auto  w-screen h-screen left-0 border-double border-[30px] border-white mix-blend-exclusion">
				<div className="lg:px-16 px-6 ">
					<h1 className="text-9xl  font-extrabold text-white z-[10]">
						About Me
					</h1>
					<h1 className="text-9xl font-extrabold text-white z-[10]">
						Proejects
					</h1>
					<h1 className="text-9xl mix-blend-exclusion font-extrabold text-white z-[10]">
						Contact Me
					</h1>
				</div>
			</main>
		</IsClientCtxProvider>
	);
}
