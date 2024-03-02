'use client';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import type { ProjectType } from '@/types';
import { Suspense } from 'react';

type ProjectListProps = {
	projects: ProjectType[];
};

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
	exit: {
		opacity: 0,
		scale: 0,
		transition: {
			staggerChildren: 0.2,
			staggerDirection: -1, // Reverse the order for exiting
		},
	},
};

export default function ProjectList({ projects }: ProjectListProps) {
	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="visible"
			exit="exit"
			transition={{
				duration: 0.5,
				type: 'linear',
				ease: [0.76, 0, 0.24, 1],
			}}
			className="flex flex-col my-12 "
		>
			<Suspense fallback={<div>Loading...</div>}>
				{projects.map((project, id) => (
					<ProjectCard
						key={id}
						id={id}
						project={project}
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
					></ProjectCard>
				))}
			</Suspense>
		</motion.div>
	);
}
