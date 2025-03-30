import { getProjects } from '@/sanity/sanity.query';
import type { ProjectType } from '@/types';
import { Metadata } from 'next';
import ProjectList from '../../components/project-list/ProjectList';
import Headline from '../../components/shared/Headline';
import { Suspense } from 'react';
import Loading from './loading';


export const metadata: Metadata = {
	title: 'All Projects - Alan Ren',
	description: 'All my projects I have built over the years.',
};

export default async function Project() {
	const projects: ProjectType[] = await getProjects();

	return (
		<main className="max-w-7xl mx-auto md:px-16 px-6">
			<Headline

				title="Exploring Boundaries in Digital Creation"
				description="Behind each project is a story of experimentation, learning, and problem-solving. 
				These selected works represent key moments in my development as a creator and 
				technologist."

			/>

			<ProjectList projects={projects} />
		</main>
	);
}
