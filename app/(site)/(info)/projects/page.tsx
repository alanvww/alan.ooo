import { getProjects } from '@/sanity/sanity.query';
import type { ProjectType } from '@/types';
import { Metadata } from 'next';
import ProjectList from '../../components/project-list/ProjectList';
import Headline from '../../components/shared/Headline';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'All Projects - Alan Ren',
	description: 'All my projects I have built over the years.',
};

export default async function Project() {
	const projects: ProjectType[] = await getProjects();

	return (
		<main className="max-w-7xl mx-auto md:px-16 px-6">
			<Headline
				title="Featured projects I've built over the years"
				description="I've worked on tons of little projects over the years but these are
				the ones that I'm most proud of. Many of them are open-source, so
				if you see something that piques your interest, check out the code and
				contribute if you have ideas for how it can be improved."
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectList projects={projects} />
			</Suspense>
		</main>
	);
}
