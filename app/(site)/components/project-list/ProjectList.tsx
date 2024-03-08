'use client';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import type { ProjectType } from '@/types';

type ProjectListProps = {
	projects: ProjectType[];
};

export default function ProjectList({ projects }: ProjectListProps) {
	return (
		<motion.div className="flex flex-col my-12 ">
			{projects.map((project, id) => (
				<ProjectCard
					key={id}
					id={id}
					project={project}
					whileInView={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 0.9 }}
				></ProjectCard>
			))}
		</motion.div>
	);
}
