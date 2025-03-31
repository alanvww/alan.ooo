import ProjectCard from './ProjectCard';
import * as motion from 'motion/react-client';
import type { ProjectType } from '@/types';
import { Suspense } from 'react';

type ProjectListProps = {
	projects: ProjectType[];
};

export default function ProjectList({ projects }: ProjectListProps) {
	const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

	const projectsByYear: Record<number, ProjectType[]> = {};

	sortedProjects.forEach(project => {
		if (!projectsByYear[project.year]) {
			projectsByYear[project.year] = [];
		}
		projectsByYear[project.year].push(project);
	});

	const years = Object.keys(projectsByYear).map(Number).sort((a, b) => b - a);

	return (
		<motion.div className="flex flex-col h-max my-12">
			{years.map(year => (
				<motion.div key={year} className="mb-12">
					{/* Year heading */}
					<motion.h2
						className="text-2xl md:text-4xl font-bold mb-6 border-b pb-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						{year}
					</motion.h2>

					{/* Projects for this year */}
					{projectsByYear[year].map((project, id) => (
						<Suspense
							key={`${year}-${id}`}
							fallback={
								<div className="animate-pulse flex flex-col my-8">
									<div className="flex flex-row items-center mb-4">
										<div className="h-6 bg-gray-300 rounded w-1/2" />
										<div className="h-6 bg-gray-300 rounded w-1/4 ml-auto" />
									</div>
									<div className="h-48 bg-gray-300 rounded-md" />
									<div className="mt-4 h-4 bg-gray-300 rounded w-3/4" />
									<div className="mt-2 h-4 bg-gray-300 rounded w-1/2" />
								</div>
							}
						>
							<ProjectCard
								key={`${year}-${id}`}
								id={id}
								project={project}
								whileInView={{ opacity: 1, scale: 1 }}
								initial={{ opacity: 0, scale: 0.9 }}
							></ProjectCard>
						</Suspense>
					))}
				</motion.div>
			))}
		</motion.div>
	);
}
