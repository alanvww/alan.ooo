'use client';
import ProjectCard from './ProjectCard';
import { AnimatePresence, motion } from 'motion/react';
import type { ProjectType } from '@/types';
import { Suspense } from 'react';

type ProjectListProps = {
	projects: ProjectType[];
};

export default function ProjectList({ projects }: ProjectListProps) {
	return (
		<motion.div className="flex flex-col h-max my-12">
			<AnimatePresence>
				{projects.map((project, id) => (
					<Suspense
						key={id}
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
							key={id}
							id={id}
							project={project}
							whileInView={{ opacity: 1, scale: 1 }}
							initial={{ opacity: 0, scale: 0.9 }}
						></ProjectCard>
					</Suspense>
				))}
			</AnimatePresence>
		</motion.div>
	);
}
