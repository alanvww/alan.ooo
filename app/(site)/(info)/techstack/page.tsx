import { getTech, getGear } from '@/sanity/sanity.query';
import type { ProfileType, TechType } from '@/types';
import { PortableText } from '@portabletext/react';
import { BiEnvelope, BiFile } from 'react-icons/bi';
import { Metadata } from 'next';
import { StackList } from './@stacklist/page';

export const metadata: Metadata = {
	title: 'Stack & Gear - Alan Ren',
	description: 'All my tech stack and gear I use for development.',
};

export default async function About() {
	const tech: TechType[] = await getTech();

	return (
		<main className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
			<section className="mb-16 ">
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight ">
					Stack
				</h1>
				<StackList tech={tech} />
			</section>

			<section className="max-w-2xl mb-16">
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
					Gear
				</h1>
			</section>
		</main>
	);
}
