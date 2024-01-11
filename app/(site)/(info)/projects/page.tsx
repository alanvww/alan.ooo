import { getProjects } from '@/sanity/sanity.query';
import type { ProjectType } from '@/types';
import { Metadata } from 'next';
import ProjectList from './@projectlist/page';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'All Projects - Alan Ren',
	description: 'All my projects I have built over the years.',
};

export default async function Project() {
	const projects: ProjectType[] = await getProjects();

	return (
		<main className="max-w-7xl mx-auto md:px-16 px-6">
			<section className="max-w-2xl mb-16">
				<h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
					Featured projects I&apos;ve built over the years
				</h1>
				<p className="text-base text-zinc-400 leading-relaxed">
					I&apos;ve worked on tons of little projects over the years but these
					are the ones that I&apos;m most proud of. Many of them are
					open-source, so if you see something that piques your interest, check
					out the code and contribute if you have ideas for how it can be
					improved.
				</p>
			</section>

			<Suspense fallback={<div>Loading...</div>}>
				<ProjectList projects={projects} />
			</Suspense>
			{/* <section className="flex flex-col mb-12 divide-y">
				{projects.map((project) => (
					<AnimatedDiv key={project._id}>{project}</AnimatedDiv>
				))}
			</section>*/}
		</main>
	);
}
